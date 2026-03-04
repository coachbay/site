import { useState, useEffect, useRef } from 'react'

const CYAN = "#00BCD4"
const DARK = "#1a1a2e"

const TIER_COLORS = {
  "Early": "#f97316",
  "Building": "#eab308",
  "Gaining": "#eab308",
  "Capable": "#3b82f6",
  "Advanced": "#00BCD4",
  "AI-Native": "#22c55e",
}

function getTierColor(tier) {
  if (!tier) return CYAN
  for (const [k, v] of Object.entries(TIER_COLORS)) {
    if (tier.includes(k)) return v
  }
  return CYAN
}

function formatDate(val) {
  if (!val) return "—"
  const d = new Date(val)
  return isNaN(d) ? val : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

function average(arr) {
  const nums = arr.filter(n => n !== "" && !isNaN(Number(n))).map(Number)
  if (!nums.length) return "0"
  return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1)
}

const RobotIcon = ({ size = 36 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="55" r="30" fill="#00BCD4"/>
    <circle cx="38" cy="50" r="7" fill="#fff"/>
    <circle cx="62" cy="50" r="7" fill="#fff"/>
    <circle cx="40" cy="50.5" r="4.5" fill="#1a1a2e"/>
    <circle cx="64" cy="50.5" r="4.5" fill="#1a1a2e"/>
    <line x1="50" y1="25" x2="50" y2="15" stroke="#00BCD4" strokeWidth="3"/>
    <circle cx="50" cy="12" r="5" fill="#00BCD4"/>
  </svg>
)

function StatCard({ label, value, sub, small }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 24px" }}>
      <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>{label}</div>
      <div style={{ fontSize: small ? 16 : 30, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

function Panel({ title, children, noPad }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, marginBottom: 18, overflow: "hidden" }}>
      <div style={{ padding: "14px 22px", borderBottom: "1px solid rgba(255,255,255,0.07)", fontSize: 11, color: "#64748b", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em" }}>{title}</div>
      <div style={noPad ? {} : { padding: "18px 22px" }}>{children}</div>
    </div>
  )
}

export default function ClientResultsDashboard() {
  const [tabs, setTabs] = useState([])
  const [companies, setCompanies] = useState([])
  const [activeCompany, setActiveCompany] = useState(null)
  const [activeType, setActiveType] = useState(null)
  const [headers, setHeaders] = useState([])
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  // On mount — load client list
  useEffect(() => {
    loadClients()
  }, [])

  useEffect(() => {
    if (activeCompany && activeType) loadData()
  }, [activeCompany, activeType])

  useEffect(() => {
    if (rows.length && headers.length) drawChart()
  }, [rows, headers])

  async function loadClients() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/client-results")
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const clients = await res.json()

      const companyList = Object.keys(clients).sort()
      setCompanies(companyList)
      setTabs(clients)

      if (companyList.length > 0) {
        const first = companyList[0]
        setActiveCompany(first)
        setActiveType(clients[first][0])
      }
    } catch (e) {
      setError("Could not load client list: " + e.message)
      setLoading(false)
    }
  }

  async function loadData() {
    setLoading(true)
    setError(null)
    setRows([])
    setHeaders([])
    try {
      const res = await fetch(`/api/client-results?company=${encodeURIComponent(activeCompany)}&type=${activeType}`)
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const data = await res.json()
      if (data.error) {
        setError("No data found for " + activeCompany + " — " + activeType)
        setLoading(false)
        return
      }
      if (!Array.isArray(data) || data.length < 2) {
        setError("No submissions yet for " + activeCompany + " — " + activeType)
        setLoading(false)
        return
      }
      setHeaders(data[0])
      setRows(data.slice(1))
    } catch (e) {
      setError("Could not load data: " + e.message)
    }
    setLoading(false)
  }

  function drawChart() {
    if (!chartRef.current || !window.Chart) return
    const sectionCols = headers.map((h, i) => ({ label: h, i })).filter(({ label }) => label.endsWith(" Total"))
    const labels = sectionCols.map(({ label }) => label.replace(" Total", ""))
    const values = sectionCols.map(({ i }) => parseFloat(average(rows.map(r => r[i]))))
    const maxVal = activeType === "Company" ? 25 : 20
    if (chartInstance.current) chartInstance.current.destroy()
    const ctx = chartRef.current.getContext("2d")
    chartInstance.current = new window.Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{ data: values, backgroundColor: "rgba(0,188,212,0.7)", borderRadius: 4, borderSkipped: false }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: "#1e293b", titleColor: "#e2e8f0", bodyColor: "#94a3b8", borderColor: "rgba(255,255,255,0.1)", borderWidth: 1, callbacks: { label: ctx => ` ${ctx.raw} / ${maxVal}` } }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#94a3b8", font: { family: "DM Sans", size: 11 } }, border: { display: false } },
          y: { max: maxVal, grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#64748b", font: { size: 10 } }, border: { display: false } }
        }
      }
    })
  }

  const totalIdx = headers.indexOf("Total Score")
  const tierIdx = headers.indexOf("Tier")
  const tsIdx = headers.indexOf("Timestamp")
  const nameIdx = headers.indexOf("Name")
  const emailIdx = headers.indexOf("Email")
  const maxScore = activeType === "Company" ? 125 : 120
  const maxSection = activeType === "Company" ? 25 : 20
  const avgScore = totalIdx >= 0 ? average(rows.map(r => r[totalIdx])) : "—"
  const tierCounts = rows.reduce((acc, r) => { const t = r[tierIdx] || "Unknown"; acc[t] = (acc[t] || 0) + 1; return acc; }, {})
  const topTier = Object.entries(tierCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—"
  const sectionCols = headers.map((h, i) => ({ label: h, i })).filter(({ label }) => label.endsWith(" Total"))

  // Types available for the active company
  const availableTypes = (tabs[activeCompany] || [])

  return (
    <div style={{ minHeight: "100vh", background: DARK, fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      <script src="https://cdn.jsdelivr.net/npm/chart.js" onLoad={() => { if (rows.length) drawChart() }}></script>

      {/* Header */}
      <div style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "18px 28px", display: "flex", alignItems: "center", gap: 12 }}>
        <RobotIcon size={36} />
        <div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#fff", lineHeight: 1 }}>CoachBay</div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>Client Assessment Results</div>
        </div>
        <a href="/" style={{ marginLeft: "auto", fontSize: 13, color: "#64748b", textDecoration: "none" }}>← Back to site</a>
      </div>

      <div style={{ padding: "24px 28px", maxWidth: 1100, margin: "0 auto" }}>

        {/* Company picker */}
        {companies.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>Client</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {companies.map(c => (
                <button key={c} onClick={() => {
                  setActiveCompany(c)
                  const firstType = ["Team", "Leader", "Company"].find(t => tabs.includes(c + " - " + t))
                  setActiveType(firstType || "Team")
                }} style={{
                  padding: "7px 20px", borderRadius: 8,
                  border: activeCompany === c ? `1.5px solid ${CYAN}` : "1.5px solid rgba(255,255,255,0.1)",
                  background: activeCompany === c ? `${CYAN}20` : "transparent",
                  color: activeCompany === c ? CYAN : "#94a3b8",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer"
                }}>{c}</button>
              ))}
            </div>
          </div>
        )}

        {/* Assessment type tabs */}
        {availableTypes.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            {availableTypes.map(t => (
              <button key={t} onClick={() => setActiveType(t)} style={{
                padding: "7px 20px", borderRadius: 8,
                border: activeType === t ? `1.5px solid ${CYAN}` : "1.5px solid rgba(255,255,255,0.1)",
                background: activeType === t ? `${CYAN}20` : "transparent",
                color: activeType === t ? CYAN : "#94a3b8",
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer"
              }}>{t === "Company" ? "Company" : t === "Leader" ? "Leaders" : "Teams"}</button>
            ))}
            <button onClick={loadData} style={{ marginLeft: "auto", padding: "7px 16px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.1)", background: "transparent", color: "#64748b", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer" }}>↻ Refresh</button>
          </div>
        )}

        {loading && <div style={{ textAlign: "center", padding: 60, color: "#64748b" }}>Loading results...</div>}
        {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "14px 18px", color: "#fca5a5", fontSize: 13 }}>{error}</div>}

        {!loading && !error && rows.length > 0 && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
              <StatCard label="Responses" value={rows.length} />
              <StatCard label="Average Score" value={avgScore} sub={`out of ${maxScore}`} />
              <StatCard label="Top Tier" value={topTier} small />
            </div>

            <Panel title="Tier Breakdown">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {Object.entries(tierCounts).sort((a, b) => b[1] - a[1]).map(([tier, count]) => {
                  const color = getTierColor(tier)
                  return (
                    <div key={tier} style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.04)", border: `1px solid ${color}40`, borderRadius: 8, padding: "7px 12px" }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
                      <span style={{ fontSize: 12 }}>{tier}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color }}>{count}</span>
                    </div>
                  )
                })}
              </div>
            </Panel>

            <Panel title={`Section Averages (out of ${maxSection})`}>
              <div style={{ position: "relative", height: 200 }}>
                <canvas ref={chartRef}></canvas>
              </div>
            </Panel>

            <Panel title="All Submissions — most recent first" noPad>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      {["Date", "Name", "Score", "Tier", ...sectionCols.map(s => s.label.replace(" Total", ""))].map(h => (
                        <th key={h} style={{ padding: "10px 16px", textAlign: "left", color: "#64748b", fontWeight: 500, fontSize: 12, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...rows].reverse().map((row, i) => {
                      const tier = row[tierIdx] || "—"
                      const color = getTierColor(tier)
                      return (
                        <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                          <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>{formatDate(row[tsIdx])}</td>
                          <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>{row[nameIdx] || "—"}</td>
                          <td style={{ padding: "12px 16px", fontWeight: 600, color: CYAN, whiteSpace: "nowrap" }}>{row[totalIdx]}</td>
                          <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                            <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500, background: `${color}20`, color, border: `1px solid ${color}40` }}>{tier}</span>
                          </td>
                          {sectionCols.map(({ i: ci }) => (
                            <td key={ci} style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>{row[ci] || "—"}</td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Panel>
          </>
        )}

        {!loading && !error && rows.length === 0 && (
          <div style={{ textAlign: "center", padding: 60, color: "#64748b" }}>No submissions yet.</div>
        )}
      </div>
    </div>
  )
}
