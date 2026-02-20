import { useState, useEffect, useRef } from "react";

const CYAN = "#00BCD4";
const DARK = "#1a1a2e";
const MID = "#6b7280";
const LIGHT_BG = "#f8fafb";
const RED_ACCENT = "#ef4444";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz_hrHvkJGB2saiK0pr3lEhZqdA4gdOub_FynmcaHDc9JzFFhfGPCJYTqd0Ln8c3toRqA/exec";

function ScoreRing({ score, max, color, size = 120, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = score / max;
  const offset = circumference * (1 - pct);
  return (
    <svg width={size} height={size} style={{ display: "block" }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 1s ease-out" }}
      />
      <text x={size / 2} y={size / 2 - 6} textAnchor="middle" dominantBaseline="central"
        style={{ fontSize: size * 0.28, fontWeight: 700, fill: color, fontFamily: "'DM Sans', sans-serif" }}>
        {score}
      </text>
      <text x={size / 2} y={size / 2 + 16} textAnchor="middle" dominantBaseline="central"
        style={{ fontSize: size * 0.12, fill: MID, fontFamily: "'DM Sans', sans-serif" }}>
        / {max}
      </text>
    </svg>
  );
}

function RatingButton({ value, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 56, height: 56, borderRadius: 14,
      border: selected ? `2.5px solid ${CYAN}` : "2px solid #d1d5db",
      background: selected ? CYAN : "#fff",
      color: selected ? "#fff" : DARK,
      fontSize: 20, fontWeight: 700, cursor: "pointer",
      transition: "all 0.2s ease",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      boxShadow: selected ? `0 4px 16px ${CYAN}33` : "0 1px 3px rgba(0,0,0,0.06)",
    }}>
      {value}
    </button>
  );
}

export default function DiagnosticEngine({
  title,
  subtitle,
  description,
  sections,
  tierData,
  sectionAdvice,
  diagnosticType,
  empathyGap,
  onBack,
}) {
  const [phase, setPhase] = useState("intro");
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animating, setAnimating] = useState(false);
  const questionRef = useRef(null);

  const totalQuestions = sections.length * 5;
  const answeredCount = Object.keys(answers).length;
  const globalIndex = currentSection * 5 + currentQuestion;

  // Send results to Google Sheet
  useEffect(() => {
    if (phase === "results") {
      const { sectionScores, grandTotal, tier } = calculateResults();
      const params = new URLSearchParams({
        type: diagnosticType,
        score: grandTotal,
        tier: tier.label,
      });
      sectionScores.forEach((sec, si) => {
        params.append(sec.id, sec.score);
        for (let qi = 0; qi < 5; qi++) {
          params.append(`${sec.id}_q${qi + 1}`, answers[`${si}-${qi}`] || 0);
        }
      });
      if (empathyGap) {
        const ls = sectionScores.find(s => s.id === empathyGap.leadershipId);
        const es = sectionScores.find(s => s.id === empathyGap.sentimentId);
        if (ls && es) {
          params.append("gap", (ls.score >= 20 && (ls.score - es.score) >= 8) ? "Yes" : "No");
        }
      }
      const img = new Image();
      img.src = GOOGLE_SCRIPT_URL + "?" + params.toString();
    }
  }, [phase]);

  const handleRate = (value) => {
    const key = `${currentSection}-${currentQuestion}`;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => {
      if (currentQuestion < 4) {
        setAnimating(true);
        setTimeout(() => {
          setCurrentQuestion((q) => q + 1);
          setAnimating(false);
        }, 200);
      } else if (currentSection < sections.length - 1) {
        setAnimating(true);
        setTimeout(() => {
          setCurrentSection((s) => s + 1);
          setCurrentQuestion(0);
          setAnimating(false);
        }, 200);
      }
    }, 300);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1);
    } else if (currentSection > 0) {
      setCurrentSection((s) => s - 1);
      setCurrentQuestion(4);
    }
  };

  const calculateResults = () => {
    const sectionScores = sections.map((sec, si) => {
      let total = 0;
      for (let qi = 0; qi < 5; qi++) {
        total += answers[`${si}-${qi}`] || 0;
      }
      return { ...sec, score: total };
    });
    const grandTotal = sectionScores.reduce((sum, s) => sum + s.score, 0);
    const tier = tierData.find(
      (t) => grandTotal >= t.range[0] && grandTotal <= t.range[1]
    ) || tierData[tierData.length - 1];
    return { sectionScores, grandTotal, tier };
  };

  const canFinish = answeredCount === totalQuestions;
  const section = sections[currentSection];
  const question = section?.questions[currentQuestion];
  const currentAnswer = answers[`${currentSection}-${currentQuestion}`];

  // Intro screen
  if (phase === "intro") {
    return (
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${DARK} 0%, #16213e 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24, fontFamily: "'DM Sans', sans-serif",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
        <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
          <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="72" height="72">
              <circle cx="50" cy="55" r="30" fill="#00BCD4"/>
              <circle cx="38" cy="50" r="7" fill="#fff"/>
              <circle cx="62" cy="50" r="7" fill="#fff"/>
              <circle cx="40" cy="51" r="4" fill="#1a1a2e"/>
              <circle cx="64" cy="51" r="4" fill="#1a1a2e"/>
              <line x1="50" y1="25" x2="50" y2="15" stroke="#00BCD4" strokeWidth="3"/>
              <circle cx="50" cy="12" r="5" fill="#00BCD4"/>
            </svg>
          </div>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 36, color: "#fff", margin: "0 0 8px", lineHeight: 1.2,
          }}>
            {title}
          </h1>
          <div style={{ width: 60, height: 3, background: CYAN, margin: "20px auto", borderRadius: 2 }} />
          <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.7, margin: "0 0 12px" }}>
            {subtitle}
          </p>
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, margin: "0 0 40px" }}>
            {description}
          </p>
          <button
            onClick={() => setPhase("assessment")}
            style={{
              background: CYAN, color: "#fff", border: "none", borderRadius: 14,
              padding: "14px 40px", fontSize: 17, fontWeight: 600,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              boxShadow: `0 8px 32px ${CYAN}44`,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 32px ${CYAN}66`; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 8px 32px ${CYAN}44`; }}
          >
            Start Assessment â†’
          </button>
          <div style={{ marginTop: 32 }}>
            <button
              onClick={onBack}
              style={{
                background: "none", border: "none", color: "#64748b",
                fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                textDecoration: "underline", textUnderlineOffset: 4,
              }}
            >
              â† Back to CoachBay.ai
            </button>
          </div>
          <p style={{ color: "#475569", fontSize: 12, marginTop: 24 }}>
            Designed by CoachBay
          </p>
          <p style={{ color: "#475569", fontSize: 13, marginTop: 8 }}>
            Tomas Bay Â· <a href="mailto:coach@coachbay.ai" style={{ color: CYAN, textDecoration: "none" }}>coach@coachbay.ai</a>
          </p>
        </div>
      </div>
    );
  }

  // Results screen
  if (phase === "results") {
    const { sectionScores, grandTotal, tier } = calculateResults();
    return (
      <div style={{
        minHeight: "100vh", background: LIGHT_BG,
        fontFamily: "'DM Sans', sans-serif", padding: "40px 24px",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h1 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 32, color: DARK, margin: "0 0 8px",
            }}>Your Results</h1>
            <div style={{ width: 50, height: 3, background: CYAN, margin: "12px auto", borderRadius: 2 }} />
          </div>

          {/* Overall Score Card */}
          <div style={{
            background: "#fff", borderRadius: 20, padding: 40,
            textAlign: "center", marginBottom: 32,
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            border: `2px solid ${tier.color}22`,
          }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <ScoreRing score={grandTotal} max={125} color={tier.color} size={140} strokeWidth={12} />
            </div>
            <div style={{
              display: "inline-block",
              background: `${tier.color}15`, color: tier.color,
              padding: "6px 20px", borderRadius: 100,
              fontSize: 15, fontWeight: 700, marginBottom: 16,
              border: `1.5px solid ${tier.color}33`,
            }}>
              {tier.label}
            </div>
            <p style={{ color: MID, fontSize: 15, lineHeight: 1.7, margin: "12px 0 0", maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
              {tier.summary}
            </p>
          </div>

          {/* What to do next */}
          <div style={{
            background: `${tier.color}08`,
            borderLeft: `4px solid ${tier.color}`,
            borderRadius: "0 16px 16px 0",
            padding: "20px 24px", marginBottom: 40,
          }}>
            <div style={{ fontWeight: 700, color: DARK, fontSize: 15, marginBottom: 8 }}>
              âœ¦ Your Next Move
            </div>
            <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              {tier.action}
            </p>
          </div>

          {/* Section Breakdown */}
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 22, color: DARK, marginBottom: 20,
          }}>Section Breakdown</h2>

          {sectionScores.map((sec) => {
            const pct = sec.score / 25;
            const level = pct < 0.5 ? "low" : pct < 0.75 ? "mid" : "high";
            const barColor = pct < 0.5 ? RED_ACCENT : pct < 0.75 ? "#f59e0b" : "#10b981";
            const advice = sectionAdvice[sec.id]?.[level] || "";
            return (
              <div key={sec.id} style={{
                background: "#fff", borderRadius: 16, padding: 24,
                marginBottom: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{sec.icon}</span>
                    <span style={{ fontWeight: 700, color: DARK, fontSize: 15 }}>{sec.title}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: barColor, fontSize: 18 }}>
                    {sec.score}<span style={{ color: MID, fontWeight: 400, fontSize: 13 }}> / 25</span>
                  </span>
                </div>
                <div style={{ height: 8, background: "#e5e7eb", borderRadius: 100, overflow: "hidden", marginBottom: 16 }}>
                  <div style={{
                    height: "100%", width: `${pct * 100}%`, background: barColor,
                    borderRadius: 100, transition: "width 1s ease-out",
                  }} />
                </div>
                <p style={{
                  color: "#4b5563", fontSize: 13.5, lineHeight: 1.7, margin: 0,
                  padding: "12px 14px", background: `${barColor}08`,
                  borderRadius: 10, borderLeft: `3px solid ${barColor}44`,
                }}>
                  {advice}
                </p>
              </div>
            );
          })}

          {/* Empathy Gap (Company diagnostic only) */}
          {empathyGap && (() => {
            const ls = sectionScores.find(s => s.id === empathyGap.leadershipId);
            const es = sectionScores.find(s => s.id === empathyGap.sentimentId);
            if (!ls || !es) return null;
            const gap = ls.score - es.score;
            if (gap >= 5) {
              return (
                <div style={{
                  background: `linear-gradient(135deg, ${DARK}, #16213e)`,
                  borderRadius: 16, padding: 28, marginTop: 24, marginBottom: 24,
                }}>
                  <div style={{ color: CYAN, fontWeight: 700, fontSize: 14, marginBottom: 8, letterSpacing: 1 }}>
                    âš  EMPATHY GAP DETECTED
                  </div>
                  <p style={{ color: "#e2e8f0", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                    Your Leadership Readiness score ({ls.score}) is significantly higher than your Employee Sentiment score ({es.score}). This is the classic Empathy Gap, where leaders are more excited about AI than their teams. The risk is pushing initiatives that create compliance, not buy-in. Focus on understanding how employees actually feel before launching anything.
                  </p>
                </div>
              );
            }
            return null;
          })()}

          {/* Bottom Actions */}
          <div style={{ textAlign: "center", marginTop: 40, paddingBottom: 40 }}>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  setPhase("intro");
                  setCurrentSection(0);
                  setCurrentQuestion(0);
                  setAnswers({});
                }}
                style={{
                  background: "none", border: `2px solid ${CYAN}`, color: CYAN,
                  borderRadius: 12, padding: "12px 28px", fontSize: 14, fontWeight: 600,
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                }}
              >
                â† Retake Assessment
              </button>
              <button
                onClick={onBack}
                style={{
                  background: "none", border: "2px solid #d1d5db", color: MID,
                  borderRadius: 12, padding: "12px 28px", fontSize: 14, fontWeight: 600,
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Back to CoachBay.ai
              </button>
            </div>
            <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 24 }}>
              Designed by CoachBay
            </p>
            <div style={{
              background: `${CYAN}10`, border: `1.5px solid ${CYAN}33`,
              borderRadius: 16, padding: "24px 28px", marginTop: 24, textAlign: "center",
            }}>
              <p style={{ color: DARK, fontSize: 16, fontWeight: 600, margin: "0 0 6px" }}>
                Want help accelerating your AI journey?
              </p>
              <p style={{ color: MID, fontSize: 14, margin: "0 0 12px" }}>
                Get in touch with Tomas Bay
              </p>
              <a href="mailto:coach@coachbay.ai" style={{
                color: CYAN, fontSize: 15, fontWeight: 600, textDecoration: "none",
              }}>
                coach@coachbay.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Assessment screen
  const progress = (globalIndex / totalQuestions) * 100;

  return (
    <div style={{
      minHeight: "100vh", background: LIGHT_BG,
      fontFamily: "'DM Sans', sans-serif",
      display: "flex", flexDirection: "column",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* Progress bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ height: 4, background: "#e5e7eb" }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: `linear-gradient(90deg, ${CYAN}, #0097a7)`,
            transition: "width 0.4s ease", borderRadius: "0 4px 4px 0",
          }} />
        </div>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 24px", maxWidth: 640, margin: "0 auto", width: "100%",
        }}>
          <span style={{ fontSize: 16, color: MID, fontWeight: 700 }}>
            {section.icon} {section.title}
          </span>
          <span style={{ fontSize: 16, color: MID, fontWeight: 700 }}>
            {globalIndex + 1} of {totalQuestions}
          </span>
        </div>
      </div>

      {/* Question area */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 24px",
      }}>
        <div ref={questionRef} style={{
          maxWidth: 560, width: "100%",
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(12px)" : "translateY(0)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}>
          {currentQuestion === 0 && (
            <div style={{
              display: "inline-block", background: `${CYAN}12`, color: CYAN,
              padding: "4px 14px", borderRadius: 100, fontSize: 15,
              fontWeight: 600, marginBottom: 8, letterSpacing: 0.5,
            }}>
              SECTION {currentSection + 1} OF {sections.length}
            </div>
          )}
          {currentQuestion === 0 && (
            <p style={{ color: MID, fontSize: 16, margin: "4px 0 24px", lineHeight: 1.5 }}>
              {section.subtitle}
            </p>
          )}
          <div style={{
            background: "#fff", borderRadius: 20, padding: "32px 28px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)", marginBottom: 32,
          }}>
            <p style={{ fontSize: 18, color: DARK, lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
              {question}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 12 }}>
            {[1, 2, 3, 4, 5].map((v) => (
              <RatingButton key={v} value={v} selected={currentAnswer === v} onClick={() => handleRate(v)} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px" }}>
            <span style={{ fontSize: 14, color: "#9ca3af" }}>Strongly Disagree</span>
            <span style={{ fontSize: 14, color: "#9ca3af" }}>Strongly Agree</span>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        padding: "16px 24px 24px", maxWidth: 560, margin: "0 auto",
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <button
          onClick={goBack}
          disabled={currentSection === 0 && currentQuestion === 0}
          style={{
            background: "none", border: "none",
            color: currentSection === 0 && currentQuestion === 0 ? "#d1d5db" : MID,
            fontSize: 14,
            cursor: currentSection === 0 && currentQuestion === 0 ? "default" : "pointer",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 500, padding: "8px 16px",
          }}
        >
          â† Back
        </button>
        {canFinish && (
          <button
            onClick={() => setPhase("results")}
            style={{
              background: CYAN, color: "#fff", border: "none", borderRadius: 12,
              padding: "12px 28px", fontSize: 15, fontWeight: 600,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              boxShadow: `0 6px 24px ${CYAN}44`,
            }}
          >
            See My Results â†’
          </button>
        )}
      </div>
    </div>
  );
}
