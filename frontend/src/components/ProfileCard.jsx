import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

function ProfileCard({ user, rank, score, onUpdate, showToast }) {
  const [showEdit, setShowEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const accent = localStorage.getItem("accent") || "#8b5cf6";
  const initials = currentUser.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const tags = [
    { icon: "🏛️", label: currentUser.college },
    { icon: "📚", label: currentUser.branch },
    { icon: "📅", label: `Year ${currentUser.year}` }
  ].filter(t => t.label);

  const handleSave = (updated) => {
    setCurrentUser(updated);
    if (onUpdate) onUpdate(updated);
  };

  return (
    <>
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${accent}20`,
        borderRadius: "20px", padding: "24px",
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
            <h2 style={{ fontSize: "18px", fontWeight: "700" }}>{currentUser.name}</h2>
            {rank && (
              <span style={{
                background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)",
                borderRadius: "8px", padding: "2px 10px", fontSize: "12px", color: "#f59e0b", fontWeight: "600"
              }}>#{rank} Rank</span>
            )}
          </div>
          <p style={{ color: "#475569", fontSize: "13px", marginBottom: "12px" }}>{currentUser.email}</p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {tags.map((t, i) => (
              <span key={i} style={{
                background: `${accent}12`, border: `1px solid ${accent}20`,
                borderRadius: "8px", padding: "3px 10px", fontSize: "12px", color: accent
              }}>{t.icon} {t.label}</span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
          {score !== undefined && (
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "26px", fontWeight: "800",
                background: `linear-gradient(90deg, #00d4ff, ${accent})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>{score}</div>
              <div style={{ color: "#475569", fontSize: "12px" }}>Total Score</div>
            </div>
          )}
          <button onClick={() => setShowEdit(true)} style={{
            padding: "7px 16px", borderRadius: "8px",
            border: `1px solid ${accent}30`,
            background: `${accent}10`, color: accent,
            cursor: "pointer", fontSize: "13px", fontWeight: "500"
          }}>✏️ Edit Profile</button>
        </div>
      </div>

      {showEdit && (
        <EditProfileModal
          user={currentUser}
          onClose={() => setShowEdit(false)}
          onSave={handleSave}
          showToast={showToast}
        />
      )}
    </>
  );
}

export default ProfileCard;