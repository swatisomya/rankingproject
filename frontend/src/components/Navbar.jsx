import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar({ username, notifications = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [accent, setAccent] = useState(localStorage.getItem("accent") || "#8b5cf6");

  const links = [
    { label: "Dashboard", path: "/dashboard", icon: "📊" },
    { label: "Leaderboard", path: "/leaderboard", icon: "🏆" },
    { label: "Compare", path: "/compare", icon: "⚖️" },
    { label: "Contests", path: "/contests", icon: "🎯" },
  ];

  const accents = [
    { color: "#8b5cf6", label: "Purple" },
    { color: "#3b82f6", label: "Blue" },
    { color: "#22c55e", label: "Green" },
    { color: "#f97316", label: "Orange" },
  ];

  const defaultNotifs = [
    { icon: "📈", text: "+30 score today", time: "2h ago" },
    { icon: "🏆", text: "Rank improved to #5", time: "1d ago" },
    { icon: "🎯", text: "LeetCode Weekly Contest tomorrow", time: "3d ago" },
  ];

  const notifList = notifications.length > 0 ? notifications : defaultNotifs;

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 1000,
      background: "rgba(3,7,18,0.9)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "0 24px", height: "60px",
      display: "flex", alignItems: "center", justifyContent: "space-between"
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}>
          <span style={{ fontSize: "18px", color: accent, fontWeight: "800" }}>{"</>"}</span>
          <span style={{
            fontSize: "18px", fontWeight: "800",
            background: `linear-gradient(90deg, #00d4ff, ${accent})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>RankHub</span>
        </div>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: "2px" }}>
          {links.map(link => (
            <button key={link.path} onClick={() => navigate(link.path)} style={{
              padding: "6px 12px", borderRadius: "8px", border: "none",
              background: location.pathname === link.path ? `${accent}20` : "transparent",
              color: location.pathname === link.path ? accent : "#64748b",
              cursor: "pointer", fontSize: "13px", fontWeight: "500",
              borderBottom: location.pathname === link.path ? `2px solid ${accent}` : "2px solid transparent",
              transition: "all .2s"
            }}>
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

        {/* Notification Bell */}
        <div style={{ position: "relative" }}>
          <button onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: "18px", position: "relative", padding: "6px"
          }}>
            🔔
            <span style={{
              position: "absolute", top: "2px", right: "2px",
              background: "#ef4444", borderRadius: "50%",
              width: "14px", height: "14px", fontSize: "9px",
              display: "flex", alignItems: "center", justifyContent: "center", color: "white"
            }}>{notifList.length}</span>
          </button>

          {showNotifs && (
            <div style={{
              position: "absolute", right: 0, top: "44px",
              background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px", padding: "12px", width: "280px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)", zIndex: 999
            }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#94a3b8", marginBottom: "10px", padding: "0 4px" }}>
                Notifications
              </div>
              {notifList.map((n, i) => (
                <div key={i} style={{
                  padding: "10px 12px", borderRadius: "10px",
                  marginBottom: "6px", background: "rgba(255,255,255,0.03)",
                  display: "flex", gap: "10px", alignItems: "flex-start"
                }}>
                  <span style={{ fontSize: "16px" }}>{n.icon}</span>
                  <div>
                    <div style={{ fontSize: "13px", color: "#e2e8f0" }}>{n.text}</div>
                    <div style={{ fontSize: "11px", color: "#475569", marginTop: "2px" }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div style={{ position: "relative" }}>
          <div onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }} style={{
            width: "34px", height: "34px", borderRadius: "50%",
            background: `linear-gradient(135deg, #00d4ff, ${accent})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "700", fontSize: "13px", cursor: "pointer"
          }}>
            {username?.charAt(0).toUpperCase()}
          </div>

          {showProfile && (
            <div style={{
              position: "absolute", right: 0, top: "44px",
              background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px", padding: "16px", width: "220px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)", zIndex: 999
            }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#e2e8f0", marginBottom: "12px" }}>
                {username}
              </div>
              <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>Accent Color</div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                {accents.map(a => (
                  <div key={a.color} onClick={() => {
                    setAccent(a.color);
                    localStorage.setItem("accent", a.color);
                  }} style={{
                    width: "22px", height: "22px", borderRadius: "50%",
                    background: a.color, cursor: "pointer",
                    border: accent === a.color ? "2px solid white" : "2px solid transparent",
                    transition: "all .2s"
                  }} />
                ))}
              </div>
              <button onClick={() => { localStorage.clear(); navigate("/"); }} style={{
                width: "100%", padding: "9px", borderRadius: "10px",
                border: "1px solid rgba(239,68,68,0.3)",
                background: "rgba(239,68,68,0.08)", color: "#f87171",
                cursor: "pointer", fontSize: "13px", fontWeight: "500"
              }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;