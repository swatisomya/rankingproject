function LeaderboardStats({ data }) {
  const accent = localStorage.getItem("accent") || "#8b5cf6";
  const total = data.length;
  const avg = total > 0 ? Math.round(data.reduce((s, d) => s + d.score, 0) / total) : 0;
  const highest = total > 0 ? data[0]?.score : 0;
  const active = data.filter(d => d.leetcode || d.codeforces).length;

  const stats = [
    { label: "Total Students", value: total, color: accent },
    { label: "Average Score", value: avg, color: "#22c55e" },
    { label: "Highest Score", value: highest, color: "#f59e0b" },
    { label: "Active Users", value: active, color: "#3b82f6" },
  ];

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))",
      gap: "10px", marginBottom: "20px"
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          background: `${s.color}08`, border: `1px solid ${s.color}20`,
          borderRadius: "14px", padding: "16px", textAlign: "center"
        }}>
          <div style={{ fontSize: "22px", fontWeight: "800", color: s.color }}>{s.value}</div>
          <div style={{ fontSize: "11px", color: "#64748b", marginTop: "3px" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export default LeaderboardStats;