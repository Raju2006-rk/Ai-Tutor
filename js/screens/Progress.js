/* ============================================================
   Progress.js — streaks, stats, levels, goals, tracked mistakes
   Exposed on window.ProgressScreen
   ============================================================ */

function ProgressScreen({ state, actions }) {
  const D = window.AITutorData;
  const { Header, StreakChip, ProgressBar } = window.UI;
  const p = state.progress;

  const accuracy = p.quizTotal ? Math.round((p.quizCorrect / p.quizTotal) * 100) : 0;

  // Level unlocks based on streak + activity
  const score = p.streak * 2 + p.quizzesCompleted + Math.floor(p.wordsLearned / 2);
  const levels = [
    { id: "bronze", name: "Bronze", m: "🥉", need: 0 },
    { id: "silver", name: "Silver", m: "🥈", need: 10 },
    { id: "gold", name: "Gold", m: "🥇", need: 25 },
  ];

  const mistakes = Object.entries(state.mistakes || {}).sort((a, b) => b[1] - a[1]);

  const stats = [
    { v: p.streak, l: "Current streak 🔥", accent: true },
    { v: p.longestStreak, l: "Longest streak" },
    { v: p.wordsLearned, l: "Words learned 📚" },
    { v: p.speakingMinutes, l: "Speaking minutes 🎤" },
    { v: p.quizzesCompleted, l: "Quizzes completed 📝" },
    { v: `${accuracy}%`, l: "Quiz accuracy 🎯", accent: true },
  ];

  return (
    <div className="screen">
      <Header
        avatar="📊"
        title="My Progress"
        sub="Keep the momentum going!"
        right={<StreakChip streak={p.streak} />}
      />

      {/* Levels */}
      <div className="section-title">Level</div>
      <div className="levels">
        {levels.map((lv) => {
          const unlocked = score >= lv.need;
          return (
            <div key={lv.id} className={"level" + (unlocked ? " unlocked" : "")}>
              <div className="m">{lv.m}</div>
              <div className="n">{lv.name}</div>
              <div className="hint" style={{ margin: 0 }}>{unlocked ? "Unlocked" : `${lv.need} pts`}</div>
            </div>
          );
        })}
      </div>

      {/* Stats grid */}
      <div className="section-title">Your Stats</div>
      <div className="stat-grid">
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className={"v" + (s.accent ? " accent" : "")}>{s.v}</div>
            <div className="l">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Today's goals */}
      <div className="section-title">Today's Goals</div>
      <div className="card">
        {D.DAILY_GOALS.map((g) => {
          const done = !!state.dailyGoals[g.id];
          return (
            <div className="goal-row" key={g.id}>
              <span className={"tick" + (done ? " done" : "")}>{done ? "✓" : g.emoji}</span>
              <span className={"txt" + (done ? " done" : "")}>{g.text}</span>
            </div>
          );
        })}
      </div>

      {/* Focus areas from tracked mistakes */}
      {mistakes.length > 0 && (
        <>
          <div className="section-title">Focus Areas</div>
          <div className="card">
            <div className="hint" style={{ marginTop: 0, marginBottom: 10 }}>
              I noticed repeated mistakes — I'll give you extra practice here.
            </div>
            {mistakes.map(([tag, n]) => (
              <div key={tag} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                  <span style={{ textTransform: "capitalize" }}>{tag}</span>
                  <span className="muted">{n}×</span>
                </div>
                <ProgressBar value={Math.min(100, n * 25)} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

window.ProgressScreen = ProgressScreen;
