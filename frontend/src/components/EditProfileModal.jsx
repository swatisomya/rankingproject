import { useState } from "react";
import { updateUser } from "../services/api";

function EditProfileModal({ user, onClose, onSave, showToast }) {
  const [form, setForm] = useState({
    name: user.name || "",
    college: user.college || "",
    branch: user.branch || "",
    year: user.year || ""
  });
  const [loading, setLoading] = useState(false);
  const accent = localStorage.getItem("accent") || "#8b5cf6";

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUser(user.id, { ...form, year: parseInt(form.year) });
      showToast("Profile updated successfully!", "success");
      onSave({ ...user, ...form, year: parseInt(form.year) });
      onClose();
    } catch {
      showToast("Failed to update profile", "error");
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9998,
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"
    }}>
      <div style={{
        background: "#0f172a", border: `1px solid ${accent}30`,
        borderRadius: "24px", padding: "32px", width: "100%", maxWidth: "480px",
        boxShadow: `0 0 60px ${accent}20`
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700" }}>✏️ Edit Profile</h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", color: "#64748b",
            fontSize: "22px", cursor: "pointer"
          }}>×</button>
        </div>

        {[
          { label: "Full Name", key: "name", type: "text" },
          { label: "College", key: "college", type: "text" },
          { label: "Branch", key: "branch", type: "text" },
          { label: "Year (1-4)", key: "year", type: "number" }
        ].map(f => (
          <div key={f.key} style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px", display: "block" }}>
              {f.label}
            </label>
            <input type={f.type} value={form[f.key]}
              onChange={e => setForm({ ...form, [f.key]: e.target.value })}
              style={{
                width: "100%", padding: "11px 14px", borderRadius: "10px",
                background: "rgba(255,255,255,0.04)", border: `1px solid ${accent}30`,
                color: "white", fontSize: "14px", boxSizing: "border-box"
              }} />
          </div>
        ))}

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button onClick={handleSave} disabled={loading} style={{
            flex: 1, padding: "12px", border: "none", borderRadius: "12px",
            cursor: "pointer", color: "white", fontSize: "14px", fontWeight: "600",
            background: `linear-gradient(90deg, #2563eb, ${accent})`
          }}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button onClick={onClose} style={{
            padding: "12px 20px", borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "transparent", color: "#94a3b8", cursor: "pointer"
          }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;