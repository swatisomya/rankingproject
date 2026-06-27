import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLeaderboard } from "../services/api";
import Navbar from "../components/Navbar";

function ComparePage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [user1, setUser1] = useState(null);
  const [user2, setUser2] = useState(null);
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const accent = localStorage.getItem("accent") || "#8b5cf6";

  useEffect(() => {
    if (!user_id) { navigate("/"); return; }
    getLeaderboard().then(data => {
      setLeaderboard(data);
      const me = data.find(e => e.user_id === parseInt(user_id));
      if (me) setUser1(me);
    });
  }, []);

  const filtered1 = leaderboard.filter(u => u.name?.toLowerCase().includes(search1.toLowerCase()));
  const filtered2 = leaderboard.filter(u => u.name?.toLowerCase().includes(search2.toLowerCase()));

  const metrics = [
    { label: "Total Score", key: (u) => u.score || 0, color: accent, icon: "⭐" },
    { label: "LeetCode Solved", key: (u) => u.leetcode?.totalSolved || 0, color: "#f59e0b", icon: "✅" },
    { label: "Codeforces Rating", key: (u) => u.codeforces?.rating || 0, color: "#3b82f6", icon: "🔵" },
    { label: "LeetCode Streak", key: (u) => u.leetcode?.streak || 0, color: "#ef4444", icon: "🔥" },
    { label: "Hard Solved", key: (u) => u.leetcode?.hardSolved || 0, color: "#8b5cf6", icon: "💪" },
  ];

  const Card = ({ user, label }) => (
    <div style={{
      flex: 1, background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px"
    }}>
      <div style={{ fontSize: "12px", color: "#475569", marginBottom: "10px" }}>{label}</div>
      {user ? (
        <>
          <div style={{
            width: "48px", height: "48px", borderRadius: "50%",
            background: `linear-gradient(135deg, #00d4ff, ${accent})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", fontWeight: "800", marginBottom: "10px"
          }}>{user.name?.charAt(0)}</div>
          <div style={{ fontWeight: "700", fontSize: "16px" }}>{user.name}</div>
          <div style={{ color: "#475569", fontSize: "12px", marginBottom: "4px" }}>{user.college}</div>
          <div style={{ color: accent, fontWeight: "700", fontSize: "18px" }}>Score: {user.score}</div>
        </>
      ) : (
        <div style={{ color: "#334155", fontSize: "13px" }}>Select a user</div>
      )}
    </div>
  );

  return (
    <div style={{ background: "#030712", minHeight: "100vh", color: "white" }}>
      <Navbar username="" />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "4px" }}>
            ⚖️ <span style={{
              background: `linear-gradient(90deg, #00d4ff, ${accent})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>Compare Profiles</span>
          </h1>
          <p style={{ color: "#334155", fontSize: "13px" }}>Compare two students side by side</p>
        </div>

        {/* User Selection */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <input placeholder="Search User 1..." value={search1}
              onChange={e => setSearch1(e.target.value)}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: "10px", marginBottom: "8px",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                color: "white", fontSize: "14px", boxSizing: "border-box"
              }} />
            {search1 && filtered1.slice(0, 5).map(u => (
              <div key={u.user_id} onClick={() => { setUser1(u); setSearch1(""); }} style={{
                padding: "8px 12px", cursor: "pointer", borderRadius: "8px",
                background: "rgba(255,255,255,0.04)", marginBottom: "4px",
                fontSize: "13px", border: "1px solid rgba(255,255,255,0.06)"
              }}>
                {u.name} <span style={{ color: "#475569" }}>— {u.college}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", fontSize: "20px", color: "#334155" }}>VS</div>

          <div style={{ flex: 1, minWidth: "200px" }}>
            <input placeholder="Search User 2..." value={search2}
              onChange={e => setSearch2(e.target.value)}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: "10px", marginBottom: "8px",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                color: "white", fontSize: "14px", boxSizing: "border-box"
              }} />
            {search2 && filtered2.slice(0, 5).map(u => (
              <div key={u.user_id} onClick={() => { setUser2(u); setSearch2(""); }} style={{
                padding: "8px 12px", cursor: "pointer", borderRadius: "8px",
                background: "rgba(255,255,255,0.04)", marginBottom: "4px",
                fontSize: "13px", border: "1px solid rgba(255,255,255,0.06)"
              }}>
                {u.name} <span style={{ color: "#475569" }}>— {u.college}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
          <Card user={user1} label="Player 1" />
          <Card user={user2} label="Player 2" />
        </div>

        {/* Comparison Bars */}
        {user1 && user2 && (
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "20px", padding: "22px"
          }}>
            <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "20px" }}>📊 Head to Head</h3>
            {metrics.map((m, i) => {
              const v1 = m.key(user1);
              const v2 = m.key(user2);
              const max = Math.max(v1, v2, 1);
              const winner = v1 > v2 ? 1 : v2 > v1 ? 2 : 0;
              return (
                <div key={i} style={{ marginBottom: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", fontWeight: winner === 1 ? "700" : "400", color: winner === 1 ? m.color : "#94a3b8" }}>
                      {winner === 1 && "🏆 "}{v1}
                    </span>
                    <span style={{ fontSize: "12px", color: "#475569" }}>{m.icon} {m.label}</span>
                    <span style={{ fontSize: "13px", fontWeight: winner === 2 ? "700" : "400", color: winner === 2 ? m.color : "#94a3b8" }}>
                      {v2}{winner === 2 && " 🏆"}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <div style={{ flex: 1, height: "8px", background: "rgba(255,255,255,0.04)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(v1 / max) * 100}%`, background: m.color, borderRadius: "4px", float: "right", transition: "width 1s" }} />
                    </div>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#334155" }} />
                    <div style={{ flex: 1, height: "8px", background: "rgba(255,255,255,0.04)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(v2 / max) * 100}%`, background: m.color, borderRadius: "4px", transition: "width 1s" }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ComparePage;