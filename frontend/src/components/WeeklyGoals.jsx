function WeeklyGoals({ leetcode }) {
  const accent = localStorage.getItem("accent") || "#8b5cf6";

  const goals = [
    { label: "Solve 20 problems", target: 20, current: Math.min(leetcode?.totalSolved || 0, 20), icon: "✅", color: "#22c55e" },
    { label: "Maintain 7-day streak", target: 7, current: Math.min(leetcode?.streak || 0, 7), icon: "🔥", color: "#ef4444" },
    { label: "Solve 5 hard problems", target: 5, current: Math.min(leetcode?.hardSolved || 0, 5), icon: "💪", color: "#f59e0b" },
  ];

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px", padding: "22px", marginBottom: "20px"
    }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "16px" }}>🎯 Weekly Goals</h3>
      {goals.map((g, i) => {
        const pct = Math.round((g.current / g.target) * 100);
        const done = pct >= 100;
        return (
          <div key={i} style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", alignItems: "center" }}>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>{g.icon} {g.label}</span>
              <span style={{ fontSize: "12px", fontWeight: "600", color: done ? "#22c55e" : g.color }}>
                {done ? "✓ Done!" : `${g.current}/${g.target}`}
              </span>
            </div>
            <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}>
              <div style={{
                height: "100%", width: `${Math.min(pct, 100)}%`, borderRadius: "3px",
                background: done ? "#22c55e" : g.color, transition: "width 1s ease"
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WeeklyGoals;