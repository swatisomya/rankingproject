function ProfileCompletion({ user, profile }) {
  const accent = localStorage.getItem("accent") || "#8b5cf6";

  const checks = [
    { label: "Name", done: !!user?.name },
    { label: "College", done: !!user?.college },
    { label: "Branch", done: !!user?.branch },
    { label: "Year", done: !!user?.year },
    { label: "LeetCode", done: !!profile?.leetcode_username && profile?.leetcode_verified },
    { label: "Codeforces", done: !!profile?.codeforces_username && profile?.codeforces_verified },
    { label: "GitHub", done: !!profile?.github_username && profile?.github_verified },
  ];

  const percent = Math.round((checks.filter(c => c.done).length / checks.length) * 100);
  const color = percent < 40 ? "#ef4444" : percent < 70 ? "#f59e0b" : "#22c55e";

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px", padding: "22px", marginBottom: "20px"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "700" }}>📋 Profile Completion</h3>
        <span style={{ fontSize: "20px", fontWeight: "800", color }}>{percent}%</span>
      </div>
      <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", marginBottom: "16px" }}>
        <div style={{
          height: "100%", width: `${percent}%`, borderRadius: "3px",
          background: `linear-gradient(90deg, ${color}, ${accent})`,
          transition: "width 1s ease"
        }} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {checks.map((c, i) => (
          <span key={i} style={{
            fontSize: "12px", padding: "4px 10px", borderRadius: "8px",
            background: c.done ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.08)",
            border: c.done ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(239,68,68,0.2)",
            color: c.done ? "#22c55e" : "#ef4444"
          }}>
            {c.done ? "✅" : "❌"} {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProfileCompletion;