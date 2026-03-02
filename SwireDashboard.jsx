import { useState } from "react";
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
  Tooltip,
  Cell,
} from "recharts";

const teamData = [
  { id: 1, total: 48, tier: "Untapped Potential", use: 9, frequency: 8, skills: 5, confidence: 14, impact: 12 },
  { id: 2, total: 109, tier: "AI-Fluent", use: 19, frequency: 24, skills: 18, confidence: 23, impact: 25 },
  { id: 3, total: 54, tier: "Early Days", use: 10, frequency: 5, skills: 11, confidence: 15, impact: 13 },
  { id: 4, total: 92, tier: "Building Momentum", use: 18, frequency: 18, skills: 17, confidence: 19, impact: 20 },
  { id: 5, total: 88, tier: "Building Momentum", use: 21, frequency: 15, skills: 20, confidence: 14, impact: 18 },
  { id: 6, total: 106, tier: "AI-Fluent", use: 24, frequency: 22, skills: 19, confidence: 21, impact: 20 },
  { id: 7, total: 99, tier: "Building Momentum", use: 20, frequency: 21, skills: 17, confidence: 20, impact: 21 },
  { id: 8, total: 112, tier: "AI-Fluent", use: 24, frequency: 23, skills: 19, confidence: 23, impact: 23 },
  { id: 9, total: 68, tier: "Early Days", use: 13, frequency: 10, skills: 11, confidence: 16, impact: 18 },
  { id: 10, total: 73, tier: "Early Days", use: 9, frequency: 13, skills: 17, confidence: 19, impact: 15 },
  { id: 11, total: 103, tier: "AI-Fluent", use: 22, frequency: 23, skills: 18, confidence: 20, impact: 20 },
];

const tierOrder = ["Untapped Potential", "Early Days", "Building Momentum", "AI-Fluent"];
const tierColors = {
  "Untapped Potential": "#ef4444",
  "Early Days": "#f59e0b",
  "Building Momentum": "#3b82f6",
  "AI-Fluent": "#00BCD4",
};

const sections = ["use", "frequency", "skills", "confidence", "impact"];
const sectionLabels = {
  use: "What They Use AI For",
  frequency: "How Often They Use AI",
  skills: "Tools & Skills",
  confidence: "Confidence & Openness",
  impact: "Impact & Growth",
};
const sectionShort = {
  use: "Usage Breadth",
  frequency: "Frequency",
  skills: "Skills",
  confidence: "Confidence",
  impact: "Impact",
};

const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const teamAvg = Math.round(avg(teamData.map((d) => d.total)) * 10) / 10;
const teamPct = Math.round((teamAvg / 125) * 100);

const tierCounts = tierOrder.map((t) => ({
  tier: t,
  count: teamData.filter((d) => d.tier === t).length,
  color: tierColors[t],
}));

const sectionAvgs = sections.map((s) => ({
  section: sectionShort[s],
  fullLabel: sectionLabels[s],
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

const sorted = [...teamData].sort((a, b) => a.total - b.total);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff",
      border: "1px solid rgba(0, 188, 212, 0.3)",
      borderRadius: 8,
      padding: "10px 14px",
      fontSize: 13,
      color: "#1e293b",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || "#00BCD4" }}>
          {p.name}: {p.value}/25
        </div>
      ))}
    </div>
  );
};

export default function TeamDashboard() {
  const [hoveredMember, setHoveredMember] = useState(null);

  const lowestSection = sectionAvgs.reduce((a, b) => (a.avg < b.avg ? a : b));
  const highestSection = sectionAvgs.reduce((a, b) => (a.avg > b.avg ? a : b));
  const gap = Math.round((highestSection.avg - lowestSection.avg) * 10) / 10;

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
          @page {
            size: A4;
            margin: 12mm 14mm;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body {
            margin: 0 !important;
            padding: 0 !important;
          }
          .print-page-break {
            page-break-before: always;
            break-before: page;
          }
          .no-break {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          /* Remove interactive states */
          div[style*="transition"] {
            transition: none !important;
          }
          /* Tighten spacing slightly for print */
          .print-compact {
            margin-bottom: 20px !important;
          }
        }
        /* Screen-only: subtle indicator that print is optimized */
        @media screen {
          .print-page-break::before {
            content: '';
            display: block;
            border-top: 2px dashed rgba(0,188,212,0.15);
            margin-bottom: 8px;
          }
        }
      `}} />

      {/* Header */}
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
            Team AI Readiness Dashboard
          </h1>
          <p style={{ fontSize: 17, color: "#334155", margin: "0 0 4px", fontWeight: 500 }}>
            Swire Hotels
          </p>
          <p style={{ fontSize: 15, color: "#475569", margin: "0 0 2px" }}>
            Prepared for Dean Winter, Managing Director
          </p>
          <p style={{ fontSize: 14, color: "#475569", margin: 0 }}>
            Personal AI Diagnostic results across 11 team members · March 2026
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
            Your team shows strong potential for AI adoption, with 4 of 11 members already AI-Fluent. Results varied across the group, with hotel-based roles generally scoring lower than head office colleagues, though adoption levels differ within both groups. The team's confidence and openness to AI is high. The gap is in practical skills and consistent usage, which presents a clear opportunity for targeted support. This sample of 11 represents an initial snapshot. A second group of 11 will complete the assessment at the end of March, which will give a fuller picture of AI readiness across the team.
          </p>
        </div>

        {/* Top Stats Row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}>
          {/* Team Average */}
          <div style={{
            background: "rgba(0,188,212,0.06)",
            border: "1px solid rgba(0,188,212,0.2)",
            borderRadius: 14,
            padding: "24px 20px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 13, color: "#475569", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Team Average</div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: "#00BCD4", lineHeight: 1 }}>
              {teamAvg}
            </div>
            <div style={{ fontSize: 14, color: "#475569", marginTop: 4 }}>out of 125 ({teamPct}%)</div>
          </div>

          {/* Score Range */}
          <div style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "24px 20px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 13, color: "#475569", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Score Range</div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: "#1e293b", lineHeight: 1 }}>
              {Math.min(...teamData.map(d => d.total))}–{Math.max(...teamData.map(d => d.total))}
            </div>
            <div style={{ fontSize: 14, color: "#475569", marginTop: 4 }}>
              {Math.max(...teamData.map(d => d.total)) - Math.min(...teamData.map(d => d.total))} point spread
            </div>
          </div>

          {/* Biggest Gap */}
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
              is the team's biggest growth area
            </div>
            <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>
              avg {lowestSection.avg}/25 vs {highestSection.avg}/25 for {highestSection.section}
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
                const pct = Math.round((count / 11) * 100);
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
                    <div style={{
                      height: 8,
                      background: "#e2e8f0",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}>
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
                {tierCounts.find(t => t.tier === "AI-Fluent").count} team members are AI-Fluent and could champion adoption.{" "}
                {tierCounts.find(t => t.tier === "Untapped Potential").count + tierCounts.find(t => t.tier === "Early Days").count} are
                in the earlier stages and would benefit from structured support.
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
              Team Capability Profile
            </h2>
            <p style={{ fontSize: 14, color: "#475569", margin: "0 0 4px" }}>Average scores across 5 dimensions (out of 25)</p>
            <ResponsiveContainer width="100%" height={380}>
              <RadarChart data={radarData} cx="50%" cy="52%" outerRadius="72%">
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#475569", fontSize: 14, fontWeight: 500 }}
                />
                <PolarRadiusAxis
                  domain={[0, 25]}
                  tick={false}
                  axisLine={false}
                  tickCount={6}
                />
                <Radar
                  name="Team Avg"
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

        {/* Individual Scores Bar Chart */}
        <div className="print-page-break">
        <div style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: "24px 20px",
          marginBottom: 28,
        }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1e293b", margin: "0 0 4px", fontWeight: 400 }}>
            Individual Scores
          </h2>
          <p style={{ fontSize: 13, color: "#475569", margin: "0 0 16px" }}>Each bar represents one team member (anonymized), colored by tier</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={sorted.map((d, i) => ({ name: `#${i + 1}`, total: d.total, tier: d.tier }))}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 12 }} axisLine={{ stroke: "#e2e8f0" }} />
              <YAxis domain={[0, 125]} tick={{ fill: "#475569", fontSize: 12 }} axisLine={{ stroke: "#e2e8f0" }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div style={{
                      background: "#fff",
                      border: `1px solid ${tierColors[d.tier]}60`,
                      borderRadius: 8,
                      padding: "10px 14px",
                      fontSize: 13,
                      color: "#1e293b",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}>
                      <div style={{ fontWeight: 600 }}>{d.name}: {d.total}/125</div>
                      <div style={{ color: tierColors[d.tier], marginTop: 2 }}>{d.tier}</div>
                    </div>
                  );
                }}
              />
              <Bar dataKey="total" radius={[6, 6, 0, 0]} maxBarSize={50}>
                {sorted.map((d, i) => (
                  <Cell key={i} fill={tierColors[d.tier]} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Average line label */}
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <span style={{ fontSize: 13, color: "#475569" }}>
              Team average: <span style={{ color: "#00BCD4", fontWeight: 600 }}>{teamAvg}</span>/125
            </span>
          </div>
        </div>

        {/* Section Deep Dive */}
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
          <p style={{ fontSize: 13, color: "#475569", margin: "0 0 20px" }}>Average, minimum, and maximum for each of the 5 assessed areas</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {sectionAvgs
              .sort((a, b) => a.avg - b.avg)
              .map((s) => {
                const pct = (s.avg / 25) * 100;
                const minPct = (s.min / 25) * 100;
                const maxPct = (s.max / 25) * 100;
                return (
                  <div key={s.key}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 14, color: "#334155", fontWeight: 500 }}>{s.fullLabel}</span>
                      <span style={{ fontSize: 14, color: "#00BCD4", fontWeight: 600 }}>{s.avg}/25</span>
                    </div>
                    <div style={{
                      position: "relative",
                      height: 12,
                      background: "#e2e8f0",
                      borderRadius: 6,
                      overflow: "visible",
                    }}>
                      {/* Range bar (min to max) */}
                      <div style={{
                        position: "absolute",
                        height: "100%",
                        left: `${minPct}%`,
                        width: `${maxPct - minPct}%`,
                        background: "rgba(0,188,212,0.15)",
                        borderRadius: 6,
                      }} />
                      {/* Average bar */}
                      <div style={{
                        position: "absolute",
                        height: "100%",
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, #00BCD4, #00BCD4cc)`,
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

        {/* Key Takeaways */}
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
                icon: <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><rect x="8" y="4" width="24" height="32" rx="2" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><rect x="13" y="10" width="5" height="5" rx="0.5" fill="#00BCD4"/><rect x="22" y="10" width="5" height="5" rx="0.5" fill="#00BCD4"/><rect x="13" y="19" width="5" height="5" rx="0.5" fill="#00BCD4"/><rect x="22" y="19" width="5" height="5" rx="0.5" fill="#00BCD4"/><rect x="16" y="29" width="8" height="7" rx="1" stroke="#00BCD4" strokeWidth="2" fill="none"/></svg>,
                title: "Adoption varies across the business",
                text: "Hotel-based staff in front desk and commercial roles scored lowest, while head office teams were generally further ahead. But this isn't a clean split. Adoption levels vary within both groups, which means the right approach is targeted, not blanket.",
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="12" r="5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><circle cx="9" cy="16" r="4" stroke="#00BCD4" strokeWidth="2" fill="none"/><circle cx="31" cy="16" r="4" stroke="#00BCD4" strokeWidth="2" fill="none"/><path d="M10 34c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M3 34c0-3.866 2.686-7 6-7" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" fill="none"/><path d="M37 34c0-3.866-2.686-7-6-7" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>,
                title: "Your AI champions are ready to lead",
                text: `${tierCounts.find(t => t.tier === "AI-Fluent").count} of 11 are AI-Fluent. These individuals already use AI daily and can mentor others. Identifying where they sit in the business will help you deploy their influence where it counts.`,
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><rect x="6" y="22" width="7" height="12" rx="1.5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><rect x="16.5" y="14" width="7" height="20" rx="1.5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><rect x="27" y="6" width="7" height="28" rx="1.5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/></svg>,
                title: "The willingness is there, the skills are not",
                text: `Confidence & Openness outscores Tools & Skills across the team (avg ${sectionAvgs.find(s => s.key === "confidence").avg}/25 vs ${sectionAvgs.find(s => s.key === "skills").avg}/25). People want to use AI but need practical training on how to get good results.`,
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><path d="M20 10v10l7 7" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                title: "Frequency is the biggest gap",
                text: `At ${sectionAvgs.find(s => s.key === "frequency").avg}/25, how often people use AI is the weakest area. Building a daily habit is the single most important step, and the key is connecting AI to tasks people already do, not adding new ones.`,
              },
              {
                icon: <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><rect x="4" y="6" width="20" height="16" rx="3" stroke="#00BCD4" strokeWidth="2.5" fill="none"/><rect x="16" y="18" width="20" height="16" rx="3" stroke="#00BCD4" strokeWidth="2.5" fill="none"/></svg>,
                title: "Your most advanced users have moved beyond Copilot",
                text: "Swire Hotels has invested in Copilot, but the highest-scoring team members are reaching for other tools like ChatGPT, Perplexity, and Grok to get their work done. This is a common pattern: when the official tool doesn't cover every use case, people find alternatives. It's worth understanding what they're using these tools for and whether Copilot is meeting the team's actual needs.",
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
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{
                width: 28, height: 28, borderRadius: "50%", background: "#00BCD4", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 700, flexShrink: 0, marginTop: 1,
              }}>1</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>Start where AI makes the biggest difference</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.55 }}>
                  Focus early AI efforts on the roles and tasks where productivity gains will be most visible. That may well be back office functions like marketing, finance, or commercial planning, where AI can accelerate work that directly supports the portfolio's growth.
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{
                width: 28, height: 28, borderRadius: "50%", background: "#00BCD4", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 700, flexShrink: 0, marginTop: 1,
              }}>2</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>Equip the willing</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.55 }}>
                  The team's confidence is high but skills are lagging. A practical workshop focused on prompting techniques and real use cases from their actual roles would convert enthusiasm into capability.
                </div>
              </div>
            </div>
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
            Personal AI Diagnostic — Team Report · coach@coachbay.ai
          </p>
        </div>
        </div>{/* end page 3 wrapper */}
      </div>
    </div>
  );
}
