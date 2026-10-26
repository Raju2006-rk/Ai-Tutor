# AI Tutor — Web Prototype

> **Learn. Speak. Understand. Improve — with your AI Tutor.**

A build-free, browser-based prototype of the **AI Tutor** language, communication & education app
described in the product PRD. It implements the Phase‑1 MVP core experience as a clickable,
runnable web app.

## What this is (and isn't)

This is a **working front-end prototype**, not the production mobile app. It was built in a sandbox
with **no external network access**, so it:

- Runs **build-free** in any modern browser — React is loaded from a CDN, JSX is compiled in-browser
  with Babel Standalone. No `npm install` required.
- Uses a **pluggable AI service layer** (`js/aiEngine.js`). Today it ships an **offline mock tutor**
  (grammar correction, structured answers, quiz logic). To use a real LLM, implement the same
  interface in `js/aiEngine.js` and plug in your API key — nothing else changes.
- Uses the browser-native **Web Speech API** for voice (speech-to-text + text-to-speech) where the
  browser supports it (Chrome/Edge work best). No external key needed.

## Features implemented

- **Onboarding flow** — welcome → learn language → level → purpose → education → goal → plan
- **Home** — today's goal, streak, quick-action cards
- **AI Tutor chat** — text + voice, structured responses, grammar correction
- **📄 Document upload + explanation** — upload a **PDF / DOCX / TXT**; text is extracted in the
  browser (pdf.js / mammoth), then the tutor explains it (simple explanation, key points, practice)
- **🃏 Flashcards** — generate flip-cards from an uploaded document or from vocabulary
- **Daily Quiz** — multiple choice with instant feedback & explanations
- **Progress** — streaks, words learned, quiz accuracy, levels (Bronze/Silver/Gold), focus areas
- **Profile** — language, education, goals, preferences
- **🧠 Pluggable real LLM** — turn on "Use real AI" in Profile and enter an OpenAI-compatible
  endpoint + key to drive every feature with a live model (see below)
- Bottom tab navigation (Home / AI Tutor / Progress / Profile)
- State persisted in `localStorage`

## Using a real AI model

By default the app runs a fully **offline mock tutor** — no key needed. To use a real LLM:

1. Go to **Profile → AI Engine** and toggle **Use real AI (LLM)** on.
2. Enter an **OpenAI-compatible** Base URL, model, and API key, then **Test connection**.
   - OpenAI: `https://api.openai.com/v1`, model e.g. `gpt-4o-mini`
   - Also works with OpenRouter, Groq, Together, or a local server (LM Studio / Ollama).
3. Chat, grammar correction, document explanation and flashcards now use the live model.

The provider code is in `js/llmProvider.js`. It calls `POST {baseUrl}/chat/completions` and expects
the model to return the app's structured JSON shapes (prompts enforce this). If a live call fails,
the app automatically falls back to the offline engine.

> **Security:** the key lives only in your browser's `localStorage` and is sent directly to the
> provider. For production, proxy requests through your own backend so the key is never exposed.

## How to run

**Option A — open locally**

Because browsers block ES modules and the Web Speech API over the `file://` protocol, serve the
folder over HTTP:

```bash
# Python (any version)
python3 -m http.server 8000
# then open http://localhost:8000
```

**Option B — GitHub Pages**

Push to GitHub and enable Pages for the repo root; open the published URL.

> Best experienced in Chrome or Edge (for voice features). Resize your browser to a phone width,
> or use device toolbar in dev tools, to see it as a mobile app.

## Project structure

```
index.html          # Entry point, loads React/Babel from CDN
styles.css          # Dark theme, purple accent, mobile-first
js/
  data.js           # Static content: languages, quizzes, lessons, goals
  store.js          # localStorage-backed app state
  speech.js         # Web Speech API helpers (STT + TTS)
  docExtract.js     # Client-side PDF/DOCX/TXT text extraction
  llmProvider.js    # Real LLM provider (OpenAI-compatible)
  aiEngine.js       # Offline mock engine + facade that routes mock vs. LLM
  components/       # UI components (incl. flashcards, structured renderer)
  screens/          # Full screens (onboarding, home, chat, quiz, progress, profile)
  App.js            # Root component + routing
```
