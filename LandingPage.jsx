const CYAN = "#00BCD4";
const DARK = "#1a1a2e";

const RobotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="72" height="72">
    <circle cx="50" cy="55" r="30" fill="#00BCD4"/>
    <circle cx="38" cy="50" r="7" fill="#fff"/>
    <circle cx="62" cy="50" r="7" fill="#fff"/>
    <circle cx="40" cy="51" r="4" fill="#1a1a2e"/>
    <circle cx="64" cy="51" r="4" fill="#1a1a2e"/>
    <line x1="50" y1="25" x2="50" y2="15" stroke="#00BCD4" strokeWidth="3"/>
    <circle cx="50" cy="12" r="5" fill="#00BCD4"/>
  </svg>
);

const SkillsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 6a14 14 0 0 0-8 25.4V36a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4.6A14 14 0 0 0 24 6z" stroke="#00BCD4" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
    <line x1="20" y1="42" x2="28" y2="42" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M24 16v8M20 20h8" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CompassIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="16" stroke="#00BCD4" strokeWidth="2.5" fill="none"/>
    <circle cx="24" cy="24" r="2" fill="#00BCD4"/>
    <polygon points="24,10 26,22 24,24 22,22" fill="#00BCD4" opacity="0.7"/>
    <polygon points="24,38 22,26 24,24 26,26" stroke="#00BCD4" strokeWidth="1" fill="none"/>
    <line x1="24" y1="6" x2="24" y2="10" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="38" x2="24" y2="42" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round"/>
    <line x1="6" y1="24" x2="10" y2="24" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round"/>
    <line x1="38" y1="24" x2="42" y2="24" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ChangeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M14 16c0 0 4 8 10 8s10-8 10-8" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M14 28c0 0 4 8 10 8s10-8 10-8" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M10 20l4-4 4 4" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M30 32l4 4 4-4" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const CompanyIcon = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
    <rect x="8" y="12" width="24" height="22" rx="2" stroke="#00BCD4" strokeWidth="2.5" fill="none"/>
    <rect x="14" y="6" width="12" height="28" rx="1" stroke="#00BCD4" strokeWidth="2.5" fill="none"/>
    <rect x="18" y="10" width="4" height="4" rx="0.5" fill="#00BCD4"/>
    <rect x="18" y="18" width="4" height="4" rx="0.5" fill="#00BCD4"/>
    <rect x="18" y="26" width="4" height="4" rx="0.5" fill="#00BCD4"/>
    <rect x="11" y="18" width="3" height="3" rx="0.5" fill="#00BCD4"/>
    <rect x="11" y="24" width="3" height="3" rx="0.5" fill="#00BCD4"/>
    <rect x="26" y="18" width="3" height="3" rx="0.5" fill="#00BCD4"/>
    <rect x="26" y="24" width="3" height="3" rx="0.5" fill="#00BCD4"/>
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
    id: "core",
    icon: <SkillsIcon />,
    title: "Core Sprint",
    tagline: "for skills",
    detail: "Half day sprint for managers, team leads, and specialists.",
    description: "Discover four AI roles that go far beyond basic chat. For anyone still using AI mainly as an assistant who wants to unlock its real potential.",
    pdf: "/CoachBay_Core_Sprint.pdf",
  },
  {
    id: "strategy",
    icon: <CompassIcon />,
    title: "Strategy Sprint",
    tagline: "for thinking",
    detail: "Half day sprint for senior managers and executives.",
    description: "Use AI as a thinking partner on the decisions that actually matter. For leaders who want AI to sharpen their judgment, not just save time.",
    pdf: "/CoachBay_Strategy_Sprint.pdf",
  },
  {
    id: "change",
    icon: <ChangeIcon />,
    title: "Change Sprint",
    tagline: "for adoption",
    detail: "Half day sprint for leaders driving AI adoption.",
    description: "Learn to drive adoption through pull, not push. For leaders responsible for getting AI working across their organization.",
    pdf: "/CoachBay_Change_Sprint.pdf",
  },
];

const diagnostics = [
  {
    id: "company",
    icon: <CompanyIcon />,
    title: "For Companies",
    subtitle: "AI Readiness Diagnostic",
    description: "See where your organization actually stands with AI across five dimensions. So you can decide what to focus on next.",
    detail: "25 questions \u00b7 10 minutes",
  },
  {
    id: "leader",
    icon: <LeaderIcon />,
    title: "For Leaders",
    subtitle: "AI Leadership Diagnostic",
    description: "How effectively are you using AI as a leader? Assess your usage, habits, depth, trust, and impact.",
    detail: "25 questions \u00b7 8 minutes",
  },
  {
    id: "team",
    icon: <TeamIcon />,
    title: "For Individuals",
    subtitle: "Personal AI Diagnostic",
    description: "How are you using AI day to day? Discover where you stand and what to focus on next.",
    detail: "25 questions \u00b7 8 minutes",
  },
];

export default function LandingPage({ onNavigate }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${DARK} 0%, #16213e 50%, #1a1a2e 100%)`,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* Brand Bar */}
      <div style={{
        textAlign: "center",
        padding: "32px 24px 0",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32">
            <circle cx="50" cy="55" r="30" fill="#00BCD4"/>
            <circle cx="38" cy="50" r="7" fill="#fff"/>
            <circle cx="62" cy="50" r="7" fill="#fff"/>
            <circle cx="40" cy="51" r="4" fill="#1a1a2e"/>
            <circle cx="64" cy="51" r="4" fill="#1a1a2e"/>
            <line x1="50" y1="25" x2="50" y2="15" stroke="#00BCD4" strokeWidth="3"/>
            <circle cx="50" cy="12" r="5" fill="#00BCD4"/>
          </svg>
          <span style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 22,
            color: "#fff",
          }}>
            CoachBay<span style={{ color: CYAN }}>.ai</span>
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ padding: "48px 24px 56px" }}>
        <div className="hero-layout">
          <div className="hero-text">
            <h1 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 40,
              color: "#fff",
              margin: "0 0 20px",
              lineHeight: 1.25,
            }}>
              Most AI initiatives start with tools.<br className="mobile-br" />{" "}The best ones start with people.
            </h1>
            <p style={{
              color: "#e2e8f0",
              fontSize: 17,
              lineHeight: 1.7,
              margin: "0 0 8px",
            }}>
              My name is Tomas Bay, I help leaders and organizations adopt AI<br className="mobile-br" />{" "}in a way that actually sticks.
            </p>
            <p style={{
              color: "#94a3b8",
              fontSize: 15,
              lineHeight: 1.6,
              margin: "0 0 28px",
            }}>
              30 years helping leaders navigate change<br className="mobile-br" />{" "}across Europe and Asia Pacific.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a
                href="mailto:coach@coachbay.ai"
                style={{
                  display: "inline-block",
                  background: CYAN,
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  borderRadius: 10,
                  padding: "10px 24px",
                  transition: "all 0.2s ease",
                  boxShadow: `0 6px 24px ${CYAN}44`,
                }}
              >
                Get in touch
              </a>
              <a
                href="#diagnostics"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("diagnostics")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  display: "inline-block",
                  color: CYAN,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  border: `1.5px solid ${CYAN}44`,
                  borderRadius: 10,
                  padding: "10px 24px",
                  transition: "all 0.2s ease",
                }}
              >
                Try a free diagnostic
              </a>
            </div>
          </div>
          <div className="hero-photo">
            <div className="hero-photo-circle" style={{
              width: 240,
              height: 240,
              borderRadius: "50%",
              overflow: "hidden",
              border: `3px solid ${CYAN}44`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
            }}>
              <img
                src="/tomas.jpg"
                alt="Tomas Bay"
                className="hero-photo-img"
                style={{
                  width: 240,
                  height: 240,
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center 15%",
                  transform: "scale(1.4)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "0 48px 48px",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "48px 40px",
          textAlign: "center",
        }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 26,
            color: "#fff",
            margin: "0 0 8px",
          }}>
            Why Most AI Initiatives Stall
          </h2>
          <div style={{ width: 50, height: 3, background: CYAN, margin: "16px auto", borderRadius: 2 }} />
          <p style={{
            color: "#e2e8f0",
            fontSize: 17,
            lineHeight: 1.8,
            margin: "0 0 16px",
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            Organizations buy tools, write policies, and roll out training. Then wonder why nothing changes.
          </p>
          <p style={{
            color: "#e2e8f0",
            fontSize: 15,
            lineHeight: 1.8,
            margin: "0",
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            The problem is rarely the technology. It is whether leaders use AI themselves, whether employees feel safe to experiment, and whether the culture is ready for change.
          </p>
        </div>
      </div>

      {/* Sprints Section */}
      <div style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "20px 24px 20px",
      }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="10" cy="24" r="4" stroke={CYAN} strokeWidth="2.5" fill="none"/>
              <circle cx="24" cy="24" r="4" stroke={CYAN} strokeWidth="2.5" fill="none"/>
              <circle cx="38" cy="24" r="4" stroke={CYAN} strokeWidth="2.5" fill="none"/>
              <line x1="14" y1="24" x2="20" y2="24" stroke={CYAN} strokeWidth="2" strokeLinecap="round"/>
              <line x1="28" y1="24" x2="34" y2="24" stroke={CYAN} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 30,
            color: "#fff",
            margin: "0 0 8px",
          }}>
            Three Ways to Start
          </h2>
          <div style={{ width: 50, height: 3, background: CYAN, margin: "16px auto", borderRadius: 2 }} />
          <p style={{
            color: "#e2e8f0",
            fontSize: 17,
            lineHeight: 1.6,
            margin: "0",
          }}>
            Each Sprint is a half day session that delivers real results, not just awareness.
          </p>
          <p style={{
            color: "#94a3b8",
            fontSize: 15,
            lineHeight: 1.6,
            margin: "12px 0 0",
          }}>
            They work standalone, or can be sequenced as a journey for maximum impact.
          </p>
        </div>

        <div className="card-grid" style={{ padding: "0 24px" }}>
          {sprints.map((sprint) => (
            <div
              key={sprint.id}
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                padding: "36px 28px 32px",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.border = `1px solid ${CYAN}44`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ marginBottom: 16 }}>{sprint.icon}</div>
              <h2 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 24,
                color: "#fff",
                margin: "0 0 2px",
              }}>
                {sprint.title}
              </h2>
              <p style={{
                color: CYAN,
                fontSize: 15,
                fontWeight: 600,
                margin: "0 0 16px",
              }}>
                {sprint.tagline}
              </p>
              <p style={{
                color: "#e2e8f0",
                fontSize: 15,
                lineHeight: 1.7,
                margin: "0 0 16px",
                flex: 1,
              }}>
                {sprint.description}
              </p>
              <p style={{
                color: "#94a3b8",
                fontSize: 15,
                margin: "0 0 20px",
              }}>
                {sprint.detail}
              </p>
              <a
                href={sprint.pdf}
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: CYAN,
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  textDecoration: "none",
                  padding: "10px 20px",
                  border: `1.5px solid ${CYAN}`,
                  borderRadius: 10,
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${CYAN}18`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke={CYAN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download Sprint Overview
              </a>
            </div>
          ))}
        </div>

        {/* Pit Stops note */}
        <div style={{ padding: "0 24px" }}>
        <div className="pitstop-card" style={{
          textAlign: "center",
          marginTop: 28,
          padding: "28px 28px 24px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          width: "100%",
        }}>
          <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <line x1="10" y1="6" x2="10" y2="36" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M10 6h18l-5 7 5 7H10" stroke={CYAN} strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <h3 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 20,
            color: "#fff",
            margin: "0 0 4px",
          }}>
            Optional Pit Stops
          </h3>
          <p style={{
            color: CYAN,
            fontSize: 15,
            fontWeight: 600,
            margin: "0 0 16px",
          }}>
            for habits
          </p>
          <p style={{
            color: "#e2e8f0",
            fontSize: 15,
            lineHeight: 1.7,
            margin: 0,
          }}>
            Short virtual sessions after each Sprint to reinforce learning and build lasting habits.
          </p>
        </div>
        </div>
        <div style={{
          textAlign: "center",
          marginTop: 36,
        }}>
          <p style={{
            color: "#e2e8f0",
            fontSize: 18,
            fontWeight: 500,
            margin: "0 0 16px",
          }}>
            Interested in a Sprint?
          </p>
          <a href="mailto:coach@coachbay.ai" style={{
            display: "inline-block",
            background: CYAN,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "14px 32px",
            fontSize: 16,
            fontWeight: 600,
            textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: `0 6px 24px ${CYAN}44`,
            transition: "all 0.2s ease",
          }}>
            Get in touch
          </a>
        </div>
      </div>


      {/* How It Works Section */}
      <div style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "20px 24px 60px",
      }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ marginBottom: 16 }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M12 24h8m8 0h8" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="24" cy="24" r="4" stroke={CYAN} strokeWidth="2.5" fill="none"/>
              <path d="M24 8v8m0 16v8" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 30,
            color: "#fff",
            margin: "0 0 8px",
          }}>
            How We Work Together
          </h2>
          <div style={{ width: 50, height: 3, background: CYAN, margin: "16px auto", borderRadius: 2 }} />
        </div>

        <div className="card-grid" style={{ padding: "0 24px" }}>
          {[
            {
              step: "01",
              title: "We Find the Fit",
              description: "It starts with a conversation. We talk through where your organization is with AI, what you are trying to achieve, and which sprint makes sense for your situation.",
              icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M8 28c0-2 4-3 6-3s3 1 3 3" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <circle cx="14" cy="19" r="4" stroke={CYAN} strokeWidth="2.5" fill="none"/>
                  <path d="M23 28c0-2 4-3 6-3s3 1 3 3" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <circle cx="26" cy="19" r="4" stroke={CYAN} strokeWidth="2.5" fill="none"/>
                </svg>
              ),
            },
            {
              step: "02",
              title: "You Experience It",
              description: "Your team works through a focused, practical sprint. Not slides and theory. Hands on experience with AI that builds real capability and confidence.",
              icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="6" y="10" width="28" height="18" rx="3" stroke={CYAN} strokeWidth="2.5" fill="none"/>
                  <circle cx="20" cy="19" r="5" stroke={CYAN} strokeWidth="2.5" fill="none"/>
                  <path d="M18 19l2 2 4-4" stroke={CYAN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              ),
            },
            {
              step: "03",
              title: "We Make It Stick",
              description: "After the sprint, we follow up to make sure the momentum continues. That means reviewing what worked, what to do next, and how to keep your team moving forward.",
              icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M20 8v24" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M12 16l8-8 8 8" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <line x1="10" y1="32" x2="30" y2="32" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              ),
            },
          ].map((item) => (
            <div key={item.step} style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: "36px 28px 32px",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.border = `1px solid ${CYAN}44`;
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            >
              <div style={{ marginBottom: 16 }}>
                {item.icon}
              </div>
              <div style={{
                color: CYAN, fontSize: 12, fontWeight: 700,
                letterSpacing: 2, marginBottom: 8,
              }}>
                STEP {item.step}
              </div>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 22, color: "#fff", margin: "0 0 16px",
              }}>
                {item.title}
              </h3>
              <p style={{
                color: "#e2e8f0", fontSize: 15, lineHeight: 1.7, margin: 0,
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Diagnostics Section */}
      <div id="diagnostics" style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "40px 24px 40px",
      }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 28,
            color: "#fff",
            margin: "0 0 8px",
          }}>
            Not Sure Where to Start?
          </h2>
          <div style={{ width: 50, height: 3, background: CYAN, margin: "16px auto", borderRadius: 2 }} />
          <p style={{
            color: "#e2e8f0",
            fontSize: 17,
            lineHeight: 1.6,
            margin: "0",
          }}>
            Take a free diagnostic.<br className="mobile-br" />{" "}Get personalized results in minutes.
          </p>
        </div>

        <div className="card-grid-2" style={{ padding: "0 24px" }}>
          {diagnostics.map((diag) => (
            <div
              key={diag.id}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "28px 24px 24px",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ marginBottom: 12 }}>{diag.icon}</div>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 19,
                color: "#fff",
                margin: "0 0 4px",
              }}>
                {diag.title}
              </h3>
              <p style={{
                color: CYAN,
                fontSize: 15,
                fontWeight: 600,
                margin: "0 0 12px",
              }}>
                {diag.subtitle}
              </p>
              <p style={{
                color: "#e2e8f0",
                fontSize: 15,
                lineHeight: 1.7,
                margin: "0 0 20px",
                flex: 1,
              }}>
                {diag.description}
              </p>
              <button
                onClick={() => onNavigate(diag.id)}
                style={{
                  background: CYAN,
                  border: "none",
                  color: "#fff",
                  borderRadius: 10,
                  padding: "10px 24px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s ease",
                  width: "100%",
                  boxShadow: `0 6px 24px ${CYAN}44`,
                }}
              >
                Take the Assessment
              </button>
              <p style={{
                color: "#64748b",
                fontSize: 13,
                textAlign: "center",
                margin: "10px 0 0",
              }}>
                {diag.detail}
              </p>
            </div>
          ))}
        </div>
      </div>


      {/* About Section */}
      <div style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "40px 24px 48px",
        textAlign: "center",
      }}>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 26,
          color: "#fff",
          margin: "0 0 8px",
        }}>
          About
        </h2>
        <div style={{ width: 50, height: 3, background: CYAN, margin: "16px auto", borderRadius: 2 }} />
        <div style={{ marginTop: 24, marginBottom: 24, display: "flex", justifyContent: "center" }}>
          <div style={{ width: 140, height: 140, borderRadius: "50%", overflow: "hidden", border: `3px solid ${CYAN}44` }}>
          <img
            src="/tomas.jpg"
            alt="Tomas Bay"
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center 15%",
              transform: "scale(1.4)",
            }}
          />
          </div>
        </div>
        <p style={{
          color: "#e2e8f0",
          fontSize: 16,
          lineHeight: 1.8,
          margin: "0 0 16px",
        }}>
          I'm Tomas Bay, a leadership and change consultant based in Hong Kong.
        </p>
        <p style={{
          color: "#e2e8f0",
          fontSize: 16,
          lineHeight: 1.8,
          margin: "0 0 16px",
        }}>
          Over 30 years I have helped leaders and teams across Europe and Asia Pacific navigate change and turn ideas into real results. That includes 15 years with Maersk in general management and 19 years as a Principal Consultant with the Swire Group, working across diverse industries and cultures.
        </p>
        <p style={{
          color: "#e2e8f0",
          fontSize: 16,
          lineHeight: 1.8,
          margin: "0 0 16px",
        }}>
          In January 2023, I started using ChatGPT. It changed how I work, how I coach, and how I think about what leaders and teams are capable of. Since then, I have helped individuals, leaders, and teams get more out of AI and become more effective at work.
        </p>
        <p style={{
          color: "#e2e8f0",
          fontSize: 16,
          lineHeight: 1.8,
          margin: "0 0 24px",
        }}>
          I built CoachBay.ai to help other organizations make the same shift. Through sprints, diagnostics, and coaching, I help leaders and teams get comfortable with AI in a way that actually sticks.
        </p>
        <a href="mailto:coach@coachbay.ai" style={{
          display: "inline-block",
          background: CYAN,
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: "14px 32px",
          fontSize: 16,
          fontWeight: 600,
          textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: `0 6px 24px ${CYAN}44`,
          transition: "all 0.2s ease",
        }}>
          coach@coachbay.ai
        </a>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center",
        padding: "0 24px 40px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: 32,
        maxWidth: 600,
        margin: "0 auto",
      }}>
        <p style={{ color: "#64748b", fontSize: 13, margin: "0 0 12px" }}>
          Designed by CoachBay
        </p>
        <a href="https://coachbay.com" target="_blank" rel="noopener noreferrer" style={{
          color: "#64748b",
          fontSize: 13,
          textDecoration: "none",
        }}>
          coachbay.com
        </a>
      </div>
    </div>
  );
}
