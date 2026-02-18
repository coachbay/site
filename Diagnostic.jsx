import { useState, useEffect, useRef } from "react";

const CYAN = "#00BCD4";
const DARK = "#1a1a2e";
const MID = "#6b7280";
const LIGHT_BG = "#f8fafb";
const RED_ACCENT = "#ef4444";

const sections = [
  {
    id: "leadership",
    title: "Leadership Readiness",
    subtitle: "Do the people at the top actually use AI themselves?",
    icon: "👔",
    questions: [
      "Our senior leaders have personally used AI tools (not just seen demos)",
      "Leadership can articulate why AI matters for our business, beyond \"everyone else is doing it\"",
      "Leaders talk about AI in terms of people and outcomes, not just efficiency and cost savings",
      "There is a named person (not a committee) who owns AI adoption",
      "Leadership has allocated time, not just budget, for AI exploration",
    ],
  },
  {
    id: "sentiment",
    title: "Employee Sentiment",
    subtitle: "How do the people who will actually use AI feel about it?",
    icon: "💬",
    questions: [
      "Employees feel safe experimenting with AI without fear of judgment",
      "People talk openly about using AI at work (not hiding it)",
      "Employees see AI as a tool that helps them, not a threat to their job",
      "There are people in the organisation already playing with AI on their own",
      "We've actually asked employees how they feel about AI (not assumed)",
    ],
  },
  {
    id: "culture",
    title: "Culture of Change",
    subtitle: "Does your organisation have the muscle to adopt something new?",
    icon: "🔄",
    questions: [
      "When we introduce new tools or processes, people generally give them a fair try",
      "We celebrate early experiments, even when they don't work perfectly",
      "Managers are empowered to make local decisions about how their teams work",
      "We've successfully adopted a new technology or way of working in the last 2 years",
      "People trust that leadership has their interests in mind during change",
    ],
  },
  {
    id: "foundations",
    title: "Practical Foundations",
    subtitle: "Are the basics in place to actually start?",
    icon: "🔧",
    questions: [
      "Employees have access to at least one AI tool (ChatGPT, Claude, Copilot, etc.)",
      "We have basic guidelines about what data can and can't go into AI tools",
      "There is a budget or willingness to invest in AI tools and training",
      "We can identify 5 to 10 people who would eagerly join a Pilot Squad tomorrow",
      "We have at least one clear, specific use case where AI could make a visible difference",
    ],
  },
  {
    id: "clarity",
    title: "Strategic Clarity",
    subtitle: "Do you know what you're actually trying to achieve with AI?",
    icon: "🎯",
    questions: [
      "We can name the top 3 business problems AI should help us solve",
      "Our AI ambitions are connected to our broader business strategy, not a separate initiative",
      "We're focused on a small number of high-impact use cases (not trying to do everything)",
      "We measure success in business outcomes (time saved, quality improved), not tool adoption",
      "We have a realistic timeline for meaningful results, measured in months not weeks",
    ],
  },
];

const tierData = [
  {
    range: [100, 125],
    label: "Ready to Accelerate",
    color: "#10b981",
    summary:
      "Your organisation has the foundations in place. Leadership is engaged, employees are willing, and you have clarity on what you're trying to achieve.",
    action:
      "Skip the awareness phase. Go straight to forming a Pilot Squad, a small group of 5 to 10 early adopters who solve real problems with AI. Focus on creating visible wins fast and scaling from there.",
  },
  {
    range: [75, 99],
    label: "Ready to Start, With Focus",
    color: CYAN,
    summary:
      "You have pockets of readiness but some gaps. Most likely, leadership is keen but employees are uncertain, or you have enthusiasm but lack structure.",
    action:
      "Start with the curious. Don't try to fix every gap first. Launch a small pilot and let the results build the case. Get your early adopters their first real AI experience this week using a simple prompt framework like CRIT (Context, Role, Interview, Task).",
  },
  {
    range: [50, 74],
    label: "Groundwork Needed",
    color: "#f59e0b",
    summary:
      "There's interest but not enough safety, clarity, or trust to launch an initiative yet. Pushing ahead now risks creating \"prisoners\", compliance without buy-in.",
    action:
      "Start with leadership. Leaders need to use AI themselves first because you can't coach what you haven't practised. Focus on building psychological safety and identifying your natural early adopters. A 60-minute AI Kickoff workshop can open the door without forcing anything.",
  },
  {
    range: [0, 49],
    label: "Not Yet. And That's Okay",
    color: RED_ACCENT,
    summary:
      "Your organisation isn't ready for an AI initiative right now. That doesn't mean it's a failure. It means other things need to come first: trust, change fatigue, leadership alignment, or basic access to tools.",
    action:
      "Don't force it. Work on the underlying culture of change first. Start with one-on-one conversations with leaders about what's really getting in the way. Come back to AI once the foundation of trust is stronger.",
  },
];

const sectionAdvice = {
  leadership: {
    low: "Leaders are delegating AI without experiencing it themselves. Before rolling out anything, get leaders hands-on. Have each one spend 30 minutes using AI on a real work problem. You can't credibly lead a change you haven't lived through.",
    mid: "Leadership is engaged but may not be modelling the behaviour consistently. Make AI usage visible at the top. Share what you're using it for in team meetings, show your prompts, and be honest about what didn't work.",
    high: "Leadership readiness is strong. Your leaders are walking the talk. Now use that credibility to create safety for others. When the CEO says \"I tried this and it was terrible at first,\" it gives everyone permission to be imperfect.",
  },
  sentiment: {
    low: "Employees are likely fearful or hiding their AI use. This is the biggest red flag because it means people don't feel safe. Before any initiative, create psychological safety. Start by asking (not telling) how people feel. The question \"Are you already using AI?\" asked without judgment can surface a lot.",
    mid: "There's a mix of curiosity and caution. Some people are experimenting quietly. Your job is to bring those quiet experimenters into the light. Celebrate them, give them a platform, and let their peers see that it's safe to try.",
    high: "Employees are open and willing. This is your fuel. Don't waste it with heavy-handed rollouts. Channel this energy into a Pilot Squad where their enthusiasm can produce visible results.",
  },
  culture: {
    low: "This isn't an AI problem. It's a trust and change fatigue problem. Your organisation has been through too many initiatives that didn't stick. Address the underlying culture before adding more change. AI will still be there when you're ready.",
    mid: "The organisation can handle change but needs proof that this time is different. Start small, show results quickly, and critically, don't over-promise. Under-promise and over-deliver to rebuild change credibility.",
    high: "Your change muscle is strong. People are willing to try new things and trust that leadership has their back. Use this to move fast. Your biggest risk is actually moving too slowly and losing the momentum.",
  },
  foundations: {
    low: "Good intentions but no infrastructure. People can't adopt AI if they can't access it. Solve the basics first: get tools in people's hands, create simple data guidelines (not a 50-page policy), and make sure IT isn't blocking access \"for security\" without a real plan.",
    mid: "The basics are partially in place but may be inconsistent. Some teams have access, others don't. Some guidelines exist but people aren't sure about them. Standardise access and simplify your guidelines into a one-page \"what's okay and what's not\" document.",
    high: "Foundations are solid. People have tools, there are guardrails, and you can identify your early adopters. You're ready to move. Don't let planning become a substitute for action.",
  },
  clarity: {
    low: "Lots of enthusiasm, no focus. The danger here is trying to do everything at once and achieving nothing. Pick one business problem, one team, one quarter. That's it. Prove it works there before expanding.",
    mid: "There's a general sense of direction but it may not be specific enough. Sharpen your focus: can you name the exact problem AI will solve, for whom, and how you'll know it worked? If not, spend time on that before launching.",
    high: "Strategic clarity is strong. You know what you're solving and how to measure it. This is rare and valuable, so protect this focus. The biggest threat now is scope creep as other teams want in.",
  },
};

function ScoreRing({ score, max, color, size = 120, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = score / max;
  const offset = circumference * (1 - pct);
  return (
    <svg width={size} height={size} style={{ display: "block" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 1s ease-out" }}
      />
      <text
        x={size / 2}
        y={size / 2 - 6}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: size * 0.28, fontWeight: 700, fill: color, fontFamily: "'DM Sans', sans-serif" }}
      >
        {score}
      </text>
      <text
        x={size / 2}
        y={size / 2 + 16}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: size * 0.12, fill: MID, fontFamily: "'DM Sans', sans-serif" }}
      >
        / {max}
      </text>
    </svg>
  );
}

function RatingButton({ value, selected, onClick }) {
  const labels = ["", "Strongly\nDisagree", "Disagree", "Neutral", "Agree", "Strongly\nAgree"];
  return (
    <button
      onClick={onClick}
      style={{
        width: 56,
        height: 56,
        borderRadius: 14,
        border: selected ? `2.5px solid ${CYAN}` : "2px solid #d1d5db",
        background: selected ? CYAN : "#fff",
        color: selected ? "#fff" : DARK,
        fontSize: 20,
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: selected ? `0 4px 16px ${CYAN}33` : "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      {value}
    </button>
  );
}

export default function AIDiagnostic() {
  const [phase, setPhase] = useState("intro"); // intro, assessment, results
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animating, setAnimating] = useState(false);
  const questionRef = useRef(null);

  const totalQuestions = 25;
  const answeredCount = Object.keys(answers).length;
  const globalIndex = currentSection * 5 + currentQuestion;

  const handleRate = (value) => {
    const key = `${currentSection}-${currentQuestion}`;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    // Auto-advance after brief delay
    setTimeout(() => {
      if (currentQuestion < 4) {
        setAnimating(true);
        setTimeout(() => {
          setCurrentQuestion((q) => q + 1);
          setAnimating(false);
        }, 200);
      } else if (currentSection < 4) {
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
    ) || tierData[3];
    return { sectionScores, grandTotal, tier };
  };

  const canFinish = answeredCount === 25;
  const section = sections[currentSection];
  const question = section?.questions[currentQuestion];
  const currentAnswer = answers[`${currentSection}-${currentQuestion}`];

  // Intro screen
  if (phase === "intro") {
    return (
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${DARK} 0%, #16213e 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
        <div style={{
          maxWidth: 560,
          width: "100%",
          textAlign: "center",
        }}>
          <div style={{
            marginBottom: 24,
            display: "flex",
            justifyContent: "center",
          }}>
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
            fontSize: 36,
            color: "#fff",
            margin: "0 0 8px",
            lineHeight: 1.2,
          }}>
            AI Readiness Diagnostic
          </h1>
          <div style={{
            width: 60,
            height: 3,
            background: CYAN,
            margin: "20px auto",
            borderRadius: 2,
          }} />
          <p style={{
            color: "#94a3b8",
            fontSize: 17,
            lineHeight: 1.7,
            margin: "0 0 12px",
          }}>
            Where does your organisation actually sit on the AI adoption curve?
          </p>
          <p style={{
            color: "#64748b",
            fontSize: 14,
            lineHeight: 1.7,
            margin: "0 0 40px",
          }}>
            25 questions across 5 dimensions. Takes about 10 minutes.<br/>
            Be honest. This is a mirror, not a report card.
          </p>
          <button
            onClick={() => setPhase("assessment")}
            style={{
              background: CYAN,
              color: "#fff",
              border: "none",
              borderRadius: 14,
              padding: "16px 48px",
              fontSize: 17,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: `0 8px 32px ${CYAN}44`,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = `0 12px 40px ${CYAN}66`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = `0 8px 32px ${CYAN}44`;
            }}
          >
            Start Assessment →
          </button>
          <p style={{
            color: "#475569",
            fontSize: 12,
            marginTop: 32,
          }}>
            Designed by CoachBay
          </p>
          <p style={{
            color: "#475569",
            fontSize: 13,
            marginTop: 8,
          }}>
            Tomas Bay · <a href="mailto:coach@coachbay.com" style={{ color: CYAN, textDecoration: "none" }}>coach@coachbay.com</a>
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
        minHeight: "100vh",
        background: LIGHT_BG,
        fontFamily: "'DM Sans', sans-serif",
        padding: "40px 24px",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h1 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 32,
              color: DARK,
              margin: "0 0 8px",
            }}>Your Results</h1>
            <div style={{ width: 50, height: 3, background: CYAN, margin: "12px auto", borderRadius: 2 }} />
          </div>

          {/* Overall Score Card */}
          <div style={{
            background: "#fff",
            borderRadius: 20,
            padding: 40,
            textAlign: "center",
            marginBottom: 32,
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            border: `2px solid ${tier.color}22`,
          }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <ScoreRing score={grandTotal} max={125} color={tier.color} size={140} strokeWidth={12} />
            </div>
            <div style={{
              display: "inline-block",
              background: `${tier.color}15`,
              color: tier.color,
              padding: "6px 20px",
              borderRadius: 100,
              fontSize: 15,
              fontWeight: 700,
              marginBottom: 16,
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
            padding: "20px 24px",
            marginBottom: 40,
          }}>
            <div style={{ fontWeight: 700, color: DARK, fontSize: 15, marginBottom: 8 }}>
              ✦ Your Next Move
            </div>
            <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              {tier.action}
            </p>
          </div>

          {/* Section Breakdown */}
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 22,
            color: DARK,
            marginBottom: 20,
          }}>Section Breakdown</h2>

          {sectionScores.map((sec) => {
            const pct = sec.score / 25;
            const level = pct < 0.5 ? "low" : pct < 0.75 ? "mid" : "high";
            const barColor = pct < 0.5 ? RED_ACCENT : pct < 0.75 ? "#f59e0b" : "#10b981";
            const advice = sectionAdvice[sec.id][level];

            return (
              <div
                key={sec.id}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 24,
                  marginBottom: 16,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{sec.icon}</span>
                    <span style={{ fontWeight: 700, color: DARK, fontSize: 15 }}>{sec.title}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: barColor, fontSize: 18 }}>
                    {sec.score}<span style={{ color: MID, fontWeight: 400, fontSize: 13 }}> / 25</span>
                  </span>
                </div>
                {/* Bar */}
                <div style={{
                  height: 8,
                  background: "#e5e7eb",
                  borderRadius: 100,
                  overflow: "hidden",
                  marginBottom: 16,
                }}>
                  <div style={{
                    height: "100%",
                    width: `${pct * 100}%`,
                    background: barColor,
                    borderRadius: 100,
                    transition: "width 1s ease-out",
                  }} />
                </div>
                <p style={{
                  color: "#4b5563",
                  fontSize: 13.5,
                  lineHeight: 1.7,
                  margin: 0,
                  padding: "12px 14px",
                  background: `${barColor}08`,
                  borderRadius: 10,
                  borderLeft: `3px solid ${barColor}44`,
                }}>
                  {advice}
                </p>
              </div>
            );
          })}

          {/* Empathy Gap Insight */}
          {(() => {
            const leadershipScore = sectionScores[0].score;
            const sentimentScore = sectionScores[1].score;
            const gap = leadershipScore - sentimentScore;
            if (gap >= 5) {
              return (
                <div style={{
                  background: `linear-gradient(135deg, ${DARK}, #16213e)`,
                  borderRadius: 16,
                  padding: 28,
                  marginTop: 24,
                  marginBottom: 24,
                }}>
                  <div style={{ color: CYAN, fontWeight: 700, fontSize: 14, marginBottom: 8, letterSpacing: 1 }}>
                    ⚠ EMPATHY GAP DETECTED
                  </div>
                  <p style={{ color: "#e2e8f0", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                    Your Leadership Readiness score ({leadershipScore}) is significantly higher than your Employee Sentiment score ({sentimentScore}). This is the classic Empathy Gap, where leaders are more excited about AI than their teams. The risk is pushing initiatives that create compliance, not buy-in. Focus on understanding how employees actually feel before launching anything.
                  </p>
                </div>
              );
            }
            return null;
          })()}

          {/* Restart */}
          <div style={{ textAlign: "center", marginTop: 40, paddingBottom: 40 }}>
            <button
              onClick={() => {
                setPhase("intro");
                setCurrentSection(0);
                setCurrentQuestion(0);
                setAnswers({});
              }}
              style={{
                background: "none",
                border: `2px solid ${CYAN}`,
                color: CYAN,
                borderRadius: 12,
                padding: "12px 32px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              ← Retake Assessment
            </button>
            <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 24 }}>
              Designed by CoachBay
            </p>
            <div style={{
              background: `${CYAN}10`,
              border: `1.5px solid ${CYAN}33`,
              borderRadius: 16,
              padding: "24px 28px",
              marginTop: 24,
              textAlign: "center",
            }}>
              <p style={{ color: DARK, fontSize: 16, fontWeight: 600, margin: "0 0 6px" }}>
                Want help accelerating your AI journey?
              </p>
              <p style={{ color: MID, fontSize: 14, margin: "0 0 12px" }}>
                Get in touch with Tomas Bay
              </p>
              <a href="mailto:coach@coachbay.com" style={{
                color: CYAN,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
              }}>
                coach@coachbay.com
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Assessment screen
  const progress = ((globalIndex) / totalQuestions) * 100;
  const ratingLabels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];

  return (
    <div style={{
      minHeight: "100vh",
      background: LIGHT_BG,
      fontFamily: "'DM Sans', sans-serif",
      display: "flex",
      flexDirection: "column",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* Progress bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ height: 4, background: "#e5e7eb" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${CYAN}, #0097a7)`,
            transition: "width 0.4s ease",
            borderRadius: "0 4px 4px 0",
          }} />
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
          maxWidth: 640,
          margin: "0 auto",
          width: "100%",
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
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}>
        <div
          ref={questionRef}
          style={{
            maxWidth: 560,
            width: "100%",
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(12px)" : "translateY(0)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          {/* Section badge */}
          {currentQuestion === 0 && (
            <div style={{
              display: "inline-block",
              background: `${CYAN}12`,
              color: CYAN,
              padding: "4px 14px",
              borderRadius: 100,
              fontSize: 15,
              fontWeight: 600,
              marginBottom: 8,
              letterSpacing: 0.5,
            }}>
              SECTION {currentSection + 1} OF 5
            </div>
          )}

          {currentQuestion === 0 && (
            <p style={{ color: MID, fontSize: 16, margin: "4px 0 24px", lineHeight: 1.5 }}>
              {section.subtitle}
            </p>
          )}

          {/* Question */}
          <div style={{
            background: "#fff",
            borderRadius: 20,
            padding: "32px 28px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            marginBottom: 32,
          }}>
            <p style={{
              fontSize: 18,
              color: DARK,
              lineHeight: 1.6,
              margin: 0,
              fontWeight: 500,
            }}>
              {question}
            </p>
          </div>

          {/* Rating buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 12 }}>
            {[1, 2, 3, 4, 5].map((v) => (
              <RatingButton
                key={v}
                value={v}
                selected={currentAnswer === v}
                onClick={() => handleRate(v)}
              />
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
        padding: "16px 24px 24px",
        maxWidth: 560,
        margin: "0 auto",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <button
          onClick={goBack}
          disabled={currentSection === 0 && currentQuestion === 0}
          style={{
            background: "none",
            border: "none",
            color: currentSection === 0 && currentQuestion === 0 ? "#d1d5db" : MID,
            fontSize: 14,
            cursor: currentSection === 0 && currentQuestion === 0 ? "default" : "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            padding: "8px 16px",
          }}
        >
          ← Back
        </button>

        {canFinish && (
          <button
            onClick={() => setPhase("results")}
            style={{
              background: CYAN,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "12px 28px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: `0 6px 24px ${CYAN}44`,
            }}
          >
            See My Results →
          </button>
        )}
      </div>
    </div>
  );
}
