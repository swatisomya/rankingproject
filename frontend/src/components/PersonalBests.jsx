function PersonalBests({ leetcode, codeforces, rank }) {
  const accent = localStorage.getItem("accent") || "#8b5cf6";

  const bests = [
    { icon: "🏆", label: "Highest Rank", value: rank ? `#${rank}` : "—", color: "#f59e0b" },
    { icon: "⭐", label: "Peak CF Rating", value: codeforces?.maxRating || "—", color: "#3b82f6" },
    { icon: "🔥", label: "Longest Streak", value: leetcode?.streak ? `${leetcode.streak} days` : "—", color: "#ef4444" },
    { icon: "📈", label: "Problems Solved", value: leetcode?.totalSolved || "—", color: "#22c55e" },
  ];

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px", padding: "22px", marginBottom: "20px"
    }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "16px" }}>🏅 Personal Bests</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: "10px" }}>
        {bests.map((b, i) => (
          <div key={i} style={{
            background: `${b.color}08`, border: `1px solid ${b.color}18`,
            borderRadius: "12px", padding: "14px", textAlign: "center"
          }}>
            <div style={{ fontSize: "20px", marginBottom: "6px" }}>{b.icon}</div>
            <div style={{ fontSize: "18px", fontWeight: "800", color: b.color }}>{b.value}</div>
            <div style={{ fontSize: "11px", color: "#64748b", marginTop: "3px" }}>{b.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonalBests;