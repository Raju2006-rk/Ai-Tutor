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

const sttSupported = () =>
  typeof window !== "undefined" &&
  !!(window.SpeechRecognition || window.webkitSpeechRecognition);

const ttsSupported = () =>
  typeof window !== "undefined" && "speechSynthesis" in window;

// ---- Speech to text -------------------------------------------------
// Returns a controller { start, stop } and calls callbacks.
function createRecognizer({ lang = "en", onResult, onEnd, onError } = {}) {
  if (!sttSupported()) {
    return {
      start: () => onError && onError("not-supported"),
      stop: () => {},
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
      if (e.results[i].isFinal) finalText += t;
      else interim += t;
    }
    onResult && onResult({ final: finalText, interim });
  };
  rec.onerror = (e) => onError && onError(e.error || "error");
  rec.onend = () => onEnd && onEnd();

  return {
    supported: true,
    start: () => { try { rec.start(); } catch (_) {} },
    stop: () => { try { rec.stop(); } catch (_) {} },
  };
}

// ---- Text to speech -------------------------------------------------
function speak(text, { lang = "en", rate = 0.98, pitch = 1 } = {}) {
  if (!ttsSupported() || !text) return;
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
    if (match) u.voice = match;
    window.speechSynthesis.speak(u);
  } catch (e) { /* ignore */ }
}

function stopSpeaking() {
  if (ttsSupported()) window.speechSynthesis.cancel();
}

window.AITutorSpeech = {
  SPEECH_LANG, sttSupported, ttsSupported,
  createRecognizer, speak, stopSpeaking,
};
