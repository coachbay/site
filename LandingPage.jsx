const CYAN = "#00BCD4";

const RobotIcon = ({ size = 72 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="55" r="30" fill="#00BCD4"/>
    <circle cx="38" cy="50" r="7" fill="#fff"/>
    <circle cx="62" cy="50" r="7" fill="#fff"/>
    <circle cx="40" cy="51" r="4" fill="#1a1a2e"/>
    <circle cx="64" cy="51" r="4" fill="#1a1a2e"/>
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
    id: "core", num: "1",
    title: "Core Sprint", tagline: "for skills",
    detail: "Half day sprint for managers, team leads, and specialists.",
    description: "Discover four AI roles that go far beyond basic chat. For anyone still using AI mainly as an assistant who wants to unlock its real potential.",
    pdf: "/CoachBay_Core_Sprint.pdf",
  },
  {
    id: "strategy", num: "2",
    title: "Strategy Sprint", tagline: "for thinking",
    detail: "Half day sprint for senior managers and executives.",
    description: "Use AI as a thinking partner on the decisions that actually matter. For leaders who want AI to sharpen their judgment, not just save time.",
    pdf: "/CoachBay_Strategy_Sprint.pdf",
  },
  {
    id: "change", num: "3",
    title: "Change Sprint", tagline: "for adoption",
    detail: "Half day sprint for leaders driving AI adoption.",
    description: "Learn to drive adoption through pull, not push. For leaders responsible for getting AI working across their organization.",
    pdf: "/CoachBay_Change_Sprint.pdf",
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
    description: "How effectively are you using AI as a leader? Assess your usage, habits, depth, trust, and impact.",
    detail: "25 questions \u00b7 8 minutes",
  },
  {
    id: "team", icon: <TeamIcon />,
    label: "FOR INDIVIDUALS", subtitle: "Personal AI Diagnostic",
    description: "How are you using AI day to day? Discover where you stand and what to focus on next.",
    detail: "25 questions \u00b7 8 minutes",
  },
];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function LandingPage({ onNavigate }) {
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
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1e293b" }}>
              CoachBay<span style={{ color: CYAN }}>.ai</span>
            </span>
          </div>
          <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a className="nav-text-link" onClick={() => scrollTo("sprints")} style={{ color: "#475569", fontSize: 15, fontWeight: 500, cursor: "pointer", textDecoration: "none" }}>Sprints</a>
            <a className="nav-text-link" onClick={() => scrollTo("process")} style={{ color: "#475569", fontSize: 15, fontWeight: 500, cursor: "pointer", textDecoration: "none" }}>Process</a>
            <a className="nav-text-link" onClick={() => scrollTo("diagnostics")} style={{ color: "#475569", fontSize: 15, fontWeight: 500, cursor: "pointer", textDecoration: "none" }}>Diagnostics</a>
            <a className="nav-text-link" onClick={() => scrollTo("about")} style={{ color: "#475569", fontSize: 15, fontWeight: 500, cursor: "pointer", textDecoration: "none" }}>About</a>
            <a href="mailto:coach@coachbay.ai?subject=Interested%20in%20CoachBay%20AI%20Sprints" style={{
              display: "inline-block", background: CYAN, color: "#fff",
              fontSize: 15, fontWeight: 600, textDecoration: "none",
              borderRadius: 8, padding: "8px 20px",
            }}>Get in touch</a>
          </div>
        </div>
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
            <p style={{ color: "#334155", fontSize: 17, lineHeight: 1.7, margin: "0 0 8px" }}>
              My name is Tomas Bay.<br className="mobile-br" /> I help leaders and organizations adopt AI in a way that actually sticks.
            </p>
            <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.6, margin: "0 0 32px" }}>
              25 years helping leaders navigate change<br className="mobile-br" /> across Asia Pacific.
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

      {/* Sprints */}
      <div id="sprints" style={{ maxWidth: 1060, margin: "0 auto", padding: "64px 24px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#1e293b", margin: "0 0 8px" }}>
            Three Ways to Start
          </h2>
          <div style={{ width: 50, height: 3, background: CYAN, margin: "12px auto 16px", borderRadius: 2 }} />
          <p style={{ color: "#475569", fontSize: 16, lineHeight: 1.6, margin: "0 auto", maxWidth: 560 }}>
            Each Sprint is a half day session that delivers real results, not just awareness. They work standalone, or can be sequenced as a journey for maximum impact.
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
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${CYAN}15`, display: "flex", alignItems: "center", justifyContent: "center", color: CYAN, fontSize: 16, fontWeight: 700 }}>{s.num}</div>
                <div>
                  <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1e293b", margin: 0 }}>{s.title}</h3>
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
                Download Sprint Overview
              </a>
            </div>
          ))}
        </div>

        {/* Pit Stops */}
        <div style={{ padding: "0 24px" }}>
          <div className="pitstop-card" style={{ textAlign: "center", marginTop: 28, padding: "28px 28px 24px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, width: "100%" }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1e293b", margin: "0 0 4px" }}>Optional Pit Stops</h3>
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

      {/* Diagnostics */}
      <div id="diagnostics" style={{ maxWidth: 1060, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#1e293b", margin: "0 0 12px" }}>Not Sure Where to Start?</h2>
          <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.6, margin: 0 }}>Take a free diagnostic.<br className="mobile-br" /> Get personalized results in minutes.</p>
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

      {/* About */}
      <div id="about" style={{ background: "#f8fafc", padding: "64px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#1e293b", margin: "0 0 36px" }}>About</h2>
          <div className="about-flex" style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 340px", textAlign: "left" }}>
              <p style={{ color: "#334155", fontSize: 16, lineHeight: 1.8, margin: "0 0 16px" }}>I'm Tomas Bay, a leadership and change consultant based in Hong Kong.</p>
              <p style={{ color: "#334155", fontSize: 16, lineHeight: 1.8, margin: "0 0 16px" }}>Over 30 years I have helped leaders and teams across Europe and Asia Pacific navigate change and turn ideas into real results. That includes 15 years with Maersk in general management and 19 years as a Principal Consultant with the Swire Group, working across diverse industries and cultures.</p>
              <p style={{ color: "#334155", fontSize: 16, lineHeight: 1.8, margin: "0 0 16px" }}>In January 2023, I started using ChatGPT. It changed how I work, how I coach, and how I think about what leaders and teams are capable of. Since then, I have helped individuals, leaders, and teams get more out of AI and become more effective at work.</p>
              <p style={{ color: "#334155", fontSize: 16, lineHeight: 1.8, margin: "0 0 28px" }}>I built CoachBay.ai to help other organizations make the same shift. Through sprints, diagnostics, and coaching, I help leaders and teams get comfortable with AI in a way that actually sticks.</p>
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
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: "#1e293b" }}>CoachBay<span style={{ color: CYAN }}>.ai</span></span>
          </div>
          <p style={{ color: "#94a3b8", fontSize: 15, margin: 0 }}>Designed by CoachBay</p>
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
