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

const RocketIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 6c0 0-12 8-12 22v4l6 6h12l6-6v-4C36 14 24 6 24 6z" stroke="#00BCD4" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
    <circle cx="24" cy="22" r="4" stroke="#00BCD4" strokeWidth="2" fill="none"/>
    <path d="M18 34l-4 4v4l4-2M30 34l4 4v4l-4-2" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M21 38v4M24 39v4M27 38v4" stroke="#00BCD4" strokeWidth="1.5" strokeLinecap="round"/>
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

const MagnetIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M14 20v-6a10 10 0 0 1 20 0v6" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <rect x="10" y="20" width="8" height="14" rx="2" stroke="#00BCD4" strokeWidth="2.5" fill="none"/>
    <rect x="30" y="20" width="8" height="14" rx="2" stroke="#00BCD4" strokeWidth="2.5" fill="none"/>
    <line x1="10" y1="26" x2="18" y2="26" stroke="#00BCD4" strokeWidth="2"/>
    <line x1="30" y1="26" x2="38" y2="26" stroke="#00BCD4" strokeWidth="2"/>
    <path d="M9 38c3-2 5-3 7-3M32 35c2 0 4 1 7 3" stroke="#00BCD4" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    <path d="M7 42c4-2 6-3 9-3M32 39c3 0 5 1 9 3" stroke="#00BCD4" strokeWidth="1.5" strokeLinecap="round" opacity="0.25"/>
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
    icon: <RocketIcon />,
    title: "Core Sprint",
    tagline: "for skills",
    detail: "Half day sprint for managers, team leads, and specialists.",
    description: "Discover four AI roles that go far beyond basic chat. For anyone still using AI mainly as an assistant who wants to unlock its real potential.",
  },
  {
    id: "strategy",
    icon: <CompassIcon />,
    title: "Strategy Sprint",
    tagline: "for thinking",
    detail: "Half day sprint for senior managers and executives.",
    description: "Use AI as a thinking partner on the decisions that actually matter. For leaders who want AI to sharpen their judgement, not just save time.",
  },
  {
    id: "change",
    icon: <MagnetIcon />,
    title: "Change Sprint",
    tagline: "for adoption",
    detail: "Half day sprint for leaders driving AI adoption.",
    description: "Learn to drive adoption through pull, not push. For leaders responsible for getting AI working across their organisation.",
  },
];

const diagnostics = [
  {
    id: "company",
    icon: <CompanyIcon />,
    title: "For Companies",
    subtitle: "AI Readiness Diagnostic",
    description: "See where your organisation actually stands with AI across five dimensions. So you can decide what to focus on next.",
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

      {/* Hero Section */}
      <div style={{
        textAlign: "center",
        padding: "60px 24px 48px",
        maxWidth: 720,
        margin: "0 auto",
      }}>
        <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
          <RobotIcon />
        </div>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 42,
          color: "#fff",
          margin: "0 0 8px",
          lineHeight: 1.2,
        }}>
          CoachBay<span style={{ color: CYAN }}>.ai</span>
        </h1>
        <div style={{
          width: 60,
          height: 3,
          background: CYAN,
          margin: "20px auto",
          borderRadius: 2,
        }} />
        <p style={{
          color: "#e2e8f0",
          fontSize: 21,
          lineHeight: 1.5,
          margin: "0 0 16px",
          fontWeight: 500,
        }}>
          Most AI initiatives start with tools.<br />The successful ones start with people.
        </p>
        <p style={{
          color: "#94a3b8",
          fontSize: 16,
          lineHeight: 1.7,
          margin: "0",
        }}>
          I help leaders and organisations adopt AI<br />in a way that actually sticks.
        </p>
        <a
          href="#diagnostics"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("diagnostics")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            display: "inline-block",
            marginTop: 28,
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
          Not sure where to start? Try a free diagnostic
        </a>
      </div>

      {/* Problem Section */}
      <div style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "20px 24px 48px",
        textAlign: "center",
      }}>
        <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="18" stroke={CYAN} strokeWidth="2.5" fill="none"/>
            <line x1="24" y1="14" x2="24" y2="26" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="24" cy="32" r="2" fill={CYAN}/>
          </svg>
        </div>
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
        }}>
          Organisations buy tools, write policies, and roll out training.<br />Then wonder why nothing changes.
        </p>
        <p style={{
          color: "#94a3b8",
          fontSize: 15,
          lineHeight: 1.8,
          margin: "0",
        }}>
          The problem is rarely the technology.<br />It is whether leaders use AI themselves,<br />whether employees feel safe to experiment,<br />and whether the culture is ready for change.
        </p>
      </div>

      {/* Sprints Section */}
      <div style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "20px 24px 20px",
      }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 30,
            color: "#fff",
            margin: "0 0 8px",
          }}>
            Three AI Sprints.<br />One Journey.
          </h2>
          <div style={{ width: 50, height: 3, background: CYAN, margin: "16px auto", borderRadius: 2 }} />
          <p style={{
            color: "#e2e8f0",
            fontSize: 17,
            lineHeight: 1.6,
            margin: "0",
          }}>
            From personal AI skills<br />to organisational adoption.
          </p>
          <p style={{
            color: "#94a3b8",
            fontSize: 15,
            lineHeight: 1.6,
            margin: "12px 0 0",
          }}>
            Each Sprint works standalone, or they can be<br />sequenced as a journey for maximum impact.
          </p>
        </div>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "center",
        }}>
          {sprints.map((sprint) => (
            <div
              key={sprint.id}
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                padding: "36px 28px 32px",
                width: 280,
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
                fontSize: 14,
                fontWeight: 600,
                margin: "0 0 16px",
              }}>
                {sprint.tagline}
              </p>
              <p style={{
                color: "#94a3b8",
                fontSize: 14,
                lineHeight: 1.7,
                margin: "0 0 16px",
                flex: 1,
              }}>
                {sprint.description}
              </p>
              <p style={{
                color: "#94a3b8",
                fontSize: 13,
                margin: "0 0 20px",
              }}>
                {sprint.detail}
              </p>
              <a href="mailto:coach@coachbay.ai" style={{
                display: "block",
                textAlign: "center",
                background: CYAN,
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "12px 24px",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: `0 6px 24px ${CYAN}44`,
                transition: "all 0.2s ease",
              }}>
                Get in touch
              </a>
            </div>
          ))}
        </div>

        {/* Pit Stops note */}
        <div style={{
          textAlign: "center",
          marginTop: 28,
          padding: "28px 28px 24px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          width: 280,
          marginLeft: "auto",
          marginRight: "auto",
        }}>
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
            fontSize: 14,
            fontWeight: 600,
            margin: "0 0 16px",
          }}>
            for habits
          </p>
          <p style={{
            color: "#94a3b8",
            fontSize: 14,
            lineHeight: 1.7,
            margin: 0,
          }}>
            Each Sprint can be followed by short virtual sessions to reinforce what was learned and turn new skills into lasting habits.
          </p>
        </div>
      </div>

      {/* Working with Clients Section */}
      <div style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "60px 24px 40px",
      }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 30,
            color: "#fff",
            margin: "0 0 8px",
          }}>
            Working with Clients
          </h2>
          <div style={{ width: 50, height: 3, background: CYAN, margin: "16px auto", borderRadius: 2 }} />
        </div>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "center",
        }}>
          {[
            {
              step: "01",
              title: "Discover",
              description: "I start by understanding where you actually are with AI. Not where you think you should be. That means listening to leaders, talking to employees, and finding where the real opportunities are.",
              icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="18" cy="18" r="10" stroke={CYAN} strokeWidth="2.5" fill="none"/>
                  <line x1="25" y1="25" x2="33" y2="33" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              ),
            },
            {
              step: "02",
              title: "Design",
              description: "I put together a programme that fits your organisation, your people, and your pace. No generic playbooks. Just a clear, practical plan for where you are right now.",
              icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="8" y="8" width="24" height="28" rx="3" stroke={CYAN} strokeWidth="2.5" fill="none"/>
                  <line x1="13" y1="16" x2="27" y2="16" stroke={CYAN} strokeWidth="2" strokeLinecap="round"/>
                  <line x1="13" y1="22" x2="27" y2="22" stroke={CYAN} strokeWidth="2" strokeLinecap="round"/>
                  <line x1="13" y1="28" x2="21" y2="28" stroke={CYAN} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ),
            },
            {
              step: "03",
              title: "Deliver",
              description: "I work alongside your team to make AI real. Through sprints, pilot squads, and practical coaching that builds genuine capability, not just awareness.",
              icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M20 6 C20 6 26 10 26 20 L26 26 L20 30 L14 26 L14 20 C14 10 20 6 20 6Z" stroke={CYAN} strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
                  <circle cx="20" cy="18" r="3" stroke={CYAN} strokeWidth="2" fill="none"/>
                  <path d="M14 24 L10 28 L10 32 L14 30" stroke={CYAN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M26 24 L30 28 L30 32 L26 30" stroke={CYAN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M17 30 L17 34 M20 31 L20 35 M23 30 L23 34" stroke={CYAN} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
            },
          ].map((item) => (
            <div key={item.step} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: "32px 28px",
              width: 280,
              display: "flex",
              flexDirection: "column",
            }}>
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
                color: "#94a3b8", fontSize: 14, lineHeight: 1.7, margin: 0,
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
            Take a free diagnostic.<br />Get personalised results in minutes.
          </p>
        </div>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
        }}>
          {diagnostics.map((diag) => (
            <div
              key={diag.id}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "28px 24px 24px",
                width: 280,
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
                fontSize: 13,
                fontWeight: 600,
                margin: "0 0 12px",
              }}>
                {diag.subtitle}
              </p>
              <p style={{
                color: "#94a3b8",
                fontSize: 13,
                lineHeight: 1.7,
                margin: "0 0 20px",
                flex: 1,
              }}>
                {diag.description}
              </p>
              <button
                onClick={() => onNavigate(diag.id)}
                style={{
                  background: "none",
                  border: `1.5px solid ${CYAN}`,
                  color: CYAN,
                  borderRadius: 10,
                  padding: "10px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s ease",
                  width: "100%",
                }}
              >
                Take the Assessment
              </button>
              <p style={{
                color: "#64748b",
                fontSize: 11,
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
        <p style={{
          color: "#e2e8f0",
          fontSize: 16,
          lineHeight: 1.8,
          margin: "0 0 24px",
        }}>
          I'm Tomas Bay. I help leaders and teams get comfortable with AI through practical sprints, diagnostics, and coaching. Not slides and theory. Real experience with real tools on real problems.
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
