function ScoreBreakdown({ leetcode, codeforces, total }) {
  const accent = localStorage.getItem("accent") || "#8b5cf6";

  const leetcodeScore = leetcode
    ? (leetcode.easySolved || 0) * 10 + (leetcode.mediumSolved || 0) * 25 + (leetcode.hardSolved || 0) * 50
    : 0;
  const cfScore = codeforces ? Math.round((codeforces.rating || 0) * 0.5) : 0;
  const ghScore = 0;
  const totalScore = total || leetcodeScore + cfScore;

  const bars = [
    { label: "LeetCode", score: leetcodeScore, color: "#f59e0b", icon: "🟡" },
    { label: "Codeforces", score: cfScore, color: "#3b82f6", icon: "🔵" },
    { label: "GitHub", score: ghScore, color: "#94a3b8", icon: "⬛" },
  ];

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px", padding: "22px", marginBottom: "20px"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "700" }}>📊 Score Breakdown</h3>
        <span style={{ fontSize: "20px", fontWeight: "800", color: accent }}>{totalScore}</span>
      </div>
      {bars.map((b, i) => {
        const pct = totalScore > 0 ? Math.round((b.score / totalScore) * 100) : 0;
        return (
          <div key={i} style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>{b.icon} {b.label}</span>
              <span style={{ fontSize: "13px", fontWeight: "600", color: b.color }}>{b.score} ({pct}%)</span>
            </div>
            <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}>
              <div style={{
                height: "100%", width: `${pct}%`, borderRadius: "3px",
                background: b.color, transition: "width 1s ease"
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ScoreBreakdown;