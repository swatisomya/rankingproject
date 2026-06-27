import { useState } from "react";
import { linkProfile } from "../services/api";

const platforms = [
  { name: "LeetCode", icon: "🟡", key: "leetcode_username", color: "#f59e0b" },
  { name: "Codeforces", icon: "🔵", key: "codeforces_username", color: "#3b82f6" },
  { name: "GitHub", icon: "⬛", key: "github_username", color: "#94a3b8" }
];

function ConnectedProfiles({ userId, initialProfile, onUpdate }) {
  const hasProfile = initialProfile?.leetcode_username;
  const [editing, setEditing] = useState(!hasProfile);
  const [form, setForm] = useState({
    leetcode: initialProfile?.leetcode_username || "",
    codeforces: initialProfile?.codeforces_username || "",
    github: initialProfile?.github_username || ""
  });
  const [loading, setLoading] = useState(false);
  const accent = localStorage.getItem("accent") || "#8b5cf6";

  const handleLink = async () => {
    setLoading(true);
    const res = await linkProfile({
      user_id: parseInt(userId),
      leetcode_username: form.leetcode,
      codeforces_username: form.codeforces,
      github_username: form.github
    });
    alert(res.message);
    setEditing(false);
    if (onUpdate) onUpdate();
    setLoading(false);
  };

  const profileValues = {
    leetcode_username: form.leetcode,
    codeforces_username: form.codeforces,
    github_username: form.github
  };

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px", padding: "22px", marginBottom: "20px"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "700" }}>🔗 Connected Profiles</h3>
        {!editing && (
          <button onClick={() => setEditing(true)} style={{
            padding: "5px 14px", borderRadius: "8px", border: `1px solid ${accent}30`,
            background: "transparent", color: accent, cursor: "pointer", fontSize: "12px"
          }}>✏️ Edit</button>
        )}
      </div>

      {editing ? (
        <div>
          {[
            { label: "🟡 LeetCode Username", key: "leetcode" },
            { label: "🔵 Codeforces Username", key: "codeforces" },
            { label: "⬛ GitHub Username", key: "github" }
          ].map(f => (
            <input key={f.key} placeholder={f.label} value={form[f.key]}
              onChange={e => setForm({ ...form, [f.key]: e.target.value })}
              style={{
                width: "100%", padding: "11px 14px", marginBottom: "10px", borderRadius: "10px",
                background: "rgba(255,255,255,0.04)", border: `1px solid ${accent}30`,
                color: "white", fontSize: "14px"
              }} />
          ))}
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleLink} disabled={loading} style={{
              flex: 1, padding: "11px", border: "none", borderRadius: "10px",
              cursor: "pointer", color: "white", fontSize: "14px", fontWeight: "600",
              background: `linear-gradient(90deg, #2563eb, ${accent})`
            }}>
              {loading ? "Saving..." : "Save Profiles →"}
            </button>
            {hasProfile && (
              <button onClick={() => setEditing(false)} style={{
                padding: "11px 18px", borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: "14px"
              }}>Cancel</button>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {platforms.map(p => (
            <div key={p.name} style={{
              flex: "1", minWidth: "140px",
              background: `${p.color}08`, border: `1px solid ${p.color}25`,
              borderRadius: "14px", padding: "16px"
            }}>
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>{p.icon}</div>
              <div style={{ fontWeight: "700", fontSize: "13px", marginBottom: "3px", color: p.color }}>{p.name}</div>
              <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "10px" }}>
                @{profileValues[p.key] || "—"}
              </div>
              <span style={{
                background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: "6px", padding: "2px 8px", fontSize: "11px", color: "#22c55e", fontWeight: "600"
              }}>✓ Connected</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ConnectedProfiles;