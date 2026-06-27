import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLeaderboard } from "../services/api";
import Navbar from "../components/Navbar";
import MultiLeaderboard from "../components/MultiLeaderboard";
import LeaderboardStats from "../components/LeaderboardStats";

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const accent = localStorage.getItem("accent") || "#8b5cf6";

  useEffect(() => {
    if (!user_id) { navigate("/"); return; }
    getLeaderboard().then(data => {
      setLeaderboard(data);
      const me = data.find(e => e.user_id === parseInt(user_id));
      if (me) setUsername(me.name);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: "#030712", minHeight: "100vh", color: "white" }}>
      <Navbar username={username} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "4px" }}>
            🏆 <span style={{
              background: `linear-gradient(90deg, #00d4ff, ${accent})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>Leaderboard</span>
          </h1>
          <p style={{ color: "#334155", fontSize: "13px" }}>Rankings based on combined LeetCode + Codeforces scores</p>
        </div>

        <LeaderboardStats data={leaderboard} />

        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "20px", padding: "22px"
        }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#334155" }}>Loading leaderboard...</div>
          ) : (
            <MultiLeaderboard data={leaderboard} currentUserId={user_id} />
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;