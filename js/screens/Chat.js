/* ============================================================
   Chat.js — AI Tutor chat: text + voice, structured responses
   Exposed on window.ChatScreen
   ============================================================ */

function ChatScreen({ state, actions, initial }) {
  const D = window.AITutorData;
  const AI = window.AITutorEngine;      // facade: real LLM if configured, else mock
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
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, thinking]);

  // handle an initial prompt / voice request passed from Home
  React.useEffect(() => {
    if (sentInitial.current || !initial) return;
    sentInitial.current = true;
    if (initial.prompt) send(initial.prompt);
    else if (initial.voice) setTimeout(() => startListening(), 350);
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
    if (!text || thinking) return;
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
        if (toSay) SP.speak(stripMd(toSay), { lang: learnLang });
      }
    } catch (e) {
      setMessages((m) => [...m, { id: Date.now() + 2, role: "ai", data: { kind: "text", text: "Sorry, something went wrong. Please try again." } }]);
    } finally {
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
    if (!file) return;
    pushUser(`📄 Uploaded: ${file.name}`);
    setThinking(true);
    try {
      const text = await window.AITutorDoc.extractText(file, (msg) => {});
      if (!text || !text.trim()) {
        pushAI({ kind: "text", text: "I couldn't read any text from that file. For scanned images, text extraction needs OCR (coming in a later phase). Try a text-based PDF, DOCX, or .txt file." });
        return;
      }
      // remember last doc so the user can ask for flashcards/quiz on it
      lastDoc.current = text;
      const res = await AI.explainDocument(text, ctx, llmCfg);
      pushAI(res);
      pushAI({ kind: "text", text: "Want me to make flashcards from this? Just say \"make flashcards\"." });
    } catch (err) {
      pushAI({ kind: "text", text: `Sorry, I couldn't process that file: ${err.message || err}` });
    } finally {
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
      } catch (err) {
        pushAI({ kind: "text", text: `Couldn't make flashcards: ${err.message || err}` });
      } finally { setThinking(false); }
      return;
    }
    return send(text);
  }

  function startListening() {
    if (listening) { recRef.current && recRef.current.stop(); return; }
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
        setInput((cur) => { if (cur.trim()) send(cur); return ""; });
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

  return (
    <div className="chat-wrap">
      <div className="chat-head">
        <span className="av">🤖</span>
        <div>
          <div className="t">AI Tutor</div>
          <div className="s">● online · {D.LANGUAGES.find(l => l.id === learnLang)?.name}</div>
        </div>
        <div style={{ flex: 1 }} />
        <button
          className="icon-btn"
          title={state.prefs.voiceReplies ? "Voice replies on" : "Voice replies off"}
          onClick={() => { actions.setPref("voiceReplies", !state.prefs.voiceReplies); SP.stopSpeaking(); }}
        >
          {state.prefs.voiceReplies ? "🔊" : "🔈"}
        </button>
      </div>

      <div className="chat-body" ref={bodyRef}>
        {messages.map((m) => (
          <div key={m.id} className={"msg " + m.role}>
            {m.role === "ai" ? <StructuredAI data={m.data} /> : m.data.text}
          </div>
        ))}
        {thinking && (
          <div className="msg ai">
            <div className="typing"><i></i><i></i><i></i></div>
          </div>
        )}
      </div>

      <div className="quick-chips">
        {D.CHAT_SUGGESTIONS.map((s, i) => (
          <button key={i} className="pill" onClick={() => sendOrFlashcards(s)}>{s}</button>
        ))}
        <button className="pill" onClick={() => sendOrFlashcards("Make flashcards")}>🃏 Make flashcards</button>
      </div>

      <input ref={fileRef} type="file" accept=".pdf,.txt,.md,.docx,text/*" style={{ display: "none" }} onChange={onFile} />

      <div className="chat-input">
        <button
          className="icon-btn"
          onClick={() => fileRef.current && fileRef.current.click()}
          title="Upload a document (PDF, TXT, DOCX)"
        >📎</button>
        <button
          className={"icon-btn mic" + (listening ? " on" : "")}
          onClick={startListening}
          title="Speak"
        >🎤</button>
        <input
          placeholder={listening ? "Listening…" : "Type or speak a message…"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") sendOrFlashcards(input); }}
        />
        <button className="icon-btn send" onClick={() => sendOrFlashcards(input)} title="Send" disabled={thinking}>➤</button>
      </div>
    </div>
  );
}

function stripMd(s) { return (s || "").replace(/\*\*/g, "").replace(/[•✅❌🎤🎯📚✍️🗣️📄💬🎉]/g, ""); }

window.ChatScreen = ChatScreen;
