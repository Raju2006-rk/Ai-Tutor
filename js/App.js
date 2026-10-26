/* ============================================================
   App.js — root component: onboarding gate + tab routing
   Exposed on window.App
   ============================================================ */

function App() {
  const [state, actions] = window.useStore();
  const [tab, setTab] = React.useState("home");
  // extra payload passed to a screen (e.g. an initial chat prompt)
  const [routeParams, setRouteParams] = React.useState(null);

  const navigate = (target, params = null) => {
    setRouteParams(params);
    setTab(target);
  };

  // Not onboarded yet → show the flow
  if (!state.onboarded) {
    return <window.Onboarding onDone={(profile) => { actions.completeOnboarding(profile); setTab("home"); }} />;
  }

  const chatIsFullScreen = tab === "chat";

  return (
    <div className="app">
      {tab === "home" && <window.HomeScreen state={state} actions={actions} onNavigate={navigate} />}
      {tab === "chat" && <window.ChatScreen key={routeParams ? JSON.stringify(routeParams) : "chat"} state={state} actions={actions} initial={routeParams} />}
      {tab === "quiz" && <window.QuizScreen state={state} actions={actions} onNavigate={navigate} />}
      {tab === "progress" && <window.ProgressScreen state={state} actions={actions} />}
      {tab === "profile" && <window.ProfileScreen state={state} actions={actions} />}

      {/* Quiz is reachable from Home but isn't a primary tab; map it to Home highlight */}
      <window.BottomNav
        active={tab === "quiz" ? "home" : tab}
        onChange={(t) => navigate(t)}
      />
    </div>
  );
}

window.App = App;
