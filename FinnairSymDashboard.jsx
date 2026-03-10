import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
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
const teamPct = Math.round((teamAvg / 120) * 100);

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
  fullMark: 20,
}));

const radarData = sectionAvgs.map((s) => ({
  subject: s.section,
  team: s.avg,
  fullMark: 20,
}));

export default function FinnairSymDashboard() {
  const lowestSection = sectionAvgs.reduce((a, b) => (a.avg < b.avg ? a : b));
  const highestSection = sectionAvgs.reduce((a, b) => (a.avg > b.avg ? a : b));

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

      {/* Header — matches Swire Properties style */}
      <div style={{
        background: "linear-gradient(135deg, rgba(0,188,212,0.06) 0%, rgba(0,188,212,0.02) 100%)",
        borderBottom: "1px solid rgba(0,188,212,0.2)",
        padding: "32px 24px 28px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <svg width="28" height="28" viewBox="0 0 100 100">
              <circle cx="50" cy="55" r="30" fill="#00BCD4" />
              <circle cx="38" cy="50" r="7" fill="#fff" />
              <circle cx="62" cy="50" r="7" fill="#fff" />
              <circle cx="40" cy="51" r="4" fill="#1a1a2e" />
              <circle cx="64" cy="51" r="4" fill="#1a1a2e" />
              <line x1="50" y1="25" x2="50" y2="15" stroke="#00BCD4" strokeWidth="3" />
              <circle cx="50" cy="12" r="5" fill="#00BCD4" />
            </svg>
            <span style={{ fontSize: 14, color: "#00BCD4", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>CoachBay.ai</span>
          </div>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(26px, 4vw, 36px)",
            fontWeight: 400,
            color: "#1e293b",
            margin: "8px 0 6px",
            lineHeight: 1.2,
          }}>
            Team AI Readiness Report
          </h1>
          <p style={{ fontSize: 22, color: "#334155", margin: "0 0 4px", fontWeight: 500 }}>
            Finnair
          </p>
          <p style={{ fontSize: 15, color: "#475569", margin: "0 0 2px" }}>
            Prepared for Simon Large, Chief Customer Officer
          </p>
          <p style={{ fontSize: 14, color: "#475569", margin: 0 }}>
            AI Leadership Diagnostic results across 10 of 20 participants · March 2026 · Interim report
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 48px" }}>

        {/* Executive Summary */}
        <div style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: "24px 20px",
          marginBottom: 28,
        }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1e293b", margin: "0 0 12px", fontWeight: 400 }}>
            Executive Summary
          </h2>
          <p style={{ fontSize: 15, color: "#334155", lineHeight: 1.65, margin: 0 }}>
            The first cohort of 10 Finnair leaders shows a group average of {teamAvg}/120, placing the team solidly in the Gaining Momentum tier. Five leaders are Gaining Momentum, four are at Early Progress, and one has reached AI Advanced. The strongest dimension is Judgment ({highestSection.avg}/20): this group can evaluate AI output critically and use it as a thinking partner rather than an answer machine. The biggest growth opportunity lies in Deletion ({lowestSection.avg}/20) and Influence, the dimensions where personal AI use converts into visible leadership impact. This report covers the first 10 participants. It will be updated once the remaining 10 complete the assessment.
          </p>
        </div>

        {/* Top Stats Row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}>
          <div style={{
            background: "rgba(0,188,212,0.06)",
            border: "1px solid rgba(0,188,212,0.2)",
            borderRadius: 14,
            padding: "24px 20px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 13, color: "#475569", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Group Average</div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: "#00BCD4", lineHeight: 1 }}>
              {teamAvg}
            </div>
            <div style={{ fontSize: 14, color: "#475569", marginTop: 4 }}>out of 120 ({teamPct}%)</div>
          </div>

          <div style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "24px 20px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 13, color: "#475569", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Score Range</div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: "#1e293b", lineHeight: 1 }}>
              {Math.min(...teamData.map(d => d.total))}&ndash;{Math.max(...teamData.map(d => d.total))}
            </div>
            <div style={{ fontSize: 14, color: "#475569", marginTop: 4 }}>
              {Math.max(...teamData.map(d => d.total)) - Math.min(...teamData.map(d => d.total))} point spread
            </div>
          </div>

          <div style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "24px 20px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 13, color: "#475569", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Key Insight</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: "#f59e0b", lineHeight: 1.3, marginBottom: 6 }}>
              {lowestSection.section}
            </div>
            <div style={{ fontSize: 14, color: "#334155" }}>
              is the biggest growth area
            </div>
            <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>
              avg {lowestSection.avg}/20 vs {highestSection.avg}/20 for {highestSection.section}
            </div>
          </div>
        </div>

        {/* Tier Distribution + Radar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: 20,
          marginBottom: 28,
        }}>
          {/* Tier Distribution */}
          <div style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "24px 20px",
          }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1e293b", margin: "0 0 20px", fontWeight: 400 }}>
              Where the Team Sits
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {tierOrder.map((t) => {
                const count = tierCounts.find((tc) => tc.tier === t).count;
                const pct = Math.round((count / teamData.length) * 100);
                return (
                  <div key={t}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                      <span style={{ fontSize: 14, color: "#334155", fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 10, height: 10, borderRadius: "50%", background: tierColors[t], display: "inline-block", flexShrink: 0 }} />
                        {t}
                      </span>
                      <span style={{ fontSize: 14, color: tierColors[t], fontWeight: 600 }}>
                        {count} {count === 1 ? "person" : "people"} ({pct}%)
                      </span>
                    </div>
                    <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{
                        height: "100%",
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${tierColors[t]}, ${tierColors[t]}cc)`,
                        borderRadius: 4,
                        transition: "width 1s ease",
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{
              marginTop: 20,
              padding: "14px 16px",
              background: "rgba(0,188,212,0.06)",
              borderRadius: 10,
              border: "1px solid rgba(0,188,212,0.12)",
            }}>
              <div style={{ fontSize: 13, color: "#475569", marginBottom: 4 }}>Summary</div>
              <div style={{ fontSize: 14, color: "#334155", lineHeight: 1.5 }}>
                {tierCounts.find(t => t.tier === "AI Advanced").count} leader has reached AI Advanced and could champion adoption.{" "}
                {tierCounts.find(t => t.tier === "Early Progress").count} are at Early Progress and would benefit from structured support.
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "24px 20px",
          }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1e293b", margin: "0 0 8px", fontWeight: 400 }}>
              Group Capability Profile
            </h2>
            <p style={{ fontSize: 14, color: "#475569", margin: "0 0 4px" }}>Average scores across 6 dimensions (out of 20)</p>
            <ResponsiveContainer width="100%" height={380}>
              <RadarChart data={radarData} cx="50%" cy="52%" outerRadius="50%">
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#475569", fontSize: 12, fontWeight: 500 }}
                />
                <PolarRadiusAxis
                  domain={[0, 20]}
                  tick={false}
                  axisLine={false}
                  tickCount={5}
                />
                <Radar
                  name="Group Avg"
                  dataKey="team"
                  stroke="#00BCD4"
                  fill="#00BCD4"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Section Breakdown — page 2 */}
        <div className="print-page-break">
        <div style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: "24px 20px",
          marginBottom: 28,
        }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1e293b", margin: "0 0 4px", fontWeight: 400 }}>
            Section Breakdown
          </h2>
          <p style={{ fontSize: 13, color: "#475569", margin: "0 0 20px" }}>Average, minimum, and maximum for each of the 6 assessed dimensions</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {sectionAvgs
              .slice()
              .sort((a, b) => a.avg - b.avg)
              .map((s) => {
                const pct = (s.avg / 20) * 100;
                const minPct = (s.min / 20) * 100;
                const maxPct = (s.max / 20) * 100;
                return (
                  <div key={s.key}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 14, color: "#334155", fontWeight: 500 }}>{s.section}</span>
                      <span style={{ fontSize: 14, color: "#00BCD4", fontWeight: 600 }}>{s.avg}/20</span>
                    </div>
                    <div style={{
                      position: "relative",
                      height: 12,
                      background: "#e2e8f0",
                      borderRadius: 6,
                      overflow: "visible",
                    }}>
                      <div style={{
                        position: "absolute",
                        height: "100%",
                        left: `${minPct}%`,
                        width: `${maxPct - minPct}%`,
                        background: "rgba(0,188,212,0.15)",
                        borderRadius: 6,
                      }} />
                      <div style={{
                        position: "absolute",
                        height: "100%",
                        width: `${pct}%`,
                        background: "linear-gradient(90deg, #00BCD4, #00BCD4cc)",
                        borderRadius: 6,
                        opacity: 0.7,
                      }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                      <span style={{ fontSize: 12, color: "#475569" }}>Low: {s.min}</span>
                      <span style={{ fontSize: 12, color: "#475569" }}>High: {s.max}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        </div>{/* end page 2 wrapper */}

        {/* Key Takeaways — page 3 */}
        <div className="print-page-break">
        <div style={{
          background: "linear-gradient(135deg, rgba(0,188,212,0.08) 0%, rgba(0,188,212,0.02) 100%)",
          border: "1px solid rgba(0,188,212,0.2)",
          borderRadius: 14,
          padding: "24px 20px",
          marginBottom: 28,
        }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1e293b", margin: "0 0 16px", fontWeight: 400 }}>
            Key Takeaways
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              {
                icon: <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><rect x="6" y="22" width="7" height="12" rx="1.5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><rect x="16.5" y="14" width="7" height="20" rx="1.5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><rect x="27" y="6" width="7" height="28" rx="1.5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/></svg>,
                title: "A solid start from the first cohort",
                text: `The group average of ${teamAvg}/120 places this cohort firmly in the Gaining Momentum tier. ${tierCounts.find(t => t.tier === "Gaining Momentum").count} of ${teamData.length} leaders are already using AI regularly, with one reaching the AI Advanced tier. This is a strong base to build from. The full picture will sharpen once the remaining 10 participants complete the assessment.`,
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><path d="M20 8l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" stroke="#00BCD4" strokeWidth="2.5" fill="none" strokeLinejoin="round"/></svg>,
                title: "Critical judgment is the standout strength",
                text: `Judgment is the highest-scoring dimension at ${sectionAvgs.find(s => s.key === "judgment").avg}/20. These leaders can evaluate AI output, recognise when it falls short, and use it as a starting point rather than an authority. That discernment is the foundation for safe, high-value AI use in a leadership context and it is not something most teams start with.`,
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><path d="M20 10v10l7 7" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                title: "Deletion and Influence are the biggest opportunities",
                text: `Deletion (${sectionAvgs.find(s => s.key === "deletion").avg}/20) and Influence (${sectionAvgs.find(s => s.key === "influence").avg}/20) are the weakest dimensions. Leaders are using AI to support their own thinking but are not yet actively using it to cut unnecessary work or to visibly demonstrate AI use to their teams. These are the dimensions with the highest leadership leverage.`,
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="12" r="5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><circle cx="9" cy="16" r="4" stroke="#00BCD4" strokeWidth="2" fill="none"/><circle cx="31" cy="16" r="4" stroke="#00BCD4" strokeWidth="2" fill="none"/><path d="M10 34c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M3 34c0-3.866 2.686-7 6-7" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" fill="none"/><path d="M37 34c0-3.866-2.686-7-6-7" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>,
                title: "One clear AI champion in this cohort",
                text: "One leader has reached the AI Advanced tier with a score of 98, showing strong results across all six dimensions. This individual is the most experienced AI user in the current cohort and is a natural candidate to lead peer learning. Their habits, workflows, and prompting practices are worth making visible to the rest of the group.",
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><rect x="4" y="6" width="20" height="16" rx="3" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><rect x="16" y="18" width="20" height="16" rx="3" stroke="#00BCD4" strokeWidth="2.5" fill="none"/></svg>,
                title: "Integration and Depth are uneven across the group",
                text: `Integration (${sectionAvgs.find(s => s.key === "integration").avg}/20) and Depth (${sectionAvgs.find(s => s.key === "depth").avg}/20) show the widest score range within the group, with some leaders well ahead of others. This uneven distribution suggests peer learning would be highly effective: the leaders already doing this well can accelerate the rest without adding formal training burden.`,
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
        </div>{/* end page 3 wrapper */}

      </div>
    </div>
  );
}
