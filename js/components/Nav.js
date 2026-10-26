/* ============================================================
   Nav.js — bottom tab navigation
   Exposed on window.BottomNav
   ============================================================ */

const NAV_TABS = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "chat", icon: "🤖", label: "AI Tutor" },
  { id: "progress", icon: "📊", label: "Progress" },
  { id: "profile", icon: "👤", label: "Profile" },
];

function BottomNav({ active, onChange }) {
  return (
    <nav className="nav">
      {NAV_TABS.map((t) => (
        <button
          key={t.id}
          className={active === t.id ? "active" : ""}
          onClick={() => onChange(t.id)}
          aria-label={t.label}
        >
          <span className="ni">{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

window.BottomNav = BottomNav;
