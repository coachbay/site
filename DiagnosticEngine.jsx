import jsPDF from "jspdf";
import { useState, useEffect, useRef } from "react";

const CYAN = "#00BCD4";
const DARK = "#1a1a2e";
const MID = "#6b7280";
const LIGHT_BG = "#f8fafb";
const RED_ACCENT = "#ef4444";

const SECTION_ICONS = {
  target: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="9" stroke="#00BCD4" strokeWidth="1.6"/>
      <circle cx="11" cy="11" r="5.5" stroke="#00BCD4" strokeWidth="1.6"/>
      <circle cx="11" cy="11" r="2" fill="#00BCD4"/>
      <line x1="11" y1="1" x2="11" y2="4" stroke="#00BCD4" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="11" y1="18" x2="11" y2="21" stroke="#00BCD4" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="1" y1="11" x2="4" y2="11" stroke="#00BCD4" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="18" y1="11" x2="21" y2="11" stroke="#00BCD4" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  leader: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#00BCD4" strokeWidth="2"/>
      <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  chat: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4a1 1 0 011-1h14a1 1 0 011 1v10a1 1 0 01-1 1H7l-4 4V4z" stroke="#00BCD4" strokeWidth="1.6" strokeLinejoin="round"/>
      <line x1="7" y1="8" x2="15" y2="8" stroke="#00BCD4" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="7" y1="11.5" x2="12" y2="11.5" stroke="#00BCD4" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  cycle: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 11a7 7 0 017-7 7 7 0 015.2 2.3" stroke="#00BCD4" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M18 11a7 7 0 01-7 7 7 7 0 01-5.2-2.3" stroke="#00BCD4" strokeWidth="1.6" strokeLinecap="round"/>
      <polyline points="15.5,3.5 17.2,6.3 14,6.8" stroke="#00BCD4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="6.5,18.5 4.8,15.7 8,15.2" stroke="#00BCD4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  tools: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  brain: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12l10 5 10-5" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17l10 5 10-5" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  scissors: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="7" r="2.5" stroke="#00BCD4" strokeWidth="1.6"/>
      <circle cx="6" cy="15" r="2.5" stroke="#00BCD4" strokeWidth="1.6"/>
      <line x1="8.2" y1="8.2" x2="19" y2="19" stroke="#00BCD4" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="8.2" y1="13.8" x2="19" y2="3" stroke="#00BCD4" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  scales: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="11" y1="3" x2="11" y2="19" stroke="#00BCD4" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="7" y1="19" x2="15" y2="19" stroke="#00BCD4" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="4" y1="7" x2="18" y2="7" stroke="#00BCD4" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M4 7l-2 5h4l-2-5z" stroke="#00BCD4" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M18 7l-2 5h4l-2-5z" stroke="#00BCD4" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  handshake: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="4" stroke="#00BCD4" strokeWidth="2"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  leaf: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzp7051naVvv3IGLSzg0MKZ-UmPxyAxxcIW6yMjImhJyPUEghIyquWT4IHclcUxD5r8jw/exec";
const EMAIL_SCRIPT_URL = "https://script.google.com/a/macros/coachbay.com/s/AKfycbybcrmGUhIKZl60phQoSGUyFdsUigEtpEV-CccqSg3-h16U3nLa1P3nkNGqxWdyb5cS/exec";

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
  stageQuestion,
  onBack,
  clientMode,
}) {
  const [phase, setPhase] = useState("intro");
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animating, setAnimating] = useState(false);
  const [stage, setStage] = useState(null);
  const [autoAdvancing, setAutoAdvancing] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle");
  const questionRef = useRef(null);

  const questionsPerSection = sections.map(s => s.questions.length);
  const totalQuestions = questionsPerSection.reduce((sum, n) => sum + n, 0);
  const maxScore = totalQuestions * 5;
  const answeredCount = Object.keys(answers).length;
  const globalIndex = questionsPerSection.slice(0, currentSection).reduce((sum, n) => sum + n, 0) + currentQuestion;

  // Send results to Google Sheet
  useEffect(() => {
    if (phase === "results") {
      const { sectionScores, grandTotal, tier } = calculateResults();

      // Determine which script URL to use
      const trackingUrl = (clientMode && clientMode.scriptUrl)
        ? clientMode.scriptUrl
        : GOOGLE_SCRIPT_URL;

      // Skip tracking if no URL available
      if (!trackingUrl) return;

      const params = new URLSearchParams({
        type: diagnosticType,
        score: grandTotal,
        tier: tier.label,
        stage: stage || "not set",
      });

      // Add respondent info in client mode
      if (clientMode) {
        params.append("name", clientMode.respondentName);
        params.append("email", clientMode.respondentEmail);
        params.append("company", clientMode.clientCompany);
      }

      sectionScores.forEach((sec, si) => {
        params.append(sec.id, sec.score);
        for (let qi = 0; qi < sec.questions.length; qi++) {
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
      img.src = trackingUrl + "?" + params.toString();
    }
  }, [phase]);

  const handleRate = (value) => {
    const key = `${currentSection}-${currentQuestion}`;
    const isNewAnswer = answers[key] === undefined;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (!isNewAnswer) return; // Don't auto-advance when changing an existing answer
    setAutoAdvancing(true);
    const qCount = questionsPerSection[currentSection];
    setTimeout(() => {
      if (currentQuestion < qCount - 1) {
        setAnimating(true);
        setTimeout(() => {
          setCurrentQuestion((q) => Math.min(q + 1, qCount - 1));
          setAnimating(false);
          setAutoAdvancing(false);
        }, 200);
      } else if (currentSection < sections.length - 1) {
        setAnimating(true);
        setTimeout(() => {
          setCurrentSection((s) => Math.min(s + 1, sections.length - 1));
          setCurrentQuestion(0);
          setAnimating(false);
          setAutoAdvancing(false);
        }, 200);
      } else {
        setAutoAdvancing(false);
      }
    }, 300);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1);
    } else if (currentSection > 0) {
      const prevQCount = questionsPerSection[currentSection - 1];
      setCurrentSection((s) => s - 1);
      setCurrentQuestion(prevQCount - 1);
    }
  };

  const goForward = () => {
    const qCount = questionsPerSection[currentSection];
    if (currentQuestion < qCount - 1) {
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
  };

  const calculateResults = () => {
    const sectionScores = sections.map((sec, si) => {
      let total = 0;
      for (let qi = 0; qi < sec.questions.length; qi++) {
        total += answers[`${si}-${qi}`] || 0;
      }
      return { ...sec, score: total, maxScore: sec.questions.length * 5 };
    });
    const grandTotal = sectionScores.reduce((sum, s) => sum + s.score, 0);
    const tier = tierData.find(
      (t) => grandTotal >= t.range[0] && grandTotal <= t.range[1]
    ) || tierData[tierData.length - 1];
    return { sectionScores, grandTotal, tier };
  };


  const buildPDFDoc = () => {
    const { sectionScores, grandTotal, tier } = calculateResults();
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = 210;
    const margin = 20;
    const contentW = pageW - margin * 2;
    let y = 0;

    // Helper: wrap text and return lines
    const wrapText = (text, maxWidth, fontSize) => {
      doc.setFontSize(fontSize);
      return doc.splitTextToSize(text, maxWidth);
    };

    // Helper: hex to RGB
    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    };

    // ========== HEADER ==========
    const headerH = 18;
    // White background with bottom border
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageW, headerH, "F");
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(0, headerH, pageW, headerH);

    // Robot PNG
    doc.addImage("/coachbay-robot-transparent.png", "PNG", margin, 2, 7.5, 9.5);

    // CoachBay (navy)
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 26, 46);
    doc.text("CoachBay", margin + 9.5, 10.5);

    // .ai (cyan)
    doc.setTextColor(0, 188, 212);
    const cbWidth = doc.getTextWidth("CoachBay");
    doc.text(".ai", margin + 9.5 + cbWidth, 10.5);

    // Doc label (right aligned, muted)
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(title.toUpperCase(), pageW - margin, 10.5, { align: "right" });

    y = headerH + (clientMode ? 14 : 10);

    // Respondent info below header if client mode
    if (clientMode) {
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text(`${clientMode.clientCompany}  ·  ${clientMode.respondentName} (${clientMode.respondentEmail})`, margin, y);
      y += 8;
    }

    // ========== OVERALL SCORE ==========
    // Score circle (simulated)
    const [tr, tg, tb] = hexToRgb(tier.color);
    doc.setDrawColor(tr, tg, tb);
    doc.setLineWidth(1.5);
    doc.circle(margin + 18, y + 18, 16);

    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(tr, tg, tb);
    doc.text(String(grandTotal), margin + 18, y + 16, { align: "center" });

    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.setFont("helvetica", "normal");
    doc.text("/ " + maxScore, margin + 18, y + 23, { align: "center" });

    // Tier label
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(tr, tg, tb);
    doc.text(tier.label, margin + 44, y + 10);

    // Tier summary
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(75, 85, 99);
    const summaryLines = wrapText(tier.summary, contentW - 44, 10);
    doc.text(summaryLines, margin + 44, y + 18);

    // Stage label
    if (stage) {
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 188, 212);
      doc.text("AI Journey Stage: " + stage.charAt(0).toUpperCase() + stage.slice(1), margin + 44, y + 18 + summaryLines.length * 5 + 2);
      y += 18 + summaryLines.length * 5 + 10;
    } else {
      y += 18 + summaryLines.length * 5 + 12;
    }

    // ========== YOUR NEXT MOVE ==========
    doc.setFillColor(tr, tg, tb);
    doc.rect(margin, y, 3, 0.1, "F"); // Will size after measuring
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 26, 46);
    doc.text("Your Next Move", margin + 8, y + 6);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(55, 65, 81);
    const actionText = (stage && tier.actionByStage && tier.actionByStage[stage]) ? tier.actionByStage[stage] : tier.action;
    const actionLines = wrapText(actionText, contentW - 12, 10);
    doc.text(actionLines, margin + 8, y + 13);

    const moveBoxH = 16 + actionLines.length * 5;
    // Draw left border for the box
    doc.setFillColor(tr, tg, tb);
    doc.rect(margin, y, 3, moveBoxH, "F");
    // Light background
    doc.setFillColor(tr, tg, tb, 0.06);

    y += moveBoxH + 12;

    // ========== SECTION BREAKDOWN ==========
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 26, 46);
    doc.text("Section Breakdown", margin, y);
    y += 10;

    sectionScores.forEach((sec) => {
      const pct = sec.score / sec.maxScore;
      const level = pct < 0.5 ? "low" : pct < 0.75 ? "mid" : "high";
      const barColor = pct < 0.5 ? "#ef4444" : pct < 0.75 ? "#f59e0b" : "#10b981";
      const [br, bg, bb] = hexToRgb(barColor);
      const advice = sectionAdvice[sec.id]?.[level] || "";

      // Check if we need a new page
      const adviceLines = wrapText(advice, contentW - 8, 9);
      const blockHeight = 30 + adviceLines.length * 4.5;
      if (y + blockHeight > 280) {
        doc.addPage();
        y = 20;
      }

      // Section title and score
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(26, 26, 46);
      doc.text(sec.title, margin, y);

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(br, bg, bb);
      doc.text(`${sec.score} / ${sec.maxScore}`, margin + contentW, y, { align: "right" });

      y += 6;

      // Progress bar background
      doc.setFillColor(229, 231, 235);
      doc.roundedRect(margin, y, contentW, 4, 2, 2, "F");

      // Progress bar fill
      doc.setFillColor(br, bg, bb);
      const barW = Math.max(contentW * pct, 4);
      doc.roundedRect(margin, y, barW, 4, 2, 2, "F");

      y += 8;

      // Advice text
      doc.setFillColor(br, bg, bb);
      doc.rect(margin, y, 2, adviceLines.length * 4.5 + 4, "F");

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(75, 85, 99);
      doc.text(adviceLines, margin + 6, y + 4);

      y += adviceLines.length * 4.5 + 12;
    });

    // ========== EMPATHY GAP ==========
    if (empathyGap) {
      const ls = sectionScores.find(s => s.id === empathyGap.leadershipId);
      const es = sectionScores.find(s => s.id === empathyGap.sentimentId);
      if (ls && es && (ls.score - es.score) >= 5) {
        if (y + 40 > 280) {
          doc.addPage();
          y = 20;
        }

        doc.setFillColor(26, 26, 46);
        const gapText = `Your Leadership Readiness score (${ls.score}) is significantly higher than your Employee Sentiment score (${es.score}). This is the classic Empathy Gap, where leaders are more excited about AI than their teams. The risk is pushing initiatives that create compliance, not buy-in. Focus on understanding how employees actually feel before launching anything.`;
        const gapLines = wrapText(gapText, contentW - 20, 10);
        const gapH = 18 + gapLines.length * 5;
        doc.roundedRect(margin, y, contentW, gapH, 3, 3, "F");

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 188, 212);
        doc.text("EMPATHY GAP DETECTED", margin + 10, y + 8);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(226, 232, 240);
        doc.text(gapLines, margin + 10, y + 16);

        y += gapH + 10;
      }
    }

    // ========== FOOTER ==========
    if (y + 30 > 280) {
      doc.addPage();
      y = 20;
    }

    y += 5;
    doc.setDrawColor(229, 231, 235);
    doc.line(margin, y, margin + contentW, y);
    y += 8;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 26, 46);
    doc.text("Want help accelerating your AI journey?", margin, y);
    y += 6;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 114, 128);
    doc.text("Get in touch with Tomas Bay", margin, y);
    y += 6;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 188, 212);
    doc.text("coach@coachbay.ai", margin, y);

    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("coachbay.ai", margin + contentW, y, { align: "right" });

    return { doc, filename: `CoachBay - ${title.replace(/\s+/g, " ")}.pdf` };
  };

  const generatePDF = () => {
    const { doc, filename } = buildPDFDoc();
    doc.save(filename);
  };

  const handleEmailResults = async () => {
    if (!emailAddress || !emailAddress.includes("@")) return;
    setEmailStatus("sending");
    try {
      const { doc, filename } = buildPDFDoc();
      const pdfBase64 = doc.output("datauristring").split(",")[1];
      const { grandTotal, tier } = calculateResults();

      const resp = await fetch(EMAIL_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          action: "emailResults",
          email: emailAddress,
          pdfBase64,
          pdfFilename: filename,
          diagnosticType,
          score: grandTotal,
          tier: tier.label,
          assessmentTitle: title,
        }),
      });

      // no-cors returns an opaque response so we cannot check resp.ok,
      // but the request still reaches the server and the email is sent.
      setEmailStatus("sent");
    } catch (err) {
      console.error("Email send failed:", err);
      setEmailStatus("error");
    }
  };

  const canFinish = answeredCount === totalQuestions;

  // Stage selection screen
  if (phase === "stage") {
    return (
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${DARK} 0%, #16213e 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24, fontFamily: "'DM Sans', sans-serif",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
        <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 28, color: "#fff", margin: "0 0 8px", lineHeight: 1.3,
          }}>
            {stageQuestion.prompt}
          </h2>
          <div style={{ width: 50, height: 3, background: CYAN, margin: "16px auto 32px", borderRadius: 2 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {stageQuestion.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => { setStage(opt.id); setPhase("assessment"); }}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1.5px solid rgba(255,255,255,0.12)",
                  borderRadius: 14,
                  padding: "18px 24px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={(e) => { e.target.style.background = "rgba(0,188,212,0.12)"; e.target.style.borderColor = CYAN; }}
                onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.06)"; e.target.style.borderColor = "rgba(255,255,255,0.12)"; }}
              >
                <div style={{ fontWeight: 700, fontSize: 17, color: "#fff", marginBottom: 4 }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.5 }}>
                  {opt.description}
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setPhase("intro")}
            style={{
              background: "none", border: "none", color: "#64748b",
              fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              textDecoration: "underline", textUnderlineOffset: 4, marginTop: 24,
            }}
          >
            \u2190 Back
          </button>
        </div>
      </div>
    );
  }

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
              <circle cx="40" cy="50.5" r="4.5" fill="#1a1a2e"/>
              <circle cx="64" cy="50.5" r="4.5" fill="#1a1a2e"/>
              <line x1="50" y1="25" x2="50" y2="15" stroke="#00BCD4" strokeWidth="3"/>
              <circle cx="50" cy="12" r="5" fill="#00BCD4"/>
            </svg>
          </div>
          {clientMode && (
            <p style={{ color: CYAN, fontSize: 18, fontWeight: 600, letterSpacing: 1, margin: "0 0 8px", textTransform: "uppercase" }}>
              {clientMode.clientCompany}
            </p>
          )}
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
            onClick={() => setPhase(stageQuestion ? "stage" : "assessment")}
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
            Start Assessment →
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
              ← {clientMode ? "Back to assessments" : "Back to CoachBay.ai"}
            </button>
          </div>
          <p style={{ color: "#475569", fontSize: 12, marginTop: 24 }}>
            Designed by CoachBay
          </p>
          <p style={{ color: "#475569", fontSize: 13, marginTop: 8 }}>
            Tomas Bay · <a href="mailto:coach@coachbay.ai" style={{ color: CYAN, textDecoration: "none" }}>coach@coachbay.ai</a>
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
              <ScoreRing score={grandTotal} max={maxScore} color={tier.color} size={140} strokeWidth={12} />
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
            {stage && (
              <p style={{ color: "#94a3b8", fontSize: 13, marginTop: 12 }}>
                AI Journey Stage: <span style={{ color: CYAN, fontWeight: 600 }}>{stage.charAt(0).toUpperCase() + stage.slice(1)}</span>
              </p>
            )}
          </div>

          {/* What to do next */}
          <div style={{
            background: `${tier.color}08`,
            borderLeft: `4px solid ${tier.color}`,
            borderRadius: "0 16px 16px 0",
            padding: "20px 24px", marginBottom: 40,
          }}>
            <div style={{ fontWeight: 700, color: DARK, fontSize: 15, marginBottom: 8 }}>
              ✦ Your Next Move
            </div>
            <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              {(stage && tier.actionByStage && tier.actionByStage[stage]) ? tier.actionByStage[stage] : tier.action}
            </p>
          </div>

          {/* Section Breakdown */}
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 22, color: DARK, marginBottom: 20,
          }}>Section Breakdown</h2>

          {sectionScores.map((sec) => {
            const pct = sec.score / sec.maxScore;
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
                    {SECTION_ICONS[sec.icon]}
                    <span style={{ fontWeight: 700, color: DARK, fontSize: 15 }}>{sec.title}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: barColor, fontSize: 18 }}>
                    {sec.score}<span style={{ color: MID, fontWeight: 400, fontSize: 13 }}> / {sec.maxScore}</span>
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
                    ⚠ EMPATHY GAP DETECTED
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
                onClick={generatePDF}
                style={{
                  background: CYAN, color: "#fff", border: "none",
                  borderRadius: 12, padding: "12px 28px", fontSize: 14, fontWeight: 600,
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  boxShadow: `0 6px 24px ${CYAN}44`,
                }}
              >
                Download Results (PDF)
              </button>
              {EMAIL_SCRIPT_URL !== "__EMAIL_SCRIPT_URL__" && (
                <button
                  onClick={() => { setShowEmailModal(true); setEmailStatus("idle"); setEmailAddress(""); }}
                  style={{
                    background: "none", border: `2px solid ${CYAN}`, color: CYAN,
                    borderRadius: 12, padding: "12px 28px", fontSize: 14, fontWeight: 600,
                    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Email my results
                </button>
              )}
              <button
                onClick={() => {
                  setPhase("intro");
                  setCurrentSection(0);
                  setCurrentQuestion(0);
                  setAnswers({});
                }}
                style={{
                  background: "none", border: `2px solid #d1d5db`, color: MID,
                  borderRadius: 12, padding: "12px 28px", fontSize: 14, fontWeight: 600,
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Retake Assessment
              </button>
              <button
                onClick={onBack}
                style={{
                  background: "none", border: "2px solid #d1d5db", color: MID,
                  borderRadius: 12, padding: "12px 28px", fontSize: 14, fontWeight: 600,
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {clientMode ? "Back to assessments" : "Back to CoachBay.ai"}
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

          {/* Email Modal */}
          {showEmailModal && (
            <div
              style={{
                position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                background: "rgba(0,0,0,0.5)", display: "flex",
                alignItems: "center", justifyContent: "center",
                zIndex: 1000, padding: 24,
              }}
              onClick={() => { if (emailStatus !== "sending") { setShowEmailModal(false); } }}
            >
              <div
                style={{
                  background: "#fff", borderRadius: 20, padding: 32,
                  maxWidth: 440, width: "100%",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                }}
                onClick={e => e.stopPropagation()}
              >
                {emailStatus === "sent" ? (
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%", background: `${CYAN}15`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 16px",
                    }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 style={{ color: DARK, fontSize: 20, fontWeight: 700, margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif" }}>
                      Results sent!
                    </h3>
                    <p style={{ color: MID, fontSize: 14, margin: "0 0 24px", lineHeight: 1.6 }}>
                      Check your inbox at <strong>{emailAddress}</strong>
                    </p>
                    <button
                      onClick={() => setShowEmailModal(false)}
                      style={{
                        background: CYAN, color: "#fff", border: "none", borderRadius: 12,
                        padding: "12px 28px", fontSize: 14, fontWeight: 600,
                        cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                      }}
                    >Done</button>
                  </div>
                ) : (
                  <>
                    <h3 style={{ color: DARK, fontSize: 20, fontWeight: 700, margin: "0 0 8px", fontFamily: "'DM Serif Display', serif" }}>
                      Email your results
                    </h3>
                    <p style={{ color: MID, fontSize: 14, margin: "0 0 24px", lineHeight: 1.6 }}>
                      Enter your email and we will send a copy of your assessment results to your inbox.
                    </p>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={emailAddress}
                      onChange={e => setEmailAddress(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter" && emailAddress.includes("@")) handleEmailResults(); }}
                      style={{
                        width: "100%", padding: "12px 16px", fontSize: 15,
                        border: "2px solid #e5e7eb", borderRadius: 12,
                        fontFamily: "'DM Sans', sans-serif",
                        outline: "none", boxSizing: "border-box",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={e => { e.target.style.borderColor = CYAN; }}
                      onBlur={e => { e.target.style.borderColor = "#e5e7eb"; }}
                      disabled={emailStatus === "sending"}
                      autoFocus
                    />
                    {emailStatus === "error" && (
                      <p style={{ color: "#ef4444", fontSize: 13, margin: "8px 0 0" }}>
                        Something went wrong. Please try again.
                      </p>
                    )}
                    <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                      <button
                        onClick={() => setShowEmailModal(false)}
                        style={{
                          flex: 1, background: "none", border: "2px solid #d1d5db", color: MID,
                          borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 600,
                          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                        }}
                        disabled={emailStatus === "sending"}
                      >Cancel</button>
                      <button
                        onClick={handleEmailResults}
                        disabled={emailStatus === "sending" || !emailAddress.includes("@")}
                        style={{
                          flex: 1,
                          background: (emailStatus === "sending" || !emailAddress.includes("@")) ? "#94a3b8" : CYAN,
                          color: "#fff", border: "none", borderRadius: 12,
                          padding: "12px", fontSize: 14, fontWeight: 600,
                          cursor: (emailStatus === "sending" || !emailAddress.includes("@")) ? "default" : "pointer",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {emailStatus === "sending" ? "Sending..." : "Send Results"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
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
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 18, color: DARK, fontWeight: 700 }}>
            {SECTION_ICONS[section.icon]}{section.title}
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
            <p style={{ color: "#4b5563", fontSize: 16, margin: "4px 0 24px", lineHeight: 1.5 }}>
              {section.subtitle}
            </p>
          )}
          <div style={{
            background: "#fff", borderRadius: 20, padding: "32px 28px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)", marginBottom: 32,
          }}>
            <p style={{ fontSize: 19, color: DARK, lineHeight: 1.6, margin: 0, fontWeight: 600 }}>
              {question}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 12 }}>
            {[1, 2, 3, 4, 5].map((v) => (
              <RatingButton key={v} value={v} selected={currentAnswer === v} onClick={() => handleRate(v)} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px" }}>
            <span style={{ fontSize: 14, color: "#6b7280" }}>Strongly Disagree</span>
            <span style={{ fontSize: 14, color: "#6b7280" }}>Strongly Agree</span>
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
          ← Back
        </button>
        {currentAnswer !== undefined && !autoAdvancing && !(currentSection === sections.length - 1 && currentQuestion === questionsPerSection[currentSection] - 1) && (
          <button
            onClick={goForward}
            style={{
              background: CYAN, color: "#fff", border: "none", borderRadius: 12,
              padding: "12px 28px", fontSize: 15, fontWeight: 600,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              boxShadow: `0 6px 24px ${CYAN}44`,
            }}
          >
            Next →
          </button>
        )}
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
            See My Results →
          </button>
        )}
      </div>
    </div>
  );
}
