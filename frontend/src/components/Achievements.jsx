function Achievements({ leetcode, codeforces, rank }) {
  const badges = [
    { icon: "🥉", label: "Bronze Coder", color: "#cd7c2f", earned: (leetcode?.totalSolved || 0) >= 10 },
    { icon: "🥈", label: "Silver Coder", color: "#94a3b8", earned: (leetcode?.totalSolved || 0) >= 50 },
    { icon: "🥇", label: "Gold Coder", color: "#f59e0b", earned: (leetcode?.totalSolved || 0) >= 100 },
    { icon: "🏆", label: "Top 10", color: "#f59e0b", earned: rank && rank <= 10 },
    { icon: "🔥", label: "Streak Master", color: "#ef4444", earned: (leetcode?.streak || 0) >= 30 },
    { icon: "⚡", label: "Speed Solver", color: "#3b82f6", earned: (leetcode?.hardSolved || 0) >= 10 },
    { icon: "🚀", label: "Contest Champ", color: "#8b5cf6", earned: (codeforces?.maxRating || 0) >= 1400 },
  ];

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px", padding: "22px", marginBottom: "20px"
    }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "16px" }}>🏅 Achievements</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {badges.map((b, i) => (
          <div key={i} style={{
            background: b.earned ? `${b.color}15` : "rgba(255,255,255,0.02)",
            border: b.earned ? `1px solid ${b.color}40` : "1px solid rgba(255,255,255,0.05)",
            borderRadius: "12px", padding: "10px 16px",
            display: "flex", alignItems: "center", gap: "8px",
            opacity: b.earned ? 1 : 0.4,
            boxShadow: b.earned ? `0 0 15px ${b.color}20` : "none",
            transition: "all .3s"
          }}
            onMouseOver={e => b.earned && (e.currentTarget.style.boxShadow = `0 0 25px ${b.color}35`)}
            onMouseOut={e => b.earned && (e.currentTarget.style.boxShadow = `0 0 15px ${b.color}20`)}
          >
            <span style={{ fontSize: "16px", filter: b.earned ? "none" : "grayscale(1)" }}>{b.icon}</span>
            <span style={{ fontSize: "12px", fontWeight: "600", color: b.earned ? b.color : "#475569" }}>{b.label}</span>
            {!b.earned && <span style={{ fontSize: "11px", color: "#334155" }}>🔒</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;