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
    } else {
      onNavigate(a.target);
    }
  };

  return (
    <div className="screen">
      <Header
        avatar="🤖"
        title={`Hi ${state.profile.name} 👋`}
        sub={lang ? `Learning ${lang.name} · ${cap(state.profile.level)}` : "Let's learn today"}
        right={<StreakChip streak={state.progress.streak} />}
      />

      {/* Today's goal */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>🎯 Today's Goal</h3>
          <span style={{ color: pct === 100 ? "var(--green)" : "var(--accent-2)", fontWeight: 800 }}>
            {pct}%
          </span>
        </div>
        <div style={{ margin: "12px 0" }}><ProgressBar value={pct} /></div>
        {goals.map((g) => {
          const done = !!state.dailyGoals[g.id];
          return (
            <div className="goal-row" key={g.id}>
              <span className={"tick" + (done ? " done" : "")}>{done ? "✓" : g.emoji}</span>
              <span className={"txt" + (done ? " done" : "")}>{g.text}</span>
            </div>
          );
        })}
        {pct === 100 && (
          <div className="feedback ok" style={{ marginTop: 10 }}>
            <div className="fh">🎉 Daily Goal: 100% Complete!</div>
            Amazing consistency. Come back tomorrow to keep your streak alive.
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="section-title">Quick Actions</div>
      <div className="grid">
        {D.HOME_ACTIONS.map((a) => (
          <button className="action" key={a.id} onClick={() => handleAction(a)}>
            <span className="emoji">{a.emoji}</span>
            <span className="name">{a.name}</span>
            <span className="desc">{a.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

window.HomeScreen = HomeScreen;
