import { useState } from 'react'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import LandingPage from './LandingPage'
import DiagnosticEngine from './DiagnosticEngine'
import SwireDashboard from './SwireDashboard'
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
