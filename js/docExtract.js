/* ============================================================
   docExtract.js — extract text from uploaded files in the browser.

   Supports:
     .txt / .md / text/*   -> read directly
     .pdf                  -> pdf.js (lazy-loaded from CDN)
     .docx                 -> mammoth (lazy-loaded from CDN)
     images                -> not supported offline (needs OCR; later phase)

   All extraction happens client-side; nothing is uploaded to a server.
   Exposed on window.AITutorDoc
   ============================================================ */

const PDFJS_URL = "https://unpkg.com/pdfjs-dist@4.0.379/build/pdf.min.mjs";
const PDFJS_WORKER = "https://unpkg.com/pdfjs-dist@4.0.379/build/pdf.worker.min.mjs";
const MAMMOTH_URL = "https://unpkg.com/mammoth@1.6.0/mammoth.browser.min.js";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}

// Native dynamic import via Function constructor so Babel Standalone does
// NOT transform `import()` into a CommonJS require (which would break in-browser).
const nativeImport = new Function("url", "return import(url)");

let pdfjsLib = null;
async function getPdfjs() {
  if (pdfjsLib) return pdfjsLib;
  // pdf.js v4 is an ES module; import it dynamically from the CDN
  pdfjsLib = await nativeImport(PDFJS_URL);
  pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  return pdfjsLib;
}

async function extractPdf(file, onProgress) {
  const lib = await getPdfjs();
  const buf = await file.arrayBuffer();
  const pdf = await lib.getDocument({ data: buf }).promise;
  let out = "";
  const max = Math.min(pdf.numPages, 30); // cap pages for a prototype
  for (let i = 1; i <= max; i++) {
    onProgress && onProgress(`Reading page ${i}/${max}…`);
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    out += content.items.map((it) => it.str).join(" ") + "\n";
  }
  return out;
}

async function extractDocx(file) {
  if (!window.mammoth) await loadScript(MAMMOTH_URL);
  const buf = await file.arrayBuffer();
  const res = await window.mammoth.extractRawText({ arrayBuffer: buf });
  return res.value || "";
}

function extractText(file, onProgress) {
  const name = (file.name || "").toLowerCase();
  const type = file.type || "";

  if (name.endsWith(".pdf") || type === "application/pdf") {
    return extractPdf(file, onProgress);
  }
  if (name.endsWith(".docx") || type.includes("officedocument.wordprocessingml")) {
    return extractDocx(file);
  }
  if (type.startsWith("image/")) {
    return Promise.reject(new Error("Image OCR isn't supported in this offline prototype yet."));
  }
  // default: treat as plain text
  return file.text();
}

window.AITutorDoc = { extractText };
