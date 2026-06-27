function ProfileCard({ user, rank, score }) {
  const initials = user.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const accent = localStorage.getItem("accent") || "#8b5cf6";

  const tags = [
    { icon: "🏛️", label: user.college },
    { icon: "📚", label: user.branch },
    { icon: "📅", label: `Year ${user.year}` }
  ].filter(t => t.label);

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${accent}20`,
      borderRadius: "24px", padding: "24px",
      display: "flex", alignItems: "center", gap: "20px",
      flexWrap: "wrap", boxShadow: `0 0 40px ${accent}08`
    }}>
      <div style={{
        width: "72px", height: "72px", borderRadius: "50%",
        background: `linear-gradient(135deg, #00d4ff, ${accent})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "24px", fontWeight: "800", flexShrink: 0,
        boxShadow: `0 0 20px ${accent}40`
      }}>{initials}</div>

      <div style={{ flex: 1, minWidth: "180px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700" }}>{user.name}</h2>
          {rank && (
            <span style={{
              background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)",
              borderRadius: "8px", padding: "2px 10px", fontSize: "12px", color: "#f59e0b", fontWeight: "600"
            }}>#{rank} Rank</span>
          )}
        </div>
        <p style={{ color: "#475569", fontSize: "13px", marginBottom: "12px" }}>{user.email}</p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {tags.map((t, i) => (
            <span key={i} style={{
              background: `${accent}12`, border: `1px solid ${accent}20`,
              borderRadius: "8px", padding: "3px 10px", fontSize: "12px", color: accent
            }}>{t.icon} {t.label}</span>
          ))}
        </div>
      </div>

      {score !== undefined && (
        <div style={{ textAlign: "center", minWidth: "80px" }}>
          <div style={{
            fontSize: "28px", fontWeight: "800",
            background: `linear-gradient(90deg, #00d4ff, ${accent})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>{score}</div>
          <div style={{ color: "#475569", fontSize: "12px" }}>Total Score</div>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;