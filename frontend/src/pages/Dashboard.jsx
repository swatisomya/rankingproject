import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard, getLeaderboard } from "../services/api";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ProfileCard from "../components/ProfileCard";
import ProfileCompletion from "../components/ProfileCompletion";
import ConnectedProfiles from "../components/ConnectedProfiles";
import CodingSnapshot from "../components/CodingSnapshot";
import ScoreBreakdown from "../components/ScoreBreakdown";
import PersonalBests from "../components/PersonalBests";
import WeeklyGoals from "../components/WeeklyGoals";
import TopPerformers from "../components/TopPerformers";
import LeaderboardPreview from "../components/LeaderboardPreview";
import Achievements from "../components/Achievements";
import RecentActivity from "../components/RecentActivity";
import MotivationCard from "../components/MotivationCard";
import UpcomingContests from "../components/UpcomingContests";

function Dashboard() {
  const [data, setData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [myEntry, setMyEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const accent = localStorage.getItem("accent") || "#8b5cf6";

  const fetchAll = async () => {
    if (!user_id) { navigate("/"); return; }
    try {
      const [dashData, lb] = await Promise.all([getDashboard(user_id), getLeaderboard()]);
      setData(dashData);
      setLeaderboard(lb);
      const me = lb.find(e => e.user_id === parseInt(user_id));
      setMyEntry(me);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  if (loading || !data) return (
    <div style={{
      background: "#030712", height: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "16px"
    }}>
      <div style={{
        fontSize: "32px", fontWeight: "800",
        background: `linear-gradient(90deg, #00d4ff, ${accent})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
      }}>RankHub</div>
      <div style={{ color: "#334155", fontSize: "14px" }}>Loading your dashboard...</div>
    </div>
  );

  const leetcode = myEntry?.leetcode;
  const codeforces = myEntry?.codeforces;
  const totalScore = myEntry?.score || 0;
  const myRank = myEntry?.rank;

  return (
    <div style={{ background: "#030712", minHeight: "100vh", color: "white" }}>
      <Navbar username={data.user.name} />

      {/* Background */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "5%", left: "-15%", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, ${accent}06 0%, transparent 70%)`, filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "-15%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 20px", position: "relative", zIndex: 1 }}>

        {/* Welcome */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "4px" }}>
            Welcome back, <span style={{
              background: `linear-gradient(90deg, #00d4ff, ${accent})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>{data.user.name}</span> 👋
          </h1>
          <p style={{ color: "#334155", fontSize: "13px" }}>
            {myRank
              ? `You're ranked #${myRank} on the leaderboard. Keep climbing! 🚀`
              : "Link your profiles and start climbing the leaderboard!"}
          </p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
          <StatCard icon="🏆" label="College Rank" value={myRank ? `#${myRank}` : "—"} color="#f59e0b" subtitle="Overall position" />
          <StatCard icon="⭐" label="Total Score" value={totalScore || "—"} color={accent} subtitle="Combined score" />
          <StatCard icon="🔥" label="Streak" value={leetcode?.streak ? `${leetcode.streak}d` : "—"} color="#ef4444" subtitle="LeetCode streak" />
          <StatCard icon="✅" label="Solved" value={leetcode?.totalSolved || "—"} color="#22c55e" subtitle="On LeetCode" />
        </div>

        {/* Two Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px" }}>
          <div>
            <ProfileCard user={data.user} rank={myRank} score={totalScore} />
            <div style={{ marginTop: "20px" }}>
              <ProfileCompletion user={data.user} profile={data.profile} />
              <ConnectedProfiles userId={user_id} initialProfile={data.profile} onUpdate={fetchAll} />
              <CodingSnapshot leetcode={leetcode} codeforces={codeforces} loading={loading} hasProfile={!!data.profile} />
              <ScoreBreakdown leetcode={leetcode} codeforces={codeforces} total={totalScore} />
              <PersonalBests leetcode={leetcode} codeforces={codeforces} rank={myRank} />
              <WeeklyGoals leetcode={leetcode} />
              <TopPerformers leaderboard={leaderboard} />
              <LeaderboardPreview data={leaderboard} />
              <RecentActivity leetcode={leetcode} codeforces={codeforces} />
              <Achievements leetcode={leetcode} codeforces={codeforces} rank={myRank} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div>
            <MotivationCard />
            <UpcomingContests />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;