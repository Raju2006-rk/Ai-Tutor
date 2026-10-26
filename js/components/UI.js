/* ============================================================
   UI.js — small shared presentational components
   Exposed on window.UI
   ============================================================ */

function Header({ avatar = "🤖", title, sub, right }) {
  return (
    <div className="header">
      {avatar && <div className="avatar">{avatar}</div>}
      <div>
        <h1>{title}</h1>
        {sub && <div className="sub">{sub}</div>}
      </div>
      <div className="spacer" />
      {right}
    </div>
  );
}

function StreakChip({ streak }) {
  return <div className="chip-streak">🔥 {streak} day{streak === 1 ? "" : "s"}</div>;
}

function ProgressBar({ value }) {
  return (
    <div className="progressbar">
      <span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

function Card({ title, children, style }) {
  return (
    <div className="card" style={style}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}

// Renders a structured AI message body (answer/explanation/points/example/practice)
function StructuredAI({ data }) {
  if (!data) return null;

  if (data.kind === "grammar" && data.correction) {
    const { original, corrected, fixes } = data.correction;
    return (
      <div>
        <div>{data.answer}</div>
        {fixes.length > 0 && (
          <div className="mb">
            {fixes.map((f, i) => (
              <div key={i} style={{ marginBottom: 4 }}>
                <span className="corr-bad">❌ {f.bad}</span>
                <div className="hint">↳ {f.why}</div>
              </div>
            ))}
          </div>
        )}
        <div className="mb">
          <span className="corr-good">✅ {corrected}</span>
        </div>
        {data.practice && <Block title="Practice">{data.practice}</Block>}
      </div>
    );
  }

  if (data.kind === "eval" && data.scores) {
    return (
      <div>
        <div>{data.answer}</div>
        <div className="mb">
          {Object.entries(data.scores).map(([k, v]) => (
            <div key={k} style={{ margin: "6px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span>{k}</span><span>{v}%</span>
              </div>
              <ProgressBar value={v} />
            </div>
          ))}
        </div>
        {data.explanation && <Block title="Feedback">{data.explanation}</Block>}
        {data.practice && <Block title="Next">{data.practice}</Block>}
      </div>
    );
  }

  if (data.kind === "flashcards") {
    return <Flashcards data={data} />;
  }

  if (data.kind === "structured") {
    return (
      <div>
        {data.answer && <div style={{ fontWeight: 700 }}>{data.answer}</div>}
        {data.explanation && <Block title="Simple Explanation">{renderMarkdownish(data.explanation)}</Block>}
        {data.points && data.points.length > 0 && (
          <Block title="Important Points">
            <ul>{data.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </Block>
        )}
        {data.example && <Block title="Example">{data.example}</Block>}
        {data.practice && <Block title="Practice Question">{data.practice}</Block>}
      </div>
    );
  }

  // plain text
  return <div>{data.text}</div>;
}

function Flashcards({ data }) {
  const cards = data.cards || [];
  const [i, setI] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  if (!cards.length) return <div>I couldn't create flashcards from that. Try uploading a document first.</div>;
  const card = cards[i];
  const go = (d) => { setFlipped(false); setI((n) => (n + d + cards.length) % cards.length); };
  return (
    <div>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>🃏 {data.title || "Flashcards"} ({i + 1}/{cards.length})</div>
      <div className="flashcard" onClick={() => setFlipped((f) => !f)}>
        <div className="fc-face">
          <div className="fc-label">{flipped ? "ANSWER" : "QUESTION"}</div>
          <div className="fc-text">{flipped ? card.back : card.front}</div>
          <div className="fc-hint">tap to flip</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <button className="btn ghost sm" onClick={() => go(-1)}>← Prev</button>
        <button className="btn sm" onClick={() => go(1)}>Next →</button>
      </div>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="mb">
      <div className="mb-title">{title}</div>
      <div>{children}</div>
    </div>
  );
}

// very small markdown-ish: **bold** and newlines
function renderMarkdownish(str) {
  if (typeof str !== "string") return str;
  const lines = str.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
      /^\*\*[^*]+\*\*$/.test(seg)
        ? <strong key={j}>{seg.replace(/\*\*/g, "")}</strong>
        : <React.Fragment key={j}>{seg}</React.Fragment>
    );
    return <div key={i}>{parts}</div>;
  });
}

window.UI = { Header, StreakChip, ProgressBar, Card, StructuredAI, Block, renderMarkdownish };
