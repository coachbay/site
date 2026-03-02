import { useState } from 'react'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import LandingPage from './LandingPage'
import DiagnosticEngine from './DiagnosticEngine'
import SwireDashboard from './SwireDashboard'
import ClientAssessment from './ClientAssessment'
import clients, { CLIENT_SCRIPT_URL } from './clientConfig'
import { companyConfig, leaderConfig, teamConfig } from './diagnosticData'

export default function App() {
  const path = window.location.pathname;
  const [page, setPage] = useState("landing");

  // URL-based routes (direct links)
  if (path === "/swire-dashboard") {
    return (
      <>
        <SwireDashboard />
        <Analytics />
      </>
    );
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
