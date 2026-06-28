import { useState } from "react";
import { linkProfile } from "../services/api";

const platforms = [
  { name: "LeetCode", icon: "🟡", key: "leetcode_username", verifiedKey: "leetcode_verified", color: "#f59e0b" },
  { name: "Codeforces", icon: "🔵", key: "codeforces_username", verifiedKey: "codeforces_verified", color: "#3b82f6" },
  { name: "GitHub", icon: "⬛", key: "github_username", verifiedKey: "github_verified", color: "#94a3b8" }
];

function ConnectedProfiles({ userId, initialProfile, onUpdate, showToast }) {
  const [editing, setEditing] = useState(!initialProfile?.leetcode_username);
  const [form, setForm] = useState({
    leetcode: initialProfile?.leetcode_username || "",
    codeforces: initialProfile?.codeforces_username || "",
    github: initialProfile?.github_username || ""
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const [profile, setProfile] = useState(initialProfile);
  const accent = localStorage.getItem("accent") || "#8b5cf6";

  const handleLink = async () => {
    setLoading(true);
    setResults({ leetcode: "verifying", codeforces: "verifying", github: "verifying" });
    try {
      const res = await linkProfile({
        user_id: parseInt(userId),
        leetcode_username: form.leetcode,
        codeforces_username: form.codeforces,
        github_username: form.github
      });
      setResults(res.results || {});
      const allInvalid = Object.values(res.results || {}).every(v => v === "invalid");
      if (!allInvalid) {
        showToast("Profiles saved successfully!", "success");
        setEditing(false);
        setProfile({
          ...profile,
          leetcode_username: form.leetcode,
          codeforces_username: form.codeforces,
          github_username: form.github,
          leetcode_verified: res.results?.leetcode === "connected",
          codeforces_verified: res.results?.codeforces === "connected",
          github_verified: res.results?.github === "connected"
        });
        if (onUpdate) onUpdate();
      } else {
        showToast("Some usernames are invalid!", "error");
      }
    } catch {
      showToast("Failed to verify profiles", "error");
    }
    setLoading(false);
  };

  const getStatusBadge = (platform, formKey, verifiedKey) => {
    const result = results[platform];
    const username = form[formKey];
    const verified = profile?.[verifiedKey];

    if (result === "verifying") return { text: "⏳ Verifying...", color: "#f59e0b" };
    if (result === "invalid") return { text: "❌ Invalid Username", color: "#ef4444" };
    if (result === "connected" || (!editing && verified)) return { text: "✓ Connected", color: "#22c55e" };
    if (!username) return { text: "Not Connected", color: "#475569" };
    return { text: "Not Verified", color: "#f59e0b" };
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
            { label: "🟡 LeetCode Username", key: "leetcode", platform: "leetcode" },
            { label: "🔵 Codeforces Username", key: "codeforces", platform: "codeforces" },
            { label: "⬛ GitHub Username", key: "github", platform: "github" }
          ].map(f => (
            <div key={f.key} style={{ marginBottom: "12px" }}>
              <div style={{ position: "relative" }}>
                <input placeholder={f.label} value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  disabled={loading}
                  style={{
                    width: "100%", padding: "11px 14px", borderRadius: "10px",
                    background: "rgba(255,255,255,0.04)",
                    border: results[f.platform] === "invalid"
                      ? "1px solid #ef4444"
                      : results[f.platform] === "connected"
                      ? "1px solid #22c55e"
                      : `1px solid ${accent}30`,
                    color: "white", fontSize: "14px", boxSizing: "border-box"
                  }} />
                {results[f.platform] && (
                  <span style={{
                    position: "absolute", right: "12px", top: "50%",
                    transform: "translateY(-50%)", fontSize: "12px",
                    color: results[f.platform] === "connected" ? "#22c55e"
                      : results[f.platform] === "invalid" ? "#ef4444" : "#f59e0b"
                  }}>
                    {results[f.platform] === "verifying" ? "⏳"
                      : results[f.platform] === "connected" ? "✓"
                      : "✗"}
                  </span>
                )}
              </div>
              {results[f.platform] === "invalid" && (
                <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px", marginLeft: "4px" }}>
                  ❌ Invalid username — please check and try again
                </p>
              )}
            </div>
          ))}
          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            <button onClick={handleLink} disabled={loading} style={{
              flex: 1, padding: "11px", border: "none", borderRadius: "10px",
              cursor: loading ? "not-allowed" : "pointer",
              color: "white", fontSize: "14px", fontWeight: "600",
              background: `linear-gradient(90deg, #2563eb, ${accent})`,
              opacity: loading ? 0.7 : 1
            }}>
              {loading ? "⏳ Verifying..." : "Save & Verify →"}
            </button>
            {initialProfile?.leetcode_username && (
              <button onClick={() => setEditing(false)} style={{
                padding: "11px 18px", borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "transparent", color: "#94a3b8", cursor: "pointer"
              }}>Cancel</button>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {platforms.map(p => {
            const username = profile?.[p.key];
            const verified = profile?.[p.verifiedKey];
            return (
              <div key={p.name} style={{
                flex: "1", minWidth: "140px",
                background: verified ? `${p.color}08` : "rgba(255,255,255,0.02)",
                border: `1px solid ${verified ? p.color + "30" : "rgba(255,255,255,0.06)"}`,
                borderRadius: "14px", padding: "16px"
              }}>
                <div style={{ fontSize: "20px", marginBottom: "8px" }}>{p.icon}</div>
                <div style={{ fontWeight: "700", fontSize: "13px", marginBottom: "3px", color: verified ? p.color : "#64748b" }}>
                  {p.name}
                </div>
                <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "10px" }}>
                  {username ? `@${username}` : "Not connected"}
                </div>
                <span style={{
                  background: verified ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)",
                  border: verified ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "6px", padding: "2px 8px",
                  fontSize: "11px",
                  color: verified ? "#22c55e" : "#475569",
                  fontWeight: "600"
                }}>
                  {verified ? "✓ Connected" : username ? "⚠ Not Verified" : "Not Connected"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ConnectedProfiles;