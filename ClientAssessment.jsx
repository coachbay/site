import { useState } from "react";
import DiagnosticEngine from "./DiagnosticEngine";
import { companyConfig, leaderConfig, teamConfig } from "./diagnosticData";

const CYAN = "#00BCD4";
const DARK = "#1a1a2e";

const diagnosticOptions = [
  {
    key: "company",
    label: "Organization Assessment",
    desc: "How ready is your organization to adopt AI?",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
    config: companyConfig,
  },
  {
    key: "leader",
    label: "Leadership Assessment",
    desc: "How are you using AI as a leader?",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
    config: leaderConfig,
  },
  {
    key: "team",
    label: "Personal AI Assessment",
    desc: "How are you using AI as an individual?",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>
    ),
    config: teamConfig,
  },
];

export default function ClientAssessment({ clientSlug, clientName, scriptUrl }) {
  const [phase, setPhase] = useState("collect"); // collect → pick → diagnostic
  const [respondentName, setRespondentName] = useState("");
  const [respondentEmail, setRespondentEmail] = useState("");
  const [selectedDiagnostic, setSelectedDiagnostic] = useState(null);
  const [emailError, setEmailError] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleContinue = () => {
    if (!respondentName.trim() || !respondentEmail.trim()) return;
    if (!isValidEmail(respondentEmail.trim())) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    setPhase("pick");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && respondentName.trim() && respondentEmail.trim()) {
      handleContinue();
    }
  };

  const handleSelectDiagnostic = (option) => {
    setSelectedDiagnostic(option);
    setPhase("diagnostic");
  };

  const goBackToPick = () => {
    setSelectedDiagnostic(null);
    setPhase("pick");
  };

  // Phase 3: Run the diagnostic
  if (phase === "diagnostic" && selectedDiagnostic) {
    return (
      <DiagnosticEngine
        {...selectedDiagnostic.config}
        onBack={goBackToPick}
        clientMode={{
          respondentName: respondentName.trim(),
          respondentEmail: respondentEmail.trim(),
          clientCompany: clientName,
          clientSlug: clientSlug,
          scriptUrl: scriptUrl,
        }}
      />
    );
  }

  // Phase 2: Pick a diagnostic
  if (phase === "pick") {
    return (
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${DARK} 0%, #16213e 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24, fontFamily: "'DM Sans', sans-serif",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
        <div style={{ maxWidth: 560, width: "100%" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="56" height="56">
                <circle cx="50" cy="55" r="30" fill="#00BCD4"/>
                <circle cx="38" cy="50" r="7" fill="#fff"/>
                <circle cx="62" cy="50" r="7" fill="#fff"/>
                <circle cx="40" cy="50.5" r="4.5" fill="#1a1a2e"/>
                <circle cx="64" cy="50.5" r="4.5" fill="#1a1a2e"/>
                <line x1="50" y1="25" x2="50" y2="15" stroke="#00BCD4" strokeWidth="3"/>
                <circle cx="50" cy="12" r="5" fill="#00BCD4"/>
              </svg>
            </div>
            <p style={{ color: CYAN, fontSize: 14, fontWeight: 600, letterSpacing: 1, margin: "0 0 8px", textTransform: "uppercase" }}>
              {clientName}
            </p>
            <h1 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 28, color: "#fff", margin: "0 0 8px", lineHeight: 1.3,
            }}>
              Choose Your Assessment
            </h1>
            <div style={{ width: 50, height: 3, background: CYAN, margin: "16px auto", borderRadius: 2 }} />
            <p style={{ color: "#94a3b8", fontSize: 15, margin: 0 }}>
              Welcome, {respondentName}
            </p>
          </div>

          {/* Diagnostic cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {diagnosticOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleSelectDiagnostic(option)}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 16, padding: "20px 24px",
                  cursor: "pointer", textAlign: "left",
                  display: "flex", alignItems: "center", gap: 20,
                  transition: "all 0.2s ease",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,188,212,0.08)";
                  e.currentTarget.style.borderColor = CYAN + "44";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: `${CYAN}15`, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {option.icon}
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: 17, fontWeight: 600, marginBottom: 4 }}>
                    {option.label}
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.4 }}>
                    {option.desc}
                  </div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" style={{ marginLeft: "auto", flexShrink: 0 }}>
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <p style={{ color: "#475569", fontSize: 12, margin: "0 0 4px" }}>
              Powered by CoachBay
            </p>
            <p style={{ color: "#475569", fontSize: 13, margin: 0 }}>
              <a href="mailto:coach@coachbay.ai" style={{ color: CYAN, textDecoration: "none" }}>coach@coachbay.ai</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Phase 1: Collect name and email
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${DARK} 0%, #16213e 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, fontFamily: "'DM Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
        {/* Logo */}
        <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="72" height="72">
            <circle cx="50" cy="55" r="30" fill="#00BCD4"/>
            <circle cx="38" cy="50" r="7" fill="#fff"/>
            <circle cx="62" cy="50" r="7" fill="#fff"/>
            <circle cx="40" cy="50.5" r="4.5" fill="#1a1a2e"/>
            <circle cx="64" cy="50.5" r="4.5" fill="#1a1a2e"/>
            <line x1="50" y1="25" x2="50" y2="15" stroke="#00BCD4" strokeWidth="3"/>
            <circle cx="50" cy="12" r="5" fill="#00BCD4"/>
          </svg>
        </div>

        {/* Company name */}
        <p style={{ color: CYAN, fontSize: 14, fontWeight: 600, letterSpacing: 1, margin: "0 0 8px", textTransform: "uppercase" }}>
          {clientName}
        </p>

        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 32, color: "#fff", margin: "0 0 8px", lineHeight: 1.2,
        }}>
          AI Readiness Assessment
        </h1>
        <div style={{ width: 50, height: 3, background: CYAN, margin: "16px auto", borderRadius: 2 }} />
        <p style={{ color: "#e2e8f0", fontSize: 16, lineHeight: 1.7, margin: "0 0 36px" }}>
          Enter your details below to begin.
          <br />
          Your responses will be kept confidential.
        </p>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360, margin: "0 auto" }}>
          <div style={{ textAlign: "left" }}>
            <label style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500, marginBottom: 6, display: "block" }}>
              Full Name
            </label>
            <input
              type="text"
              value={respondentName}
              onChange={(e) => setRespondentName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your name"
              style={{
                width: "100%", padding: "14px 16px", borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.06)",
                color: "#fff", fontSize: 16,
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                transition: "border-color 0.2s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => e.target.style.borderColor = CYAN}
              onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <label style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500, marginBottom: 6, display: "block" }}>
              Email Address
            </label>
            <input
              type="email"
              value={respondentEmail}
              onChange={(e) => { setRespondentEmail(e.target.value); setEmailError(""); }}
              onKeyDown={handleKeyDown}
              placeholder="Enter your email"
              style={{
                width: "100%", padding: "14px 16px", borderRadius: 12,
                border: `1px solid ${emailError ? "#ef4444" : "rgba(255,255,255,0.15)"}`,
                background: "rgba(255,255,255,0.06)",
                color: "#fff", fontSize: 16,
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                transition: "border-color 0.2s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => e.target.style.borderColor = emailError ? "#ef4444" : CYAN}
              onBlur={(e) => e.target.style.borderColor = emailError ? "#ef4444" : "rgba(255,255,255,0.15)"}
            />
            {emailError && (
              <p style={{ color: "#ef4444", fontSize: 13, margin: "6px 0 0", textAlign: "left" }}>
                {emailError}
              </p>
            )}
          </div>

          <button
            onClick={handleContinue}
            disabled={!respondentName.trim() || !respondentEmail.trim()}
            style={{
              background: (!respondentName.trim() || !respondentEmail.trim()) ? "#334155" : CYAN,
              color: "#fff", border: "none", borderRadius: 14,
              padding: "14px 40px", fontSize: 17, fontWeight: 600,
              cursor: (!respondentName.trim() || !respondentEmail.trim()) ? "not-allowed" : "pointer",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: (!respondentName.trim() || !respondentEmail.trim()) ? "none" : `0 8px 32px ${CYAN}44`,
              transition: "all 0.2s ease",
              marginTop: 8,
            }}
          >
            Continue
          </button>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 40 }}>
          <p style={{ color: "#475569", fontSize: 12, margin: "0 0 4px" }}>
            Powered by CoachBay
          </p>
          <p style={{ color: "#475569", fontSize: 13, margin: 0 }}>
            Tomas Bay · <a href="mailto:coach@coachbay.ai" style={{ color: CYAN, textDecoration: "none" }}>coach@coachbay.ai</a>
          </p>
        </div>
      </div>
    </div>
  );
}
