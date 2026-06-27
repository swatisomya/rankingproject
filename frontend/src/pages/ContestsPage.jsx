import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Countdown({ target }) {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) { setTimeLeft("🔴 Live Now!"); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return <span>{timeLeft}</span>;
}

function ContestsPage() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const accent = localStorage.getItem("accent") || "#8b5cf6";

  useEffect(() => { if (!user_id) navigate("/"); }, []);

  const now = new Date();
  const contests = [
    { name: "LeetCode Weekly Contest 450", icon: "🟡", color: "#f59e0b", date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 8, 0), duration: "1.5 hours", link: "https://leetcode.com/contest/", difficulty: "Medium" },
    { name: "LeetCode Biweekly Contest 155", icon: "🟡", color: "#f59e0b", date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 9, 20, 0), duration: "1.5 hours", link: "https://leetcode.com/contest/", difficulty: "Medium" },
    { name: "Codeforces Round 990 (Div. 2)", icon: "🔵", color: "#3b82f6", date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4, 17, 35), duration: "2 hours", link: "https://codeforces.com/contests", difficulty: "Hard" },
    { name: "Codeforces Round 991 (Div. 3)", icon: "🔵", color: "#3b82f6", date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 14, 35), duration: "2.5 hours", link: "https://codeforces.com/contests", difficulty: "Easy" },
    { name: "CodeChef Starters 175", icon: "🟣", color: accent, date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 20, 0), duration: "3 hours", link: "https://www.codechef.com/contests", difficulty: "Medium" },
  ];

  return (
    <div style={{ background: "#030712", minHeight: "100vh", color: "white" }}>
      <Navbar username="" />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "4px" }}>
            🎯 <span style={{
              background: `linear-gradient(90deg, #00d4ff, ${accent})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>Upcoming Contests</span>
          </h1>
          <p style={{ color: "#334155", fontSize: "13px" }}>Never miss a contest. Register and compete!</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {contests.map((c, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)", border: `1px solid ${c.color}20`,
              borderRadius: "18px", padding: "20px",
              display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap"
            }}>
              <span style={{ fontSize: "28px" }}>{c.icon}</span>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <div style={{ fontWeight: "700", fontSize: "15px", marginBottom: "4px" }}>{c.name}</div>
                <div style={{ color: "#475569", fontSize: "12px" }}>
                  📅 {c.date.toLocaleDateString()} · ⏰ {c.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} · ⏱ {c.duration}
                </div>
                <span style={{
                  fontSize: "11px", marginTop: "6px", display: "inline-block",
                  background: c.difficulty === "Easy" ? "rgba(34,197,94,0.1)" : c.difficulty === "Medium" ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)",
                  color: c.difficulty === "Easy" ? "#22c55e" : c.difficulty === "Medium" ? "#f59e0b" : "#ef4444",
                  border: `1px solid ${c.difficulty === "Easy" ? "rgba(34,197,94,0.25)" : c.difficulty === "Medium" ? "rgba(245,158,11,0.25)" : "rgba(239,68,68,0.25)"}`,
                  borderRadius: "6px", padding: "2px 8px"
                }}>{c.difficulty}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "13px", fontWeight: "700", color: c.color, marginBottom: "8px" }}>
                  ⏱ <Countdown target={c.date} />
                </div>
                <a href={c.link} target="_blank" rel="noreferrer" style={{
                  padding: "8px 18px", borderRadius: "10px", border: "none",
                  background: `linear-gradient(90deg, #2563eb, ${c.color})`,
                  color: "white", fontSize: "13px", fontWeight: "600",
                  textDecoration: "none", display: "inline-block"
                }}>Register →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContestsPage;