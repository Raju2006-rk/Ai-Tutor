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

  return (
    <div className="onb">
      <div className="top">
        <div className="onb-steps">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <i key={i} className={i <= step ? "on" : ""} />
          ))}
        </div>
        {step > 0 && <button className="back-link" onClick={back}>← Back</button>}
      </div>

      <div className="mid">
        {step === 0 && <StepWelcome form={form} set={set} />}
        {step === 1 && <StepLanguage form={form} set={set} />}
        {step === 2 && <StepLevel form={form} set={set} />}
        {step === 3 && <StepPurpose form={form} set={set} />}
        {step === 4 && <StepEducation form={form} set={set} />}
        {step === 5 && <StepGoal form={form} set={set} />}
        {step === 6 && <StepPlan form={form} />}
      </div>

      <div className="bot">
        {step < 6 ? (
          <button className="btn" onClick={next} disabled={!canAdvance(step, form)}>
            Continue →
          </button>
        ) : (
          <button className="btn" onClick={finish}>Start Learning 🚀</button>
        )}
      </div>
    </div>
  );
}

function canAdvance(step, f) {
  if (step === 1) return !!f.learnLanguage;
  if (step === 2) return !!f.level;
  if (step === 3) return !!f.purpose;
  if (step === 5) return !!f.goalId;
  return true;
}

// ---- Steps ----
function StepWelcome({ form, set }) {
  return (
    <div>
      <div className="hero-emoji">🤖</div>
      <h2 className="center">Meet Your AI Tutor</h2>
      <p className="lead center">Learn languages. Improve communication. Study smarter.</p>
      <input
        className="chat-input-plain"
        style={inputStyle}
        placeholder="What should I call you?"
        value={form.name}
        onChange={(e) => set({ name: e.target.value })}
      />
      <div className="hint center">Tip: this prototype runs fully offline with a demo AI engine.</div>
    </div>
  );
}

function StepLanguage({ form, set }) {
  const D = window.AITutorData;
  return (
    <div>
      <h2>What do you want to learn?</h2>
      <p className="lead">Pick a language to focus on.</p>
      <div className="options">
        {D.LANGUAGES.map((l) => (
          <button
            key={l.id}
            className={"option" + (form.learnLanguage === l.id ? " selected" : "")}
            onClick={() => set({ learnLanguage: l.id })}
          >
            <span className="opt-emoji">{l.flag}</span> {l.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepLevel({ form, set }) {
  const D = window.AITutorData;
  return (
    <div>
      <h2>What's your level?</h2>
      <p className="lead">I'll adjust how I explain things.</p>
      <div className="options">
        {D.LEVELS.map((l) => (
          <button
            key={l.id}
            className={"option" + (form.level === l.id ? " selected" : "")}
            onClick={() => set({ level: l.id })}
          >
            <span className="opt-emoji">{l.emoji}</span>
            <div>
              <div style={{ fontWeight: 700 }}>{l.name}</div>
              <div className="hint" style={{ margin: 0 }}>{l.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepPurpose({ form, set }) {
  const D = window.AITutorData;
  return (
    <div>
      <h2>Why are you learning?</h2>
      <p className="lead">This helps me personalize your plan.</p>
      <div className="options">
        {D.PURPOSES.map((p) => (
          <button
            key={p.id}
            className={"option" + (form.purpose === p.id ? " selected" : "")}
            onClick={() => set({ purpose: p.id })}
          >
            <span className="opt-emoji">{p.emoji}</span>
            <div>
              <div style={{ fontWeight: 700 }}>{p.name}</div>
              <div className="hint" style={{ margin: 0 }}>{p.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepEducation({ form, set }) {
  const D = window.AITutorData;
  const showDegree = form.education === "ug" || form.education === "pg";
  return (
    <div>
      <h2>Your education</h2>
      <p className="lead">So I can match my explanations to your level.</p>
      <div className="pills">
        {D.EDUCATION.map((e) => (
          <button
            key={e.id}
            className={"pill" + (form.education === e.id ? " selected" : "")}
            onClick={() => set({ education: e.id })}
          >
            {e.name}
          </button>
        ))}
      </div>

      {showDegree && (
        <>
          <div className="section-title">Degree</div>
          <div className="pills">
            {D.DEGREES.map((d) => (
              <button
                key={d}
                className={"pill" + (form.degree === d ? " selected" : "")}
                onClick={() => set({ degree: d })}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="section-title">Branch / Specialization</div>
          <input
            style={inputStyle}
            placeholder="e.g. CSE → AI & ML"
            value={form.branch}
            onChange={(e) => set({ branch: e.target.value })}
          />
        </>
      )}
    </div>
  );
}

function StepGoal({ form, set }) {
  const D = window.AITutorData;
  return (
    <div>
      <h2>Set your goal</h2>
      <p className="lead">What do you want to achieve?</p>
      <div className="options">
        {D.GOALS.map((g) => (
          <button
            key={g.id}
            className={"option" + (form.goalId === g.id ? " selected" : "")}
            onClick={() => set({ goalId: g.id })}
          >
            <span className="opt-emoji">{g.emoji}</span> {g.text}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepPlan({ form }) {
  const D = window.AITutorData;
  const lang = D.LANGUAGES.find((l) => l.id === form.learnLanguage);
  const goal = D.GOALS.find((g) => g.id === form.goalId);
  return (
    <div>
      <div className="hero-emoji">🎉</div>
      <h2 className="center">Your plan is ready!</h2>
      <p className="lead center">
        {lang && <>{lang.flag} {lang.name} · </>}
        {form.level || "beginner"}
      </p>
      <div className="card">
        <h3>🎯 Your goal</h3>
        <div>{goal ? goal.text : "Speak confidently"}</div>
      </div>
      <div className="card">
        <h3>📅 Your Day 1</h3>
        <div className="goal-row"><span className="tick">🎯</span><span className="txt">5 vocabulary words</span></div>
        <div className="goal-row"><span className="tick">🎤</span><span className="txt">5-minute conversation</span></div>
        <div className="goal-row"><span className="tick">✍️</span><span className="txt">Grammar practice</span></div>
        <div className="goal-row"><span className="tick">📝</span><span className="txt">Daily quiz</span></div>
      </div>
    </div>
  );
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
