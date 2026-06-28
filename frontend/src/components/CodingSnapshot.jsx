function CodingSnapshot({ profile, loading }) {
  const accent = localStorage.getItem("accent") || "#8b5cf6";
  const hasProfile = profile?.leetcode_verified || profile?.codeforces_verified;

  const stats = [
    { icon: "✅", label: "Total Solved", value: profile?.leetcode_total, color: "#22c55e" },
    { icon: "🟢", label: "Easy", value: profile?.leetcode_easy, color: "#22c55e" },
    { icon: "🟡", label: "Medium", value: profile?.leetcode_medium, color: "#f59e0b" },
    { icon: "🔴", label: "Hard", value: profile?.leetcode_hard, color: "#ef4444" },
    { icon: "🌍", label: "LC Ranking", value: profile?.leetcode_ranking ? `#${profile.leetcode_ranking?.toLocaleString()}` : null, color: accent },
    { icon: "🔥", label: "Streak", value: profile?.leetcode_streak ? `${profile.leetcode_streak}d` : null, color: "#f59e0b" },
    { icon: "⭐", label: "CF Rating", value: profile?.cf_rating || null, color: "#3b82f6" },
    { icon: "🏅", label: "CF Max", value: profile?.cf_max_rating || null, color: "#8b5cf6" },
    { icon: "👑", label: "CF Rank", value: profile?.cf_rank || null, color: "#00d4ff" },
  ].filter(s => s.value);

  if (loading) return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px", padding: "22px", marginBottom: "20px"
    }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "16px" }}>📊 Coding Snapshot</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))", gap: "10px" }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            height: "80px", borderRadius: "12px",
            background: "rgba(255,255,255,0.04)"
          }}/>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px", padding: "22px", marginBottom: "20px"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "700" }}>📊 Coding Snapshot</h3>
        {profile?.last_synced && (
          <span style={{ fontSize: "11px", color: "#334155" }}>
            🕐 Synced: {new Date(profile.last_synced).toLocaleDateString()}
          </span>
        )}
      </div>

      {!hasProfile ? (
        <div style={{ textAlign: "center", padding: "24px", color: "#334155", fontSize: "14px" }}>
          🔗 Link and verify your coding profiles to view statistics
        </div>
      ) : stats.length === 0 ? (
        <div style={{ textAlign: "center", padding: "24px", color: "#334155", fontSize: "14px" }}>
          Fetching your stats...
        </div>
      ) : (
        <>
          {profile?.leetcode_verified && (
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "10px", fontWeight: "600" }}>
                🟡 LEETCODE
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))", gap: "8px" }}>
                {stats.filter(s => ["✅","🟢","🟡","🔴","🌍","🔥"].includes(s.icon)).map((s, i) => (
                  <div key={i} style={{
                    background: `${s.color}08`, border: `1px solid ${s.color}18`,
                    borderRadius: "12px", padding: "12px", textAlign: "center",
                    transition: "all .3s"
                  }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = `${s.color}40`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = `${s.color}18`; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ fontSize: "18px", marginBottom: "6px" }}>{s.icon}</div>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: "10px", color: "#64748b", marginTop: "3px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {profile?.codeforces_verified && (
            <div>
              <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "10px", fontWeight: "600" }}>
                🔵 CODEFORCES
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))", gap: "8px" }}>
                {stats.filter(s => ["⭐","🏅","👑"].includes(s.icon)).map((s, i) => (
                  <div key={i} style={{
                    background: `${s.color}08`, border: `1px solid ${s.color}18`,
                    borderRadius: "12px", padding: "12px", textAlign: "center",
                    transition: "all .3s"
                  }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = `${s.color}40`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = `${s.color}18`; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ fontSize: "18px", marginBottom: "6px" }}>{s.icon}</div>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: "10px", color: "#64748b", marginTop: "3px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CodingSnapshot;