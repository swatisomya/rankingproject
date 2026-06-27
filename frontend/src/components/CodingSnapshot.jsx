function CodingSnapshot({ leetcode, codeforces, loading, hasProfile }) {
  const accent = localStorage.getItem("accent") || "#8b5cf6";

  const stats = [
    { icon: "⭐", label: "Highest CF Rating", value: codeforces?.maxRating, color: "#3b82f6" },
    { icon: "🔥", label: "LeetCode Streak", value: leetcode?.streak ? `${leetcode.streak}d` : null, color: "#f59e0b" },
    { icon: "✅", label: "Total Solved", value: leetcode?.totalSolved, color: "#22c55e" },
    { icon: "🌍", label: "Global Rank", value: leetcode?.ranking ? `#${leetcode.ranking?.toLocaleString()}` : null, color: accent },
    { icon: "🏅", label: "CF Rank", value: codeforces?.rank, color: "#00d4ff" },
  ].filter(s => s.value);

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px", padding: "22px", marginBottom: "20px"
    }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "16px" }}>📊 Coding Snapshot</h3>
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: "10px" }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{
              height: "80px", borderRadius: "12px",
              background: "rgba(255,255,255,0.04)", animation: "pulse 1.5s infinite"
            }}/>
          ))}
        </div>
      ) : !hasProfile ? (
        <div style={{ textAlign: "center", padding: "24px", color: "#475569", fontSize: "14px" }}>
          🔗 Link your coding profiles to view statistics
        </div>
      ) : stats.length === 0 ? (
        <div style={{ textAlign: "center", padding: "24px", color: "#475569", fontSize: "14px" }}>
          Fetching your stats...
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: "10px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: `${s.color}08`, border: `1px solid ${s.color}18`,
              borderRadius: "12px", padding: "14px", textAlign: "center",
              transition: "all .3s"
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = `${s.color}40`; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = `${s.color}18`; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: "20px", marginBottom: "6px" }}>{s.icon}</div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "10px", color: "#64748b", marginTop: "3px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CodingSnapshot;