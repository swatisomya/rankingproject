function ProfileCompletion({ user, profile }) {
  const checks = [
    { label: "Name", done: !!user?.name },
    { label: "College", done: !!user?.college },
    { label: "Branch", done: !!user?.branch },
    { label: "Year", done: !!user?.year },
    { label: "LeetCode", done: !!profile?.leetcode_username },
    { label: "Codeforces", done: !!profile?.codeforces_username },
    { label: "GitHub", done: !!profile?.github_username },
  ];
  const percent = Math.round((checks.filter(c => c.done).length / checks.length) * 100);
  const accent = localStorage.getItem("accent") || "#8b5cf6";

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px", padding: "22px", marginBottom: "20px"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "700" }}>📋 Profile Completion</h3>
        <span style={{ fontSize: "18px", fontWeight: "800", color: accent }}>{percent}%</span>
      </div>
      <div style={{
        height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", marginBottom: "16px"
      }}>
        <div style={{
          height: "100%", width: `${percent}%`, borderRadius: "3px",
          background: `linear-gradient(90deg, #00d4ff, ${accent})`,
          transition: "width 1s ease"
        }} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {checks.map((c, i) => (
          <span key={i} style={{
            fontSize: "12px", padding: "4px 10px", borderRadius: "8px",
            background: c.done ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.03)",
            border: c.done ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255,255,255,0.06)",
            color: c.done ? "#22c55e" : "#475569"
          }}>
            {c.done ? "✓" : "✗"} {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProfileCompletion;