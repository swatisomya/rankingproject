
import { useEffect } from "react";

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, []);

  const colors = {
    success: { bg: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.4)", color: "#22c55e" },
    error: { bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.4)", color: "#ef4444" },
    info: { bg: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.4)", color: "#3b82f6" }
  };

  const c = colors[type] || colors.info;

  return (
    <div style={{
      position: "fixed", bottom: "24px", right: "24px", zIndex: 9999,
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: "12px", padding: "14px 20px",
      color: c.color, fontWeight: "600", fontSize: "14px",
      backdropFilter: "blur(10px)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
      display: "flex", alignItems: "center", gap: "10px",
      animation: "slideIn 0.3s ease"
    }}>
      <span>{type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}</span>
      {message}
      <button onClick={onClose} style={{
        background: "none", border: "none", color: c.color,
        cursor: "pointer", fontSize: "16px", marginLeft: "8px"
      }}>×</button>
      <style>{`@keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
    </div>
  );
}

export default Toast;