import { useState, useEffect } from "react";

function Countdown({ target }) {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) { setTimeLeft("Live!"); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setTimeLeft(`${d}d ${h}h ${m}m`);
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [target]);
  return <span>{timeLeft}</span>;
}

function UpcomingContests() {
  const now = new Date();
  const contests = [
    {
      name: "LeetCode Weekly Contest",
      icon: "🟡", color: "#f59e0b",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 8, 0),
      link: "https://leetcode.com/contest/"
    },
    {
      name: "Codeforces Round",
      icon: "🔵", color: "#3b82f6",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4, 17, 35),
      link: "https://codeforces.com/contests"
    },
    {
      name: "CodeChef Starters",
      icon: "🟣", color: "#8b5cf6",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 20, 0),
      link: "https://www.codechef.com/contests"
    },
  ];

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px", padding: "22px", marginBottom: "20px"
    }}>
      <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "16px" }}>🗓️ Upcoming Contests</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {contests.map((c, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "14px",
            background: `${c.color}08`, border: `1px solid ${c.color}20`,
            borderRadius: "12px", padding: "14px"
          }}>
            <span style={{ fontSize: "20px" }}>{c.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13px", fontWeight: "600", marginBottom: "2px" }}>{c.name}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>
                {c.date.toLocaleDateString()} · {c.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "12px", color: c.color, fontWeight: "600", marginBottom: "4px" }}>
                ⏱ <Countdown target={c.date} />
              </div>
              <a href={c.link} target="_blank" rel="noreferrer" style={{
                fontSize: "11px", color: "white", background: c.color,
                padding: "3px 10px", borderRadius: "6px", textDecoration: "none"
              }}>Register</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingContests;