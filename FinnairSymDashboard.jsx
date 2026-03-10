import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const teamData = [
  { id: 1, total: 61, tier: "Early Progress", integration: 10, depth: 14, deletion: 7, influence: 6, judgment: 14, environment: 10 },
  { id: 2, total: 98, tier: "AI Advanced", integration: 19, depth: 18, deletion: 17, influence: 15, judgment: 16, environment: 13 },
  { id: 3, total: 88, tier: "Gaining Momentum", integration: 14, depth: 16, deletion: 12, influence: 8, judgment: 19, environment: 19 },
  { id: 4, total: 70, tier: "Early Progress", integration: 12, depth: 10, deletion: 7, influence: 9, judgment: 16, environment: 16 },
  { id: 5, total: 83, tier: "Gaining Momentum", integration: 14, depth: 16, deletion: 9, influence: 12, judgment: 19, environment: 13 },
  { id: 6, total: 79, tier: "Gaining Momentum", integration: 16, depth: 17, deletion: 10, influence: 11, judgment: 14, environment: 11 },
  { id: 7, total: 70, tier: "Early Progress", integration: 12, depth: 12, deletion: 7, influence: 8, judgment: 18, environment: 13 },
  { id: 8, total: 94, tier: "Gaining Momentum", integration: 18, depth: 16, deletion: 13, influence: 14, judgment: 17, environment: 16 },
  { id: 9, total: 66, tier: "Early Progress", integration: 13, depth: 12, deletion: 10, influence: 8, judgment: 12, environment: 11 },
  { id: 10, total: 87, tier: "Gaining Momentum", integration: 14, depth: 15, deletion: 9, influence: 13, judgment: 20, environment: 16 },
];

const tierOrder = ["Early Progress", "Gaining Momentum", "AI Advanced"];
const tierColors = {
  "Early Progress": "#f59e0b",
  "Gaining Momentum": "#3b82f6",
  "AI Advanced": "#00BCD4",
};

const sections = ["integration", "depth", "deletion", "influence", "judgment", "environment"];
const sectionLabels = {
  integration: "Integration",
  depth: "Depth",
  deletion: "Deletion",
  influence: "Influence",
  judgment: "Judgment",
  environment: "Environment",
};

const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const teamAvg = Math.round(avg(teamData.map((d) => d.total)) * 10) / 10;

const tierCounts = tierOrder.map((t) => ({
  tier: t,
  count: teamData.filter((d) => d.tier === t).length,
  color: tierColors[t],
}));

const sectionAvgs = sections.map((s) => ({
  section: sectionLabels[s],
  key: s,
  avg: Math.round(avg(teamData.map((d) => d[s])) * 10) / 10,
  max: Math.max(...teamData.map((d) => d[s])),
  min: Math.min(...teamData.map((d) => d[s])),
  fullMark: 25,
}));

const radarData = sectionAvgs.map((s) => ({
  subject: s.section,
  team: s.avg,
  fullMark: 25,
}));

export default function FinnairSymDashboard() {
  const lowestSection = sectionAvgs.reduce((a, b) => (a.avg < b.avg ? a : b));
  const highestSection = sectionAvgs.reduce((a, b) => (a.avg > b.avg ? a : b));

  const sortedForChart = [...teamData].sort((a, b) => b.total - a.total);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#ffffff",
      color: "#1e293b",
      fontFamily: "'DM Sans', sans-serif",
      padding: 0,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 12mm 14mm; }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body { margin: 0 !important; padding: 0 !important; }
          .print-page-break {
            page-break-before: always;
            break-before: page;
          }
          .no-break {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .print-compact { margin-bottom: 20px !important; }
        }
        @media screen {
          .print-page-break::before {
            content: '';
            display: block;
            border-top: 2px dashed rgba(0,188,212,0.15);
            margin-bottom: 8px;
          }
        }
      `}} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div className="no-break" style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="28" height="28" viewBox="0 0 100 100">
                <circle cx="50" cy="55" r="30" fill="#00BCD4" />
                <circle cx="38" cy="50" r="7" fill="#fff" />
                <circle cx="62" cy="50" r="7" fill="#fff" />
                <circle cx="40" cy="51" r="4" fill="#1a1a2e" />
                <circle cx="64" cy="51" r="4" fill="#1a1a2e" />
                <line x1="50" y1="25" x2="50" y2="15" stroke="#00BCD4" strokeWidth="3" />
                <circle cx="50" cy="12" r="5" fill="#00BCD4" />
              </svg>
              <span style={{ color: "#00BCD4", fontWeight: 700, fontSize: 16, letterSpacing: "0.02em" }}>CoachBay.ai</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>CONFIDENTIAL</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>March 2026</div>
            </div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
            borderRadius: 16,
            padding: "28px 28px 24px",
            color: "#ffffff",
          }}>
            <div style={{ fontSize: 12, color: "#00BCD4", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
              AI Leadership Diagnostic
            </div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, fontWeight: 400, margin: "0 0 6px", color: "#ffffff" }}>
              Finnair Leadership Team
            </h1>
            <div style={{ fontSize: 15, color: "#94a3b8", marginBottom: 16 }}>
              Prepared for Simon Large, Chief Customer Officer
            </div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(245,158,11,0.15)",
              border: "1px solid rgba(245,158,11,0.3)",
              borderRadius: 8,
              padding: "5px 12px",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#f59e0b" strokeWidth="2"/><path d="M12 7v5l3 3" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/></svg>
              <span style={{ fontSize: 13, color: "#f59e0b", fontWeight: 500 }}>Interim report: 10 of 20 participants</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="no-break" style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: "20px 20px",
          marginBottom: 20,
        }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1e293b", margin: "0 0 10px", fontWeight: 400 }}>
            Executive Summary
          </h2>
          <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.65, margin: 0 }}>
            With a group average of <strong style={{ color: "#1e293b" }}>{teamAvg}/125</strong>, the first cohort of Finnair leaders is solidly in the
            Gaining Momentum tier, past the stage of curiosity and into genuine use. The strongest dimension
            is <strong style={{ color: "#1e293b" }}>Judgment</strong> ({highestSection.avg}/25): these leaders can evaluate AI output critically and use it as a thinking
            partner rather than an answer machine. The biggest growth opportunity lies in <strong style={{ color: "#1e293b" }}>Deletion</strong> ({lowestSection.avg}/25)
            and <strong style={{ color: "#1e293b" }}>Influence</strong>: using AI to actively reduce workload and to visibly model AI adoption for their teams.
            These are the dimensions that convert personal AI use into organizational impact.
            This report will be updated when the remaining 10 participants complete the assessment.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="no-break print-compact" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
          {[
            {
              label: "Group Average",
              value: `${teamAvg}`,
              sub: "out of 125",
              color: "#00BCD4",
              icon: <svg width="24" height="24" viewBox="0 0 40 40" fill="none"><rect x="6" y="22" width="7" height="12" rx="1.5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><rect x="16.5" y="14" width="7" height="20" rx="1.5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><rect x="27" y="6" width="7" height="28" rx="1.5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/></svg>,
            },
            {
              label: "Score Range",
              value: `${Math.min(...teamData.map(d => d.total))}–${Math.max(...teamData.map(d => d.total))}`,
              sub: "first 10 participants",
              color: "#3b82f6",
              icon: <svg width="24" height="24" viewBox="0 0 40 40" fill="none"><path d="M8 20h24M20 8l12 12-12 12" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>,
            },
            {
              label: "Biggest Gap",
              value: "Deletion",
              sub: `avg ${sectionAvgs.find(s => s.key === "deletion").avg}/25`,
              color: "#f59e0b",
              icon: <svg width="24" height="24" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="#f59e0b" strokeWidth="2.5" fill="none"/><path d="M20 12v8l5 5" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            },
          ].map((card, i) => (
            <div key={i} style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderTop: `3px solid ${card.color}`,
              borderRadius: 12,
              padding: "16px 16px 14px",
            }}>
              <div style={{ marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: card.color, lineHeight: 1 }}>{card.value}</div>
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3, fontWeight: 500 }}>{card.sub.toUpperCase()}</div>
              <div style={{ fontSize: 13, color: "#475569", marginTop: 6, fontWeight: 500 }}>{card.label}</div>
            </div>
          ))}
        </div>

        {/* Tier Distribution + Radar */}
        <div className="no-break print-compact" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>

          {/* Tier Distribution */}
          <div style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "18px 18px",
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", margin: "0 0 14px" }}>Tier Distribution</h3>
            {tierOrder.slice().reverse().map((t) => {
              const count = tierCounts.find(tc => tc.tier === t).count;
              const pct = Math.round((count / teamData.length) * 100);
              return (
                <div key={t} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: tierColors[t] }} />
                      <span style={{ fontSize: 13, color: "#1e293b", fontWeight: 500 }}>{t}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: tierColors[t] }}>{count}</span>
                  </div>
                  <div style={{ height: 6, background: "#f1f5f9", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: tierColors[t], borderRadius: 3, transition: "width 0.5s ease" }} />
                  </div>
                </div>
              );
            })}
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>
                {tierCounts.find(t => t.tier === "Gaining Momentum").count} of {teamData.length} leaders are Gaining Momentum or above
              </div>
            </div>
          </div>

          {/* Radar */}
          <div style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "18px 18px",
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", margin: "0 0 6px" }}>Group Profile</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#64748b", fontFamily: "DM Sans" }} />
                <PolarRadiusAxis domain={[0, 25]} tick={false} axisLine={false} />
                <Radar name="Group" dataKey="team" stroke="#00BCD4" fill="#00BCD4" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ---- PAGE 2 ---- */}
        <div className="print-page-break" />
        <div style={{ paddingTop: 8 }}>

          {/* Section Breakdown */}
          <div className="no-break" style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "20px 20px",
            marginBottom: 20,
          }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1e293b", margin: "0 0 16px", fontWeight: 400 }}>
              Section Breakdown
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {sectionAvgs.map((s) => {
                const pct = Math.round((s.avg / 25) * 100);
                const isHighest = s.key === highestSection.key;
                const isLowest = s.key === lowestSection.key;
                return (
                  <div key={s.key} style={{
                    background: isHighest ? "rgba(0,188,212,0.04)" : isLowest ? "rgba(245,158,11,0.04)" : "#fafafa",
                    border: `1px solid ${isHighest ? "rgba(0,188,212,0.2)" : isLowest ? "rgba(245,158,11,0.2)" : "#f1f5f9"}`,
                    borderRadius: 10,
                    padding: "12px 14px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{s.section}</span>
                        {isHighest && <span style={{ fontSize: 11, color: "#00BCD4", fontWeight: 600, background: "rgba(0,188,212,0.1)", padding: "1px 7px", borderRadius: 4 }}>STRONGEST</span>}
                        {isLowest && <span style={{ fontSize: 11, color: "#f59e0b", fontWeight: 600, background: "rgba(245,158,11,0.1)", padding: "1px 7px", borderRadius: 4 }}>FOCUS AREA</span>}
                      </div>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: "#94a3b8" }}>min {s.min} · max {s.max}</span>
                        <span style={{ fontSize: 16, fontWeight: 700, color: isHighest ? "#00BCD4" : isLowest ? "#f59e0b" : "#1e293b", minWidth: 32, textAlign: "right" }}>{s.avg}</span>
                      </div>
                    </div>
                    <div style={{ height: 6, background: "#f1f5f9", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: isHighest ? "#00BCD4" : isLowest ? "#f59e0b" : "#3b82f6", borderRadius: 3 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Individual Scores */}
          <div className="no-break" style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "20px 20px",
            marginBottom: 20,
          }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1e293b", margin: "0 0 6px", fontWeight: 400 }}>
              Individual Scores
            </h2>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 14px" }}>Ranked by total score. Participants anonymised.</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={sortedForChart} margin={{ top: 4, right: 10, bottom: 4, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="id" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => `#${v}`} />
                <YAxis domain={[0, 125]} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <Bar dataKey="total" radius={[4, 4, 0, 0]} fill="#00BCD4"
                  label={{ position: "top", fontSize: 10, fill: "#64748b" }}
                  shape={(props) => {
                    const { x, y, width, height, value } = props;
                    const tier = teamData.find(d => d.total === value)?.tier;
                    const color = tierColors[tier] || "#00BCD4";
                    return <rect x={x} y={y} width={width} height={height} fill={color} rx={4} ry={4} />;
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 10 }}>
              {tierOrder.slice().reverse().map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: tierColors[t] }} />
                  <span style={{ fontSize: 11, color: "#64748b" }}>{t} ({tierCounts.find(tc => tc.tier === t).count})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- PAGE 3 ---- */}
        <div className="print-page-break" />
        <div style={{ paddingTop: 8 }}>

          {/* Key Takeaways */}
          <div className="no-break" style={{
            background: "linear-gradient(135deg, rgba(0,188,212,0.08) 0%, rgba(0,188,212,0.02) 100%)",
            border: "1px solid rgba(0,188,212,0.2)",
            borderRadius: 14,
            padding: "24px 20px",
            marginBottom: 24,
          }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1e293b", margin: "0 0 16px", fontWeight: 400 }}>
              Key Takeaways
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  icon: <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><rect x="6" y="22" width="7" height="12" rx="1.5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><rect x="16.5" y="14" width="7" height="20" rx="1.5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><rect x="27" y="6" width="7" height="28" rx="1.5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/></svg>,
                  title: "A solid start from the first cohort",
                  text: `The group average of ${teamAvg}/125 places this cohort firmly in the Gaining Momentum tier. ${tierCounts.find(t => t.tier === "Gaining Momentum").count} of ${teamData.length} leaders are already using AI regularly, with one reaching the AI Advanced tier. This is a strong base to build from. The full picture will sharpen once the remaining 10 participants complete the assessment.`,
                },
                {
                  icon: <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><path d="M20 8l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" stroke="#00BCD4" strokeWidth="2.5" fill="none" strokeLinejoin="round"/></svg>,
                  title: "Critical judgment is the standout strength",
                  text: `Judgment is the highest-scoring dimension at ${sectionAvgs.find(s => s.key === "judgment").avg}/25. These leaders can evaluate AI output, recognise when it falls short, and use it as a starting point rather than an authority. That discernment is the foundation for safe, high-value AI use in a leadership context and it is not something most teams start with.`,
                },
                {
                  icon: <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><path d="M10 30V16l10-8 10 8v14" stroke="#00BCD4" strokeWidth="2.5" fill="none" strokeLinejoin="round"/><rect x="16" y="22" width="8" height="8" rx="1" stroke="#00BCD4" strokeWidth="2" fill="none"/></svg>,
                  title: "Deletion and Influence are the biggest opportunities",
                  text: `Deletion (${sectionAvgs.find(s => s.key === "deletion").avg}/25) and Influence (${sectionAvgs.find(s => s.key === "influence").avg}/25) are significantly weaker than other dimensions. Leaders are using AI to support their own thinking but are not yet actively using it to cut unnecessary work or to visibly demonstrate AI use to their teams. These are the dimensions with the highest leadership leverage.`,
                },
                {
                  icon: <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="12" r="5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><circle cx="9" cy="16" r="4" stroke="#00BCD4" strokeWidth="2" fill="none"/><circle cx="31" cy="16" r="4" stroke="#00BCD4" strokeWidth="2" fill="none"/><path d="M10 34c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M3 34c0-3.866 2.686-7 6-7" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" fill="none"/><path d="M37 34c0-3.866-2.686-7-6-7" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>,
                  title: "One clear AI champion in this cohort",
                  text: `One leader has reached the AI Advanced tier with a score of 98, showing strong results across all six dimensions. This individual is the most experienced AI user in the current cohort and is a natural candidate to lead peer learning. Their habits, workflows, and prompting practices are worth making visible to the rest of the group.`,
                },
                {
                  icon: <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><path d="M20 10v10l7 7" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                  title: "Integration and Depth are growing but uneven",
                  text: `Integration (${sectionAvgs.find(s => s.key === "integration").avg}/25) and Depth (${sectionAvgs.find(s => s.key === "depth").avg}/25) show the widest score range within the group, with some leaders well ahead of others on how broadly and deeply they use AI. This uneven distribution suggests peer learning would be highly effective: the leaders already doing this well can accelerate the rest.`,
                },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.55 }}>{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Next Steps */}
          <div style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "24px 20px",
            marginBottom: 28,
          }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1e293b", margin: "0 0 16px", fontWeight: 400 }}>
              Recommended Next Steps
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  title: "Activate your AI champion now",
                  text: "The one AI Advanced leader in this cohort is ready to help others. Consider forming a small Pilot Squad (a group of 5 to 10 early adopters working on a real challenge together with AI). Pilot Squads create visible proof of what is possible and accelerate adoption far more effectively than mandatory training programs.",
                },
                {
                  title: "Make Deletion a leadership habit",
                  text: "Deletion is the weakest dimension and it is also the most distinctly leadership-oriented one. Run a short exercise where each leader asks AI to audit one of their regular meetings, reports, or processes and identify what could be removed or simplified. This builds the habit of using AI to cut, not just to add, and signals to teams that AI is a tool for clarity, not complexity.",
                },
                {
                  title: "Wait for the full cohort before drawing final conclusions",
                  text: "This interim report covers 10 of 20 participants. The second cohort may shift the tier distribution and section averages meaningfully. A final combined report will give a more complete picture for planning a team-wide AI program. In the meantime, the patterns above are strong enough to begin targeted conversations.",
                },
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: "50%", background: "#00BCD4", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 700, flexShrink: 0, marginTop: 1,
                  }}>{i + 1}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>{step.title}</div>
                    <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.55 }}>{step.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{
            textAlign: "center",
            padding: "20px 0 0",
            borderTop: "1px solid #e2e8f0",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
              <svg width="20" height="20" viewBox="0 0 100 100">
                <circle cx="50" cy="55" r="30" fill="#00BCD4" />
                <circle cx="38" cy="50" r="7" fill="#fff" />
                <circle cx="62" cy="50" r="7" fill="#fff" />
                <circle cx="40" cy="51" r="4" fill="#1a1a2e" />
                <circle cx="64" cy="51" r="4" fill="#1a1a2e" />
                <line x1="50" y1="25" x2="50" y2="15" stroke="#00BCD4" strokeWidth="3" />
                <circle cx="50" cy="12" r="5" fill="#00BCD4" />
              </svg>
              <span style={{ color: "#00BCD4", fontWeight: 600, fontSize: 14 }}>CoachBay.ai</span>
            </div>
            <p style={{ fontSize: 13, color: "#475569", margin: 0 }}>
              AI Leadership Diagnostic · Interim Report · Finnair · coach@coachbay.ai
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
