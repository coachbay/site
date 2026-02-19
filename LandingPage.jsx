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

const cards = [
  {
    id: "company",
    icon: "🏢",
    title: "For Companies",
    subtitle: "AI Readiness Diagnostic",
    description: "Is your organisation ready to adopt AI? Assess your strategic clarity, leadership readiness, employee sentiment, culture of change, and practical foundations.",
    buttonText: "Take the Assessment",
    detail: "25 questions · 10 minutes",
  },
  {
    id: "leader",
    icon: "👔",
    title: "For Leaders",
    subtitle: "AI Leadership Diagnostic",
    description: "How effectively are you using AI as a strategic thinking partner? Assess your current usage, habits, depth, trust, and the impact AI is having on your leadership.",
    buttonText: "Take the Assessment",
    detail: "25 questions · 8 minutes",
  },
  {
    id: "team",
    icon: "👥",
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
        <p style={{
          color: "#94a3b8",
          fontSize: 15,
          lineHeight: 1.7,
          margin: "0 auto",
          maxWidth: 520,
        }}>
          20 years of experience in leadership, communication, innovation, and change management — now focused on helping organisations adopt AI with confidence.
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
            <div style={{ fontSize: 36, marginBottom: 16 }}>{card.icon}</div>
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
              fontSize: 14,
              fontWeight: 600,
              margin: "0 0 16px",
            }}>
              {card.subtitle}
            </p>
            <p style={{
              color: "#94a3b8",
              fontSize: 14,
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
                fontSize: 15,
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
              fontSize: 12,
              textAlign: "center",
              margin: "12px 0 0",
            }}>
              {card.detail}
            </p>
          </div>
        ))}
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
        <p style={{ color: "#64748b", fontSize: 13, margin: "0 0 8px" }}>
          Designed by CoachBay
        </p>
        <p style={{ color: "#94a3b8", fontSize: 14, margin: "0 0 12px" }}>
          Tomas Bay · <a href="mailto:coach@coachbay.ai" style={{ color: CYAN, textDecoration: "none" }}>coach@coachbay.ai</a>
        </p>
        <a href="https://coachbay.com" target="_blank" rel="noopener noreferrer" style={{
          color: "#64748b",
          fontSize: 13,
          textDecoration: "none",
        }}>
          coachbay.com →
        </a>
      </div>
    </div>
  );
}
