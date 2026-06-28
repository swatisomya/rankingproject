import { useState } from "react";
import { linkProfile } from "../services/api";

const platforms = [
  { name: "LeetCode", icon: "🟡", key: "leetcode_username", verifiedKey: "leetcode_verified", color: "#f59e0b", formKey: "leetcode" },
  { name: "Codeforces", icon: "🔵", key: "codeforces_username", verifiedKey: "codeforces_verified", color: "#3b82f6", formKey: "codeforces" },
  { name: "GitHub", icon: "⬛", key: "github_username", verifiedKey: "github_verified", color: "#94a3b8", formKey: "github" }
];

function ConnectedProfiles({ userId, initialProfile, onUpdate, showToast }) {
  const hasProfile = initialProfile?.leetcode_username || initialProfile?.codeforces_username || initialProfile?.github_username;
  const [editing, setEditing] = useState(!hasProfile);
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

    const newResults = {};
    if (form.leetcode) newResults.leetcode = "verifying";
    if (form.codeforces) newResults.codeforces = "verifying";
    if (form.github) newResults.github = "verifying";
    setResults(newResults);

    try {
      const payload = {
        user_id: parseInt(userId),
        leetcode_username: form.leetcode || null,
        codeforces_username: form.codeforces || null,
        github_username: form.github || null,
        keep_leetcode: !form.leetcode && !!profile?.leetcode_username,
        keep_codeforces: !form.codeforces && !!profile?.codeforces_username,
        keep_github: !form.github && !!profile?.github_username
      };

      console.log("Sending payload:", payload);

      const res = await linkProfile(payload);

      console.log("Got response:", res);

      const finalResults = res.results || {};
      setResults(finalResults);

      const hasConnected = Object.values(finalResults).some(v => v === "connected");
      const hasInvalid = Object.values(finalResults).some(v => v === "invalid");

      if (hasConnected) {
        showToast("Profiles saved successfully!", "success");
        setEditing(false);
        setProfile({
          ...profile,
          leetcode_username: form.leetcode || profile?.leetcode_username,
          codeforces_username: form.codeforces || profile?.codeforces_username,
          github_username: form.github || profile?.github_username,
          leetcode_verified: finalResults.leetcode === "connected" || profile?.leetcode_verified,
          codeforces_verified: finalResults.codeforces === "connected" || profile?.codeforces_verified,
          github_verified: finalResults.github === "connected" || profile?.github_verified
        });
        if (onUpdate) onUpdate();
      }

      if (hasInvalid) {
        showToast("Some usernames could not be verified!", "error");
      }

    } catch (err) {
      console.error("Link profile error:", err);
      showToast("⚠️ Unable to connect to services. Please try again.", "error");
      setResults({});
    }
    setLoading(false);
  };

  const getBorderColor = (platform) => {
    const r = results[platform];
    if (r === "connected") return "#22c55e";
    if (r === "invalid") return "#ef4444";
    if (r === "verifying") return "#f59e0b";
    return `${accent}30`;
  };

  const getStatusText = (platform) => {
    const r = results[platform];
    if (r === "verifying") return { text: "⏳ Verifying...", color: "#f59e0b" };
    if (r === "connected") return { text: "✅ Connected!", color: "#22c55e" };
    if (r === "invalid") return { text: "❌ Username not found", color: "#ef4444" };
    return null;
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
          <p style={{ fontSize: "12px", color: "#475569", marginBottom: "14px" }}>
            Enter your usernames and click Save & Verify. Leave blank to keep existing connections.
          </p>
          {[
            { label: "LeetCode Username", key: "leetcode", icon: "🟡", platform: "leetcode", placeholder: "e.g. tourist" },
            { label: "Codeforces Username", key: "codeforces", icon: "🔵", platform: "codeforces", placeholder: "e.g. tourist" },
            { label: "GitHub Username", key: "github", icon: "⬛", platform: "github", placeholder: "e.g. torvalds" }
          ].map(f => (
            <div key={f.key} style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "12px", color: "#64748b", marginBottom: "5px", display: "block" }}>
                {f.icon} {f.label}
                {profile?.[f.key + "_username"] && !form[f.key] && (
                  <span style={{ color: "#22c55e", marginLeft: "8px" }}>
                    (keeping @{profile[f.key + "_username"]})
                  </span>
                )}
              </label>
              <div style={{ position: "relative" }}>
                <input
                  placeholder={form[f.key] ? "" : (profile?.[f.key + "_username"] ? `Current: @${profile[f.key + "_username"]}` : f.placeholder)}
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  disabled={loading}
                  style={{
                    width: "100%", padding: "11px 40px 11px 14px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${getBorderColor(f.platform)}`,
                    color: "white", fontSize: "14px", boxSizing: "border-box",
                    transition: "border-color 0.3s"
                  }}
                />
                {results[f.platform] && (
                  <span style={{
                    position: "absolute", right: "12px", top: "50%",
                    transform: "translateY(-50%)", fontSize: "14px"
                  }}>
                    {results[f.platform] === "verifying" ? "⏳"
                      : results[f.platform] === "connected" ? "✅"
                      : "❌"}
                  </span>
                )}
              </div>
              {getStatusText(f.platform) && (
                <p style={{
                  fontSize: "11px", marginTop: "4px", marginLeft: "4px",
                  color: getStatusText(f.platform).color
                }}>
                  {getStatusText(f.platform).text}
                </p>
              )}
            </div>
          ))}

          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <button onClick={handleLink} disabled={loading} style={{
              flex: 1, padding: "12px", border: "none", borderRadius: "10px",
              cursor: loading ? "not-allowed" : "pointer",
              color: "white", fontSize: "14px", fontWeight: "600",
              background: loading ? "#334155" : `linear-gradient(90deg, #2563eb, ${accent})`,
              transition: "all 0.3s"
            }}>
              {loading ? "⏳ Verifying..." : "Save & Verify →"}
            </button>
            {hasProfile && (
              <button onClick={() => { setEditing(false); setResults({}); }} style={{
                padding: "12px 18px", borderRadius: "10px",
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
                borderRadius: "14px", padding: "16px",
                transition: "all 0.3s"
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
                  borderRadius: "6px", padding: "2px 8px", fontSize: "11px",
                  color: verified ? "#22c55e" : "#475569", fontWeight: "600"
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