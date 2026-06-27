import { useNavigate } from "react-router-dom";

function LeaderboardPreview({ data }) {
  const navigate = useNavigate();
  const accent = localStorage.getItem("accent") || "#8b5cf6";
  const top5 = data.slice(0, 5);

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px", padding: "22px", marginBottom: "20px"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "700" }}>🏆 Top 5 This Week</h3>
        <button onClick={() => navigate("/leaderboard")} style={{
          padding: "5px 14px", borderRadius: "8px", border: `1px solid ${accent}30`,
          background: "transparent", color: accent, cursor: "pointer", fontSize: "12px"
        }}>View Full →</button>
      </div>
      {top5.map((entry, i) => (
        <div key={entry.user_id} style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "10px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none"
        }}>
          <span style={{
            width: "26px", height: "26px", borderRadius: "50%",
            background: i < 3 ? ["rgba(245,158,11,0.2)", "rgba(148,163,184,0.2)", "rgba(205,124,47,0.2)"][i] : "rgba(255,255,255,0.05)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", fontWeight: "700",
            color: i < 3 ? ["#f59e0b", "#94a3b8", "#cd7c2f"][i] : "#64748b"
          }}>{i < 3 ? ["🥇","🥈","🥉"][i] : `#${i+1}`}</span>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: `linear-gradient(135deg, #00d4ff, ${accent})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", fontWeight: "700", flexShrink: 0
          }}>{entry.name?.charAt(0)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "13px", fontWeight: "600" }}>{entry.name}</div>
            <div style={{ fontSize: "11px", color: "#475569" }}>{entry.college}</div>
          </div>
          <div style={{ fontSize: "14px", fontWeight: "700", color: accent }}>{entry.score}</div>
        </div>
      ))}
    </div>
  );
}

export default LeaderboardPreview;