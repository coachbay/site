import { useState } from "react";

const CYAN = "#00BCD4";

const RobotIcon = ({ size = 72 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="55" r="30" fill="#00BCD4"/>
    <circle cx="38" cy="50" r="7" fill="#fff"/>
    <circle cx="62" cy="50" r="7" fill="#fff"/>
    <circle cx="40" cy="50.5" r="4.5" fill="#1a1a2e"/>
    <circle cx="64" cy="50.5" r="4.5" fill="#1a1a2e"/>
    <line x1="50" y1="25" x2="50" y2="15" stroke="#00BCD4" strokeWidth="3"/>
    <circle cx="50" cy="12" r="5" fill="#00BCD4"/>
  </svg>
);

const CompanyIcon = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <rect x="10" y="6" width="20" height="28" rx="2" stroke="#00BCD4" strokeWidth="2.5" fill="none"/>
    <rect x="15" y="11" width="4" height="4" rx="0.5" fill="#00BCD4"/>
    <rect x="21" y="11" width="4" height="4" rx="0.5" fill="#00BCD4"/>
    <rect x="15" y="18" width="4" height="4" rx="0.5" fill="#00BCD4"/>
    <rect x="21" y="18" width="4" height="4" rx="0.5" fill="#00BCD4"/>
    <rect x="17" y="27" width="6" height="7" rx="1" stroke="#00BCD4" strokeWidth="2" fill="none"/>
  </svg>
);

const LeaderIcon = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="14" r="7" stroke="#00BCD4" strokeWidth="2.5" fill="none"/>
    <path d="M7 37c0-7.18 5.82-13 13-13s13 5.82 13 13" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const TeamIcon = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="12" r="5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/>
    <circle cx="9" cy="16" r="4" stroke="#00BCD4" strokeWidth="2" fill="none"/>
    <circle cx="31" cy="16" r="4" stroke="#00BCD4" strokeWidth="2" fill="none"/>
    <path d="M10 30c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M3 30c0-3.866 2.686-7 6-7" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M37 30c0-3.866-2.686-7-6-7" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

const sprints = [
  {
    id: "manifesto", num: "1",
    line1: "Manifesto", line2: "Workshop", tagline: "for direction",
    detail: "Two sessions for organizations with 50+ employees.",
    description: "A small team of AI active employees builds the first draft. Senior leaders shape the vision, make key decisions, and sign off. Two sessions, one manifesto. Not a policy. A call to action.",
    pdf: "/CoachBay_Manifesto_Workshop.pdf",
    dlLabel: "Download Workshop Overview",
  },
  {
    id: "leadership", num: "2",
    line1: "Leadership", line2: "Sprint", tagline: "for leading",
    detail: "Half day sprint for senior managers and executives.",
    description: "Hold up a mirror, then build habits. Start with the AI Leader Assessment to see where you really stand, then make the shift from a leader who uses AI to an AI leader. Research shows this can jump team adoption from 15% to 55%.",
    pdf: "/CoachBay_Leadership_Sprint.pdf",
    dlLabel: "Download Sprint Overview",
  },
  {
    id: "strategy", num: "3",
    line1: "Strategy", line2: "Sprint", tagline: "for thinking",
    detail: "Half day sprint for senior managers and executives.",
    description: "Use AI as a thinking partner on the decisions that actually matter. For leaders who want AI to sharpen their judgment, not just save time.",
    pdf: "/CoachBay_Strategy_Sprint.pdf",
    dlLabel: "Download Sprint Overview",
  },
  {
    id: "core", num: "4",
    line1: "Core", line2: "Sprint", tagline: "for skills",
    detail: "Half day sprint for managers, team leads, and specialists.",
    description: "Discover four AI roles that go far beyond basic chat. For anyone still using AI mainly as an assistant who wants to unlock its real potential.",
    pdf: "/CoachBay_Core_Sprint.pdf",
    dlLabel: "Download Sprint Overview",
  },
  {
    id: "cutcreate", num: "5",
    line1: "Cut & Create", line2: "Sprint", tagline: "for focus",
    detail: "Half day sprint for managers, team leads, and specialists.",
    description: "Identify what to stop and what to start. Two structured exercises using original canvas tools to ensure AI adoption is not just about efficiency but about building something new.",
    pdf: "/CoachBay_Cut_Create_Sprint.pdf",
    dlLabel: "Download Sprint Overview",
  },
  {
    id: "project", num: "6",
    line1: "Project", line2: "Sprint", tagline: "for results",
    detail: "Half day sprint for cross functional project teams.",
    description: "Bring a real business challenge and work through it as a cross functional team with AI as your thinking partner. The right people in the room, combined with the right AI tools, to find new and better ways forward.",
    pdf: "/CoachBay_Project_Sprint.pdf",
    dlLabel: "Download Sprint Overview",
  },
];

const diagnostics = [
  {
    id: "company", icon: <CompanyIcon />,
    label: "FOR COMPANIES", subtitle: "AI Readiness Diagnostic",
    description: "See where your organization actually stands with AI across five dimensions. So you can decide what to focus on next.",
    detail: "25 questions \u00b7 10 minutes",
  },
  {
    id: "leader", icon: <LeaderIcon />,
    label: "FOR LEADERS", subtitle: "AI Leadership Diagnostic",
    description: "How is AI changing how you lead? Assess how you use AI, enable your team, and create the conditions for adoption.",
    detail: "24 questions \u00b7 8 minutes",
  },
  {
    id: "team", icon: <TeamIcon />,
    label: "FOR INDIVIDUALS", subtitle: "Personal AI Diagnostic",
    description: "How are you using AI day to day? Discover where you stand and what to focus on next.",
    detail: "24 questions \u00b7 8 minutes",
  },
];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function LandingPage({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const go = (id) => { setMenuOpen(false); setTimeout(() => scrollTo(id), 120); };

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "'DM Sans', sans-serif", color: "#1e293b" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* Sticky Navigation */}
      <nav className="site-nav" style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e2e8f0", padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <RobotIcon size={28} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 20, color: "#1e293b" }}>
              CoachBay<span style={{ color: CYAN }}>.ai</span>
            </span>
          </div>
          <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a className="nav-text-link" onClick={() => scrollTo("breakthrough")} style={{ color: "#475569", fontSize: 15, fontWeight: 500, cursor: "pointer", textDecoration: "none" }}>Breakthrough Session</a>
            <a className="nav-text-link" onClick={() => scrollTo("diagnostics")} style={{ color: "#475569", fontSize: 15, fontWeight: 500, cursor: "pointer", textDecoration: "none" }}>Diagnostics</a>
            <a className="nav-text-link" onClick={() => scrollTo("sprints")} style={{ color: "#475569", fontSize: 15, fontWeight: 500, cursor: "pointer", textDecoration: "none" }}>Sprints</a>
            <a className="nav-text-link" onClick={() => scrollTo("testimonials")} style={{ color: "#475569", fontSize: 15, fontWeight: 500, cursor: "pointer", textDecoration: "none" }}>Testimonials</a>
            <a className="nav-text-link" onClick={() => scrollTo("process")} style={{ color: "#475569", fontSize: 15, fontWeight: 500, cursor: "pointer", textDecoration: "none" }}>Process</a>
            <a className="nav-text-link" onClick={() => scrollTo("about")} style={{ color: "#475569", fontSize: 15, fontWeight: 500, cursor: "pointer", textDecoration: "none" }}>About</a>
            <a href="https://www.linkedin.com/in/coachbay/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", color: "#475569", textDecoration: "none" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#475569"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:coach@coachbay.ai?subject=Interested%20in%20CoachBay%20AI%20Sprints" style={{
              display: "inline-block", background: CYAN, color: "#fff",
              fontSize: 15, fontWeight: 600, textDecoration: "none",
              borderRadius: 8, padding: "8px 20px",
            }}>Get in touch</a>
          </div>
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "#1e293b" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="nav-mobile-panel" style={{
            background: "#fff", borderTop: "1px solid #e2e8f0",
            padding: "16px 24px 20px", display: "flex", flexDirection: "column", gap: 14,
          }}>
            <a onClick={() => go("breakthrough")} style={{ color: "#1e293b", fontSize: 17, fontWeight: 500, cursor: "pointer", textDecoration: "none", padding: "6px 0" }}>Breakthrough Session</a>
            <a onClick={() => go("diagnostics")} style={{ color: "#1e293b", fontSize: 17, fontWeight: 500, cursor: "pointer", textDecoration: "none", padding: "6px 0" }}>Diagnostics</a>
            <a onClick={() => go("sprints")} style={{ color: "#1e293b", fontSize: 17, fontWeight: 500, cursor: "pointer", textDecoration: "none", padding: "6px 0" }}>Sprints</a>
            <a onClick={() => go("testimonials")} style={{ color: "#1e293b", fontSize: 17, fontWeight: 500, cursor: "pointer", textDecoration: "none", padding: "6px 0" }}>Testimonials</a>
            <a onClick={() => go("process")} style={{ color: "#1e293b", fontSize: 17, fontWeight: 500, cursor: "pointer", textDecoration: "none", padding: "6px 0" }}>Process</a>
            <a onClick={() => go("about")} style={{ color: "#1e293b", fontSize: 17, fontWeight: 500, cursor: "pointer", textDecoration: "none", padding: "6px 0" }}>About</a>
            <a href="https://www.linkedin.com/in/coachbay/" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{ color: "#1e293b", fontSize: 17, fontWeight: 500, textDecoration: "none", padding: "6px 0", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1e293b"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href="mailto:coach@coachbay.ai?subject=Interested%20in%20CoachBay%20AI%20Sprints" onClick={() => setMenuOpen(false)} style={{
              display: "inline-block", background: CYAN, color: "#fff",
              fontSize: 16, fontWeight: 600, textDecoration: "none",
              borderRadius: 8, padding: "12px 20px", textAlign: "center", marginTop: 6,
            }}>Get in touch</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <div style={{ padding: "64px 24px 72px", background: "#f8fafc" }}>
        <div className="hero-layout">
          <div className="hero-text">
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: "#1e293b", margin: "0 0 8px", lineHeight: 1.2 }}>
              Most AI initiatives start with tools.
            </h1>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: CYAN, margin: "0 0 24px", lineHeight: 1.2 }}>
              The best ones start with people.
            </h1>
            <p style={{ color: "#1e293b", fontSize: 20, fontWeight: 500, lineHeight: 1.5, margin: "0 0 28px", maxWidth: 560 }}>
              For leaders serious about closing the gap between AI at the top and AI on the ground.
            </p>
            <p style={{ color: "#334155", fontSize: 17, lineHeight: 1.7, margin: "0 0 32px" }}>
              My name is Tomas Bay.<br className="mobile-br" /> I help leaders and teams build AI fitness that actually sticks.
            </p>
            <div className="hero-buttons" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="mailto:coach@coachbay.ai?subject=Interested%20in%20CoachBay%20AI%20Sprints" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: CYAN, color: "#fff", fontSize: 15, fontWeight: 600,
                textDecoration: "none", borderRadius: 10, padding: "12px 28px",
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="#fff" strokeWidth="1.5" fill="none"/><path d="M1 5l7 4 7-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Get in touch
              </a>
              <a href="#diagnostics" onClick={(e) => { e.preventDefault(); scrollTo("diagnostics"); }} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                color: CYAN, fontSize: 15, fontWeight: 600, textDecoration: "none",
                border: `1.5px solid ${CYAN}`, borderRadius: 10, padding: "12px 28px",
              }}>
                Try a free diagnostic
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0l-3-3m3 3l-3 3" stroke={CYAN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
          <div className="hero-photo">
            <div className="hero-photo-circle" style={{ width: 280, height: 280, borderRadius: "50%", overflow: "hidden", border: `3px solid ${CYAN}33`, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
              <img src="/tomas.jpg" alt="Tomas Bay" className="hero-photo-img" style={{ width: 280, height: 280, borderRadius: "50%", objectFit: "cover", objectPosition: "center 15%", transform: "scale(1.4)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div style={{ background: "#1e293b", padding: "56px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#fff", margin: "0 0 12px" }}>
            Why Most AI Initiatives Stall
          </h2>
          <div style={{ width: 50, height: 3, background: CYAN, margin: "12px auto 24px", borderRadius: 2 }} />
          <p style={{ color: "#e2e8f0", fontSize: 17, lineHeight: 1.8, margin: "0 0 16px" }}>
            Organizations buy tools, write policies, and roll out training.<br /> Then wonder why nothing changes.
          </p>
          <p style={{ color: "#e2e8f0", fontSize: 17, lineHeight: 1.8, margin: "0" }}>
            The problem is rarely the technology. It is whether leaders use AI themselves, whether employees feel safe to experiment, and whether the culture is ready for change.
          </p>
        </div>
      </div>

      {/* AI Maturity Model */}
      <div style={{ background: "#f8fafc", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#1e293b", margin: "0 0 8px" }}>
              Where Is Your Team Right Now?
            </h2>
            <div style={{ width: 50, height: 3, background: CYAN, margin: "12px auto 16px", borderRadius: 2 }} />
            <p style={{ color: "#475569", fontSize: 16, lineHeight: 1.6, margin: "0 auto", maxWidth: 720 }}>
              Most teams have access to AI tools. Far fewer are using them in ways that change how work actually gets done. I am on a mission to help close that gap.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16 }} className="maturity-grid">
            {[
              {
                num: "1",
                label: "Try it",
                desc: "Has tried AI tools but does not use them as part of regular work. Dips in and out. Results feel unpredictable. Not yet part of the daily routine.",
                highlight: false,
              },
              {
                num: "2",
                label: "Use it",
                desc: "Uses AI regularly but sticks to one or two familiar tasks. Gets reliable results in their comfort zone but rarely pushes beyond it. Habit is there but range is not.",
                highlight: false,
              },
              {
                num: "3",
                label: "Own it",
                desc: "Uses AI confidently across multiple types of work. Has real use cases that deliver results. AI is a genuine part of how they work every day.",
                highlight: true,
              },
              {
                num: "4",
                label: "Change it",
                desc: "Does not just use AI to work faster. Asks which tasks should exist at all. Builds repeatable workflows. Actively shapes how work gets done, for themselves and others around them.",
                highlight: false,
                top: true,
              },
            ].map((level) => (
              <div
                key={level.num}
                style={{
                  background: level.highlight ? "#E0F7FA" : "#fff",
                  border: level.highlight ? `2px solid ${CYAN}` : "1px solid #e2e8f0",
                  borderRadius: 16,
                  padding: "28px 24px 24px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: `${CYAN}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: CYAN,
                    fontSize: 22,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {level.num}
                  </div>
                  <h3 style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 22,
                    color: "#1e293b",
                    margin: 0,
                  }}>
                    {level.label}
                  </h3>
                </div>
                <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.7, margin: 0, flex: 1 }}>
                  {level.desc}
                </p>
                {level.highlight && (
                  <div style={{
                    display: "inline-block",
                    background: CYAN,
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    borderRadius: 6,
                    padding: "5px 12px",
                    marginTop: 16,
                    letterSpacing: "0.02em",
                    alignSelf: "flex-start",
                  }}>
                    Target: <span style={{ fontSize: 16 }}>80%</span> of team
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 24,
            padding: "24px 32px",
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            textAlign: "center",
          }}>
            <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.7, margin: "0 0 8px" }}>
              Most teams start with the majority of their people at <strong style={{ color: "#1e293b" }}>Level 1 or 2.</strong>
            </p>
            <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.7, margin: 0 }}>
              The goal is to get <strong style={{ color: "#1e293b" }}>80% to Level 3</strong> and build a critical mass of Level 4 people who pull the organization forward.
            </p>
          </div>
        </div>
      </div>

      {/* Start Where It Makes Sense */}
      <div style={{ background: "#f8fafc", padding: "72px 24px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#1e293b", margin: "0 0 8px" }}>Start Where It Makes Sense for You</h2>
            <div style={{ width: 50, height: 3, background: CYAN, margin: "12px auto 20px", borderRadius: 2 }} />
            <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.6, margin: 0 }}>Three ways to build AI Fitness. Each one designed for a different starting point.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "stretch" }} className="card-grid">

            {/* Card 1: Diagnostics */}
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${CYAN}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" stroke={CYAN}/>
                  <path d="M12 8v4l3 3" stroke={CYAN}/>
                </svg>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: CYAN, textTransform: "uppercase", margin: "0 0 10px" }}>Not sure where you stand?</p>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1e293b", margin: "0 0 14px", minHeight: 60, display: "flex", alignItems: "flex-start" }}>Take a Free Diagnostic</h3>
              <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, margin: "0 0 28px", flex: 1 }}>Understand where you and your team actually stand before doing anything else. Three free assessments. No commitment. Results in minutes.</p>
              <a href="#diagnostics" onClick={(e) => { e.preventDefault(); scrollTo("diagnostics"); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: CYAN, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
                See the diagnostics
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0l-3-3m3 3l-3 3" stroke={CYAN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>

            {/* Card 2: Breakthrough Session - featured */}
            <div style={{ background: "#E0F7FA", border: `2px solid ${CYAN}`, borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${CYAN}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a7 7 0 0 1 3.5 13.1V18a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1.9A7 7 0 0 1 12 3z" stroke={CYAN}/>
                  <line x1="10" y1="21" x2="14" y2="21" stroke={CYAN}/>
                </svg>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#0097A7", textTransform: "uppercase", margin: "0 0 10px" }}>Have a real problem to solve?</p>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1e293b", margin: "0 0 14px", minHeight: 60, display: "flex", alignItems: "flex-start" }}>Book a Breakthrough Session</h3>
              <p style={{ color: "#334155", fontSize: 15, lineHeight: 1.7, margin: "0 0 28px", flex: 1 }}>One leader. One real problem. One focused conversation using AI as a thinking partner. You leave with ideas you did not have when you walked in.</p>
              <a href="mailto:coach@coachbay.ai?subject=Book a Breakthrough Session" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: CYAN, color: "#fff", fontSize: 15, fontWeight: 600, textDecoration: "none", borderRadius: 8, padding: "11px 22px", alignSelf: "flex-start" }}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="#fff" strokeWidth="1.5" fill="none"/><path d="M1 5l7 4 7-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Book a session
              </a>
            </div>

            {/* Card 3: Sprints */}
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${CYAN}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke={CYAN}/>
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke={CYAN}/>
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke={CYAN}/>
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke={CYAN}/>
                </svg>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: CYAN, textTransform: "uppercase", margin: "0 0 10px" }}>Ready to train your team?</p>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1e293b", margin: "0 0 14px", minHeight: 60, display: "flex", alignItems: "flex-start" }}>Browse the Sprints</h3>
              <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, margin: "0 0 28px", flex: 1 }}>Six focused workshops for every level and challenge. From building skills to shaping strategy to driving adoption across the organization.</p>
              <a href="#sprints" onClick={(e) => { e.preventDefault(); scrollTo("sprints"); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: CYAN, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
                See the sprints
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0l-3-3m3 3l-3 3" stroke={CYAN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Breakthrough Session */}
      <div id="breakthrough" style={{ background: "#ffffff", padding: "80px 24px 120px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#1e293b", margin: "0 0 8px" }}>The Breakthrough Session</h2>
            <div style={{ width: 50, height: 3, background: CYAN, margin: "12px auto 20px", borderRadius: 2 }} />
            <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
              One leader. One real problem. One focused conversation using AI as a thinking partner. You leave with ideas you did not have when you walked in.
            </p>
          </div>

          {/* Text */}
          <div style={{ maxWidth: 1060, margin: "0 auto 52px", textAlign: "center" }}>
            <p style={{ color: "#334155", fontSize: 17, lineHeight: 1.75, marginBottom: 20 }}>
              Not a workshop. Not a course. A focused 60 minute session on the problem that is actually keeping you up at night.
            </p>
            <p style={{ color: "#334155", fontSize: 17, lineHeight: 1.75, margin: 0 }}>
              I work with you one to one, using AI to open up thinking your team has not had access to yet. Most leaders leave with more ideas than they expected. Many go deeper with a sprint or ongoing coaching after.
            </p>
          </div>

          {/* 2x2 numbered grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }} className="breakthrough-grid">
            {[
              { num: "1", title: "One real problem", desc: "You bring your biggest stuck challenge. Not a hypothetical. The one that is actually keeping you up at night." },
              { num: "2", title: "AI as thinking partner", desc: "We use AI to crack open the problem in ways you and your team have not thought of yet." },
              { num: "3", title: "Ideas before you leave", desc: "You walk out with genuine new directions. Same day. Often the same hour." },
              { num: "4", title: "The natural next step", desc: "Most leaders go deeper after this. A sprint, ongoing coaching, or a team session." },
            ].map(f => (
              <div key={f.num} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "#f8fafc", borderRadius: 12, padding: "20px 22px", border: "1px solid #e2e8f0" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${CYAN}18`, display: "flex", alignItems: "center", justifyContent: "center", color: CYAN, fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, flexShrink: 0 }}>{f.num}</div>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "#1e293b", margin: "0 0 6px" }}>{f.title}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#475569", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stories */}
          <div style={{ paddingTop: 48 }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: "#1e293b", textAlign: "center", marginBottom: 28, marginTop: 0 }}>What Actually Happens</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }} className="stories-grid">
              {[
                { moment: "She walked out and went straight to her boss.", story: "A senior leader was stuck on a major business challenge her team had been circling for months. We ran it through AI as a thinking partner in one conversation. She walked out and went directly to her boss to say they needed to move on this.", result: "New client engagement followed." },
                { moment: "He went back and changed how his whole team works.", story: "A GM came to me for coaching on a complex stakeholder management challenge. We cracked it open with AI in one session. He went straight back and restructured his team around AI, introducing weekly AI review meetings. Two weeks later, he bought his own MacBook to go deeper with AI.", result: "One session. Team-wide change." },
                { moment: "She could not wait until morning and emailed me at 11pm.", story: "A commercial manager volunteered her team's biggest stuck problem during one of my workshops. By the end, genuinely new ideas were on the table. That evening at 11pm I received an email asking for the full session output.", result: "Immediate action. New thinking unlocked." },
              ].map((s, i) => (
                <div key={i} style={{ background: "#1A1A2E", borderRadius: 14, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: 18, color: CYAN, lineHeight: 1.4, margin: 0 }}>"{s.moment}"</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>{s.story}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: CYAN, fontWeight: 600, margin: 0, marginTop: "auto", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.08)" }}>{s.result}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <a href="mailto:coach@coachbay.ai?subject=Book a Breakthrough Session" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: CYAN, color: "#fff", fontSize: 15, fontWeight: 600,
                textDecoration: "none", borderRadius: 10, padding: "13px 28px",
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="#fff" strokeWidth="1.5" fill="none"/><path d="M1 5l7 4 7-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Book a Breakthrough Session
              </a>
            </div>
          </div>
        </div>
      </div>


      {/* Diagnostics */}
      <div id="diagnostics" style={{ maxWidth: 1060, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#1e293b", margin: "0 0 12px" }}>Take the AI Fitness Test</h2>
          <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.6, margin: 0 }}>Every fitness program starts with an honest assessment.<br className="mobile-br" /> Take a free diagnostic. Get your results in minutes.</p>
        </div>
        <div className="card-grid-2" style={{ padding: "0 24px" }}>
          {diagnostics.map((d) => (
            <div key={d.id} style={{
              background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16,
              padding: "28px 24px 24px", display: "flex", flexDirection: "column",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${CYAN}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{d.icon}</div>
              <p style={{ color: CYAN, fontSize: 15, fontWeight: 700, letterSpacing: 1.5, margin: "0 0 4px" }}>{d.label}</p>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1e293b", margin: "0 0 12px" }}>{d.subtitle}</h3>
              <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, margin: "0 0 20px", flex: 1 }}>{d.description}</p>
              <button onClick={() => onNavigate(d.id)} style={{
                background: CYAN, border: "none", color: "#fff", borderRadius: 10,
                padding: "12px 24px", fontSize: 15, fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", width: "100%",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                Take the Assessment
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0l-3-3m3 3l-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <p style={{ color: "#475569", fontSize: 15, textAlign: "center", margin: "10px 0 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#94a3b8" strokeWidth="1.5"/><path d="M8 4.5v4l2.5 1.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/></svg>
                {d.detail}
              </p>
            </div>
          ))}
        </div>
      </div>


      {/* Sprints */}
      <div id="sprints" style={{ maxWidth: 1060, margin: "0 auto", padding: "64px 24px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#1e293b", margin: "0 0 8px" }}>
            The AI Fitness Program
          </h2>
          <div style={{ width: 50, height: 3, background: CYAN, margin: "12px auto 16px", borderRadius: 2 }} />
          <p style={{ color: "#475569", fontSize: 16, lineHeight: 1.6, margin: "0 auto", maxWidth: 560 }}>
            Five half day sprints and a two session workshop that build real capability. They work standalone, or can be sequenced as a journey for maximum impact.
          </p>
          <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.6, margin: "12px auto 0", maxWidth: 560, textAlign: "center" }}>
            Delivered virtually or in person. Designed for teams of 8 to 20.
          </p>
        </div>

        <div className="card-grid" style={{ padding: "0 24px" }}>
          {sprints.map((s) => (
            <div key={s.id} style={{
              background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16,
              padding: "32px 28px 28px", display: "flex", flexDirection: "column",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: `${CYAN}15`, display: "flex", alignItems: "center", justifyContent: "center", color: CYAN, fontSize: 22, fontWeight: 700 }}>{s.num}</div>
                <div>
                  <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1e293b", margin: 0, lineHeight: 1.2 }}>{s.line1}<br />{s.line2}</h3>
                  <p style={{ color: CYAN, fontSize: 15, fontWeight: 600, margin: 0 }}>{s.tagline}</p>
                </div>
              </div>
              <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, margin: "0 0 16px", flex: 1 }}>{s.description}</p>
              <p style={{ color: "#475569", fontSize: 15, margin: "0 0 20px", display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#94a3b8" strokeWidth="1.5"/><path d="M8 4.5v4l2.5 1.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/></svg>
                {s.detail}
              </p>
              <a href={s.pdf} download style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                color: CYAN, fontSize: 15, fontWeight: 600, textDecoration: "none",
                border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "10px 20px", width: "100%",
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke={CYAN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {s.dlLabel}
              </a>
            </div>
          ))}
        </div>

        {/* Boosters */}
        <div style={{ padding: "0 24px" }}>
          <div className="booster-card" style={{ textAlign: "center", marginTop: 28, padding: "28px 28px 24px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, width: "100%" }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1e293b", margin: "0 0 4px" }}>Optional Boosters</h3>
            <p style={{ color: CYAN, fontSize: 15, fontWeight: 600, margin: "0 0 12px" }}>for habits</p>
            <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, margin: 0 }}>Short virtual sessions after each Sprint to reinforce learning and build lasting habits.</p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 36 }}>
          <p style={{ color: "#1e293b", fontSize: 18, fontWeight: 500, margin: "0 0 16px" }}>Interested in a Sprint?</p>
          <a href="mailto:coach@coachbay.ai?subject=Interested%20in%20CoachBay%20AI%20Sprints" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: CYAN, color: "#fff", borderRadius: 10,
            padding: "14px 32px", fontSize: 16, fontWeight: 600,
            textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="#fff" strokeWidth="1.5" fill="none"/><path d="M1 5l7 4 7-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Get in touch
          </a>
        </div>

      </div>


      {/* What People Say */}
      <div id="testimonials" style={{ background: "#1A1A2E", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#fff", margin: "0 0 8px" }}>What People Say</h2>
            <div style={{ width: 50, height: 3, background: CYAN, margin: "12px auto 0", borderRadius: 2 }} />
          </div>
          <div className="testimonials-grid" style={{ padding: "0 24px" }}>
            {[
              { quote: "Tomas shifted how I think about Copilot. Not an answer machine, but a thinking and structuring partner.", name: "Steve K.", role: "Manufacturing Engineering" },
              { quote: "Very effective and fit for purpose. A solid foundation for Copilot usage.", name: "Aaron L.", role: "Finance" },
              { quote: "I now use the same tips and prompts in my day to day work.\nI already experienced how effective they were.", name: "Joe O.", role: "Commercial Leadership" },
              { quote: "It has significantly changed the way I think about interacting with AI.", name: "Cherry C.", role: "HR Graduate Trainee" },
            ].map((t, i) => (
              <div key={i} style={{
                background: "#fff", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
                padding: "32px 32px 28px", display: "flex", flexDirection: "column",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              }}>
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" style={{ marginBottom: 16 }}>
                  <path d="M5 20c-2.8 0-5-2.2-5-5V9c0-5 4-9 9-9h1v4H9c-2.8 0-5 2.2-5 5v1h5v10H5zm17 0c-2.8 0-5-2.2-5-5V9c0-5 4-9 9-9h1v4h-1c-2.8 0-5 2.2-5 5v1h5v10h-4z" fill={CYAN}/>
                </svg>
                <p style={{ color: "#1e293b", fontSize: 17, lineHeight: 1.6, margin: "0 0 20px", flex: 1, fontStyle: "italic", whiteSpace: "pre-line" }}>{t.quote}</p>
                <div style={{ width: 40, height: 2, background: CYAN, marginBottom: 14, borderRadius: 2 }} />
                <p style={{ color: "#1e293b", fontSize: 15, fontWeight: 600, margin: 0 }}>{t.name}</p>
                <p style={{ color: "#64748b", fontSize: 14, margin: "2px 0 0" }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How We Work Together */}
      <div id="process" style={{ background: "#f1f5f9", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#1e293b", margin: 0 }}>How We Work Together</h2>
          </div>
          <div className="card-grid" style={{ padding: "0 24px" }}>
            {[
              { num: "01", title: "We Find the Fit", desc: "It starts with a conversation. We talk through where your organization is with AI, what you are trying to achieve, and which sprint makes sense for your situation." },
              { num: "02", title: "You Experience It", desc: "Your team works through a focused, practical sprint. Not slides and theory. Hands on experience with AI that builds real capability and confidence." },
              { num: "03", title: "We Make It Stick", desc: "After the sprint, we follow up to make sure the momentum continues. That means reviewing what worked, what to do next, and how to keep your team moving forward." },
            ].map((item) => (
              <div key={item.num} style={{ textAlign: "center", padding: "16px 8px" }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 56, color: CYAN, lineHeight: 1, marginBottom: 16 }}>{item.num}</div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1e293b", margin: "0 0 16px" }}>{item.title}</h3>
                <p style={{ color: "#334155", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How I Think About Change */}
      <div id="change-principles" style={{ background: "#f8fafc", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#1e293b", margin: "0 0 8px" }}>
              How I Think About Change
            </h2>
            <div style={{ width: 50, height: 3, background: CYAN, margin: "12px auto 16px", borderRadius: 2 }} />
            <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.7, margin: "0 auto", maxWidth: 720 }}>
              AI is a change challenge, not a technology challenge.<br className="mobile-br" /> Four proven principles, backed by research and my own experience, guide everything I do.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 20 }} className="card-grid-2">
            {[
              {
                num: "1",
                title: "Leaders go first",
                body: "Change starts at the top or it stalls. Teams read their leaders before they read the memo. If the CEO is using AI openly, the organization follows. If the CEO delegates AI to a task force, so does everyone else.",
              },
              {
                num: "2",
                title: "Start with the willing",
                body: "Convert the curious, not the skeptics. A small group of AI Champions creates the evidence that pulls the rest of the organization along. Skeptics change their minds when they see their colleagues winning, not when they are told to.",
              },
              {
                num: "3",
                title: "Experience beats a lecture",
                body: "People change when they feel it, not when they hear about it. Demos and slides can set the stage, but the real shift happens when participants do the work themselves. Every Sprint is built around a real problem, not a theory. You leave with something you built.",
              },
              {
                num: "4",
                title: "Build habits, not knowledge",
                body: "One workshop does not change behavior. Fitness is not a fact you learn. It is a practice you keep. I help teams build simple rituals: weekly AI sharing, Booster sessions, managers asking \"how can AI help?\" Small habits, repeated, become permanent.",
              },
            ].map((p) => (
              <div
                key={p.num}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 16,
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${CYAN}10`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: CYAN,
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 16,
                }}>
                  {p.num}
                </div>
                <h3 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 22,
                  color: "#1e293b",
                  margin: "0 0 12px",
                }}>
                  {p.title}
                </h3>
                <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <a
              href="/CoachBay_Change_Principles.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                color: CYAN,
                border: `1.5px solid ${CYAN}`,
                borderRadius: 10,
                padding: "12px 20px",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke={CYAN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download the one page summary
            </a>
          </div>
        </div>
      </div>

      {/* About */}
      <div id="about" style={{ background: "#f8fafc", padding: "64px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#1e293b", margin: "0 0 36px" }}>About</h2>
          <div className="about-flex" style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 340px", textAlign: "left" }}>
              <p style={{ color: "#334155", fontSize: 16, lineHeight: 1.8, margin: "0 0 16px" }}>I'm Tomas Bay, a leadership and change consultant based in Hong Kong.</p>
              <p style={{ color: "#334155", fontSize: 16, lineHeight: 1.8, margin: "0 0 16px" }}>Over 25 years I have helped leaders and teams across Europe and Asia Pacific navigate change and turn ideas into real results. That includes 15 years with Maersk in general management and 19 years as a Principal Consultant with the Swire Group, working across diverse industries and cultures.</p>
              <p style={{ color: "#334155", fontSize: 16, lineHeight: 1.8, margin: "0 0 16px" }}>In January 2023, I started using ChatGPT. It changed how I work, how I coach, and how I think about what leaders and teams are capable of. Since then, I have helped individuals, leaders, and teams get more out of AI and become more effective at work.</p>
              <p style={{ color: "#334155", fontSize: 16, lineHeight: 1.8, margin: "0 0 28px" }}>I built CoachBay.ai to help other organizations make the same shift. Through the AI Fitness Program, I help leaders and teams build lasting AI capability through diagnostics, focused sprints, and the habits that make it stick.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="mailto:coach@coachbay.ai?subject=Interested%20in%20CoachBay%20AI%20Sprints" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: CYAN, color: "#fff", borderRadius: 10,
                padding: "14px 32px", fontSize: 16, fontWeight: 600,
                textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="#fff" strokeWidth="1.5" fill="none"/><path d="M1 5l7 4 7-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Get in touch
              </a>
              <a href="https://www.linkedin.com/in/coachbay/" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                color: "#475569", fontSize: 16, fontWeight: 600, textDecoration: "none",
                border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "14px 28px",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#475569"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              </div>
            </div>
            <div className="about-photo" style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", width: "100%", maxWidth: 260 }}>
              <div style={{ width: 260, height: 320, borderRadius: 16, overflow: "hidden", border: `3px solid ${CYAN}22` }}>
                <img src="/tomas.jpg" alt="Tomas Bay" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%", transform: "scale(1.2)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "32px 24px", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <RobotIcon size={20} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "#1e293b" }}>CoachBay<span style={{ color: CYAN }}>.ai</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="https://www.linkedin.com/in/coachbay/" target="_blank" rel="noopener noreferrer" style={{ color: "#94a3b8", display: "flex", alignItems: "center", gap: 6, fontSize: 15, textDecoration: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#94a3b8"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href="https://coachbay.ai" style={{ color: "#94a3b8", fontSize: 15, textDecoration: "none" }}>coachbay.ai</a>
          </div>
        </div>
      </div>
    </div>
  );
}
