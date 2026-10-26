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
