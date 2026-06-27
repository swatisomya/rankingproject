function TopPerformers({ leaderboard }) {
  const accent = localStorage.getItem("accent") || "#8b5cf6";
  if (!leaderboard || leaderboard.length === 0) return null;

  const sorted = [...leaderboard];
  const highestScore = sorted[0];
  const highestClimber = sorted.reduce((a, b) => (a.score > b.score ? a : b), sorted[0]);
  const longestStreak = sorted.reduce((a, b) =>
    (a.leetcode?.streak || 0) > (b.leetcode?.streak || 0) ? a : b, sorted[0]);
  const mostSolved = sorted.reduce((a, b) =>
    (a.leetcode?.totalSolved || 0) > (b.leetcode?.totalSolved || 0) ? a : b, sorted[0]);

  const performers = [
    { icon: "🏆", label: "Highest Score", user: highestScore, stat: `${highestScore?.score} pts`, color: "#f59e0b" },
    { icon: "🔥", label: "Highest Climber", user: highestClimber, stat: `#${highestClimber?.rank}`, color: "#ef4444" },
    { icon: "⚡", label: "Longest Streak", user: longestStreak, stat: `${longestStreak?.leetcode?.streak || 0}d`, color: "#3b82f6" },
    { icon: "💯", label: "Most Solved", user: mostSolved, stat: `${mostSolved?.leetcode?.totalSolved || 0}`, color: "#22c55e" },
  ];

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px", padding: "22px", marginBottom: "20px"
    }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "16px" }}>🌟 Top Performers</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: "10px" }}>
        {performers.map((p, i) => (
          <div key={i} style={{
            background: `${p.color}08`, border: `1px solid ${p.color}20`,
            borderRadius: "14px", padding: "16px"
          }}>
            <div style={{ fontSize: "20px", marginBottom: "8px" }}>{p.icon}</div>
            <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>{p.label}</div>
            <div style={{ fontWeight: "700", fontSize: "14px", marginBottom: "2px" }}>{p.user?.name}</div>
            <div style={{ color: p.color, fontWeight: "800", fontSize: "16px" }}>{p.stat}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopPerformers;