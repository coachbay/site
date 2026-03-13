import { useState, useEffect } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer,
} from "recharts";
import clients from "./clientConfig";

// ── Section config per assessment type ──────────────────────────────────────
const SECTION_CONFIG = {
  team: {
    ids: ["integration", "depth", "deletion", "influence", "judgment", "environment"],
    labels: {
      integration: "Integration", depth: "Depth", deletion: "Deletion",
      influence: "Influence", judgment: "Judgment", environment: "Environment",
    },
    max: 20, total: 120,
    tiers: [
      { label: "Starting Out",      color: "#ef4444", range: [24, 48] },
      { label: "Early Progress",    color: "#f59e0b", range: [49, 72] },
      { label: "Gaining Momentum",  color: "#3b82f6", range: [73, 96] },
      { label: "AI Advanced",       color: "#00BCD4", range: [97, 108] },
      { label: "AI Pioneer",        color: "#7c3aed", range: [109, 120] },
    ],
  },
  leader: {
    ids: ["integration", "depth", "deletion", "enabling", "judgment", "environment"],
    labels: {
      integration: "Integration", depth: "Depth", deletion: "Deletion",
      enabling: "Enabling", judgment: "Judgment", environment: "Environment",
    },
    max: 20, total: 120,
    tiers: [
      { label: "Untapped Potential", color: "#ef4444", range: [24, 48] },
      { label: "Getting Started",    color: "#f59e0b", range: [49, 72] },
      { label: "Active Explorer",    color: "#3b82f6", range: [73, 96] },
      { label: "AI Advanced",        color: "#00BCD4", range: [97, 108] },
      { label: "AI Pioneer",         color: "#7c3aed", range: [109, 120] },
    ],
  },
  company: {
    ids: ["clarity", "leadership", "sentiment", "culture", "foundations"],
    labels: {
      clarity: "Strategic Clarity", leadership: "Leadership Readiness",
      sentiment: "Employee Sentiment", culture: "Culture of Change",
      foundations: "Practical Foundations",
    },
    max: 25, total: 125,
    tiers: [
      { label: "Not Yet",                range: [25, 49],   color: "#ef4444" },
      { label: "Groundwork Needed",      range: [50, 74],   color: "#f59e0b" },
      { label: "Ready to Start",         range: [75, 99],   color: "#3b82f6" },
      { label: "Ready to Accelerate",    range: [100, 112], color: "#00BCD4" },
      { label: "AI-Driven Organization", range: [113, 125], color: "#7c3aed" },
    ],
  },
};

const avg = (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

// ── Parse raw sheet rows into scored participant objects ─────────────────────
function parseRows(headers, rows, typeKey) {
  const h = headers.map((x) => (x || "").toLowerCase().trim());
  // Flexible column finder — matches if header contains the keyword
  const idx = (keyword) => h.findIndex((col) => col.includes(keyword));

  const nameI  = idx("name");
  const scoreI = idx("total score");
  const tierI  = idx("tier");
  const cfg    = SECTION_CONFIG[typeKey];

  return rows
    .filter((r) => r && r[scoreI] && !isNaN(Number(r[scoreI])))
    .map((r, i) => {
      const obj = {
        id:    i + 1,
        name:  r[nameI]  || `Participant ${i + 1}`,
        total: parseInt(r[scoreI]) || 0,
        tier:  r[tierI]  || "",
      };
      // Each section column is named e.g. "Integration Total" — match by section id keyword
      cfg.ids.forEach((sid) => {
        const ci = h.findIndex((col) => col.startsWith(sid) && col.includes("total"));
        obj[sid] = ci >= 0 ? (parseInt(r[ci]) || 0) : 0;
      });
      return obj;
    });
}

// ── Build stats summary for AI prompt ───────────────────────────────────────
function buildStats(teamData, typeKey) {
  const cfg = SECTION_CONFIG[typeKey];
  const totals = teamData.map((d) => d.total);
  const teamAvg = Math.round(avg(totals) * 10) / 10;
  const teamPct = Math.round((teamAvg / cfg.total) * 100);

  const tierCounts = cfg.tiers.map((t) => ({
    ...t,
    count: teamData.filter((d) => d.total >= t.range[0] && d.total <= t.range[1]).length,
  }));

  const sectionAvgs = cfg.ids.map((sid) => ({
    id:  sid,
    label: cfg.labels[sid],
    avg: Math.round(avg(teamData.map((d) => d[sid])) * 10) / 10,
    max: Math.max(...teamData.map((d) => d[sid])),
    min: Math.min(...teamData.map((d) => d[sid])),
  }));

  const highest = sectionAvgs.reduce((a, b) => a.avg > b.avg ? a : b);
  const lowest  = sectionAvgs.reduce((a, b) => a.avg < b.avg ? a : b);

  return { teamAvg, teamPct, tierCounts, sectionAvgs, highest, lowest };
}

// ── Call Claude API for AI insights ─────────────────────────────────────────
async function generateInsights(companyName, typeKey, teamData, stats) {
  const cfg = SECTION_CONFIG[typeKey];
  const typeName = typeKey.charAt(0).toUpperCase() + typeKey.slice(1);

  const tierBreakdown = stats.tierCounts
    .filter((t) => t.count > 0)
    .map((t) => `  ${t.label}: ${t.count} participant${t.count !== 1 ? "s" : ""}`)
    .join("\n");

  const sectionBreakdown = stats.sectionAvgs
    .map((s) => `  ${s.label}: ${s.avg}/${cfg.max} (range ${s.min} to ${s.max})`)
    .join("\n");

  const prompt = `You are a senior AI leadership coach at CoachBay writing a confidential team report.

Company: ${companyName}
Assessment type: ${typeName} AI Diagnostic
Total participants: ${teamData.length}
Team average: ${stats.teamAvg} / ${cfg.total} (${stats.teamPct}%)

Tier breakdown:
${tierBreakdown}

Section averages (out of ${cfg.max}):
${sectionBreakdown}

Strongest section: ${stats.highest.label} (${stats.highest.avg}/${cfg.max})
Weakest section: ${stats.lowest.label} (${stats.lowest.avg}/${cfg.max})

VOICE AND STYLE RULES (non-negotiable):
- Always use the actual numbers. Never say "scores suggest" when you can say "at 13.5/20".
- Name the specific sections by name. Never say "technical skills" when you mean "Depth".
- Be direct about what the data means for team behavior, not just performance scores.
- Takeaway titles should describe the insight, not just label the dimension.
- Next steps should be concrete actions a manager could take this week, not program names.
- Never use hyphens or em dashes. Use American English. No consultant jargon.
- For TEAM assessments: refer to participants as "team members" or "participants" — never as "leaders".
- For LEADER assessments: refer to participants as "leaders" throughout.
- For COMPANY assessments: refer to the organisation collectively.
- Write as if you are briefing the HR director privately. Human, frank, specific.

Here is a real example of the quality and style required. These are takeaways from a 19-person TEAM assessment with an average of 83/120 (note: uses "participants" because it is a team assessment):

EXAMPLE TAKEAWAYS (match this depth and tone exactly):
Title: "A strong cohort at full picture"
Text: "The group average of 83/120 places the full cohort solidly in the Gaining Momentum tier. 9 of 19 participants are actively building AI habits, 2 have reached AI Advanced, and one has achieved AI Pioneer. This is a meaningfully strong result for a first diagnostic: the majority of this group is already using AI in ways that go beyond occasional experimentation."

Title: "Critical judgment is the standout strength"
Text: "Judgment is the highest scoring dimension at 16.9/20. This group can evaluate AI output, recognise when it falls short, and use it as a starting point rather than an authority. That discernment is the foundation for safe, high-value AI use and is not something most groups start with."

Title: "Deletion and Influence are the biggest opportunities"
Text: "Deletion (10.9/20) and Influence (11.3/20) are the two weakest dimensions across the group. Participants are using AI to support their own thinking but are not yet actively using it to remove unnecessary work or demonstrate that use visibly to their teams. These are the dimensions with the highest leverage."

Title: "A wide spread signals an opportunity for peer learning"
Text: "The 51-point gap between the lowest and highest scores reflects a significant range of AI maturity within a single cohort. This is not a problem to solve through more training. It is an opportunity to structure peer learning: the participants at the top can accelerate the rest simply by sharing what they do."

EXAMPLE NEXT STEPS (match this specificity):
Title: "Form a Pilot Squad from your top performers"
Text: "With one AI Pioneer and two AI Advanced participants already in this cohort, you have a natural starting point. Give this group a meaningful real business challenge and let them show the rest of the team what is possible."

Title: "Make Deletion a shared team habit"
Text: "Deletion is the weakest dimension. Run a short exercise where each participant asks AI to audit one of their regular meetings, reports, or recurring processes and identify what could be removed or simplified."

Now write takeaways and next steps at this same level of insight and specificity for the team data provided above.

Return ONLY a valid JSON object, no markdown, no backticks, with this exact structure:
{
  "summary": "Two paragraphs separated by \\n\\n. First: what the overall result and tier spread actually means for this team in plain terms. Second: the most important strength and the single clearest growth opportunity, named specifically with the scores.",
  "takeaways": [
    { "title": "Insight-driven title (not a dimension label)", "text": "Two sentences. Use the actual numbers. Explain what the pattern means for how this team works, not just that a score is high or low." },
    { "title": "Insight-driven title", "text": "Two sentences grounded in the data." },
    { "title": "Insight-driven title", "text": "Two sentences grounded in the data." },
    { "title": "Insight-driven title", "text": "Two sentences grounded in the data." }
  ],
  "nextSteps": [
    { "title": "Specific action, not a program name", "text": "One to two sentences. Concrete. Tied to the actual scores. Explains why this action specifically." },
    { "title": "Specific action", "text": "One to two sentences." },
    { "title": "Specific action", "text": "One to two sentences." }
  ]
}`;

  const res = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  const text = data?.content?.[0]?.text || "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

// ── Sub-components ───────────────────────────────────────────────────────────
const RobotIcon = ({ size = 28 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="55" r="30" fill="#00BCD4" />
    <circle cx="38" cy="50" r="7" fill="#fff" />
    <circle cx="62" cy="50" r="7" fill="#fff" />
    <circle cx="40" cy="50.5" r="4.5" fill="#1a1a2e" />
    <circle cx="64" cy="50.5" r="4.5" fill="#1a1a2e" />
    <line x1="50" y1="25" x2="50" y2="15" stroke="#00BCD4" strokeWidth="3" />
    <circle cx="50" cy="12" r="5" fill="#00BCD4" />
  </svg>
);

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: accent ? "rgba(0,188,212,0.06)" : "#f8fafc",
      border: `1px solid ${accent ? "rgba(0,188,212,0.2)" : "#e2e8f0"}`,
      borderRadius: 14, padding: "24px 20px", textAlign: "center",
    }}>
      <div style={{ fontSize: 12, color: "#475569", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: accent ? 44 : 32, color: accent ? "#00BCD4" : "#1e293b", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 13, color: "#64748b", marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

function TakeawayIcon({ index }) {
  const icons = [
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  ];
  return icons[index % icons.length];
}

// ── Main component ───────────────────────────────────────────────────────────
export default function LiveDashboard() {
  const path   = window.location.pathname; // e.g. /finnair-sym-dashboard
  const slug   = path.replace(/^\//, "").replace(/-dashboard$/, ""); // finnair-sym
  const client = clients[slug];

  const [activeType,  setActiveType]  = useState(client?.assessments?.[0] || "team");
  const [loadStatus,  setLoadStatus]  = useState("idle"); // idle | loading | ai | ready | error
  const [errorMsg,    setErrorMsg]    = useState("");
  const [teamData,    setTeamData]    = useState([]);
  const [stats,       setStats]       = useState(null);
  const [aiContent,   setAiContent]   = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Load data whenever activeType changes
  useEffect(() => {
    if (!client) return;
    load();
  }, [activeType]);

  async function load() {
    setLoadStatus("loading");
    setTeamData([]);
    setStats(null);
    setAiContent(null);
    setErrorMsg("");

    try {
      const company  = client.name;
      const typeApi  = activeType.charAt(0).toUpperCase() + activeType.slice(1);
      const res      = await fetch(`/api/client-results?company=${encodeURIComponent(company)}&type=${typeApi}`);
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const raw = await res.json();

      if (raw.error || !Array.isArray(raw) || raw.length < 2) {
        throw new Error("No submissions found yet for this assessment.");
      }

      const headers = raw[0];
      const rows    = raw.slice(1);
      const parsed  = parseRows(headers, rows, activeType);

      if (!parsed.length) throw new Error("No valid participant data found.");

      const computedStats = buildStats(parsed, activeType);
      setTeamData(parsed);
      setStats(computedStats);
      setLastUpdated(new Date());

      // Now generate AI insights
      setLoadStatus("ai");
      const ai = await generateInsights(company, activeType, parsed, computedStats);
      setAiContent(ai);
      setLoadStatus("ready");

    } catch (e) {
      setErrorMsg(e.message);
      setLoadStatus("error");
    }
  }

  // ── Guard: unknown client ──────────────────────────────────────────────────
  if (!client) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif", background: "#f8fafc", padding: 24 }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#1e293b", marginBottom: 8 }}>Dashboard Not Found</h2>
          <p style={{ color: "#64748b" }}>No client configured for <code>{slug}</code>.</p>
        </div>
      </div>
    );
  }

  // ── Loading / AI generation state ─────────────────────────────────────────
  if (loadStatus === "loading" || loadStatus === "ai" || loadStatus === "idle") {
    const msg = loadStatus === "ai"
      ? "Generating insights from the latest results..."
      : "Fetching the latest results from the sheet...";
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif", background: "#f8fafc" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
        <div style={{ textAlign: "center" }}>
          <div style={{ marginBottom: 20 }}><RobotIcon size={48} /></div>
          <p style={{ color: "#475569", fontSize: 16 }}>{msg}</p>
          <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 6 }}>
            {[0,1,2].map((i) => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: "50%", background: "#00BCD4",
                animation: "pulse 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }} />
            ))}
          </div>
          <style>{`@keyframes pulse { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }`}</style>
        </div>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (loadStatus === "error") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif", background: "#f8fafc", padding: 24 }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{ marginBottom: 16 }}><RobotIcon size={40} /></div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#1e293b", marginBottom: 8 }}>Could Not Load Dashboard</h2>
          <p style={{ color: "#64748b", marginBottom: 20 }}>{errorMsg}</p>
          <button onClick={load} style={{ background: "#00BCD4", color: "#fff", border: "none",
            borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── Render dashboard ───────────────────────────────────────────────────────
  const cfg       = SECTION_CONFIG[activeType];
  const typeName  = activeType.charAt(0).toUpperCase() + activeType.slice(1);
  const typeLabel = `${typeName} AI Diagnostic`;

  const radarData = stats.sectionAvgs.map((s) => ({
    subject: s.label, team: s.avg, fullMark: cfg.max,
  }));

  const dateStr = lastUpdated
    ? lastUpdated.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
    : "";

  const range = `${Math.min(...teamData.map(d => d.total))} to ${Math.max(...teamData.map(d => d.total))}`;
  const summaryParagraphs = (aiContent?.summary || "").split("\n\n");

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#1e293b",
      fontFamily: "'DM Sans', sans-serif", padding: 0 }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 12mm 14mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
          body { margin: 0 !important; padding: 0 !important; }
          .print-page-break { page-break-before: always; break-before: page; }
          .no-break { page-break-inside: avoid; break-inside: avoid; }
          .no-print { display: none !important; }
        }
        @media screen {
          .print-page-break::before {
            content: ''; display: block;
            border-top: 2px dashed rgba(0,188,212,0.15);
            margin-bottom: 8px;
          }
        }
      `}} />

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, rgba(0,188,212,0.06) 0%, rgba(0,188,212,0.02) 100%)",
        borderBottom: "1px solid rgba(0,188,212,0.2)", padding: "32px 24px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Type tabs (only shown if client has multiple assessment types) */}
          {client.assessments.length > 1 && (
            <div className="no-print" style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {client.assessments.map((t) => (
                <button key={t} onClick={() => setActiveType(t)} style={{
                  padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer",
                  border: t === activeType ? "none" : "1px solid #e2e8f0",
                  background: t === activeType ? "#00BCD4" : "#fff",
                  color: t === activeType ? "#fff" : "#475569",
                }}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <RobotIcon size={28} />
            <span style={{ fontSize: 14, color: "#00BCD4", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>CoachBay.ai</span>
          </div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(26px, 4vw, 36px)",
            fontWeight: 400, color: "#1e293b", margin: "8px 0 6px", lineHeight: 1.2 }}>
            {typeLabel} Results
          </h1>
          <p style={{ fontSize: 22, color: "#334155", margin: "0 0 4px", fontWeight: 500 }}>{client.name}</p>
          <p style={{ fontSize: 14, color: "#475569", margin: 0 }}>
            {teamData.length} participant{teamData.length !== 1 ? "s" : ""} · Updated {dateStr}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 48px" }}>

        {/* Executive Summary */}
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14,
          padding: "24px 20px", marginBottom: 28 }} className="no-break">
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1e293b",
            margin: "0 0 12px", fontWeight: 400 }}>Executive Summary</h2>
          {summaryParagraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 15, color: "#334155", lineHeight: 1.65, margin: i > 0 ? "12px 0 0" : 0 }}>{p}</p>
          ))}
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16, marginBottom: 28 }}>
          <StatCard label="Group Average" value={stats.teamAvg}
            sub={`out of ${cfg.total} (${stats.teamPct}%)`} accent />
          <StatCard label="Score Range" value={range} sub="lowest to highest participant" />
          <StatCard label="Strongest Area"
            value={stats.highest.label}
            sub={`${stats.highest.avg} / ${cfg.max} avg`} />
          <StatCard label="Growth Opportunity"
            value={stats.lowest.label}
            sub={`${stats.lowest.avg} / ${cfg.max} avg`} />
        </div>

        {/* Tier distribution + Radar — 2 col on wide screens */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>

          {/* Tier distribution */}
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14, padding: "24px 20px" }} className="no-break">
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1e293b",
              margin: "0 0 20px", fontWeight: 400 }}>Where the Team Sits</h2>
            {stats.tierCounts.map((t) => (
              <div key={t.label} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: "#334155", fontWeight: 500 }}>{t.label}</span>
                  <span style={{ fontSize: 13, color: "#475569" }}>{t.count} {t.count === 1 ? "person" : "people"}</span>
                </div>
                <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 4, background: t.color,
                    width: teamData.length ? `${(t.count / teamData.length) * 100}%` : "0%",
                    transition: "width 0.6s ease",
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Radar chart */}
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14, padding: "24px 20px" }} className="no-break">
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1e293b",
              margin: "0 0 4px", fontWeight: 400 }}>Capability Profile</h2>
            <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 12px" }}>Team average across all dimensions</p>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#475569", fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, cfg.max]} tick={false} axisLine={false} />
                <Radar name="Team" dataKey="team" stroke="#00BCD4" fill="#00BCD4" fillOpacity={0.18} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Section breakdown */}
        <div className="print-page-break">
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14, padding: "24px 20px", marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1e293b",
              margin: "0 0 20px", fontWeight: 400 }}>Section Breakdown</h2>
            {stats.sectionAvgs.map((s) => (
              <div key={s.id} style={{ marginBottom: 20 }} className="no-break">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{s.label}</span>
                  <span style={{ fontSize: 13, color: "#475569" }}>avg {s.avg} / {cfg.max}</span>
                </div>
                {/* Bar showing min, avg, max */}
                <div style={{ position: "relative", height: 10, background: "#e2e8f0", borderRadius: 5, overflow: "hidden" }}>
                  {/* Range bar (min to max) */}
                  <div style={{
                    position: "absolute", height: "100%",
                    left: `${(s.min / cfg.max) * 100}%`,
                    width: `${((s.max - s.min) / cfg.max) * 100}%`,
                    background: "rgba(0,188,212,0.2)", borderRadius: 5,
                  }} />
                  {/* Avg marker */}
                  <div style={{
                    position: "absolute", top: 0, height: "100%", width: 3,
                    left: `${(s.avg / cfg.max) * 100}%`,
                    background: "#00BCD4", borderRadius: 2,
                  }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3, fontSize: 11, color: "#94a3b8" }}>
                  <span>Min {s.min}</span>
                  <span>Max {s.max}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="print-page-break">
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#1e293b",
            margin: "0 0 20px", fontWeight: 400 }}>Key Takeaways</h2>
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14, padding: "24px 20px", marginBottom: 28 }}>
            {(aiContent?.takeaways || []).map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: i < (aiContent?.takeaways?.length - 1) ? 28 : 0 }} className="no-break">
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  <TakeawayIcon index={i} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>{t.title}</div>
                  <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.65, margin: 0 }}>{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Next Steps */}
        <div style={{ background: "rgba(0,188,212,0.04)", border: "1px solid rgba(0,188,212,0.15)",
          borderRadius: 14, padding: "24px 20px", marginBottom: 28 }} className="no-break">
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1e293b",
            margin: "0 0 20px", fontWeight: 400 }}>Recommended Next Steps</h2>
          {(aiContent?.nextSteps || []).map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 16, marginBottom: i < (aiContent?.nextSteps?.length - 1) ? 18 : 0 }}>
              <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
                background: "#00BCD4", color: "#fff", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{i + 1}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", marginBottom: 3 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: "#334155", lineHeight: 1.6 }}>{s.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 20, display: "flex",
          justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <RobotIcon size={22} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>CoachBay<span style={{ color: "#00BCD4" }}>.ai</span></span>
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8" }}>
            AI Leadership Development · {teamData.length} participants · {dateStr}
          </div>
          <button className="no-print" onClick={() => window.print()}
            style={{ background: "#00BCD4", color: "#fff", border: "none", borderRadius: 8,
              padding: "8px 20px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            Print / Save PDF
          </button>
        </div>

      </div>
    </div>
  );
}
