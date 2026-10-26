/* ============================================================
   llmProvider.js — REAL LLM provider (OpenAI-compatible)

   Implements the same return shapes as the mock engine so the UI
   needs no changes. Works with any OpenAI-compatible Chat Completions
   endpoint (OpenAI, OpenRouter, Groq, Together, local Ollama/LM Studio,
   Azure with the right baseUrl, etc.).

   Configuration lives in app settings (store.prefs.llm):
     { enabled, baseUrl, apiKey, model }

   SECURITY NOTE: the key is stored in the browser's localStorage and
   sent directly from the browser to the provider. That's fine for a
   personal prototype, but for production you should proxy requests
   through your own backend so the key is never exposed to the client.

   Exposed on window.AITutorLLM
   ============================================================ */

const SYSTEM_PROMPT = `You are "AI Tutor", a friendly, encouraging teacher for Indian students,
job seekers and working professionals learning English and Indian languages
(Hindi, Telugu, Tamil, Kannada, Marathi) plus academic subjects.

Rules:
- Use simple, clear English. Avoid complex jargon.
- Be warm and encouraging. Never make the learner feel bad about mistakes.
- When correcting grammar, show the wrong part, the fix, and WHY — so they learn.
- Adapt difficulty to the learner's level and education.
- Always answer as compact JSON ONLY (no markdown fences, no prose outside JSON).

Return JSON matching ONE of these shapes:

For a general/academic answer:
{"kind":"structured","answer":"<one-line summary>","explanation":"<simple explanation>",
 "points":["<point1>","<point2>"],"example":"<a simple example>","practice":"<one practice question>"}

For grammar correction:
{"kind":"grammar","answer":"<short encouraging line>",
 "correction":{"original":"<user text>","corrected":"<fixed text>",
   "fixes":[{"bad":"<wrong bit>","good":"<right bit>","why":"<why in simple words>","tag":"<short topic tag e.g. past tense>"}]},
 "explanation":"<short note>","practice":"<one practice question>"}

For speaking/interview evaluation:
{"kind":"eval","answer":"<short line>",
 "scores":{"Grammar":<0-100>,"Pronunciation":<0-100>,"Vocabulary":<0-100>,"Confidence":<0-100>},
 "explanation":"<feedback>","practice":"<next question>"}

Keep arrays short (3-5 items). Keep text concise.`;

function buildMessages(userText, ctx, extraSystem) {
  const p = ctx.profile || {};
  const persona = `Learner profile: name=${p.name}, learning=${p.learnLanguage}, level=${p.level}, ` +
    `purpose=${p.purpose}, education=${p.education} ${p.degree || ""} ${p.branch || ""}. ` +
    `Native language id=${(ctx.prefs && ctx.prefs.nativeLanguage) || "te"}.`;
  const msgs = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "system", content: persona },
  ];
  if (extraSystem) msgs.push({ role: "system", content: extraSystem });
  msgs.push({ role: "user", content: userText });
  return msgs;
}

async function chat(cfg, messages) {
  const base = (cfg.baseUrl || "https://api.openai.com/v1").replace(/\/$/, "");
  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cfg.apiKey}`,
    },
    body: JSON.stringify({
      model: cfg.model || "gpt-4o-mini",
      messages,
      temperature: 0.5,
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`LLM ${res.status}: ${txt.slice(0, 200)}`);
  }
  const json = await res.json();
  return json.choices?.[0]?.message?.content || "";
}

function parseJSON(raw) {
  if (!raw) return null;
  // strip accidental code fences
  const cleaned = raw.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  try { return JSON.parse(cleaned); }
  catch (_) {
    // try to extract the first {...} block
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (m) { try { return JSON.parse(m[0]); } catch (__) {} }
    return null;
  }
}

const LLMProvider = {
  isConfigured(cfg) {
    return !!(cfg && cfg.enabled && cfg.apiKey && cfg.apiKey.trim());
  },

  async respond(text, ctx = {}, cfg) {
    const raw = await chat(cfg, buildMessages(text, ctx));
    const data = parseJSON(raw);
    if (!data) return { kind: "text", text: raw || "Sorry, I couldn't parse that." };
    // record mistakes for personalization
    if (data.kind === "grammar" && data.correction?.fixes && ctx.onMistake) {
      data.correction.fixes.forEach((f) => f.tag && ctx.onMistake(f.tag));
    }
    return data;
  },

  async correctGrammar(text, ctx = {}, cfg) {
    const sys = "The user wants grammar correction. Respond with the 'grammar' JSON shape.";
    const raw = await chat(cfg, buildMessages(`Correct this and explain why: ${text}`, ctx, sys));
    const data = parseJSON(raw) || { kind: "text", text: raw };
    if (data.correction?.fixes && ctx.onMistake) {
      data.correction.fixes.forEach((f) => f.tag && ctx.onMistake(f.tag));
    }
    return data;
  },

  // Explain an uploaded document's extracted text.
  async explainDocument(docText, ctx = {}, cfg) {
    const sys = "The user uploaded a study document. Explain it simply using the 'structured' JSON shape. " +
      "In 'points' give the most important things to remember. Add key terms into the explanation as 'Term — meaning'.";
    const clipped = docText.slice(0, 12000); // keep prompt reasonable
    const raw = await chat(cfg, buildMessages(`Explain this study material for my level:\n\n${clipped}`, ctx, sys));
    return parseJSON(raw) || { kind: "text", text: raw };
  },

  // Generate flashcards from a topic or document text. Returns {cards:[{front,back}]}.
  async makeFlashcards(source, ctx = {}, cfg) {
    const sys = `Create study flashcards. Respond with JSON ONLY:
{"kind":"flashcards","title":"<short title>","cards":[{"front":"<question or term>","back":"<answer or meaning>"}]}
Make 6-10 concise cards suited to the learner's level.`;
    const clipped = (source || "").slice(0, 12000);
    const raw = await chat(cfg, buildMessages(`Make flashcards from this:\n\n${clipped}`, ctx, sys));
    return parseJSON(raw) || { kind: "flashcards", title: "Flashcards", cards: [] };
  },
};

window.AITutorLLM = LLMProvider;
