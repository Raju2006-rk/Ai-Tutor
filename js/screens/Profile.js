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
    ? `${edu?.name} · ${pr.degree}${pr.branch ? " → " + pr.branch : ""}`
    : edu?.name;

  return (
    <div className="screen">
      <Header avatar="" title="Profile" sub="Your learning setup" />

      <div className="prof-head">
        <div className="av">👤</div>
        <div className="nm">{pr.name}</div>
        <div className="gl">{goal ? goal.emoji + " " + goal.text : ""}</div>
      </div>

      <div className="section-title">Learning</div>
      <div className="card">
        <div className="list-row"><span className="k">Learning</span><span className="v">{lang ? `${lang.flag} ${lang.name}` : "—"}</span></div>
        <div className="list-row"><span className="k">Level</span><span className="v">{cap(pr.level)}</span></div>
        <div className="list-row"><span className="k">Purpose</span><span className="v">{cap(pr.purpose)}</span></div>
        <div className="list-row"><span className="k">Education</span><span className="v">{eduLine}</span></div>
      </div>

      <div className="section-title">Preferences</div>
      <div className="card">
        <div className="list-row">
          <span className="k">🔊 Speak AI replies aloud</span>
          <div
            className={"toggle" + (state.prefs.voiceReplies ? " on" : "")}
            onClick={() => actions.setPref("voiceReplies", !state.prefs.voiceReplies)}
          ><i /></div>
        </div>
        <div className="list-row">
          <span className="k">🌐 My native language</span>
          <select
            value={state.prefs.nativeLanguage}
            onChange={(e) => actions.setPref("nativeLanguage", e.target.value)}
            style={selectStyle}
          >
            {D.LANGUAGES.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        </div>
      </div>

      <LLMSettings state={state} actions={actions} />

      <div className="section-title">Change Language</div>
      <div className="card">
        <div className="pills">
          {D.LANGUAGES.map((l) => (
            <button
              key={l.id}
              className={"pill" + (pr.learnLanguage === l.id ? " selected" : "")}
              onClick={() => actions.setProfile({ learnLanguage: l.id })}
            >
              {l.flag} {l.name}
            </button>
          ))}
        </div>
      </div>

      <div className="section-title">Level</div>
      <div className="card">
        <div className="pills">
          {D.LEVELS.map((l) => (
            <button
              key={l.id}
              className={"pill" + (pr.level === l.id ? " selected" : "")}
              onClick={() => actions.setProfile({ level: l.id })}
            >
              {l.emoji} {l.name}
            </button>
          ))}
        </div>
      </div>

      <div className="spacer-10" />
      <button
        className="btn ghost"
        onClick={() => { if (confirm("Reset all progress and onboarding?")) actions.reset(); }}
        style={{ color: "var(--red)", borderColor: "var(--red)" }}
      >
        Reset App
      </button>
      <div className="hint center">AI Tutor prototype · offline demo engine</div>
    </div>
  );
}

function LLMSettings({ state, actions }) {
  const cfg = state.prefs.llm;
  const [testing, setTesting] = React.useState(false);
  const [result, setResult] = React.useState(null);

  async function test() {
    setTesting(true); setResult(null);
    try {
      const res = await window.AITutorLLM.respond(
        "Say hello in one short sentence.",
        { profile: state.profile, prefs: state.prefs },
        cfg
      );
      setResult({ ok: true, msg: res.answer || res.text || "Connected! ✅" });
    } catch (e) {
      setResult({ ok: false, msg: e.message || "Request failed" });
    } finally { setTesting(false); }
  }

  return (
    <>
      <div className="section-title">AI Engine</div>
      <div className="card">
        <div className="list-row">
          <span className="k">🧠 Use real AI (LLM)</span>
          <div
            className={"toggle" + (cfg.enabled ? " on" : "")}
            onClick={() => actions.setLLM({ enabled: !cfg.enabled })}
          ><i /></div>
        </div>
        <div style={{ margin: "6px 0 12px" }}>
          <span className={"badge " + (window.AITutorLLM.isConfigured(cfg) ? "on" : "off")}>
            {window.AITutorLLM.isConfigured(cfg) ? "● Live LLM active" : "● Offline demo engine"}
          </span>
        </div>

        {cfg.enabled && (
          <>
            <div className="field">
              <label>API Base URL (OpenAI-compatible)</label>
              <input
                value={cfg.baseUrl}
                placeholder="https://api.openai.com/v1"
                onChange={(e) => actions.setLLM({ baseUrl: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Model</label>
              <input
                value={cfg.model}
                placeholder="gpt-4o-mini"
                onChange={(e) => actions.setLLM({ model: e.target.value })}
              />
            </div>
            <div className="field">
              <label>API Key</label>
              <input
                type="password"
                value={cfg.apiKey}
                placeholder="sk-…"
                onChange={(e) => actions.setLLM({ apiKey: e.target.value })}
              />
            </div>
            <button className="btn sm" onClick={test} disabled={testing || !cfg.apiKey}>
              {testing ? "Testing…" : "Test connection"}
            </button>
            {result && (
              <div className={"feedback " + (result.ok ? "ok" : "no")} style={{ marginTop: 10 }}>
                <div className="fh">{result.ok ? "✅ Connected" : "❌ Failed"}</div>
                {result.msg}
              </div>
            )}
            <div className="hint">
              Your key is stored only in this browser and sent directly to the provider.
              Default settings use Google Gemini (OpenAI-compatible). Also works with OpenAI,
              OpenRouter, Groq, or a local server (LM Studio/Ollama). Get a Gemini key free at
              aistudio.google.com. For production, proxy requests through your own backend.
            </div>
          </>
        )}
      </div>
    </>
  );
}

function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

const selectStyle = {
  marginLeft: "auto", background: "var(--card-2)", color: "var(--text)",
  border: "1px solid var(--line)", borderRadius: "8px", padding: "6px 10px", fontSize: "14px",
};

window.ProfileScreen = ProfileScreen;
