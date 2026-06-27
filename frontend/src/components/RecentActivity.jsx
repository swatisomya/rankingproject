function RecentActivity({ leetcode, codeforces }) {
  const activities = [];
  if (leetcode?.totalSolved) activities.push({ icon: "✅", text: `${leetcode.totalSolved} total problems solved on LeetCode`, color: "#22c55e", time: "Today" });
  if (leetcode?.hardSolved) activities.push({ icon: "💪", text: `${leetcode.hardSolved} Hard problems conquered`, color: "#ef4444", time: "This week" });
  if (leetcode?.streak) activities.push({ icon: "🔥", text: `${leetcode.streak}-day streak active`, color: "#f59e0b", time: "Ongoing" });
  if (codeforces?.rating) activities.push({ icon: "⭐", text: `Codeforces rating: ${codeforces.rating} (${codeforces.rank})`, color: "#3b82f6", time: "Current" });
  if (codeforces?.maxRating) activities.push({ icon: "🏆", text: `Peak rating: ${codeforces.maxRating} (${codeforces.maxRank})`, color: "#8b5cf6", time: "All time" });
  if (activities.length === 0) activities.push({ icon: "🎯", text: "Link your profiles to see activity", color: "#475569", time: "—" });

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px", padding: "22px", marginBottom: "20px"
    }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "16px" }}>⚡ Recent Activity</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {activities.map((a, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "12px",
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
            borderLeft: `3px solid ${a.color}`, borderRadius: "10px", padding: "11px 14px"
          }}>
            <span style={{ fontSize: "16px" }}>{a.icon}</span>
            <span style={{ color: "#cbd5e1", fontSize: "13px", flex: 1 }}>{a.text}</span>
            <span style={{ fontSize: "11px", color: "#334155" }}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;