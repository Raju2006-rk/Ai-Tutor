/* ============================================================
   store.js — localStorage-backed app state + React hook
   Exposed on window.useStore / window.AITutorStore
   ============================================================ */

const STORAGE_KEY = "ai-tutor-state-v1";

const DEFAULT_STATE = {
  onboarded: false,
  profile: {
    name: "Learner",
    learnLanguage: "en",     // language id
    level: "beginner",
    purpose: "communication",
    education: "ug",
    degree: "B.Tech",
    branch: "CSE",
    goalId: "speak",
    goalText: "Speak English confidently in 30 days.",
  },
  prefs: {
    voiceReplies: true,      // speak AI answers aloud
    nativeLanguage: "te",    // for translation help
    llm: {                   // real LLM provider (optional; mock used when disabled)
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
    lastActiveDay: null,     // yyyy-mm-dd
  },
  dailyGoals: {},            // { words:true, speak:false, ... }
  mistakes: {},              // { "past tense": 3 } — tracked grammar mistakes
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
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
  } catch (e) {
    console.warn("store load failed", e);
    return structuredClone(DEFAULT_STATE);
  }
}

function save(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch (e) { console.warn("store save failed", e); }
}

// --- Streak handling: bump when the user opens the app on a new day ---
function applyDailyStreak(state) {
  const today = todayKey();
  const last = state.progress.lastActiveDay;
  if (last === today) return state;

  const next = structuredClone(state);
  if (last) {
    const diff = Math.round((new Date(today) - new Date(last)) / 86400000);
    if (diff === 1) next.progress.streak += 1;
    else if (diff > 1) next.progress.streak = 1;
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
