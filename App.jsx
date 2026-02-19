import { useState } from 'react'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import LandingPage from './LandingPage'
import DiagnosticEngine from './DiagnosticEngine'
import { companyConfig, leaderConfig, teamConfig } from './diagnosticData'

export default function App() {
  const [page, setPage] = useState("landing");

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
