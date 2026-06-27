function StatCard({ icon, label, value, color, subtitle, trend }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${color}20`,
      borderRadius: "20px", padding: "22px",
      flex: "1", minWidth: "150px",
      boxShadow: `0 0 30px ${color}08`,
      transition: "all .3s", cursor: "default", position: "relative", overflow: "hidden"
    }}
      onMouseOver={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 12px 40px ${color}20`;
        e.currentTarget.style.borderColor = `${color}40`;
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = `0 0 30px ${color}08`;
        e.currentTarget.style.borderColor = `${color}20`;
      }}
    >
      <div style={{
        position: "absolute", top: "-20px", right: "-20px",
        width: "70px", height: "70px", borderRadius: "50%",
        background: `${color}12`, filter: "blur(15px)"
      }} />
      <div style={{ fontSize: "26px", marginBottom: "12px" }}>{icon}</div>
      <div style={{ fontSize: "26px", fontWeight: "800", color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: "12px", color: "#64748b", marginTop: "5px", fontWeight: "500" }}>{label}</div>
      {subtitle && <div style={{ fontSize: "11px", color: `${color}80`, marginTop: "3px" }}>{subtitle}</div>}
      {trend && (
        <div style={{
          marginTop: "10px", fontSize: "12px", fontWeight: "600",
          color: trend > 0 ? "#22c55e" : trend < 0 ? "#ef4444" : "#94a3b8"
        }}>
          {trend > 0 ? `↑ +${trend} this week` : trend < 0 ? `↓ ${trend} this week` : "— no change"}
        </div>
      )}
    </div>
  );
}

export default StatCard;