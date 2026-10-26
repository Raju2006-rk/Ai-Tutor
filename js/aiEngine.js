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
    if (!/[.?!]$/.test(corrected.trim())) corrected = corrected.trim() + ".";
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
    explanation:
      len < 8
        ? "Good start! Try to speak a little more — add why and an example so your answer feels complete."
        : "Nice answer! Keep your sentences clear and give one concrete example to stand out.",
    practice: "Want to try the next interview question: 'What are your strengths?'",
  };
}

// ---------- intent detection ----------
function detect(text) {
  const t = text.toLowerCase();
  if (/correct|grammar|check my|fix my|mistake/.test(t)) return "grammar";
  if (/translate|in telugu|in hindi|in tamil|in kannada|in marathi|meaning in/.test(t)) return "translate";
  if (/new word|vocab|vocabulary|teach me \d|5 words|words/.test(t)) return "vocab";
  if (/tell me about yourself|interview|strengths|evaluate my|rate my/.test(t)) return "interview";
  if (/conversation|practice talk|let's practice|daily conversation/.test(t)) return "conversation";
  if (/upload|pdf|document|explain this/.test(t)) return "document";
  if (/\?$|explain|what is|define|how does|solve/.test(t)) return "academic";
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
    if (fixes.length && ctx.onMistake) fixes.forEach((f) => ctx.onMistake(f.tag));

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
      explanation:
        `I read about ${docText.trim().split(/\s+/).length} words. In simple terms, this material covers: ` +
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
    } else {
      // fall back to vocabulary flashcards
      cards = VOCAB.slice(0, 8).map((v) => ({ front: v.word, back: `${v.meaning}  •  e.g. ${v.example}` }));
    }
    return { kind: "flashcards", title: "Study Flashcards", cards };
  },
};

// Pull candidate "topics" from raw text: capitalized phrases, headings,
// numbered/bulleted list items. Good enough for an offline demo.
function extractTopics(text) {
  if (!text) return [];
  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const found = new Set();
  for (const line of lines) {
    // headings / list items
    const m = line.match(/^(?:\d+[.)]\s*|[-•*]\s*)?([A-Z][A-Za-z][A-Za-z &/]{2,40})$/);
    if (m && line.length < 48) found.add(m[1].trim());
  }
  // also grab "Title Case" multi-word phrases
  const phrases = text.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})\b/g) || [];
  const counts = {};
  phrases.forEach((p) => { if (p.length > 3) counts[p] = (counts[p] || 0) + 1; });
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
      } catch (e) {
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
