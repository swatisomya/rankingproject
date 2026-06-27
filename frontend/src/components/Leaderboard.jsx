import { useState } from "react";

function Leaderboard({ data }) {
  const [search, setSearch] = useState("");
  const [filterCollege, setFilterCollege] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const colleges = [...new Set(data.map(d => d.college).filter(Boolean))];
  const branches = [...new Set(data.map(d => d.branch).filter(Boolean))];

  const filtered = data.filter(d =>
    d.name?.toLowerCase().includes(search.toLowerCase()) &&
    (!filterCollege || d.college === filterCollege) &&
    (!filterBranch || d.branch === filterBranch)
  );

  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);
  const paginated = rest.slice((page-1)*PER_PAGE, page*PER_PAGE);
  const totalPages = Math.ceil(rest.length / PER_PAGE);

  const medalColors = ["#f59e0b","#94a3b8","#cd7c2f"];
  const medalIcons = ["🥇","🥈","🥉"];
  const podiumOrder = top3.length === 3 ? [top3[1], top3[0], top3[2]] : top3;
  const podiumHeights = ["140px","170px","120px"];

  return (
    <div style={{
      background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)",
      borderRadius:"24px", padding:"28px", marginBottom:"24px"
    }}>
      <h2 style={{ fontSize:"17px", fontWeight:"700", marginBottom:"24px", color:"#e2e8f0" }}>
        🏆 Leaderboard
      </h2>

      {/* Podium */}
      {top3.length > 0 && (
        <div style={{
          display:"flex", alignItems:"flex-end", justifyContent:"center",
          gap:"12px", marginBottom:"36px", flexWrap:"wrap"
        }}>
          {podiumOrder.map((entry, i) => {
            const actualIndex = top3.indexOf(entry);
            return (
              <div key={entry.user_id} style={{
                background:`${medalColors[actualIndex]}10`,
                border:`1px solid ${medalColors[actualIndex]}40`,
                borderRadius:"20px", padding:"20px 16px",
                textAlign:"center", minWidth:"140px",
                height: podiumHeights[i],
                display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"flex-end"
              }}>
                <div style={{ fontSize:"28px", marginBottom:"6px" }}>{medalIcons[actualIndex]}</div>
                <div style={{
                  width:"44px", height:"44px", borderRadius:"50%",
                  background:`linear-gradient(135deg,${medalColors[actualIndex]},#8b5cf6)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontWeight:"700", fontSize:"16px", marginBottom:"8px"
                }}>
                  {entry.name?.charAt(0)}
                </div>
                <div style={{ fontWeight:"700", fontSize:"14px", marginBottom:"2px" }}>{entry.name}</div>
                <div style={{ color:"#64748b", fontSize:"12px", marginBottom:"6px" }}>{entry.college}</div>
                <div style={{ color:medalColors[actualIndex], fontWeight:"800", fontSize:"18px" }}>{entry.score}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Filters */}
      <div style={{ display:"flex", gap:"10px", marginBottom:"16px", flexWrap:"wrap" }}>
        <input placeholder="🔍 Search by name..." value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          style={{ ...filterInput, flex:2, minWidth:"180px" }} />
        <select value={filterCollege} onChange={e => { setFilterCollege(e.target.value); setPage(1); }} style={filterInput}>
          <option value="">All Colleges</option>
          {colleges.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterBranch} onChange={e => { setFilterBranch(e.target.value); setPage(1); }} style={filterInput}>
          <option value="">All Branches</option>
          {branches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
              {["Rank","Name","College","Branch","LeetCode","Codeforces","Score"].map(h => (
                <th key={h} style={{ padding:"12px 14px", textAlign:"left", fontSize:"12px", color:"#64748b", fontWeight:"600", textTransform:"uppercase", letterSpacing:"0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map(entry => (
              <tr key={entry.user_id} style={{ borderBottom:"1px solid rgba(255,255,255,0.03)", transition:"background .2s" }}
                onMouseOver={e => e.currentTarget.style.background="rgba(255,255,255,0.03)"}
                onMouseOut={e => e.currentTarget.style.background="transparent"}
              >
                <td style={td}>
                  <span style={{
                    background:"rgba(124,58,237,0.15)", borderRadius:"8px",
                    padding:"3px 10px", color:"#a78bfa", fontWeight:"600", fontSize:"13px"
                  }}>#{entry.rank}</span>
                </td>
                <td style={{ ...td, fontWeight:"600" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                    <div style={{
                      width:"32px", height:"32px", borderRadius:"50%",
                      background:"linear-gradient(135deg,#00d4ff,#8b5cf6)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:"12px", fontWeight:"700", flexShrink:0
                    }}>{entry.name?.charAt(0)}</div>
                    {entry.name}
                  </div>
                </td>
                <td style={td}>{entry.college || "—"}</td>
                <td style={td}>{entry.branch || "—"}</td>
                <td style={td}>{entry.leetcode ? `${entry.leetcode.totalSolved} solved` : "—"}</td>
                <td style={td}>{entry.codeforces ? entry.codeforces.rating : "—"}</td>
                <td style={{ ...td, color:"#00d4ff", fontWeight:"700", fontSize:"15px" }}>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display:"flex", justifyContent:"center", gap:"8px", marginTop:"20px" }}>
          {Array.from({ length: totalPages }, (_,i) => i+1).map(p => (
            <button key={p} onClick={() => setPage(p)} style={{
              width:"34px", height:"34px", borderRadius:"8px", border:"none",
              background: p===page ? "linear-gradient(90deg,#2563eb,#7c3aed)" : "rgba(255,255,255,0.05)",
              color: p===page ? "white" : "#94a3b8", cursor:"pointer", fontWeight:"600", fontSize:"14px"
            }}>{p}</button>
          ))}
        </div>
      )}
    </div>
  );
}

const filterInput = {
  padding:"10px 14px", borderRadius:"10px", flex:1, minWidth:"140px",
  background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
  color:"white", fontSize:"14px"
};
const td = { padding:"14px", color:"#e2e8f0", fontSize:"14px" };

export default Leaderboard;