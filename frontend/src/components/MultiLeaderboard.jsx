import { useState } from "react";

function MultiLeaderboard({ data, currentUserId }) {
  const [tab, setTab] = useState("overall");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;
  const accent = localStorage.getItem("accent") || "#8b5cf6";

  const user_id = parseInt(currentUserId);
  const myEntry = data.find(d => d.user_id === user_id);

  const tabs = [
    { key: "overall", label: "Overall" },
    { key: "college", label: "College" },
    { key: "branch", label: "Branch" },
    { key: "year", label: "Year" },
  ];

  const getFiltered = () => {
    let filtered = [...data];
    if (tab === "college" && myEntry?.college) {
      filtered = filtered.filter(d => d.college === myEntry.college);
    } else if (tab === "branch" && myEntry?.branch) {
      filtered = filtered.filter(d => d.branch === myEntry.branch);
    } else if (tab === "year" && myEntry?.year) {
      filtered = filtered.filter(d => d.year === myEntry.year);
    }
    if (search) filtered = filtered.filter(d => d.name?.toLowerCase().includes(search.toLowerCase()));
    return filtered.map((d, i) => ({ ...d, filteredRank: i + 1 }));
  };

  const filtered = getFiltered();
  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);
  const paginated = rest.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(rest.length / PER_PAGE);
  const medalColors = ["#f59e0b", "#94a3b8", "#cd7c2f"];
  const medalIcons = ["🥇", "🥈", "🥉"];
  const podiumOrder = top3.length === 3 ? [top3[1], top3[0], top3[2]] : top3;
  const podiumHeights = ["130px", "160px", "110px"];

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "20px", flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setPage(1); }} style={{
            padding: "7px 16px", borderRadius: "10px", border: "none", cursor: "pointer",
            background: tab === t.key ? `linear-gradient(90deg, #2563eb, ${accent})` : "rgba(255,255,255,0.04)",
            color: tab === t.key ? "white" : "#64748b",
            fontSize: "13px", fontWeight: "600", transition: "all .2s"
          }}>{t.label}</button>
        ))}
        {tab !== "overall" && myEntry && (
          <span style={{ fontSize: "12px", color: "#475569", padding: "7px 0", marginLeft: "4px" }}>
            — {tab === "college" ? myEntry.college : tab === "branch" ? myEntry.branch : `Year ${myEntry.year}`}
          </span>
        )}
      </div>

      {/* Podium */}
      {top3.length > 0 && (
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          gap: "10px", marginBottom: "28px", flexWrap: "wrap"
        }}>
          {podiumOrder.map((entry, i) => {
            const actualIdx = top3.indexOf(entry);
            return (
              <div key={entry.user_id} style={{
                background: `${medalColors[actualIdx]}10`,
                border: `1px solid ${medalColors[actualIdx]}35`,
                borderRadius: "18px", padding: "18px 14px",
                textAlign: "center", minWidth: "130px",
                height: podiumHeights[i],
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "flex-end",
                boxShadow: entry.user_id === user_id ? `0 0 20px ${accent}30` : "none",
                outline: entry.user_id === user_id ? `2px solid ${accent}40` : "none"
              }}>
                <div style={{ fontSize: "22px", marginBottom: "4px" }}>{medalIcons[actualIdx]}</div>
                <div style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  background: `linear-gradient(135deg, ${medalColors[actualIdx]}, #8b5cf6)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: "700", fontSize: "14px", marginBottom: "6px"
                }}>{entry.name?.charAt(0)}</div>
                <div style={{ fontWeight: "700", fontSize: "13px", marginBottom: "2px" }}>{entry.name}</div>
                <div style={{ color: "#475569", fontSize: "11px", marginBottom: "4px" }}>{entry.college}</div>
                <div style={{ color: medalColors[actualIdx], fontWeight: "800", fontSize: "16px" }}>{entry.score}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Search */}
      <input placeholder="🔍 Search by name..." value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
        style={{
          width: "100%", padding: "10px 14px", marginBottom: "14px", borderRadius: "10px",
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          color: "white", fontSize: "14px", boxSizing: "border-box"
        }} />

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["Rank", "Name", "College", "Branch", "LeetCode", "Codeforces", "Score"].map(h => (
                <th key={h} style={{
                  padding: "10px 12px", textAlign: "left",
                  fontSize: "11px", color: "#475569", fontWeight: "600",
                  textTransform: "uppercase", letterSpacing: "0.05em"
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map(entry => (
              <tr key={entry.user_id}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                  background: entry.user_id === user_id ? `${accent}08` : "transparent",
                  transition: "background .2s"
                }}
                onMouseOver={e => e.currentTarget.style.background = entry.user_id === user_id ? `${accent}12` : "rgba(255,255,255,0.02)"}
                onMouseOut={e => e.currentTarget.style.background = entry.user_id === user_id ? `${accent}08` : "transparent"}
              >
                <td style={{ padding: "12px", fontSize: "13px" }}>
                  <span style={{
                    background: "rgba(255,255,255,0.05)", borderRadius: "6px",
                    padding: "2px 8px", color: "#94a3b8", fontWeight: "600"
                  }}>#{entry.filteredRank}</span>
                  {entry.filteredRank < entry.rank
                    ? <span style={{ color: "#22c55e", fontSize: "11px", marginLeft: "4px" }}>↑</span>
                    : entry.filteredRank > entry.rank
                    ? <span style={{ color: "#ef4444", fontSize: "11px", marginLeft: "4px" }}>↓</span>
                    : null}
                </td>
                <td style={{ padding: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: `linear-gradient(135deg, #00d4ff, ${accent})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "11px", fontWeight: "700", flexShrink: 0
                    }}>{entry.name?.charAt(0)}</div>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: entry.user_id === user_id ? accent : "#e2e8f0" }}>
                      {entry.name} {entry.user_id === user_id && "👤"}
                    </span>
                  </div>
                </td>
                <td style={{ padding: "12px", fontSize: "13px", color: "#94a3b8" }}>{entry.college || "—"}</td>
                <td style={{ padding: "12px", fontSize: "13px", color: "#94a3b8" }}>{entry.branch || "—"}</td>
                <td style={{ padding: "12px", fontSize: "13px", color: "#94a3b8" }}>
                  {entry.leetcode ? `${entry.leetcode.totalSolved} solved` : "—"}
                </td>
                <td style={{ padding: "12px", fontSize: "13px", color: "#94a3b8" }}>
                  {entry.codeforces ? entry.codeforces.rating : "—"}
                </td>
                <td style={{ padding: "12px", fontSize: "14px", fontWeight: "700", color: "#00d4ff" }}>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "16px" }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)} style={{
              width: "32px", height: "32px", borderRadius: "8px", border: "none",
              background: p === page ? `linear-gradient(90deg, #2563eb, ${accent})` : "rgba(255,255,255,0.04)",
              color: p === page ? "white" : "#64748b", cursor: "pointer",
              fontWeight: "600", fontSize: "13px"
            }}>{p}</button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiLeaderboard;