/* ============================================================
   app.js — PRE-COMPILED bundle (do not edit by hand).
   Generated from js/ with JSX compiled to React.createElement,
   so the browser needs NO Babel and makes ONE request.
   Regenerate with: ./build.sh
   ============================================================ */

/* ---------- 01_data.js ---------- */
(function(){
/* ============================================================
   data.js — static content: languages, levels, quizzes, goals
   Exposed on window.AITutorData
   ============================================================ */
const LANGUAGES = [
    { id: "en", name: "English", flag: "🇬🇧" },
    { id: "hi", name: "Hindi", flag: "🇮🇳" },
    { id: "te", name: "Telugu", flag: "🗣️" },
    { id: "ta", name: "Tamil", flag: "🗣️" },
    { id: "kn", name: "Kannada", flag: "🗣️" },
    { id: "mr", name: "Marathi", flag: "🗣️" },
];
const LEVELS = [
    { id: "beginner", name: "Beginner", emoji: "🌱", desc: "Just starting out" },
    { id: "intermediate", name: "Intermediate", emoji: "🌿", desc: "Know the basics" },
    { id: "advanced", name: "Advanced", emoji: "🌳", desc: "Want to polish" },
];
const PURPOSES = [
    { id: "student", name: "Student", emoji: "🎓", desc: "School / college learning" },
    { id: "job", name: "Job", emoji: "💼", desc: "Interview & career prep" },
    { id: "communication", name: "Communication", emoji: "🗣️", desc: "Speak with confidence" },
    { id: "exam", name: "Exam", emoji: "📝", desc: "Prepare for exams" },
    { id: "personal", name: "Personal Learning", emoji: "✨", desc: "Learn for myself" },
];
const EDUCATION = [
    { id: "school", name: "School" },
    { id: "diploma", name: "Diploma" },
    { id: "ug", name: "Undergraduate" },
    { id: "pg", name: "Postgraduate" },
    { id: "working", name: "Working Professional" },
];
const DEGREES = ["B.Tech", "BCA", "B.Sc", "B.Com", "BA", "MBA", "MCA", "Other"];
const GOALS = [
    { id: "speak", text: "Speak English confidently", emoji: "🗣️" },
    { id: "grammar", text: "Improve grammar", emoji: "✍️" },
    { id: "interview", text: "Prepare for interviews", emoji: "🎯" },
    { id: "workplace", text: "Improve workplace communication", emoji: "💼" },
    { id: "learnlang", text: "Learn a new Indian language", emoji: "🇮🇳" },
    { id: "academic", text: "Improve academic performance", emoji: "📚" },
    { id: "textbooks", text: "Understand my textbooks", emoji: "📖" },
    { id: "exams", text: "Prepare for exams", emoji: "📝" },
];
// Quick-action cards on Home
const HOME_ACTIONS = [
    { id: "talk", emoji: "🎤", name: "Talk to AI", desc: "Speak naturally", target: "chat", voice: true },
    { id: "learn", emoji: "📚", name: "Learn a Language", desc: "Vocab & grammar", target: "chat", prompt: "Teach me something new in my language." },
    { id: "upload", emoji: "📄", name: "Upload Document", desc: "Explain a PDF", target: "chat", prompt: "I want to upload a document to understand." },
    { id: "ask", emoji: "💬", name: "Ask a Question", desc: "Academic doubts", target: "chat" },
    { id: "practice", emoji: "🗣️", name: "Practice Talk", desc: "Conversation", target: "chat", prompt: "Let's practice a daily conversation." },
    { id: "grammar", emoji: "✍️", name: "Improve Grammar", desc: "Instant fixes", target: "chat", prompt: "Check my grammar: Hi, myself Rahul. Glad meeting you." },
    { id: "quiz", emoji: "📝", name: "Daily Quiz", desc: "Quick practice", target: "quiz" },
    { id: "goals", emoji: "🎯", name: "My Goals", desc: "Today's plan", target: "progress" },
];
// Daily quiz question bank
const QUIZ_BANK = [
    {
        type: "Grammar",
        q: "I didn't ____ it.",
        options: ["receive", "received", "receiving", "receives"],
        answer: 0,
        explain: "After 'didn't', the main verb stays in its base form: didn't + receive.",
    },
    {
        type: "Grammar",
        q: "She ____ to the market yesterday.",
        options: ["go", "goes", "went", "gone"],
        answer: 2,
        explain: "'Yesterday' means past tense. The past form of 'go' is 'went'.",
    },
    {
        type: "Vocabulary",
        q: "Choose the correct meaning of 'confident'.",
        options: ["Feeling unsure", "Feeling sure of yourself", "Feeling tired", "Feeling angry"],
        answer: 1,
        explain: "'Confident' means feeling sure about yourself and your abilities.",
    },
    {
        type: "Sentence formation",
        q: "Pick the correct sentence.",
        options: ["He don't like tea.", "He doesn't likes tea.", "He doesn't like tea.", "He not like tea."],
        answer: 2,
        explain: "With 'he/she/it' use 'doesn't' + base verb: He doesn't like tea.",
    },
    {
        type: "Grammar",
        q: "There ____ many students in the class.",
        options: ["is", "are", "was", "be"],
        answer: 1,
        explain: "'Students' is plural, so we use 'are': There are many students.",
    },
    {
        type: "Vocabulary",
        q: "Which word is the opposite of 'difficult'?",
        options: ["Hard", "Easy", "Tough", "Complex"],
        answer: 1,
        explain: "The opposite (antonym) of 'difficult' is 'easy'.",
    },
    {
        type: "Grammar",
        q: "I have ____ my homework.",
        options: ["finish", "finished", "finishing", "finishes"],
        answer: 1,
        explain: "After 'have', use the past participle: have finished (present perfect).",
    },
    {
        type: "Communication",
        q: "A polite way to start a self-introduction is:",
        options: ["Myself Rahul.", "I am Rahul, nice to meet you.", "Me Rahul here.", "Rahul am I."],
        answer: 1,
        explain: "'I am Rahul, nice to meet you.' is natural and polite. 'Myself Rahul' is a common mistake.",
    },
];
// Today's daily learning goals (templated per plan)
const DAILY_GOALS = [
    { id: "words", emoji: "🎯", text: "Learn 5 new words" },
    { id: "speak", emoji: "🎤", text: "Speak for 5 minutes" },
    { id: "questions", emoji: "📝", text: "Complete 5 quiz questions" },
    { id: "topic", emoji: "📚", text: "Study one topic" },
];
// Conversation starter chips in chat
const CHAT_SUGGESTIONS = [
    "Correct my grammar",
    "Teach me 5 new words",
    "Practice interview: Tell me about yourself",
    "Explain present perfect tense",
    "Translate 'How are you?' to Telugu",
    "Give me a daily conversation",
];
window.AITutorData = {
    LANGUAGES, LEVELS, PURPOSES, EDUCATION, DEGREES, GOALS,
    HOME_ACTIONS, QUIZ_BANK, DAILY_GOALS, CHAT_SUGGESTIONS,
};

})();

/* ---------- 02_store.js ---------- */
(function(){
/* ============================================================
   store.js — localStorage-backed app state + React hook
   Exposed on window.useStore / window.AITutorStore
   ============================================================ */
const STORAGE_KEY = "ai-tutor-state-v1";
const DEFAULT_STATE = {
    onboarded: false,
    profile: {
        name: "Learner",
        learnLanguage: "en", // language id
        level: "beginner",
        purpose: "communication",
        education: "ug",
        degree: "B.Tech",
        branch: "CSE",
        goalId: "speak",
        goalText: "Speak English confidently in 30 days.",
    },
    prefs: {
        voiceReplies: true, // speak AI answers aloud
        nativeLanguage: "te", // for translation help
        llm: {
            enabled: false,
            // Defaults target Google Gemini's OpenAI-compatible endpoint.
            // (Also works with OpenAI, OpenRouter, Groq, etc. — just change these.)
            baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai/",
            apiKey: "",
            model: "gemini-2.0-flash",
        },
    },
    progress: {
        streak: 1,
        longestStreak: 1,
        wordsLearned: 0,
        speakingMinutes: 0,
        quizzesCompleted: 0,
        quizCorrect: 0,
        quizTotal: 0,
        topicsStudied: 0,
        lastActiveDay: null, // yyyy-mm-dd
    },
    dailyGoals: {}, // { words:true, speak:false, ... }
    mistakes: {}, // { "past tense": 3 } — tracked grammar mistakes
};
function todayKey() {
    return new Date().toISOString().slice(0, 10);
}
function load() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw)
            return structuredClone(DEFAULT_STATE);
        const parsed = JSON.parse(raw);
        // shallow-merge to tolerate schema additions
        return {
            ...structuredClone(DEFAULT_STATE),
            ...parsed,
            profile: { ...DEFAULT_STATE.profile, ...(parsed.profile || {}) },
            prefs: {
                ...DEFAULT_STATE.prefs,
                ...(parsed.prefs || {}),
                llm: { ...DEFAULT_STATE.prefs.llm, ...((parsed.prefs || {}).llm || {}) },
            },
            progress: { ...DEFAULT_STATE.progress, ...(parsed.progress || {}) },
        };
    }
    catch (e) {
        console.warn("store load failed", e);
        return structuredClone(DEFAULT_STATE);
    }
}
function save(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    catch (e) {
        console.warn("store save failed", e);
    }
}
// --- Streak handling: bump when the user opens the app on a new day ---
function applyDailyStreak(state) {
    const today = todayKey();
    const last = state.progress.lastActiveDay;
    if (last === today)
        return state;
    const next = structuredClone(state);
    if (last) {
        const diff = Math.round((new Date(today) - new Date(last)) / 86400000);
        if (diff === 1)
            next.progress.streak += 1;
        else if (diff > 1)
            next.progress.streak = 1;
    }
    next.progress.longestStreak = Math.max(next.progress.longestStreak, next.progress.streak);
    next.progress.lastActiveDay = today;
    // reset daily goals for the new day
    next.dailyGoals = {};
    return next;
}
// React hook providing state + actions
function useStore() {
    const [state, setState] = React.useState(() => applyDailyStreak(load()));
    React.useEffect(() => { save(state); }, [state]);
    const update = React.useCallback((fn) => {
        setState((prev) => {
            const draft = structuredClone(prev);
            fn(draft);
            return draft;
        });
    }, []);
    const actions = React.useMemo(() => ({
        completeOnboarding: (profile) => update((s) => {
            s.onboarded = true;
            s.profile = { ...s.profile, ...profile };
            // seed goal text's language
        }),
        setProfile: (patch) => update((s) => { s.profile = { ...s.profile, ...patch }; }),
        setPref: (key, value) => update((s) => { s.prefs[key] = value; }),
        setLLM: (patch) => update((s) => { s.prefs.llm = { ...s.prefs.llm, ...patch }; }),
        toggleDailyGoal: (id, val) => update((s) => { s.dailyGoals[id] = val; }),
        addWords: (n) => update((s) => { s.progress.wordsLearned += n; s.dailyGoals.words = true; }),
        addSpeakingMinutes: (n) => update((s) => { s.progress.speakingMinutes += n; s.dailyGoals.speak = true; }),
        studyTopic: () => update((s) => { s.progress.topicsStudied += 1; s.dailyGoals.topic = true; }),
        recordQuiz: (correct, total) => update((s) => {
            s.progress.quizzesCompleted += 1;
            s.progress.quizCorrect += correct;
            s.progress.quizTotal += total;
            s.dailyGoals.questions = true;
        }),
        recordMistake: (tag) => update((s) => { s.mistakes[tag] = (s.mistakes[tag] || 0) + 1; }),
        reset: () => { localStorage.removeItem(STORAGE_KEY); setState(structuredClone(DEFAULT_STATE)); },
    }), [update]);
    return [state, actions];
}
window.AITutorStore = { STORAGE_KEY, DEFAULT_STATE, todayKey };
window.useStore = useStore;

})();

/* ---------- 03_speech.js ---------- */
(function(){
/* ============================================================
   speech.js — Web Speech API helpers (STT + TTS)
   Browser-native; no external API key required.
   Works best in Chrome / Edge. Gracefully degrades elsewhere.
   Exposed on window.AITutorSpeech
   ============================================================ */
// Map our language ids to BCP-47 codes used by the Web Speech API.
const SPEECH_LANG = {
    en: "en-IN",
    hi: "hi-IN",
    te: "te-IN",
    ta: "ta-IN",
    kn: "kn-IN",
    mr: "mr-IN",
};
const sttSupported = () => typeof window !== "undefined" &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);
const ttsSupported = () => typeof window !== "undefined" && "speechSynthesis" in window;
// ---- Speech to text -------------------------------------------------
// Returns a controller { start, stop } and calls callbacks.
function createRecognizer({ lang = "en", onResult, onEnd, onError } = {}) {
    if (!sttSupported()) {
        return {
            start: () => onError && onError("not-supported"),
            stop: () => { },
            supported: false,
        };
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = SPEECH_LANG[lang] || "en-IN";
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
        let finalText = "";
        let interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
            const t = e.results[i][0].transcript;
            if (e.results[i].isFinal)
                finalText += t;
            else
                interim += t;
        }
        onResult && onResult({ final: finalText, interim });
    };
    rec.onerror = (e) => onError && onError(e.error || "error");
    rec.onend = () => onEnd && onEnd();
    return {
        supported: true,
        start: () => { try {
            rec.start();
        }
        catch (_) { } },
        stop: () => { try {
            rec.stop();
        }
        catch (_) { } },
    };
}
// ---- Text to speech -------------------------------------------------
function speak(text, { lang = "en", rate = 0.98, pitch = 1 } = {}) {
    if (!ttsSupported() || !text)
        return;
    try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = SPEECH_LANG[lang] || "en-IN";
        u.rate = rate;
        u.pitch = pitch;
        // Prefer a voice matching the language if available
        const voices = window.speechSynthesis.getVoices();
        const match = voices.find((v) => v.lang === u.lang) ||
            voices.find((v) => v.lang && v.lang.startsWith((u.lang || "en").slice(0, 2)));
        if (match)
            u.voice = match;
        window.speechSynthesis.speak(u);
    }
    catch (e) { /* ignore */ }
}
function stopSpeaking() {
    if (ttsSupported())
        window.speechSynthesis.cancel();
}
window.AITutorSpeech = {
    SPEECH_LANG, sttSupported, ttsSupported,
    createRecognizer, speak, stopSpeaking,
};

})();

/* ---------- 04_docExtract.js ---------- */
(function(){
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
    if (pdfjsLib)
        return pdfjsLib;
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
    if (!window.mammoth)
        await loadScript(MAMMOTH_URL);
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

})();

/* ---------- 05_llmProvider.js ---------- */
(function(){
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
    if (extraSystem)
        msgs.push({ role: "system", content: extraSystem });
    msgs.push({ role: "user", content: userText });
    return msgs;
}
async function chat(cfg, messages) {
    var _a, _b, _c;
    const base = (cfg.baseUrl || "https://api.openai.com/v1").replace(/\/$/, "");
    const body = {
        model: cfg.model || "gpt-4o-mini",
        messages,
        temperature: 0.5,
    };
    // response_format forces JSON output on OpenAI, but some OpenAI-compatible
    // providers (e.g. older Gemini endpoints) reject it. The prompts already
    // demand JSON-only and parseJSON() is tolerant, so only request it when the
    // endpoint is OpenAI itself.
    if (/api\.openai\.com/.test(base)) {
        body.response_format = { type: "json_object" };
    }
    const res = await fetch(`${base}/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cfg.apiKey}`,
        },
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`LLM ${res.status}: ${txt.slice(0, 200)}`);
    }
    const json = await res.json();
    return ((_c = (_b = (_a = json.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) || "";
}
function parseJSON(raw) {
    if (!raw)
        return null;
    // strip accidental code fences
    const cleaned = raw.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    try {
        return JSON.parse(cleaned);
    }
    catch (_) {
        // try to extract the first {...} block
        const m = cleaned.match(/\{[\s\S]*\}/);
        if (m) {
            try {
                return JSON.parse(m[0]);
            }
            catch (__) { }
        }
        return null;
    }
}
const LLMProvider = {
    isConfigured(cfg) {
        return !!(cfg && cfg.enabled && cfg.apiKey && cfg.apiKey.trim());
    },
    async respond(text, ctx = {}, cfg) {
        var _a;
        const raw = await chat(cfg, buildMessages(text, ctx));
        const data = parseJSON(raw);
        if (!data)
            return { kind: "text", text: raw || "Sorry, I couldn't parse that." };
        // record mistakes for personalization
        if (data.kind === "grammar" && ((_a = data.correction) === null || _a === void 0 ? void 0 : _a.fixes) && ctx.onMistake) {
            data.correction.fixes.forEach((f) => f.tag && ctx.onMistake(f.tag));
        }
        return data;
    },
    async correctGrammar(text, ctx = {}, cfg) {
        var _a;
        const sys = "The user wants grammar correction. Respond with the 'grammar' JSON shape.";
        const raw = await chat(cfg, buildMessages(`Correct this and explain why: ${text}`, ctx, sys));
        const data = parseJSON(raw) || { kind: "text", text: raw };
        if (((_a = data.correction) === null || _a === void 0 ? void 0 : _a.fixes) && ctx.onMistake) {
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

})();

/* ---------- 06_aiEngine.js ---------- */
(function(){
/* ============================================================
   aiEngine.js — Pluggable AI layer for the AI Tutor.

   TODAY: ships an offline "mock tutor" that runs with no network —
   grammar correction, a small translation phrasebook, vocabulary,
   and structured academic answers.

   LATER: to use a real LLM, replace the bodies of `respond()` and
   `correctGrammar()` with fetch() calls to your provider. Keep the
   SAME return shapes and the UI needs no changes:

     respond()        -> { kind:'structured'|'text'|'grammar'|'eval',
                           text, answer, explanation, points[],
                           example, practice, correction, scores }

   Exposed on window.AITutorAI
   ============================================================ */
// ---------- small helpers ----------
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const langName = (id) => (window.AITutorData.LANGUAGES.find((l) => l.id === id) || {}).name || id;
// ---------- grammar correction (rule based) ----------
// Each rule: { re, fix(matchParts) -> {bad, good, why, tag} }
const GRAMMAR_RULES = [
    {
        re: /\bmyself\s+([A-Z][a-z]+)\b/,
        make: (m) => ({ bad: m[0], good: `I'm ${m[1]}`, why: "Use 'I'm <name>' to introduce yourself. 'Myself <name>' is a common mistake in Indian English.", tag: "self-introduction" }),
    },
    {
        re: /\bglad\s+meeting\s+you\b/i,
        make: () => ({ bad: "glad meeting you", good: "glad to meet you", why: "After 'glad' we use 'to + verb': glad to meet you.", tag: "infinitive after adjective" }),
    },
    {
        re: /\bdidn'?t\s+(\w+ed)\b/i,
        make: (m) => ({ bad: m[0], good: `didn't ${m[1].replace(/ed$/, "")}`, why: "After 'didn't', the main verb stays in base form (no -ed).", tag: "past tense" }),
    },
    {
        re: /\bhe\s+don'?t\b/i,
        make: () => ({ bad: "he don't", good: "he doesn't", why: "With he/she/it use 'doesn't', not 'don't'.", tag: "subject-verb agreement" }),
    },
    {
        re: /\bshe\s+don'?t\b/i,
        make: () => ({ bad: "she don't", good: "she doesn't", why: "With he/she/it use 'doesn't', not 'don't'.", tag: "subject-verb agreement" }),
    },
    {
        re: /\bi\s+am\s+having\s+(a|an|two|three|some)\b/i,
        make: (m) => ({ bad: m[0], good: `I have ${m[1]}`, why: "For possession use 'I have', not 'I am having'. 'Having' is for actions like eating.", tag: "stative verbs" }),
    },
    {
        re: /\bmore\s+better\b/i,
        make: () => ({ bad: "more better", good: "better", why: "'Better' is already comparative; don't add 'more'.", tag: "double comparative" }),
    },
    {
        re: /\bdiscuss\s+about\b/i,
        make: () => ({ bad: "discuss about", good: "discuss", why: "'Discuss' already means 'talk about', so no 'about' is needed.", tag: "redundant preposition" }),
    },
    {
        re: /\brevert\s+back\b/i,
        make: () => ({ bad: "revert back", good: "reply", why: "'Revert' means to go back; 'reply' is clearer and correct.", tag: "redundancy" }),
    },
    {
        re: /\bi\s+am\s+agree\b/i,
        make: () => ({ bad: "I am agree", good: "I agree", why: "'Agree' is a verb, so we don't use 'am' before it.", tag: "verb usage" }),
    },
];
function analyzeGrammar(text) {
    let corrected = text;
    const fixes = [];
    for (const rule of GRAMMAR_RULES) {
        const m = corrected.match(rule.re);
        if (m) {
            const f = rule.make(m);
            fixes.push(f);
            corrected = corrected.replace(rule.re, f.good);
        }
    }
    // Capitalize first letter & ensure end punctuation for the "good" version
    if (corrected.length) {
        corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
        if (!/[.?!]$/.test(corrected.trim()))
            corrected = corrected.trim() + ".";
    }
    return { fixes, corrected };
}
// ---------- tiny translation phrasebook (demo only) ----------
const PHRASEBOOK = {
    "how are you": { te: "మీరు ఎలా ఉన్నారు?", hi: "आप कैसे हैं?", ta: "நீங்கள் எப்படி இருக்கிறீர்கள்?", kn: "ನೀವು ಹೇಗಿದ್ದೀರಿ?", mr: "तुम्ही कसे आहात?" },
    "thank you": { te: "ధన్యవాదాలు", hi: "धन्यवाद", ta: "நன்றி", kn: "ಧನ್ಯವಾದ", mr: "धन्यवाद" },
    "good morning": { te: "శుభోదయం", hi: "सुप्रभात", ta: "காலை வணக்கம்", kn: "ಶುಭೋದಯ", mr: "शुभ सकाळ" },
    "my name is": { te: "నా పేరు ...", hi: "मेरा नाम ... है", ta: "என் பெயர் ...", kn: "ನನ್ನ ಹೆಸರು ...", mr: "माझे नाव ... आहे" },
    "i am learning english": { te: "నేను ఇంగ్లీష్ నేర్చుకుంటున్నాను", hi: "मैं अंग्रेज़ी सीख रहा हूँ", ta: "நான் ஆங்கிலம் கற்கிறேன்", kn: "ನಾನು ಇಂಗ್ಲಿಷ್ ಕಲಿಯುತ್ತಿದ್ದೇನೆ", mr: "मी इंग्रजी शिकत आहे" },
};
// ---------- vocabulary sets ----------
const VOCAB = [
    { word: "Confident", meaning: "Feeling sure about yourself", example: "She felt confident before the interview." },
    { word: "Improve", meaning: "To become better", example: "I want to improve my English." },
    { word: "Fluent", meaning: "Able to speak smoothly and easily", example: "He is fluent in three languages." },
    { word: "Opportunity", meaning: "A chance to do something", example: "This job is a great opportunity." },
    { word: "Encourage", meaning: "To give someone support and hope", example: "My teacher encourages me every day." },
    { word: "Pronounce", meaning: "To say a word correctly", example: "Can you pronounce this word for me?" },
    { word: "Grateful", meaning: "Feeling thankful", example: "I am grateful for your help." },
    { word: "Challenge", meaning: "A difficult task", example: "Speaking in public is a challenge for me." },
];
// ---------- academic / doubt solver (templated structured answer) ----------
function academicAnswer(topic, level) {
    const t = topic.replace(/\?$/, "").trim();
    return {
        kind: "structured",
        answer: `Here's a simple explanation of "${t}".`,
        explanation: `In simple words, ${t.toLowerCase()} is a concept you can understand step by step. Let's break it down so it's easy to remember${level ? ` for your ${level} level` : ""}.`,
        points: [
            `Start with the basic idea behind ${t.toLowerCase()}.`,
            "Understand the key terms one at a time.",
            "Connect it to a simple real-life example.",
            "Practice with one question to check your understanding.",
        ],
        example: `Think of ${t.toLowerCase()} like a daily activity you already do — breaking a big task into small steps.`,
        practice: `Can you explain ${t.toLowerCase()} back to me in one sentence?`,
    };
}
// ---------- interview evaluation (mock scoring) ----------
function evaluateSpeaking(text) {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const len = words.length;
    const base = Math.min(95, 60 + Math.round(len * 1.3));
    const jitter = (n) => Math.max(55, Math.min(97, base + n));
    return {
        kind: "eval",
        answer: "Here's your speaking evaluation 🎯",
        scores: {
            Grammar: jitter(2),
            Pronunciation: jitter(-4),
            Vocabulary: jitter(0),
            Confidence: jitter(len > 15 ? 6 : -6),
        },
        explanation: len < 8
            ? "Good start! Try to speak a little more — add why and an example so your answer feels complete."
            : "Nice answer! Keep your sentences clear and give one concrete example to stand out.",
        practice: "Want to try the next interview question: 'What are your strengths?'",
    };
}
// ---------- intent detection ----------
function detect(text) {
    const t = text.toLowerCase();
    if (/correct|grammar|check my|fix my|mistake/.test(t))
        return "grammar";
    if (/translate|in telugu|in hindi|in tamil|in kannada|in marathi|meaning in/.test(t))
        return "translate";
    if (/new word|vocab|vocabulary|teach me \d|5 words|words/.test(t))
        return "vocab";
    if (/tell me about yourself|interview|strengths|evaluate my|rate my/.test(t))
        return "interview";
    if (/conversation|practice talk|let's practice|daily conversation/.test(t))
        return "conversation";
    if (/upload|pdf|document|explain this/.test(t))
        return "document";
    if (/\?$|explain|what is|define|how does|solve/.test(t))
        return "academic";
    return "chat";
}
// ---------- the engine ----------
const AIEngine = {
    /**
     * Main entry. Returns a structured response object.
     * @param {string} text   user input
     * @param {object} ctx     { profile, prefs, onMistake }
     */
    async respond(text, ctx = {}) {
        await delay(500 + Math.random() * 500); // simulate thinking
        const profile = ctx.profile || {};
        const native = (ctx.prefs && ctx.prefs.nativeLanguage) || "te";
        const intent = detect(text);
        switch (intent) {
            case "grammar": {
                return this.correctGrammar(text.replace(/.*?:/, "").trim() || text, ctx);
            }
            case "translate": {
                const key = Object.keys(PHRASEBOOK).find((k) => text.toLowerCase().includes(k));
                const targetMatch = text.toLowerCase().match(/in (telugu|hindi|tamil|kannada|marathi)/);
                const targetId = targetMatch ? { telugu: "te", hindi: "hi", tamil: "ta", kannada: "kn", marathi: "mr" }[targetMatch[1]] : native;
                if (key) {
                    return {
                        kind: "structured",
                        answer: `Translation to ${langName(targetId)}:`,
                        explanation: `"${key}" → ${PHRASEBOOK[key][targetId] || "(demo phrasebook has limited entries)"}`,
                        points: ["Say it slowly first.", "Then repeat it at normal speed.", "Use it in a real sentence today."],
                        practice: "Want me to give you another useful phrase to translate?",
                    };
                }
                return {
                    kind: "text",
                    text: `In the full app I'll translate any text to ${langName(targetId)}. This offline demo knows a few phrases like "how are you", "thank you", "good morning". Try one of those!`,
                };
            }
            case "vocab": {
                const picks = [...VOCAB].sort(() => Math.random() - 0.5).slice(0, 5);
                ctx.onWords && ctx.onWords(picks.length);
                return {
                    kind: "structured",
                    answer: "Here are 5 new words 📚",
                    explanation: picks.map((v) => `• **${v.word}** — ${v.meaning}\n   e.g. ${v.example}`).join("\n"),
                    points: ["Read each word aloud.", "Make your own sentence with one word.", "Review them again tonight."],
                    practice: `Can you use "${picks[0].word}" in a sentence?`,
                };
            }
            case "interview": {
                // If it looks like an answer (longer text), evaluate it; else ask the question.
                if (text.trim().split(/\s+/).length > 6) {
                    ctx.onSpeak && ctx.onSpeak(1);
                    return evaluateSpeaking(text);
                }
                return {
                    kind: "text",
                    text: "Let's practice! 🎤\n\nInterviewer: \"Tell me about yourself.\"\n\nAnswer out loud (tap the mic) or type your answer, and I'll score your grammar, vocabulary, pronunciation and confidence.",
                };
            }
            case "conversation": {
                return {
                    kind: "structured",
                    answer: "Let's have a daily conversation! 🗣️",
                    explanation: "I'll be your partner. Here's the scene: we meet at a coffee shop.\n\nMe: \"Hi! It's a bit crowded today, isn't it?\"",
                    points: ["Reply naturally — don't worry about mistakes.", "I'll gently correct you if needed.", "Keep it going for 5 minutes."],
                    practice: "Your turn — how would you reply?",
                };
            }
            case "document": {
                return {
                    kind: "structured",
                    answer: "Document explanation 📄",
                    explanation: "In the full app you can upload a PDF, DOCX or image and I'll read it. Then I give you: a simple explanation, important points, key terms, and a short quiz. Here's the format I'd use:",
                    points: ["Simple Explanation — what the topic means in easy words.", "Important Points — the 3–4 things you must remember.", "Key Terms — term → simple meaning.", "Practice — a question to test yourself."],
                    practice: "Tell me the topic name and I'll explain it in this format right now.",
                };
            }
            case "academic": {
                return academicAnswer(text, profile.level);
            }
            default: {
                // friendly teacher chit-chat
                return {
                    kind: "text",
                    text: pickFriendly(text, profile),
                };
            }
        }
    },
    /**
     * Grammar correction with explanations. Records repeated mistakes.
     */
    async correctGrammar(text, ctx = {}) {
        await delay(400);
        const { fixes, corrected } = analyzeGrammar(text);
        if (fixes.length && ctx.onMistake)
            fixes.forEach((f) => ctx.onMistake(f.tag));
        if (!fixes.length) {
            return {
                kind: "grammar",
                answer: "Great job! 🎉",
                correction: { original: text, corrected, fixes: [] },
                explanation: "I didn't find any grammar mistakes in that sentence. Keep it up!",
                practice: "Want to try a slightly harder sentence?",
            };
        }
        return {
            kind: "grammar",
            answer: "Good try! Here are some small fixes ✍️",
            correction: { original: text, corrected, fixes },
            explanation: "I corrected it so you learn the 'why', not just the answer.",
            practice: "Now try writing one more sentence and I'll check it.",
        };
    },
    async evaluate(text, ctx = {}) {
        await delay(500);
        return evaluateSpeaking(text);
    },
    // ---- Document explanation (mock) ----
    async explainDocument(docText, ctx = {}) {
        await delay(700);
        const topics = extractTopics(docText);
        const preview = docText.replace(/\s+/g, " ").trim().slice(0, 220);
        return {
            kind: "structured",
            answer: "Here's a simple explanation of your document 📄",
            explanation: `I read about ${docText.trim().split(/\s+/).length} words. In simple terms, this material covers: ` +
                (topics.length ? topics.slice(0, 4).join(", ") : "the main ideas below") + ".\n\n" +
                `Preview: "${preview}${docText.length > 220 ? "…" : ""}"`,
            points: (topics.length ? topics.slice(0, 5) : [
                "Read it once fully to get the overall idea.",
                "Underline words you don't understand.",
                "Summarize each paragraph in one line.",
            ]).map((t) => `Understand: ${t}`),
            example: "Tip: after reading, try explaining it to a friend in your own words.",
            practice: "Want me to turn this into flashcards or a quick quiz?",
            _meta: { topics },
        };
    },
    // ---- Flashcards (mock) ----
    async makeFlashcards(source, ctx = {}) {
        await delay(600);
        const topics = extractTopics(source);
        let cards;
        if (topics.length >= 3) {
            cards = topics.slice(0, 8).map((t) => ({
                front: `What is "${t}"?`,
                back: `${t} — a key idea from your material. Explain it in one simple sentence.`,
            }));
        }
        else {
            // fall back to vocabulary flashcards
            cards = VOCAB.slice(0, 8).map((v) => ({ front: v.word, back: `${v.meaning}  •  e.g. ${v.example}` }));
        }
        return { kind: "flashcards", title: "Study Flashcards", cards };
    },
};
// Pull candidate "topics" from raw text: capitalized phrases, headings,
// numbered/bulleted list items. Good enough for an offline demo.
function extractTopics(text) {
    if (!text)
        return [];
    const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
    const found = new Set();
    for (const line of lines) {
        // headings / list items
        const m = line.match(/^(?:\d+[.)]\s*|[-•*]\s*)?([A-Z][A-Za-z][A-Za-z &/]{2,40})$/);
        if (m && line.length < 48)
            found.add(m[1].trim());
    }
    // also grab "Title Case" multi-word phrases
    const phrases = text.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})\b/g) || [];
    const counts = {};
    phrases.forEach((p) => { if (p.length > 3)
        counts[p] = (counts[p] || 0) + 1; });
    Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6).forEach(([p]) => found.add(p));
    return Array.from(found).slice(0, 10);
}
function pickFriendly(text, profile) {
    const name = langName(profile.learnLanguage || "en");
    const openers = [
        `Nice! I'm your AI Tutor and I'm here to help you learn ${name} and improve your communication. What would you like to do — practice speaking, check grammar, learn words, or ask a study question?`,
        "I'm listening! You can talk to me naturally. Try: 'Correct my grammar', 'Teach me 5 new words', or ask me any study question.",
        "Good! Tell me more, or pick something: grammar check ✍️, vocabulary 📚, conversation practice 🗣️, or an academic doubt 💬.",
    ];
    return openers[Math.floor(Math.random() * openers.length)];
}
window.AITutorAI = AIEngine;
/* ------------------------------------------------------------
   Engine facade — routes each call to the real LLM provider
   when it's configured in settings, otherwise the mock engine.
   Falls back to mock automatically if a live call throws.
   The UI should call window.AITutorEngine.*(..., llmCfg).
   ------------------------------------------------------------ */
const EngineFacade = {
    usingLLM(cfg) {
        return window.AITutorLLM && window.AITutorLLM.isConfigured(cfg);
    },
    async _route(method, args, cfg) {
        if (this.usingLLM(cfg)) {
            try {
                return await window.AITutorLLM[method](...args, cfg);
            }
            catch (e) {
                console.warn(`LLM ${method} failed, using offline engine:`, e.message);
                return { ...(await AIEngine[method](...args)), _fallback: e.message };
            }
        }
        return AIEngine[method](...args);
    },
    respond(text, ctx, cfg) { return this._route("respond", [text, ctx], cfg); },
    correctGrammar(text, ctx, cfg) { return this._route("correctGrammar", [text, ctx], cfg); },
    explainDocument(docText, ctx, cfg) { return this._route("explainDocument", [docText, ctx], cfg); },
    makeFlashcards(source, ctx, cfg) { return this._route("makeFlashcards", [source, ctx], cfg); },
};
window.AITutorEngine = EngineFacade;

})();

/* ---------- 07_UI.js ---------- */
(function(){
/* ============================================================
   UI.js — small shared presentational components
   Exposed on window.UI
   ============================================================ */
function Header({ avatar = "🤖", title, sub, right }) {
    return (React.createElement("div", { className: "header" },
        avatar && React.createElement("div", { className: "avatar" }, avatar),
        React.createElement("div", null,
            React.createElement("h1", null, title),
            sub && React.createElement("div", { className: "sub" }, sub)),
        React.createElement("div", { className: "spacer" }),
        right));
}
function StreakChip({ streak }) {
    return React.createElement("div", { className: "chip-streak" },
        "\uD83D\uDD25 ",
        streak,
        " day",
        streak === 1 ? "" : "s");
}
function ProgressBar({ value }) {
    return (React.createElement("div", { className: "progressbar" },
        React.createElement("span", { style: { width: `${Math.max(0, Math.min(100, value))}%` } })));
}
function Card({ title, children, style }) {
    return (React.createElement("div", { className: "card", style: style },
        title && React.createElement("h3", null, title),
        children));
}
// Renders a structured AI message body (answer/explanation/points/example/practice)
function StructuredAI({ data }) {
    if (!data)
        return null;
    if (data.kind === "grammar" && data.correction) {
        const { original, corrected, fixes } = data.correction;
        return (React.createElement("div", null,
            React.createElement("div", null, data.answer),
            fixes.length > 0 && (React.createElement("div", { className: "mb" }, fixes.map((f, i) => (React.createElement("div", { key: i, style: { marginBottom: 4 } },
                React.createElement("span", { className: "corr-bad" },
                    "\u274C ",
                    f.bad),
                React.createElement("div", { className: "hint" },
                    "\u21B3 ",
                    f.why)))))),
            React.createElement("div", { className: "mb" },
                React.createElement("span", { className: "corr-good" },
                    "\u2705 ",
                    corrected)),
            data.practice && React.createElement(Block, { title: "Practice" }, data.practice)));
    }
    if (data.kind === "eval" && data.scores) {
        return (React.createElement("div", null,
            React.createElement("div", null, data.answer),
            React.createElement("div", { className: "mb" }, Object.entries(data.scores).map(([k, v]) => (React.createElement("div", { key: k, style: { margin: "6px 0" } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13 } },
                    React.createElement("span", null, k),
                    React.createElement("span", null,
                        v,
                        "%")),
                React.createElement(ProgressBar, { value: v }))))),
            data.explanation && React.createElement(Block, { title: "Feedback" }, data.explanation),
            data.practice && React.createElement(Block, { title: "Next" }, data.practice)));
    }
    if (data.kind === "flashcards") {
        return React.createElement(Flashcards, { data: data });
    }
    if (data.kind === "structured") {
        return (React.createElement("div", null,
            data.answer && React.createElement("div", { style: { fontWeight: 700 } }, data.answer),
            data.explanation && React.createElement(Block, { title: "Simple Explanation" }, renderMarkdownish(data.explanation)),
            data.points && data.points.length > 0 && (React.createElement(Block, { title: "Important Points" },
                React.createElement("ul", null, data.points.map((p, i) => React.createElement("li", { key: i }, p))))),
            data.example && React.createElement(Block, { title: "Example" }, data.example),
            data.practice && React.createElement(Block, { title: "Practice Question" }, data.practice)));
    }
    // plain text
    return React.createElement("div", null, data.text);
}
function Flashcards({ data }) {
    const cards = data.cards || [];
    const [i, setI] = React.useState(0);
    const [flipped, setFlipped] = React.useState(false);
    if (!cards.length)
        return React.createElement("div", null, "I couldn't create flashcards from that. Try uploading a document first.");
    const card = cards[i];
    const go = (d) => { setFlipped(false); setI((n) => (n + d + cards.length) % cards.length); };
    return (React.createElement("div", null,
        React.createElement("div", { style: { fontWeight: 700, marginBottom: 8 } },
            "\uD83C\uDCCF ",
            data.title || "Flashcards",
            " (",
            i + 1,
            "/",
            cards.length,
            ")"),
        React.createElement("div", { className: "flashcard", onClick: () => setFlipped((f) => !f) },
            React.createElement("div", { className: "fc-face" },
                React.createElement("div", { className: "fc-label" }, flipped ? "ANSWER" : "QUESTION"),
                React.createElement("div", { className: "fc-text" }, flipped ? card.back : card.front),
                React.createElement("div", { className: "fc-hint" }, "tap to flip"))),
        React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
            React.createElement("button", { className: "btn ghost sm", onClick: () => go(-1) }, "\u2190 Prev"),
            React.createElement("button", { className: "btn sm", onClick: () => go(1) }, "Next \u2192"))));
}
function Block({ title, children }) {
    return (React.createElement("div", { className: "mb" },
        React.createElement("div", { className: "mb-title" }, title),
        React.createElement("div", null, children)));
}
// very small markdown-ish: **bold** and newlines
function renderMarkdownish(str) {
    if (typeof str !== "string")
        return str;
    const lines = str.split("\n");
    return lines.map((line, i) => {
        const parts = line.split(/(\*\*[^*]+\*\*)/g).map((seg, j) => /^\*\*[^*]+\*\*$/.test(seg)
            ? React.createElement("strong", { key: j }, seg.replace(/\*\*/g, ""))
            : React.createElement(React.Fragment, { key: j }, seg));
        return React.createElement("div", { key: i }, parts);
    });
}
window.UI = { Header, StreakChip, ProgressBar, Card, StructuredAI, Block, renderMarkdownish };

})();

/* ---------- 08_Nav.js ---------- */
(function(){
/* ============================================================
   Nav.js — bottom tab navigation
   Exposed on window.BottomNav
   ============================================================ */
const NAV_TABS = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "chat", icon: "🤖", label: "AI Tutor" },
    { id: "progress", icon: "📊", label: "Progress" },
    { id: "profile", icon: "👤", label: "Profile" },
];
function BottomNav({ active, onChange }) {
    return (React.createElement("nav", { className: "nav" }, NAV_TABS.map((t) => (React.createElement("button", { key: t.id, className: active === t.id ? "active" : "", onClick: () => onChange(t.id), "aria-label": t.label },
        React.createElement("span", { className: "ni" }, t.icon),
        React.createElement("span", null, t.label))))));
}
window.BottomNav = BottomNav;

})();

/* ---------- 09_Onboarding.js ---------- */
(function(){
/* ============================================================
   Onboarding.js — welcome → language → level → purpose →
   education → goal → plan
   Exposed on window.Onboarding
   ============================================================ */
function Onboarding({ onDone }) {
    const D = window.AITutorData;
    const [step, setStep] = React.useState(0);
    const [form, setForm] = React.useState({
        name: "",
        learnLanguage: "en",
        level: "",
        purpose: "",
        education: "ug",
        degree: "B.Tech",
        branch: "CSE",
        goalId: "",
    });
    const TOTAL = 7;
    const set = (patch) => setForm((f) => ({ ...f, ...patch }));
    const next = () => setStep((s) => Math.min(TOTAL - 1, s + 1));
    const back = () => setStep((s) => Math.max(0, s - 1));
    const finish = () => {
        const goal = D.GOALS.find((g) => g.id === form.goalId);
        onDone({
            ...form,
            name: form.name.trim() || "Learner",
            level: form.level || "beginner",
            purpose: form.purpose || "communication",
            goalId: form.goalId || "speak",
            goalText: goal ? goal.text : "Speak English confidently",
        });
    };
    return (React.createElement("div", { className: "onb" },
        React.createElement("div", { className: "top" },
            React.createElement("div", { className: "onb-steps" }, Array.from({ length: TOTAL }).map((_, i) => (React.createElement("i", { key: i, className: i <= step ? "on" : "" })))),
            step > 0 && React.createElement("button", { className: "back-link", onClick: back }, "\u2190 Back")),
        React.createElement("div", { className: "mid" },
            step === 0 && React.createElement(StepWelcome, { form: form, set: set }),
            step === 1 && React.createElement(StepLanguage, { form: form, set: set }),
            step === 2 && React.createElement(StepLevel, { form: form, set: set }),
            step === 3 && React.createElement(StepPurpose, { form: form, set: set }),
            step === 4 && React.createElement(StepEducation, { form: form, set: set }),
            step === 5 && React.createElement(StepGoal, { form: form, set: set }),
            step === 6 && React.createElement(StepPlan, { form: form })),
        React.createElement("div", { className: "bot" }, step < 6 ? (React.createElement("button", { className: "btn", onClick: next, disabled: !canAdvance(step, form) }, "Continue \u2192")) : (React.createElement("button", { className: "btn", onClick: finish }, "Start Learning \uD83D\uDE80")))));
}
function canAdvance(step, f) {
    if (step === 1)
        return !!f.learnLanguage;
    if (step === 2)
        return !!f.level;
    if (step === 3)
        return !!f.purpose;
    if (step === 5)
        return !!f.goalId;
    return true;
}
// ---- Steps ----
function StepWelcome({ form, set }) {
    return (React.createElement("div", null,
        React.createElement("div", { className: "hero-emoji" }, "\uD83E\uDD16"),
        React.createElement("h2", { className: "center" }, "Meet Your AI Tutor"),
        React.createElement("p", { className: "lead center" }, "Learn languages. Improve communication. Study smarter."),
        React.createElement("input", { className: "chat-input-plain", style: inputStyle, placeholder: "What should I call you?", value: form.name, onChange: (e) => set({ name: e.target.value }) }),
        React.createElement("div", { className: "hint center" }, "Tip: this prototype runs fully offline with a demo AI engine.")));
}
function StepLanguage({ form, set }) {
    const D = window.AITutorData;
    return (React.createElement("div", null,
        React.createElement("h2", null, "What do you want to learn?"),
        React.createElement("p", { className: "lead" }, "Pick a language to focus on."),
        React.createElement("div", { className: "options" }, D.LANGUAGES.map((l) => (React.createElement("button", { key: l.id, className: "option" + (form.learnLanguage === l.id ? " selected" : ""), onClick: () => set({ learnLanguage: l.id }) },
            React.createElement("span", { className: "opt-emoji" }, l.flag),
            " ",
            l.name))))));
}
function StepLevel({ form, set }) {
    const D = window.AITutorData;
    return (React.createElement("div", null,
        React.createElement("h2", null, "What's your level?"),
        React.createElement("p", { className: "lead" }, "I'll adjust how I explain things."),
        React.createElement("div", { className: "options" }, D.LEVELS.map((l) => (React.createElement("button", { key: l.id, className: "option" + (form.level === l.id ? " selected" : ""), onClick: () => set({ level: l.id }) },
            React.createElement("span", { className: "opt-emoji" }, l.emoji),
            React.createElement("div", null,
                React.createElement("div", { style: { fontWeight: 700 } }, l.name),
                React.createElement("div", { className: "hint", style: { margin: 0 } }, l.desc))))))));
}
function StepPurpose({ form, set }) {
    const D = window.AITutorData;
    return (React.createElement("div", null,
        React.createElement("h2", null, "Why are you learning?"),
        React.createElement("p", { className: "lead" }, "This helps me personalize your plan."),
        React.createElement("div", { className: "options" }, D.PURPOSES.map((p) => (React.createElement("button", { key: p.id, className: "option" + (form.purpose === p.id ? " selected" : ""), onClick: () => set({ purpose: p.id }) },
            React.createElement("span", { className: "opt-emoji" }, p.emoji),
            React.createElement("div", null,
                React.createElement("div", { style: { fontWeight: 700 } }, p.name),
                React.createElement("div", { className: "hint", style: { margin: 0 } }, p.desc))))))));
}
function StepEducation({ form, set }) {
    const D = window.AITutorData;
    const showDegree = form.education === "ug" || form.education === "pg";
    return (React.createElement("div", null,
        React.createElement("h2", null, "Your education"),
        React.createElement("p", { className: "lead" }, "So I can match my explanations to your level."),
        React.createElement("div", { className: "pills" }, D.EDUCATION.map((e) => (React.createElement("button", { key: e.id, className: "pill" + (form.education === e.id ? " selected" : ""), onClick: () => set({ education: e.id }) }, e.name)))),
        showDegree && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "section-title" }, "Degree"),
            React.createElement("div", { className: "pills" }, D.DEGREES.map((d) => (React.createElement("button", { key: d, className: "pill" + (form.degree === d ? " selected" : ""), onClick: () => set({ degree: d }) }, d)))),
            React.createElement("div", { className: "section-title" }, "Branch / Specialization"),
            React.createElement("input", { style: inputStyle, placeholder: "e.g. CSE \u2192 AI & ML", value: form.branch, onChange: (e) => set({ branch: e.target.value }) })))));
}
function StepGoal({ form, set }) {
    const D = window.AITutorData;
    return (React.createElement("div", null,
        React.createElement("h2", null, "Set your goal"),
        React.createElement("p", { className: "lead" }, "What do you want to achieve?"),
        React.createElement("div", { className: "options" }, D.GOALS.map((g) => (React.createElement("button", { key: g.id, className: "option" + (form.goalId === g.id ? " selected" : ""), onClick: () => set({ goalId: g.id }) },
            React.createElement("span", { className: "opt-emoji" }, g.emoji),
            " ",
            g.text))))));
}
function StepPlan({ form }) {
    const D = window.AITutorData;
    const lang = D.LANGUAGES.find((l) => l.id === form.learnLanguage);
    const goal = D.GOALS.find((g) => g.id === form.goalId);
    return (React.createElement("div", null,
        React.createElement("div", { className: "hero-emoji" }, "\uD83C\uDF89"),
        React.createElement("h2", { className: "center" }, "Your plan is ready!"),
        React.createElement("p", { className: "lead center" },
            lang && React.createElement(React.Fragment, null,
                lang.flag,
                " ",
                lang.name,
                " \u00B7 "),
            form.level || "beginner"),
        React.createElement("div", { className: "card" },
            React.createElement("h3", null, "\uD83C\uDFAF Your goal"),
            React.createElement("div", null, goal ? goal.text : "Speak confidently")),
        React.createElement("div", { className: "card" },
            React.createElement("h3", null, "\uD83D\uDCC5 Your Day 1"),
            React.createElement("div", { className: "goal-row" },
                React.createElement("span", { className: "tick" }, "\uD83C\uDFAF"),
                React.createElement("span", { className: "txt" }, "5 vocabulary words")),
            React.createElement("div", { className: "goal-row" },
                React.createElement("span", { className: "tick" }, "\uD83C\uDFA4"),
                React.createElement("span", { className: "txt" }, "5-minute conversation")),
            React.createElement("div", { className: "goal-row" },
                React.createElement("span", { className: "tick" }, "\u270D\uFE0F"),
                React.createElement("span", { className: "txt" }, "Grammar practice")),
            React.createElement("div", { className: "goal-row" },
                React.createElement("span", { className: "tick" }, "\uD83D\uDCDD"),
                React.createElement("span", { className: "txt" }, "Daily quiz")))));
}
const inputStyle = {
    width: "100%",
    background: "var(--card)",
    border: "1px solid var(--line)",
    color: "var(--text)",
    borderRadius: "12px",
    padding: "13px 16px",
    fontSize: "15px",
    outline: "none",
    marginBottom: "10px",
};
window.Onboarding = Onboarding;

})();

/* ---------- 10_Home.js ---------- */
(function(){
/* ============================================================
   Home.js — today's goal, streak, quick action cards
   Exposed on window.HomeScreen
   ============================================================ */
function HomeScreen({ state, actions, onNavigate }) {
    const D = window.AITutorData;
    const { Header, StreakChip, ProgressBar } = window.UI;
    const goals = D.DAILY_GOALS;
    const doneCount = goals.filter((g) => state.dailyGoals[g.id]).length;
    const pct = Math.round((doneCount / goals.length) * 100);
    const lang = D.LANGUAGES.find((l) => l.id === state.profile.learnLanguage);
    const handleAction = (a) => {
        if (a.target === "chat") {
            onNavigate("chat", { voice: a.voice, prompt: a.prompt });
        }
        else {
            onNavigate(a.target);
        }
    };
    return (React.createElement("div", { className: "screen" },
        React.createElement(Header, { avatar: "\uD83E\uDD16", title: `Hi ${state.profile.name} 👋`, sub: lang ? `Learning ${lang.name} · ${cap(state.profile.level)}` : "Let's learn today", right: React.createElement(StreakChip, { streak: state.progress.streak }) }),
        React.createElement("div", { className: "card" },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
                React.createElement("h3", { style: { margin: 0 } }, "\uD83C\uDFAF Today's Goal"),
                React.createElement("span", { style: { color: pct === 100 ? "var(--green)" : "var(--accent-2)", fontWeight: 800 } },
                    pct,
                    "%")),
            React.createElement("div", { style: { margin: "12px 0" } },
                React.createElement(ProgressBar, { value: pct })),
            goals.map((g) => {
                const done = !!state.dailyGoals[g.id];
                return (React.createElement("div", { className: "goal-row", key: g.id },
                    React.createElement("span", { className: "tick" + (done ? " done" : "") }, done ? "✓" : g.emoji),
                    React.createElement("span", { className: "txt" + (done ? " done" : "") }, g.text)));
            }),
            pct === 100 && (React.createElement("div", { className: "feedback ok", style: { marginTop: 10 } },
                React.createElement("div", { className: "fh" }, "\uD83C\uDF89 Daily Goal: 100% Complete!"),
                "Amazing consistency. Come back tomorrow to keep your streak alive."))),
        React.createElement("div", { className: "section-title" }, "Quick Actions"),
        React.createElement("div", { className: "grid" }, D.HOME_ACTIONS.map((a) => (React.createElement("button", { className: "action", key: a.id, onClick: () => handleAction(a) },
            React.createElement("span", { className: "emoji" }, a.emoji),
            React.createElement("span", { className: "name" }, a.name),
            React.createElement("span", { className: "desc" }, a.desc)))))));
}
function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
window.HomeScreen = HomeScreen;

})();

/* ---------- 11_Chat.js ---------- */
(function(){
/* ============================================================
   Chat.js — AI Tutor chat: text + voice, structured responses
   Exposed on window.ChatScreen
   ============================================================ */
function ChatScreen({ state, actions, initial }) {
    var _a;
    const D = window.AITutorData;
    const AI = window.AITutorEngine; // facade: real LLM if configured, else mock
    const SP = window.AITutorSpeech;
    const { StructuredAI } = window.UI;
    const llmCfg = state.prefs.llm;
    const [messages, setMessages] = React.useState(() => ([
        { id: 1, role: "ai", data: { kind: "text", text: `Hi ${state.profile.name}! I'm your AI Tutor. 🤖\n\nTalk to me by text or voice. Try "Correct my grammar", "Teach me 5 new words", or ask me any study question.` } },
    ]));
    const [input, setInput] = React.useState("");
    const [thinking, setThinking] = React.useState(false);
    const [listening, setListening] = React.useState(false);
    const recRef = React.useRef(null);
    const bodyRef = React.useRef(null);
    const sentInitial = React.useRef(false);
    const learnLang = state.profile.learnLanguage;
    // auto-scroll
    React.useEffect(() => {
        if (bodyRef.current)
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, [messages, thinking]);
    // handle an initial prompt / voice request passed from Home
    React.useEffect(() => {
        if (sentInitial.current || !initial)
            return;
        sentInitial.current = true;
        if (initial.prompt)
            send(initial.prompt);
        else if (initial.voice)
            setTimeout(() => startListening(), 350);
        // eslint-disable-next-line
    }, []);
    const ctx = {
        profile: state.profile,
        prefs: state.prefs,
        onMistake: (tag) => actions.recordMistake(tag),
        onWords: (n) => actions.addWords(n),
        onSpeak: (m) => actions.addSpeakingMinutes(m),
    };
    async function send(textArg) {
        const text = (typeof textArg === "string" ? textArg : input).trim();
        if (!text || thinking)
            return;
        setInput("");
        const userMsg = { id: Date.now(), role: "user", data: { kind: "text", text } };
        setMessages((m) => [...m, userMsg]);
        setThinking(true);
        try {
            const res = await AI.respond(text, ctx, llmCfg);
            const aiMsg = { id: Date.now() + 1, role: "ai", data: res };
            setMessages((m) => [...m, aiMsg]);
            // speak reply if enabled
            if (state.prefs.voiceReplies) {
                const toSay = res.text || res.answer || "";
                if (toSay)
                    SP.speak(stripMd(toSay), { lang: learnLang });
            }
        }
        catch (e) {
            setMessages((m) => [...m, { id: Date.now() + 2, role: "ai", data: { kind: "text", text: "Sorry, something went wrong. Please try again." } }]);
        }
        finally {
            setThinking(false);
        }
    }
    // ---- Document upload + explanation ----
    const fileRef = React.useRef(null);
    function pushAI(data) { setMessages((m) => [...m, { id: Date.now() + Math.random(), role: "ai", data }]); }
    function pushUser(text) { setMessages((m) => [...m, { id: Date.now() + Math.random(), role: "user", data: { kind: "text", text } }]); }
    async function onFile(e) {
        const file = e.target.files && e.target.files[0];
        e.target.value = ""; // allow re-selecting same file
        if (!file)
            return;
        pushUser(`📄 Uploaded: ${file.name}`);
        setThinking(true);
        try {
            const text = await window.AITutorDoc.extractText(file, (msg) => { });
            if (!text || !text.trim()) {
                pushAI({ kind: "text", text: "I couldn't read any text from that file. For scanned images, text extraction needs OCR (coming in a later phase). Try a text-based PDF, DOCX, or .txt file." });
                return;
            }
            // remember last doc so the user can ask for flashcards/quiz on it
            lastDoc.current = text;
            const res = await AI.explainDocument(text, ctx, llmCfg);
            pushAI(res);
            pushAI({ kind: "text", text: "Want me to make flashcards from this? Just say \"make flashcards\"." });
        }
        catch (err) {
            pushAI({ kind: "text", text: `Sorry, I couldn't process that file: ${err.message || err}` });
        }
        finally {
            setThinking(false);
        }
    }
    const lastDoc = React.useRef(null);
    // Intercept "make flashcards" to use the last uploaded doc (or vocab fallback)
    async function sendOrFlashcards(text) {
        if (/flashcard/i.test(text)) {
            pushUser(text);
            setInput("");
            setThinking(true);
            try {
                const res = await AI.makeFlashcards(lastDoc.current || text, ctx, llmCfg);
                pushAI(res);
            }
            catch (err) {
                pushAI({ kind: "text", text: `Couldn't make flashcards: ${err.message || err}` });
            }
            finally {
                setThinking(false);
            }
            return;
        }
        return send(text);
    }
    function startListening() {
        if (listening) {
            recRef.current && recRef.current.stop();
            return;
        }
        if (!SP.sttSupported()) {
            setMessages((m) => [...m, { id: Date.now(), role: "ai", data: { kind: "text", text: "🎤 Voice input isn't supported in this browser. Chrome or Edge work best. You can still type!" } }]);
            return;
        }
        const rec = SP.createRecognizer({
            lang: learnLang,
            onResult: ({ final, interim }) => { setInput(final || interim); },
            onEnd: () => {
                setListening(false);
                // auto-send whatever we captured
                setInput((cur) => { if (cur.trim())
                    send(cur); return ""; });
            },
            onError: (err) => {
                setListening(false);
                if (err === "not-allowed") {
                    setMessages((m) => [...m, { id: Date.now(), role: "ai", data: { kind: "text", text: "🎤 I need microphone permission. Please allow it and try again." } }]);
                }
            },
        });
        recRef.current = rec;
        setListening(true);
        rec.start();
    }
    return (React.createElement("div", { className: "chat-wrap" },
        React.createElement("div", { className: "chat-head" },
            React.createElement("span", { className: "av" }, "\uD83E\uDD16"),
            React.createElement("div", null,
                React.createElement("div", { className: "t" }, "AI Tutor"),
                React.createElement("div", { className: "s" },
                    "\u25CF online \u00B7 ", (_a = D.LANGUAGES.find(l => l.id === learnLang)) === null || _a === void 0 ? void 0 :
                    _a.name)),
            React.createElement("div", { style: { flex: 1 } }),
            React.createElement("button", { className: "icon-btn", title: state.prefs.voiceReplies ? "Voice replies on" : "Voice replies off", onClick: () => { actions.setPref("voiceReplies", !state.prefs.voiceReplies); SP.stopSpeaking(); } }, state.prefs.voiceReplies ? "🔊" : "🔈")),
        React.createElement("div", { className: "chat-body", ref: bodyRef },
            messages.map((m) => (React.createElement("div", { key: m.id, className: "msg " + m.role }, m.role === "ai" ? React.createElement(StructuredAI, { data: m.data }) : m.data.text))),
            thinking && (React.createElement("div", { className: "msg ai" },
                React.createElement("div", { className: "typing" },
                    React.createElement("i", null),
                    React.createElement("i", null),
                    React.createElement("i", null))))),
        React.createElement("div", { className: "quick-chips" },
            D.CHAT_SUGGESTIONS.map((s, i) => (React.createElement("button", { key: i, className: "pill", onClick: () => sendOrFlashcards(s) }, s))),
            React.createElement("button", { className: "pill", onClick: () => sendOrFlashcards("Make flashcards") }, "\uD83C\uDCCF Make flashcards")),
        React.createElement("input", { ref: fileRef, type: "file", accept: ".pdf,.txt,.md,.docx,text/*", style: { display: "none" }, onChange: onFile }),
        React.createElement("div", { className: "chat-input" },
            React.createElement("button", { className: "icon-btn", onClick: () => fileRef.current && fileRef.current.click(), title: "Upload a document (PDF, TXT, DOCX)" }, "\uD83D\uDCCE"),
            React.createElement("button", { className: "icon-btn mic" + (listening ? " on" : ""), onClick: startListening, title: "Speak" }, "\uD83C\uDFA4"),
            React.createElement("input", { placeholder: listening ? "Listening…" : "Type or speak a message…", value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => { if (e.key === "Enter")
                    sendOrFlashcards(input); } }),
            React.createElement("button", { className: "icon-btn send", onClick: () => sendOrFlashcards(input), title: "Send", disabled: thinking }, "\u27A4"))));
}
function stripMd(s) { return (s || "").replace(/\*\*/g, "").replace(/[•✅❌🎤🎯📚✍️🗣️📄💬🎉]/g, ""); }
window.ChatScreen = ChatScreen;

})();

/* ---------- 12_Quiz.js ---------- */
(function(){
/* ============================================================
   Quiz.js — Daily Quiz with instant feedback & explanations
   Exposed on window.QuizScreen
   ============================================================ */
function QuizScreen({ state, actions, onNavigate }) {
    const D = window.AITutorData;
    const { Header } = window.UI;
    // pick 5 random questions for the session
    const [questions] = React.useState(() => [...D.QUIZ_BANK].sort(() => Math.random() - 0.5).slice(0, 5));
    const [idx, setIdx] = React.useState(0);
    const [selected, setSelected] = React.useState(null);
    const [locked, setLocked] = React.useState(false);
    const [correctCount, setCorrectCount] = React.useState(0);
    const [done, setDone] = React.useState(false);
    const recorded = React.useRef(false);
    const q = questions[idx];
    const choose = (i) => {
        if (locked)
            return;
        setSelected(i);
        setLocked(true);
        if (i === q.answer)
            setCorrectCount((c) => c + 1);
    };
    const next = () => {
        if (idx + 1 >= questions.length) {
            setDone(true);
            if (!recorded.current) {
                recorded.current = true;
                actions.recordQuiz(correctCount, questions.length);
            }
        }
        else {
            setIdx((n) => n + 1);
            setSelected(null);
            setLocked(false);
        }
    };
    if (done) {
        const pct = Math.round((correctCount / questions.length) * 100);
        return (React.createElement("div", { className: "screen" },
            React.createElement(Header, { avatar: "\uD83D\uDCDD", title: "Quiz Complete", sub: "Great work today!" }),
            React.createElement("div", { className: "card center" },
                React.createElement("div", { style: { fontSize: 56 } }, pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"),
                React.createElement("div", { style: { fontSize: 34, fontWeight: 800, color: "var(--accent-2)" } },
                    correctCount,
                    "/",
                    questions.length),
                React.createElement("div", { className: "muted" },
                    "You scored ",
                    pct,
                    "%")),
            React.createElement("div", { className: "card" },
                React.createElement("div", { className: "goal-row" },
                    React.createElement("span", { className: "tick done" }, "\u2713"),
                    React.createElement("span", { className: "txt" }, "Daily quiz complete")),
                React.createElement("div", { className: "hint" }, "Your accuracy and quiz count were added to your progress.")),
            React.createElement("button", { className: "btn", onClick: () => onNavigate("home") }, "Back to Home"),
            React.createElement("div", { className: "spacer-10" }),
            React.createElement("button", { className: "btn ghost", onClick: () => onNavigate("progress") }, "See My Progress \uD83D\uDCCA")));
    }
    const isRight = selected === q.answer;
    return (React.createElement("div", { className: "screen" },
        React.createElement(Header, { avatar: "\uD83D\uDCDD", title: "Daily Quiz", sub: `${q.type} · Question ${idx + 1} of ${questions.length}` }),
        React.createElement("div", { className: "card" },
            React.createElement("div", { className: "progressbar", style: { marginBottom: 16 } },
                React.createElement("span", { style: { width: `${((idx) / questions.length) * 100}%` } })),
            React.createElement("div", { className: "quiz-q" }, q.q),
            React.createElement("div", { className: "options" }, q.options.map((opt, i) => {
                let cls = "option";
                if (locked) {
                    if (i === q.answer)
                        cls += " correct";
                    else if (i === selected)
                        cls += " wrong";
                }
                else if (i === selected)
                    cls += " selected";
                return (React.createElement("button", { key: i, className: cls, onClick: () => choose(i), disabled: locked },
                    React.createElement("span", { className: "opt-emoji" }, String.fromCharCode(65 + i)),
                    " ",
                    opt));
            })),
            locked && (React.createElement("div", { className: "feedback " + (isRight ? "ok" : "no") },
                React.createElement("div", { className: "fh" }, isRight ? "✅ Correct!" : "❌ Not quite"),
                q.explain))),
        locked && (React.createElement("button", { className: "btn", onClick: next }, idx + 1 >= questions.length ? "Finish Quiz" : "Next Question →"))));
}
window.QuizScreen = QuizScreen;

})();

/* ---------- 13_Progress.js ---------- */
(function(){
/* ============================================================
   Progress.js — streaks, stats, levels, goals, tracked mistakes
   Exposed on window.ProgressScreen
   ============================================================ */
function ProgressScreen({ state, actions }) {
    const D = window.AITutorData;
    const { Header, StreakChip, ProgressBar } = window.UI;
    const p = state.progress;
    const accuracy = p.quizTotal ? Math.round((p.quizCorrect / p.quizTotal) * 100) : 0;
    // Level unlocks based on streak + activity
    const score = p.streak * 2 + p.quizzesCompleted + Math.floor(p.wordsLearned / 2);
    const levels = [
        { id: "bronze", name: "Bronze", m: "🥉", need: 0 },
        { id: "silver", name: "Silver", m: "🥈", need: 10 },
        { id: "gold", name: "Gold", m: "🥇", need: 25 },
    ];
    const mistakes = Object.entries(state.mistakes || {}).sort((a, b) => b[1] - a[1]);
    const stats = [
        { v: p.streak, l: "Current streak 🔥", accent: true },
        { v: p.longestStreak, l: "Longest streak" },
        { v: p.wordsLearned, l: "Words learned 📚" },
        { v: p.speakingMinutes, l: "Speaking minutes 🎤" },
        { v: p.quizzesCompleted, l: "Quizzes completed 📝" },
        { v: `${accuracy}%`, l: "Quiz accuracy 🎯", accent: true },
    ];
    return (React.createElement("div", { className: "screen" },
        React.createElement(Header, { avatar: "\uD83D\uDCCA", title: "My Progress", sub: "Keep the momentum going!", right: React.createElement(StreakChip, { streak: p.streak }) }),
        React.createElement("div", { className: "section-title" }, "Level"),
        React.createElement("div", { className: "levels" }, levels.map((lv) => {
            const unlocked = score >= lv.need;
            return (React.createElement("div", { key: lv.id, className: "level" + (unlocked ? " unlocked" : "") },
                React.createElement("div", { className: "m" }, lv.m),
                React.createElement("div", { className: "n" }, lv.name),
                React.createElement("div", { className: "hint", style: { margin: 0 } }, unlocked ? "Unlocked" : `${lv.need} pts`)));
        })),
        React.createElement("div", { className: "section-title" }, "Your Stats"),
        React.createElement("div", { className: "stat-grid" }, stats.map((s, i) => (React.createElement("div", { className: "stat", key: i },
            React.createElement("div", { className: "v" + (s.accent ? " accent" : "") }, s.v),
            React.createElement("div", { className: "l" }, s.l))))),
        React.createElement("div", { className: "section-title" }, "Today's Goals"),
        React.createElement("div", { className: "card" }, D.DAILY_GOALS.map((g) => {
            const done = !!state.dailyGoals[g.id];
            return (React.createElement("div", { className: "goal-row", key: g.id },
                React.createElement("span", { className: "tick" + (done ? " done" : "") }, done ? "✓" : g.emoji),
                React.createElement("span", { className: "txt" + (done ? " done" : "") }, g.text)));
        })),
        mistakes.length > 0 && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "section-title" }, "Focus Areas"),
            React.createElement("div", { className: "card" },
                React.createElement("div", { className: "hint", style: { marginTop: 0, marginBottom: 10 } }, "I noticed repeated mistakes \u2014 I'll give you extra practice here."),
                mistakes.map(([tag, n]) => (React.createElement("div", { key: tag, style: { marginBottom: 10 } },
                    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 } },
                        React.createElement("span", { style: { textTransform: "capitalize" } }, tag),
                        React.createElement("span", { className: "muted" },
                            n,
                            "\u00D7")),
                    React.createElement(ProgressBar, { value: Math.min(100, n * 25) })))))))));
}
window.ProgressScreen = ProgressScreen;

})();

/* ---------- 14_Profile.js ---------- */
(function(){
/* ============================================================
   Profile.js — language, education, goals, preferences, settings
   Exposed on window.ProfileScreen
   ============================================================ */
function ProfileScreen({ state, actions }) {
    const D = window.AITutorData;
    const { Header } = window.UI;
    const pr = state.profile;
    const lang = D.LANGUAGES.find((l) => l.id === pr.learnLanguage);
    const native = D.LANGUAGES.find((l) => l.id === state.prefs.nativeLanguage);
    const edu = D.EDUCATION.find((e) => e.id === pr.education);
    const goal = D.GOALS.find((g) => g.id === pr.goalId);
    const eduLine = (pr.education === "ug" || pr.education === "pg")
        ? `${edu === null || edu === void 0 ? void 0 : edu.name} · ${pr.degree}${pr.branch ? " → " + pr.branch : ""}`
        : edu === null || edu === void 0 ? void 0 : edu.name;
    return (React.createElement("div", { className: "screen" },
        React.createElement(Header, { avatar: "", title: "Profile", sub: "Your learning setup" }),
        React.createElement("div", { className: "prof-head" },
            React.createElement("div", { className: "av" }, "\uD83D\uDC64"),
            React.createElement("div", { className: "nm" }, pr.name),
            React.createElement("div", { className: "gl" }, goal ? goal.emoji + " " + goal.text : "")),
        React.createElement("div", { className: "section-title" }, "Learning"),
        React.createElement("div", { className: "card" },
            React.createElement("div", { className: "list-row" },
                React.createElement("span", { className: "k" }, "Learning"),
                React.createElement("span", { className: "v" }, lang ? `${lang.flag} ${lang.name}` : "—")),
            React.createElement("div", { className: "list-row" },
                React.createElement("span", { className: "k" }, "Level"),
                React.createElement("span", { className: "v" }, cap(pr.level))),
            React.createElement("div", { className: "list-row" },
                React.createElement("span", { className: "k" }, "Purpose"),
                React.createElement("span", { className: "v" }, cap(pr.purpose))),
            React.createElement("div", { className: "list-row" },
                React.createElement("span", { className: "k" }, "Education"),
                React.createElement("span", { className: "v" }, eduLine))),
        React.createElement("div", { className: "section-title" }, "Preferences"),
        React.createElement("div", { className: "card" },
            React.createElement("div", { className: "list-row" },
                React.createElement("span", { className: "k" }, "\uD83D\uDD0A Speak AI replies aloud"),
                React.createElement("div", { className: "toggle" + (state.prefs.voiceReplies ? " on" : ""), onClick: () => actions.setPref("voiceReplies", !state.prefs.voiceReplies) },
                    React.createElement("i", null))),
            React.createElement("div", { className: "list-row" },
                React.createElement("span", { className: "k" }, "\uD83C\uDF10 My native language"),
                React.createElement("select", { value: state.prefs.nativeLanguage, onChange: (e) => actions.setPref("nativeLanguage", e.target.value), style: selectStyle }, D.LANGUAGES.map((l) => React.createElement("option", { key: l.id, value: l.id }, l.name))))),
        React.createElement(LLMSettings, { state: state, actions: actions }),
        React.createElement("div", { className: "section-title" }, "Change Language"),
        React.createElement("div", { className: "card" },
            React.createElement("div", { className: "pills" }, D.LANGUAGES.map((l) => (React.createElement("button", { key: l.id, className: "pill" + (pr.learnLanguage === l.id ? " selected" : ""), onClick: () => actions.setProfile({ learnLanguage: l.id }) },
                l.flag,
                " ",
                l.name))))),
        React.createElement("div", { className: "section-title" }, "Level"),
        React.createElement("div", { className: "card" },
            React.createElement("div", { className: "pills" }, D.LEVELS.map((l) => (React.createElement("button", { key: l.id, className: "pill" + (pr.level === l.id ? " selected" : ""), onClick: () => actions.setProfile({ level: l.id }) },
                l.emoji,
                " ",
                l.name))))),
        React.createElement("div", { className: "spacer-10" }),
        React.createElement("button", { className: "btn ghost", onClick: () => { if (confirm("Reset all progress and onboarding?"))
                actions.reset(); }, style: { color: "var(--red)", borderColor: "var(--red)" } }, "Reset App"),
        React.createElement("div", { className: "hint center" }, "AI Tutor prototype \u00B7 offline demo engine")));
}
function LLMSettings({ state, actions }) {
    const cfg = state.prefs.llm;
    const [testing, setTesting] = React.useState(false);
    const [result, setResult] = React.useState(null);
    async function test() {
        setTesting(true);
        setResult(null);
        try {
            const res = await window.AITutorLLM.respond("Say hello in one short sentence.", { profile: state.profile, prefs: state.prefs }, cfg);
            setResult({ ok: true, msg: res.answer || res.text || "Connected! ✅" });
        }
        catch (e) {
            setResult({ ok: false, msg: e.message || "Request failed" });
        }
        finally {
            setTesting(false);
        }
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "section-title" }, "AI Engine"),
        React.createElement("div", { className: "card" },
            React.createElement("div", { className: "list-row" },
                React.createElement("span", { className: "k" }, "\uD83E\uDDE0 Use real AI (LLM)"),
                React.createElement("div", { className: "toggle" + (cfg.enabled ? " on" : ""), onClick: () => actions.setLLM({ enabled: !cfg.enabled }) },
                    React.createElement("i", null))),
            React.createElement("div", { style: { margin: "6px 0 12px" } },
                React.createElement("span", { className: "badge " + (window.AITutorLLM.isConfigured(cfg) ? "on" : "off") }, window.AITutorLLM.isConfigured(cfg) ? "● Live LLM active" : "● Offline demo engine")),
            cfg.enabled && (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "API Base URL (OpenAI-compatible)"),
                    React.createElement("input", { value: cfg.baseUrl, placeholder: "https://api.openai.com/v1", onChange: (e) => actions.setLLM({ baseUrl: e.target.value }) })),
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "Model"),
                    React.createElement("input", { value: cfg.model, placeholder: "gpt-4o-mini", onChange: (e) => actions.setLLM({ model: e.target.value }) })),
                React.createElement("div", { className: "field" },
                    React.createElement("label", null, "API Key"),
                    React.createElement("input", { type: "password", value: cfg.apiKey, placeholder: "sk-\u2026", onChange: (e) => actions.setLLM({ apiKey: e.target.value }) })),
                React.createElement("button", { className: "btn sm", onClick: test, disabled: testing || !cfg.apiKey }, testing ? "Testing…" : "Test connection"),
                result && (React.createElement("div", { className: "feedback " + (result.ok ? "ok" : "no"), style: { marginTop: 10 } },
                    React.createElement("div", { className: "fh" }, result.ok ? "✅ Connected" : "❌ Failed"),
                    result.msg)),
                React.createElement("div", { className: "hint" }, "Your key is stored only in this browser and sent directly to the provider. Default settings use Google Gemini (OpenAI-compatible). Also works with OpenAI, OpenRouter, Groq, or a local server (LM Studio/Ollama). Get a Gemini key free at aistudio.google.com. For production, proxy requests through your own backend."))))));
}
function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
const selectStyle = {
    marginLeft: "auto", background: "var(--card-2)", color: "var(--text)",
    border: "1px solid var(--line)", borderRadius: "8px", padding: "6px 10px", fontSize: "14px",
};
window.ProfileScreen = ProfileScreen;

})();

/* ---------- 15_App.js ---------- */
(function(){
/* ============================================================
   App.js — root component: onboarding gate + tab routing
   Exposed on window.App
   ============================================================ */
function App() {
    const [state, actions] = window.useStore();
    const [tab, setTab] = React.useState("home");
    // extra payload passed to a screen (e.g. an initial chat prompt)
    const [routeParams, setRouteParams] = React.useState(null);
    const navigate = (target, params = null) => {
        setRouteParams(params);
        setTab(target);
    };
    // Not onboarded yet → show the flow
    if (!state.onboarded) {
        return React.createElement(window.Onboarding, { onDone: (profile) => { actions.completeOnboarding(profile); setTab("home"); } });
    }
    const chatIsFullScreen = tab === "chat";
    return (React.createElement("div", { className: "app" },
        tab === "home" && React.createElement(window.HomeScreen, { state: state, actions: actions, onNavigate: navigate }),
        tab === "chat" && React.createElement(window.ChatScreen, { key: routeParams ? JSON.stringify(routeParams) : "chat", state: state, actions: actions, initial: routeParams }),
        tab === "quiz" && React.createElement(window.QuizScreen, { state: state, actions: actions, onNavigate: navigate }),
        tab === "progress" && React.createElement(window.ProgressScreen, { state: state, actions: actions }),
        tab === "profile" && React.createElement(window.ProfileScreen, { state: state, actions: actions }),
        React.createElement(window.BottomNav, { active: tab === "quiz" ? "home" : tab, onChange: (t) => navigate(t) })));
}
window.App = App;

})();

/* ---------- mount ---------- */
(function(){
  ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(window.App));
})();
