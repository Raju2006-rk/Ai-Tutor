/* ============================================================
   Quiz.js — Daily Quiz with instant feedback & explanations
   Exposed on window.QuizScreen
   ============================================================ */

function QuizScreen({ state, actions, onNavigate }) {
  const D = window.AITutorData;
  const { Header } = window.UI;

  // pick 5 random questions for the session
  const [questions] = React.useState(() =>
    [...D.QUIZ_BANK].sort(() => Math.random() - 0.5).slice(0, 5)
  );
  const [idx, setIdx] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const [locked, setLocked] = React.useState(false);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const recorded = React.useRef(false);

  const q = questions[idx];

  const choose = (i) => {
    if (locked) return;
    setSelected(i);
    setLocked(true);
    if (i === q.answer) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      setDone(true);
      if (!recorded.current) {
        recorded.current = true;
        actions.recordQuiz(correctCount, questions.length);
      }
    } else {
      setIdx((n) => n + 1);
      setSelected(null);
      setLocked(false);
    }
  };

  if (done) {
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="screen">
        <Header avatar="📝" title="Quiz Complete" sub="Great work today!" />
        <div className="card center">
          <div style={{ fontSize: 56 }}>{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: "var(--accent-2)" }}>
            {correctCount}/{questions.length}
          </div>
          <div className="muted">You scored {pct}%</div>
        </div>
        <div className="card">
          <div className="goal-row"><span className="tick done">✓</span><span className="txt">Daily quiz complete</span></div>
          <div className="hint">Your accuracy and quiz count were added to your progress.</div>
        </div>
        <button className="btn" onClick={() => onNavigate("home")}>Back to Home</button>
        <div className="spacer-10" />
        <button className="btn ghost" onClick={() => onNavigate("progress")}>See My Progress 📊</button>
      </div>
    );
  }

  const isRight = selected === q.answer;

  return (
    <div className="screen">
      <Header avatar="📝" title="Daily Quiz" sub={`${q.type} · Question ${idx + 1} of ${questions.length}`} />

      <div className="card">
        <div className="progressbar" style={{ marginBottom: 16 }}>
          <span style={{ width: `${((idx) / questions.length) * 100}%` }} />
        </div>
        <div className="quiz-q">{q.q}</div>

        <div className="options">
          {q.options.map((opt, i) => {
            let cls = "option";
            if (locked) {
              if (i === q.answer) cls += " correct";
              else if (i === selected) cls += " wrong";
            } else if (i === selected) cls += " selected";
            return (
              <button key={i} className={cls} onClick={() => choose(i)} disabled={locked}>
                <span className="opt-emoji">{String.fromCharCode(65 + i)}</span> {opt}
              </button>
            );
          })}
        </div>

        {locked && (
          <div className={"feedback " + (isRight ? "ok" : "no")}>
            <div className="fh">{isRight ? "✅ Correct!" : "❌ Not quite"}</div>
            {q.explain}
          </div>
        )}
      </div>

      {locked && (
        <button className="btn" onClick={next}>
          {idx + 1 >= questions.length ? "Finish Quiz" : "Next Question →"}
        </button>
      )}
    </div>
  );
}

window.QuizScreen = QuizScreen;
