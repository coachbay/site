import { useState } from 'react'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import LandingPage from './LandingPage'
import DiagnosticEngine from './DiagnosticEngine'
import DisruptionSprint from './DisruptionSprint'
import SwireDashboard from './SwireDashboard'
import SwirePropertiesDashboard from './SwirePropertiesDashboard'
import FinnairSymDashboard from './FinnairSymDashboard'
import ClientAssessment from './ClientAssessment'
import ResultsDashboard from './ResultsDashboard'
import ClientResultsDashboard from './ClientResultsDashboard'
import LiveDashboard from './LiveDashboard'
import clients, { CLIENT_SCRIPT_URL } from './clientConfig'
import { companyConfig, leaderConfig, teamConfig, rolloutConfig } from './diagnosticData'

const ROLLOUT_CODES = ["NOLEFTBEHIND", "COACHBAY", "ROLLOUT2026"];

function RolloutCheckGate() {
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  if (unlocked) {
    return (
      <DiagnosticEngine
        {...rolloutConfig}
        onBack={() => { window.location.href = "/"; }}
      />
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      fontFamily: "'DM Sans', sans-serif",
      padding: 24,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      <div style={{
        background: "#fff",
        borderRadius: 16,
        padding: "48px 40px",
        maxWidth: 420,
        width: "100%",
        textAlign: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}>
        <div style={{ marginBottom: 24 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={56} height={56}>
            <circle cx="50" cy="55" r="30" fill="#00BCD4"/>
            <circle cx="38" cy="50" r="7" fill="#fff"/>
            <circle cx="62" cy="50" r="7" fill="#fff"/>
            <circle cx="40" cy="50.5" r="4.5" fill="#1a1a2e"/>
            <circle cx="64" cy="50.5" r="4.5" fill="#1a1a2e"/>
            <line x1="50" y1="25" x2="50" y2="15" stroke="#00BCD4" strokeWidth="3"/>
            <circle cx="50" cy="12" r="5" fill="#00BCD4"/>
          </svg>
        </div>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 26,
          color: "#1a1a2e",
          margin: "0 0 8px",
          lineHeight: 1.2,
        }}>
          Nobody Left Behind
        </h1>
        <p style={{
          fontSize: 15,
          color: "#64748b",
          margin: "0 0 28px",
          lineHeight: 1.5,
        }}>
          AI Rollout Check
        </p>
        <input
          type="text"
          placeholder="Enter access code"
          value={code}
          onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(false); }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (ROLLOUT_CODES.includes(code.trim().toUpperCase())) {
                setUnlocked(true);
              } else {
                setError(true);
              }
            }
          }}
          style={{
            width: "100%",
            padding: "14px 16px",
            fontSize: 16,
            border: error ? "2px solid #ef4444" : "2px solid #e2e8f0",
            borderRadius: 10,
            outline: "none",
            fontFamily: "'DM Sans', sans-serif",
            textAlign: "center",
            letterSpacing: 2,
            boxSizing: "border-box",
            transition: "border-color 0.2s",
          }}
        />
        {error && (
          <p style={{ color: "#ef4444", fontSize: 13, margin: "8px 0 0" }}>
            Invalid code. Please try again.
          </p>
        )}
        <button
          onClick={() => {
            if (ROLLOUT_CODES.includes(code.trim().toUpperCase())) {
              setUnlocked(true);
            } else {
              setError(true);
            }
          }}
          style={{
            marginTop: 16,
            width: "100%",
            padding: "14px 0",
            fontSize: 16,
            fontWeight: 600,
            color: "#fff",
            background: "#00BCD4",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => e.target.style.background = "#0097A7"}
          onMouseLeave={(e) => e.target.style.background = "#00BCD4"}
        >
          Start Check
        </button>
        <p style={{
          fontSize: 12,
          color: "#94a3b8",
          margin: "20px 0 0",
        }}>
          This assessment is by invitation only.
          <br />
          Contact coach@coachbay.ai for access.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const path = window.location.pathname;
  const [page, setPage] = useState("landing");

  // URL-based routes (direct links)
  if (path === "/client-results") {
    return (
      <>
        <ClientResultsDashboard />
        <Analytics />
      </>
    );
  }

  if (path === "/disruption-sprint") {
    return (
      <>
        <DisruptionSprint robotIcon="/coachbay-robot-transparent.png" />
        <Analytics />
      </>
    );
  }

  if (path === "/rollout-check") {
    return (
      <>
        <RolloutCheckGate />
        <Analytics />
      </>
    );
  }

  if (path === "/results") {
    return (
      <>
        <ResultsDashboard />
        <Analytics />
      </>
    );
  }

  if (path === "/swire-dashboard") {
    return (
      <>
        <SwireDashboard />
        <Analytics />
      </>
    );
  }

  if (path === "/sprops-dashboard") {
    return (
      <>
        <SwirePropertiesDashboard />
        <Analytics />
      </>
    );
  }

  if (path === "/finnair-sym-dashboard") {
    return (
      <>
        <FinnairSymDashboard />
        <Analytics />
      </>
    );
  }

  // Dynamic live dashboards: /[client-slug]-dashboard
  if (path.endsWith("-dashboard")) {
    const slug = path.replace(/^\//, "").replace(/-dashboard$/, "");
    if (clients[slug]) {
      return (
        <>
          <LiveDashboard />
          <Analytics />
        </>
      );
    }
  }

  // Client assessment routes: /assess/slug
  if (path.startsWith("/assess/")) {
    const slug = path.replace("/assess/", "").replace(/\/$/, "");
    const client = clients[slug];
    if (client) {
      return (
        <>
          <ClientAssessment
            clientSlug={slug}
            clientName={client.name}
            scriptUrl={CLIENT_SCRIPT_URL}
            assessments={client.assessments || ["company", "leader", "team"]}
          />
          <Analytics />
        </>
      );
    }
    // Unknown client — show simple error
    return (
      <>
        <div style={{
          minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          fontFamily: "'DM Sans', sans-serif", padding: 24, textAlign: "center",
        }}>
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
          <div>
            <h1 style={{ color: "#fff", fontSize: 28, fontFamily: "'DM Serif Display', serif", margin: "0 0 12px" }}>
              Assessment Not Found
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 16, margin: "0 0 24px" }}>
              This assessment link does not appear to be active.
            </p>
            <a href="/" style={{
              color: "#00BCD4", fontSize: 15, textDecoration: "none",
            }}>
              Visit CoachBay.ai →
            </a>
          </div>
        </div>
        <Analytics />
      </>
    );
  }

  const goHome = () => {
    setPage("landing");
    window.scrollTo(0, 0);
  };

  if (page === "company") {
    return (
      <>
        <DiagnosticEngine {...companyConfig} onBack={goHome} />
        <Analytics />
      </>
    );
  }

  if (page === "leader") {
    return (
      <>
        <DiagnosticEngine {...leaderConfig} onBack={goHome} />
        <Analytics />
      </>
    );
  }

  if (page === "team") {
    return (
      <>
        <DiagnosticEngine {...teamConfig} onBack={goHome} />
        <Analytics />
      </>
    );
  }

  return (
    <>
      <LandingPage onNavigate={setPage} />
      <Analytics />
    </>
  );
}
