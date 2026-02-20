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

const CompanyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
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
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="14" r="7" stroke="#00BCD4" strokeWidth="2.5" fill="none"/>
    <path d="M7 36c0-7.18 5.82-13 13-13s13 5.82 13 13" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const TeamIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="12" r="5" stroke="#00BCD4" strokeWidth="2.5" fill="none"/>
    <circle cx="9" cy="16" r="4" stroke="#00BCD4" strokeWidth="2" fill="none"/>
    <circle cx="31" cy="16" r="4" stroke="#00BCD4" strokeWidth="2" fill="none"/>
    <path d="M10 34c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M3 34c0-3.866 2.686-7 6-7" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M37 34c0-3.866-2.686-7-6-7" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

const cardIcons = { company: <CompanyIcon />, leader: <LeaderIcon />, team: <TeamIcon /> };

const cards = [
  {
    id: "company",
    title: "For Companies",
    subtitle: "AI Readiness Diagnostic",
    description: "Is your organisation ready to adopt AI? Assess your strategic clarity, leadership readiness, employee sentiment, culture of change, and practical foundations.",
    buttonText: "Take the Assessment",
    detail: "25 questions · 10 minutes",
  },
  {
    id: "leader",
    title: "For Leaders",
    subtitle: "AI Leadership Diagnostic",
    description: "How effectively are you using AI as a strategic thinking partner? Assess your current usage, habits, depth, trust, and the impact AI is having on your leadership.",
    buttonText: "Take the Assessment",
    detail: "25 questions · 8 minutes",
  },
  {
    id: "team",
    title: "For Teams",
    subtitle: "Personal AI Diagnostic",
    description: "How are you using AI as an individual? Discover where you are on the AI adoption curve and unlock the roles of Assistant, Coach, Expert, Creative, and Conductor.",
    buttonText: "Take the Assessment",
    detail: "25 questions · 8 minutes",
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
        padding: "60px 24px 40px",
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
          fontSize: 20,
          lineHeight: 1.6,
          margin: "0 0 12px",
          fontWeight: 500,
        }}>
          Helping leaders and teams get comfortable with AI
        </p>

      </div>

      {/* Cards Section */}
      <div style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "20px 24px 60px",
        display: "flex",
        flexWrap: "wrap",
        gap: 24,
        justifyContent: "center",
      }}>
        {cards.map((card) => (
          <div
            key={card.id}
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
            <div style={{ fontSize: 36, marginBottom: 16 }}>{cardIcons[card.id]}</div>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 22,
              color: "#fff",
              margin: "0 0 4px",
            }}>
              {card.title}
            </h2>
            <p style={{
              color: CYAN,
              fontSize: 16,
              fontWeight: 600,
              margin: "0 0 16px",
            }}>
              {card.subtitle}
            </p>
            <p style={{
              color: "#94a3b8",
              fontSize: 16,
              lineHeight: 1.7,
              margin: "0 0 24px",
              flex: 1,
            }}>
              {card.description}
            </p>
            <button
              onClick={() => onNavigate(card.id)}
              style={{
                background: CYAN,
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "12px 24px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: `0 6px 24px ${CYAN}44`,
                transition: "all 0.2s ease",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = `0 8px 32px ${CYAN}66`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = `0 6px 24px ${CYAN}44`;
              }}
            >
              {card.buttonText}
            </button>
            <p style={{
              color: "#64748b",
              fontSize: 14,
              textAlign: "center",
              margin: "12px 0 0",
            }}>
              {card.detail}
            </p>
          </div>
        ))}
      </div>

      {/* How I Help Section */}
      <div style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "20px 24px 60px",
      }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 32,
            color: "#fff",
            margin: "0 0 8px",
          }}>
            How I Help
          </h2>
          <div style={{ width: 50, height: 3, background: CYAN, margin: "16px auto", borderRadius: 2 }} />
        </div>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "center",
        }}>
          {/* Companies */}
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: "32px 28px",
            width: 280,
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{ marginBottom: 16 }}><CompanyIcon /></div>
            <h3 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 20, color: "#fff", margin: "0 0 4px",
            }}>Companies</h3>
            <p style={{ color: CYAN, fontSize: 16, fontWeight: 600, margin: "0 0 16px" }}>
              AI Change Management
            </p>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7, margin: "0 0 20px", flex: 1 }}>
              I help organisations roll out AI without the usual resistance. Instead of mandating AI adoption, I help you build momentum through early adopters and visible wins. Using Pilot Squads, workshops, and diagnostics to get things moving.
            </p>
            <a href="mailto:coach@coachbay.ai" style={{
              display: "inline-block",
              border: `1.5px solid ${CYAN}`,
              color: CYAN,
              borderRadius: 10,
              padding: "10px 24px",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s ease",
              alignSelf: "flex-start",
            }}>
              Let's talk →
            </a>
          </div>

          {/* Leaders */}
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: "32px 28px",
            width: 280,
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{ marginBottom: 16 }}><LeaderIcon /></div>
            <h3 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 20, color: "#fff", margin: "0 0 4px",
            }}>Leaders</h3>
            <p style={{ color: CYAN, fontSize: 16, fontWeight: 600, margin: "0 0 16px" }}>
              AI as a Thinking Partner
            </p>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7, margin: "0 0 20px", flex: 1 }}>
              I help leaders use AI for the decisions that actually matter, not just emails and summaries. Using the 4D framework (Define, Discover, Debate, Deliver), I show you how to turn AI into a strategic thinking partner that sharpens your judgment.
            </p>
            <a href="mailto:coach@coachbay.ai" style={{
              display: "inline-block",
              border: `1.5px solid ${CYAN}`,
              color: CYAN,
              borderRadius: 10,
              padding: "10px 24px",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s ease",
              alignSelf: "flex-start",
            }}>
              Let's talk →
            </a>
          </div>

          {/* Teams */}
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: "32px 28px",
            width: 280,
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{ marginBottom: 16 }}><TeamIcon /></div>
            <h3 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 20, color: "#fff", margin: "0 0 4px",
            }}>Teams</h3>
            <p style={{ color: CYAN, fontSize: 16, fontWeight: 600, margin: "0 0 16px" }}>
              Hands-On AI Workshops
            </p>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7, margin: "0 0 20px", flex: 1 }}>
              I help individuals discover the five roles AI can play for them: Assistant, Coach, Expert, Creative, and the Conductor that orchestrates them all. Through hands-on workshops where people experience AI, not just hear about it.
            </p>
            <a href="mailto:coach@coachbay.ai" style={{
              display: "inline-block",
              border: `1.5px solid ${CYAN}`,
              color: CYAN,
              borderRadius: 10,
              padding: "10px 24px",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s ease",
              alignSelf: "flex-start",
            }}>
              Let's talk →
            </a>
          </div>
        </div>
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
        <p style={{ color: "#64748b", fontSize: 15, margin: "0 0 8px" }}>
          Designed by CoachBay
        </p>
        <p style={{ color: "#94a3b8", fontSize: 15, margin: "0 0 12px" }}>
          Tomas Bay · <a href="mailto:coach@coachbay.ai" style={{ color: CYAN, textDecoration: "none" }}>coach@coachbay.ai</a>
        </p>
        <a href="https://coachbay.com" target="_blank" rel="noopener noreferrer" style={{
          color: "#64748b",
          fontSize: 15,
          textDecoration: "none",
        }}>
          coachbay.com →
        </a>
      </div>
    </div>
  );
}
