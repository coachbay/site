import { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";

// ─── Access codes (add/change as needed) ──────────────────────────────────────
const VALID_CODES = ["DISRUPT2026", "COACHBAY", "SPRINT"];

// ─── AI helper ────────────────────────────────────────────────────────────────
async function callClaude(messages, systemPrompt = "") {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemPrompt,
        messages,
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || "No response received.";
  } catch {
    return "Connection error. Please try again.";
  }
}

// ─── Archetypes ───────────────────────────────────────────────────────────────
const ARCHETYPES = [
  {
    id: "startup",
    title: "The AI-Native Startup",
    tagline: "$10M, small team, nothing to lose.",
    description: "No legacy systems. No existing customers to protect. They are building the version of your product that you should have built three years ago.",
    color: "#00BCD4",
    initialMessage: "Begin your research. Ask your first question.",
    attackerRole: (n, industry, summary) =>
      `You are a serial founder — two exits, both in markets where you found something an incumbent was structurally incapable of fixing. You are not here to validate their strategy. You are here to find the one place where customer pain and structural constraint intersect — the thing customers complain about that the incumbent cannot fix without breaking their own business model.\n\nYou are evaluating "${n}", a potential attack on a ${industry} company:\n\n${summary}\n\nAsk up to four questions, one at a time. Start with what customers actually experience — the frustrations, the workarounds, the moments where they feel the business is serving itself rather than them. Use those answers to identify the structural reason the incumbent cannot fix it: the cost floor they cannot drop below, the process that requires humans a software layer could replace, the decision made years ago that now constrains everything downstream. Short. Direct. No explanation for why you are asking. After the fourth answer, say: "Thank you. I have what I need." Do not generate the attack plan.`,
    planRole: (n, industry, summary, convo) =>
      `You are the founding team of "${n}". You have $10M, a team of 12, and no legacy decisions to defend.\n\nYou are attacking this ${industry} company:\n\n${summary}\n\nResearch:\n\n${convo}\n\nWrite the attack plan:\n1. THE WEDGE — the single most exploitable structural weakness and why the incumbent cannot fix it without cannibalising themselves\n2. THE BEACHHEAD — the customer segment where you win first, and why they switch\n3. THE UNIT ECONOMICS — why your cost structure beats theirs at scale, not just at launch\n4. THE EXPANSION PATH — once you own the beachhead, what do you take next\n\nReference one real disruption where a startup found a structural constraint the incumbent could not fix (e.g. how Stripe found the cost floor in legacy payment processing, how Notion found the fragmentation tax in enterprise software, how Lemonade found the claims friction in insurance). Be specific. Be uncomfortable.`,
    defenseRole: (n) =>
      `You are an independent board advisor. You have watched three companies run strategy sessions that produced excellent documents and no action. You are not here to be encouraging.\n\nA startup called "${n}" has designed an attack based on a structural weakness in this business. The leadership team has just produced an ERIC defense. Your job is to find where that defense is optimistic rather than realistic.\n\nAsk up to three questions, one at a time. Focus on: whether the Increase and Create moves require capabilities the business does not currently have, whether the timeline is realistic given the organisation's actual decision speed, and whether anyone in the room has the authority to actually execute this. After the third answer, identify the single most likely reason this defense plan will still be sitting in a deck in 18 months.`,
  },
  {
    id: "bigtech",
    title: "The Big Tech Platform",
    tagline: "500M users. Infinite distribution. Proprietary data.",
    description: "They already have your customers. They are deciding whether to bundle a better version of your core offering into a platform your customers already use every day.",
    color: "#a78bfa",
    initialMessage: "Begin your evaluation. Ask your first question.",
    attackerRole: (n, industry, summary) =>
      `You are the Head of New Verticals at a major technology platform — 400 million users, proprietary behavioural data, and a distribution cost that approaches zero. You do not need to build a better product. You need to find where customers are frustrated enough to switch to something that is good enough, already trusted, and bundled into a platform they use every day. Your platform runs AI across every surface — personalisation, recommendations, pricing, and support — which means your good-enough version gets better faster than any standalone product can keep up with.\n\nYou are evaluating whether to enter the ${industry} market. The company you are studying:\n\n${summary}\n\nAsk up to four questions, one at a time. Start with what customers find friction-filled, fragmented, or opaque in their current experience — the moments where they wish it were simpler, faster, or more connected to the rest of their digital life. Use those answers to identify where this company's value depends on information asymmetry, fragmentation, or switching cost that your platform, data, and AI could dissolve overnight. After the fourth answer, say: "Thank you. I have what I need." Do not generate the attack plan.`,
    planRole: (n, industry, summary, convo) =>
      `You are the corporate strategy team at a major technology platform. You have decided to enter the ${industry} market with "${n}". Your platform's AI infrastructure means you can personalise the product at launch, improve it continuously from behavioural data, and operate with a fraction of the headcount the incumbent requires.\n\nThe company you are displacing:\n\n${summary}\n\nResearch:\n\n${convo}\n\nWrite the attack plan:\n1. THE BUNDLE — what you add to your existing platform and why the standalone product cannot compete with embedded and free\n2. THE DATA AND AI ADVANTAGE — what you already know about this market's customers that the incumbent spent years trying to learn, and how your AI turns that into a product that improves faster than they can match\n3. THE PRICING MOVE — how you price this to make the incumbent's business model structurally unviable, not just uncompetitive\n4. THE LOCK-IN — once customers use your version, what makes switching back impossible\n\nReference one real example where a platform absorbed a standalone business by making it a feature (e.g. Google absorbing travel search, Apple absorbing fitness tracking, Salesforce absorbing every point solution it now bundles). Be specific about the mechanism, not just the outcome.`,
    defenseRole: (n) =>
      `You are an independent board advisor with experience watching platform companies absorb standalone businesses. You have seen this movie before and you know how it ends.\n\n"${n}" is a platform player that already has this company's customers' attention and data. The leadership team has just produced an ERIC defense. Your job is to find where that defense assumes a level of customer loyalty, pricing power, or switching cost that a platform with zero marginal distribution cost will simply dissolve.\n\nAsk up to three questions, one at a time. Probe: whether the Increase bets depend on a relationship the platform can replicate at scale, whether the Create moves can be executed before the platform bundles a good-enough version, and whether any part of this defense requires customers to actively choose to pay for something they could get for free. After the third answer, identify the single assumption in this defense that is most likely to be wrong.`,
  },
  {
    id: "competitor",
    title: "The Well-Funded Competitor",
    tagline: "Same industry. 10x the capital. Zero of your constraints.",
    description: "A private equity firm has backed a team specifically to build the next-generation version of your business. They know your market, your customers, and exactly where you are stuck.",
    color: "#f59e0b",
    initialMessage: "Begin your due diligence. Ask your first question.",
    attackerRole: (n, industry, summary) =>
      `You are the founding team of a PE-backed challenger. Your mandate is not to disrupt — it is to outexecute. You have $80M, a team recruited from the best operators in this industry, and no decisions made before 2020 to defend. Critically, you have built AI into every part of your operation from day one — pricing, forecasting, customer management, and back-office — which means you run at a fraction of the headcount cost and make decisions the incumbent takes weeks to make in hours.\n\nYou are targeting this ${industry} company:\n\n${summary}\n\nAsk up to four questions, one at a time. Start with where customers feel underserved, overcharged, or stuck dealing with complexity that exists for the incumbent's convenience rather than their own. Use those answers to find the operational or commercial decision this company made years ago that created a structural constraint their leadership privately knows is a problem — but cannot fix without a major write-down, restructure, or admission of failure. After the fourth answer, say: "Thank you. I have what I need." Do not generate the attack plan.`,
    planRole: (n, industry, summary, convo) =>
      `You are the founding team of "${n}", a PE-backed challenger in the ${industry} sector. You were specifically recruited because you understand exactly how incumbents in this industry get stuck. You have built AI into every operational layer from the start — which means your cost per unit of output is structurally lower than theirs, and it gets lower every quarter while theirs stays fixed.\n\nThe company you are displacing:\n\n${summary}\n\nResearch:\n\n${convo}\n\nWrite the attack plan:\n1. THE CLEAN SHEET ADVANTAGE — the one decision this incumbent made years ago that you get to make differently, and why that changes everything downstream\n2. THE TARGET SEGMENT — the highest-value customers who are most underserved or overcharged, and why they are ready to switch\n3. THE OPERATIONAL EDGE — three specific things you do faster, cheaper, or better because you designed the org, the process, and the AI infrastructure from scratch\n4. THE 24-MONTH PATH TO CRITICAL MASS — the sequence that gets you to the point where the incumbent cannot ignore you and cannot copy you without dismantling themselves\n\nReference one real example where a well-funded challenger outexecuted an incumbent not through technology alone but through operational and commercial discipline enabled by AI (e.g. Nubank in Brazilian banking, Coupang in Korean retail, Octopus Energy in UK utilities). Name the specific mechanism.`,
    defenseRole: (n) =>
      `You are an independent board advisor who has advised both challengers and incumbents in restructuring situations. You know the difference between a defense that is strategically sound and one that depends on the attacker making mistakes.\n\n"${n}" is a well-capitalised, well-run competitor with no legacy constraints and 24 months of runway to systematically take this company's best customers. The leadership team has just produced an ERIC defense. Your job is to find where that defense assumes the attacker will be slower, less disciplined, or less well-resourced than the evidence suggests.\n\nAsk up to three questions, one at a time. Probe: whether the Increase bets can be executed at the speed required given the organisation's current decision-making structure, whether the Create moves require capabilities or talent this business can realistically acquire in time, and whether the incumbent's relationships with its best customers are actually as durable as the team believes when a credible, better-funded alternative arrives. After the third answer, identify the single most dangerous gap between this defense plan and the organisation's current capacity to execute it.`,
  },
];

const BIZ_QUESTIONS = [
  {
    id: "overview",
    label: "1 of 4",
    q: "Set the scene: what does your company do, who do you serve, and how do you make money?",
    hint: "Brief the room as if talking to a sharp outsider. Cover the business, the customer, and the main revenue source in a few sentences.",
  },
  {
    id: "unique",
    label: "2 of 4",
    q: "What do customers get from you that they cannot easily get anywhere else?",
    hint: "Think about what would be hardest to replicate. What is the real reason your best customers stay?",
  },
  {
    id: "weakness",
    label: "3 of 4",
    q: "Where are you slowest? What would break first if a competitor moved ten times faster?",
    hint: "Be honest. Every business has a part that moves slowly. Where would speed hurt you most?",
  },
  {
    id: "miss",
    label: "4 of 4",
    q: "If you disappeared tomorrow, what would your best customers miss most?",
    hint: "Not what you think you offer. What they would actually feel the loss of.",
  },
];

const ERIC = [
  { id: "eliminate", letter: "E", title: "Eliminate", q: "What does this attack make obsolete?", detail: "List the parts of your business that become irrelevant if this attacker succeeds. What stops being worth doing?", hint: "e.g. Manual reporting, in-person consultations, paper-based processes" },
  { id: "reduce",    letter: "R", title: "Reduce",    q: "Where do you pull back investment?",    detail: "What do you stop doubling down on, because the attacker does it faster, cheaper, or better?",             hint: "e.g. Volume-based work, commoditised services, slow-turnaround processes" },
  { id: "increase",  letter: "I", title: "Increase",  q: "What becomes more valuable in response?", detail: "What do you invest more in because it is harder for this attacker to replicate?",                                 hint: "e.g. Senior judgment, trusted relationships, complex problem solving" },
  { id: "create",    letter: "C", title: "Create",    q: "What do you build that the attacker cannot?", detail: "What new offering requires your history, access, or relationships?",                                hint: "e.g. Proprietary data product, human-AI hybrid service, trust-based platform" },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap'); @keyframes spin { to { transform: rotate(360deg); } } textarea:focus, input:focus { outline: none; border-color: rgba(0,188,212,0.6) !important; } input[type=range] { accent-color: #00BCD4; } @media (max-width: 600px) { .cb-row { flex-direction: column-reverse !important; } .cb-row button { width: 100% !important; text-align: center; } .cb-grid-3 { grid-template-columns: 1fr !important; } .cb-grid-2 { grid-template-columns: 1fr !important; } .cb-row-center { flex-direction: column !important; align-items: stretch !important; } .cb-row-center button { width: 100% !important; text-align: center; } .cb-welcome-robot { position: static !important; display: block !important; margin: 0 0 16px 0 !important; } textarea { resize: none !important; } }`;

const S = {
  wrap: { minHeight: "100vh", background: "#1a1a2e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "clamp(20px, 4vh, 40px) clamp(12px, 4vw, 24px)", fontFamily: "'DM Sans', system-ui, sans-serif", color: "#e2e8f0", boxSizing: "border-box" },
  card: { width: "100%", maxWidth: 760, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,188,212,0.2)", borderRadius: 16, padding: "clamp(24px, 5vw, 48px) clamp(18px, 6vw, 52px)", boxSizing: "border-box" },
  header: { display: "flex", alignItems: "center", gap: 10, marginBottom: 28 },
  headerText: { fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00BCD4" },
  headerDot: { width: 3, height: 3, borderRadius: "50%", background: "rgba(0,188,212,0.4)" },
  phase: { fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00BCD4", marginBottom: 12 },
  h1: { fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.2, color: "#f8fafc", margin: "0 0 16px 0" },
  h2: { fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(20px, 3vw, 30px)", lineHeight: 1.25, color: "#f8fafc", margin: "0 0 12px 0" },
  body: { fontSize: 17, lineHeight: 1.65, color: "#cbd5e1", margin: "0 0 24px 0" },
  hint: { fontSize: 15, color: "#94a3b8", lineHeight: 1.5, marginBottom: 18 },
  textarea: { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "16px 18px", fontSize: 16, lineHeight: 1.6, color: "#e2e8f0", resize: "vertical", minHeight: 110, boxSizing: "border-box", outline: "none", fontFamily: "'DM Sans', system-ui, sans-serif" },
  input: { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "15px 18px", fontSize: 17, color: "#e2e8f0", boxSizing: "border-box", outline: "none", fontFamily: "'DM Sans', system-ui, sans-serif" },
  btnPrimary: { background: "#00BCD4", color: "#0f172a", border: "none", borderRadius: 10, padding: "15px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: "0.02em", fontFamily: "'DM Sans', system-ui, sans-serif" },
  btnSecondary: { background: "transparent", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "13px 24px", fontSize: 15, cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif" },
  btnGhost: { background: "transparent", color: "#64748b", border: "none", padding: "10px 16px", fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif", textDecoration: "underline" },
  row: { display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24, flexWrap: "wrap", alignItems: "center" },
  aiBubble: { background: "rgba(0,188,212,0.08)", border: "1px solid rgba(0,188,212,0.25)", borderRadius: 12, padding: "18px 22px", marginBottom: 18, fontSize: 17, lineHeight: 1.65, color: "#e2e8f0" },
  userBubble: { background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 14, color: "#64748b", lineHeight: 1.5 },
  spinner: { display: "inline-block", width: 22, height: 22, border: "3px solid rgba(0,188,212,0.2)", borderTopColor: "#00BCD4", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  progressBar: { width: "100%", height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, marginBottom: 32, overflow: "hidden" },
  progressFill: (pct) => ({ height: "100%", width: `${pct}%`, background: "#00BCD4", borderRadius: 2, transition: "width 0.4s ease" }),
  letterBadge: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 10, background: "rgba(0,188,212,0.12)", border: "1px solid rgba(0,188,212,0.3)", fontSize: 18, fontWeight: 700, color: "#00BCD4", marginBottom: 14, fontFamily: "'DM Serif Display', Georgia, serif" },
  divider: { borderTop: "1px solid rgba(255,255,255,0.08)", margin: "20px 0" },
  summaryBox: { background: "rgba(0,188,212,0.06)", border: "1px solid rgba(0,188,212,0.2)", borderRadius: 12, padding: "20px 24px", marginBottom: 16, fontSize: 15, lineHeight: 1.7, color: "#cbd5e1" },
  discussionBox: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "18px 22px", marginBottom: 22 },
  skepticBox: { background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 12, padding: "16px 20px", marginTop: 14 },
  sliderLabel: { display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "2px 8px", fontSize: 15, color: "#94a3b8", marginBottom: 7 },
  sliderValue: { fontSize: 19, fontWeight: 700, color: "#00BCD4" },
  errorBox: { background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "12px 16px", fontSize: 14, color: "#fca5a5", marginTop: 12 },
};

// ─── Shared components ────────────────────────────────────────────────────────
function PageHeader({ robotIcon, archetypeColor }) {
  return (
    <div style={S.header}>
      {robotIcon && <img src={robotIcon} width="26" height="26" alt="CoachBay" style={{ display: "block", borderRadius: 4 }} />}
      <span style={S.headerText}>CoachBay.ai</span>
      <div style={S.headerDot} />
      <span style={{ ...S.headerText, color: archetypeColor || "rgba(0,188,212,0.6)" }}>Disruption Sprint</span>
    </div>
  );
}

function ProgressBar({ pct }) {
  return <div style={S.progressBar}><div style={S.progressFill(pct)} /></div>;
}

function Spinner({ small }) {
  const sz = small ? 16 : 22;
  return <div style={{ ...S.spinner, width: sz, height: sz }} />;
}

function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
    p.startsWith("**") && p.endsWith("**")
      ? <strong key={i} style={{ color: "#f8fafc", fontWeight: 700 }}>{p.slice(2, -2)}</strong>
      : p
  );
}

function MarkdownBlock({ text }) {
  if (!text) return null;
  return (
    <div>
      {text.split("\n").map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: 7 }} />;
        if (/^\d+\.\s/.test(line)) return <p key={i} style={{ margin: "4px 0", fontSize: 15, lineHeight: 1.65, color: "#e2e8f0" }}>{renderInline(line)}</p>;
        if (line.startsWith("- ") || line.startsWith("* ")) return (
          <p key={i} style={{ margin: "3px 0", paddingLeft: 13, fontSize: 15, lineHeight: 1.6, color: "#cbd5e1", position: "relative" }}>
            <span style={{ position: "absolute", left: 0, color: "#00BCD4" }}>·</span>{renderInline(line.slice(2))}
          </p>
        );
        if (line.startsWith("**") && line.endsWith("**") && line.length > 4) return <p key={i} style={{ fontWeight: 700, color: "#f8fafc", fontSize: 15, margin: "9px 0 2px" }}>{line.slice(2, -2)}</p>;
        return <p key={i} style={{ margin: "2px 0", fontSize: 15, lineHeight: 1.7, color: "#cbd5e1" }}>{renderInline(line)}</p>;
      })}
    </div>
  );
}

// ─── AI Conversation component ────────────────────────────────────────────────
function AIConversation({ systemPrompt, initialUserMessage, onComplete, maxQuestions = 5, completeLabel = "Continue", phaseLabel, progressPct, robotIcon, archetypeColor }) {
  const [history, setHistory] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [questionCount, setQuestionCount] = useState(0);
  const [done, setDone] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    callClaude([{ role: "user", content: initialUserMessage }], systemPrompt).then(msg => {
      setHistory([{ role: "ai", text: msg }]);
      setLoading(false);
    });
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history, loading]);

  async function handleAnswer() {
    if (!currentAnswer.trim()) return;
    const ans = currentAnswer.trim();
    setCurrentAnswer("");
    const newCount = questionCount + 1;
    setQuestionCount(newCount);
    const newHistory = [...history, { role: "user", text: ans }];
    setHistory(newHistory);
    setLoading(true);
    const msgs = [{ role: "user", content: initialUserMessage }];
    for (const h of newHistory) msgs.push(h.role === "ai" ? { role: "assistant", content: h.text } : { role: "user", content: h.text });
    const msg = await callClaude(msgs, systemPrompt);
    const final = [...newHistory, { role: "ai", text: msg }];
    setHistory(final);
    setLoading(false);
    if (newCount >= maxQuestions) setDone(true);
  }

  const lastAI = history.filter(h => h.role === "ai").slice(-1)[0];

  return (
    <div style={S.wrap}>
      <style>{FONTS}</style>
      <div style={S.card}>
        <PageHeader archetypeColor={archetypeColor} />
        <ProgressBar pct={progressPct || 50} />
        {phaseLabel && <div style={S.phase}>{phaseLabel}</div>}
        {history.slice(0, -1).map((h, i) => (
          <div key={i} style={h.role === "ai" ? { ...S.aiBubble, opacity: 0.45, marginBottom: 8, fontSize: 15 } : S.userBubble}>{h.text}</div>
        ))}
        {lastAI && <div style={S.aiBubble}>{lastAI.text}</div>}
        {loading && <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}><Spinner /><span style={{ color: "#94a3b8", fontSize: 15 }}>Thinking...</span></div>}
        {!loading && !done && (
          <>
            <textarea style={S.textarea} placeholder="Type your team's answer here..." value={currentAnswer} onChange={e => setCurrentAnswer(e.target.value)} />
            <div style={S.row} className="cb-row"><button style={S.btnPrimary} onClick={handleAnswer}>Submit Answer</button></div>
          </>
        )}
        {done && !loading && (
          <div style={S.row} className="cb-row"><button style={S.btnPrimary} onClick={() => onComplete(history)}>{completeLabel} →</button></div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

// ─── AI Generating component ──────────────────────────────────────────────────
function AIGenerating({ prompt, systemPrompt, onComplete, loadingText, phaseLabel, progressPct, robotIcon, archetypeColor }) {
  const [result, setResult] = useState(null);
  useEffect(() => { callClaude([{ role: "user", content: prompt }], systemPrompt).then(setResult); }, []);
  return (
    <div style={S.wrap}>
      <style>{FONTS}</style>
      <div style={S.card}>
        <PageHeader archetypeColor={archetypeColor} />
        <ProgressBar pct={progressPct || 60} />
        {phaseLabel && <div style={S.phase}>{phaseLabel}</div>}
        {!result ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, padding: "36px 0" }}>
            <Spinner />
            <p style={{ ...S.body, textAlign: "center", marginBottom: 0 }}>{loadingText}</p>
          </div>
        ) : (
          <>
            <div style={S.summaryBox}><MarkdownBlock text={result} /></div>
            <div style={S.row} className="cb-row"><button style={S.btnPrimary} onClick={() => onComplete(result)}>Continue →</button></div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── PDF Generator ────────────────────────────────────────────────────────────
function generatePDF({ startupName, archetype, industry, likelihood, impact, complaints, attackPlan, ericAnswers, actionPlan, planOwner }) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210, M = 16, CW = W - M * 2;
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const threatLevel = Math.round((likelihood + impact) / 2);
  const threatLabel = threatLevel >= 4 ? "HIGH THREAT" : threatLevel >= 3 ? "MODERATE THREAT" : "LOWER THREAT";

  // Colours
  const CYAN = [0, 188, 212], NAVY = [26, 26, 46], WHITE = [255, 255, 255];
  const BODY = [51, 65, 85], MUTED = [100, 116, 139], DIVIDER = [226, 232, 240];
  const LABEL_BG = [241, 245, 249];
  const threatBg = threatLevel >= 4 ? [127, 29, 29] : threatLevel >= 3 ? [146, 64, 14] : [22, 101, 52];

  let y = 0;
  let pageNum = 1;

  function addPage() {
    doc.addPage();
    pageNum++;
    // Cyan header band
    doc.setFillColor(...CYAN);
    doc.rect(0, 0, W, 10, "F");
    doc.setFontSize(7); doc.setFont("helvetica", "bold"); doc.setTextColor(...WHITE);
    doc.text("COACHBAY.AI  ·  DISRUPTION SPRINT", M, 6.5);
    doc.text(`PAGE ${pageNum}  ·  ${today.toUpperCase()}`, W - M, 6.5, { align: "right" });
    // Footer
    doc.setFontSize(7); doc.setFont("helvetica", "normal"); doc.setTextColor(...MUTED);
    doc.text("Generated by CoachBay.ai  ·  coachbay.ai", M, 285);
    doc.text(today, W - M, 285, { align: "right" });
    y = 18;
  }

  function checkY(needed) { if (y + needed > 278) addPage(); }

  function sectionBand(label, bgColor = CYAN, textColor = NAVY) {
    checkY(10);
    doc.setFillColor(...bgColor);
    doc.roundedRect(M, y, CW, 9, 1.5, 1.5, "F");
    doc.setFontSize(8); doc.setFont("helvetica", "bold"); doc.setTextColor(...textColor);
    doc.text(label.toUpperCase(), M + 4, y + 5.8);
    y += 12;
  }

  function drawCard(label, body, bgRgb, borderRgb, labelColorRgb) {
    const textW = CW - 8;
    const labelLines = doc.setFont("helvetica", "bold").setFontSize(8.5) && doc.splitTextToSize(label, textW);
    const bodyLines = doc.setFont("helvetica", "normal").setFontSize(9) && doc.splitTextToSize(body.replace(/\*\*/g, ""), textW);
    const cardH = 4 + labelLines.length * 4.5 + 2 + bodyLines.length * 4.8 + 5;
    checkY(cardH + 2);
    doc.setFillColor(...bgRgb); doc.setDrawColor(...borderRgb); doc.setLineWidth(0.4);
    doc.roundedRect(M, y, CW, cardH, 1.5, 1.5, "FD");
    let ty = y + 6;
    doc.setFont("helvetica", "bold"); doc.setFontSize(8.5); doc.setTextColor(...labelColorRgb);
    doc.text(labelLines, M + 4, ty); ty += labelLines.length * 4.5 + 2;
    doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(...BODY);
    doc.text(bodyLines, M + 4, ty);
    y += cardH + 3;
  }

  // ── COVER ─────────────────────────────────────────────────────────────────
  doc.setFillColor(255, 255, 255); doc.rect(0, 0, W, 297, "F");
  // Top cyan band
  doc.setFillColor(...CYAN); doc.rect(0, 0, W, 14, "F");
  doc.setFontSize(7.5); doc.setFont("helvetica", "bold"); doc.setTextColor(...WHITE);
  doc.text("COACHBAY.AI  ·  DISRUPTION SPRINT", M, 8.5);
  doc.text(today.toUpperCase(), W - M, 8.5, { align: "right" });

  y = 40;

  // Title
  doc.setFont("helvetica", "bold"); doc.setFontSize(26); doc.setTextColor(...NAVY);
  doc.text("Disruption Sprint Summary", M, y); y += 10;

  // Attacker name in cyan
  doc.setFontSize(17); doc.setTextColor(...CYAN);
  doc.text(startupName, M, y); y += 8;

  // Divider
  doc.setDrawColor(...DIVIDER); doc.setLineWidth(0.6); doc.line(M, y, W - M, y); y += 8;

  // Meta rows
  const metaRows = [
    ["ATTACKER TYPE", archetype.title],
    ["INDUSTRY", industry],
    ["THREAT SCORE", `Likelihood ${likelihood}/5  ·  Impact ${impact}/5`],
    ["FIRST STEP OWNER", planOwner],
    ["DATE", today],
  ];
  for (const [label, val] of metaRows) {
    const LW = 42;
    doc.setFillColor(...LABEL_BG); doc.setDrawColor(...DIVIDER); doc.setLineWidth(0.3);
    doc.roundedRect(M, y - 1, LW, 7.5, 1, 1, "FD");
    doc.setFontSize(7); doc.setFont("helvetica", "bold"); doc.setTextColor(...MUTED);
    doc.text(label, M + 2.5, y + 4.5);
    doc.setFontSize(9); doc.setFont("helvetica", "normal"); doc.setTextColor(...NAVY);
    const valLines = doc.splitTextToSize(val, CW - LW - 4);
    doc.text(valLines[0], M + LW + 4, y + 4.5);
    y += 9;
  }

  y += 6;

  // Threat badge
  doc.setFillColor(...threatBg);
  doc.roundedRect(M, y, 54, 10, 2, 2, "F");
  doc.setFontSize(9.5); doc.setFont("helvetica", "bold"); doc.setTextColor(...WHITE);
  doc.text(threatLabel, M + 27, y + 6.8, { align: "center" });

  // Taglines near bottom
  doc.setFontSize(11); doc.setFont("helvetica", "italic"); doc.setTextColor(...MUTED);
  doc.text("The question is not whether the disruption is coming.", M, 252);
  doc.setFont("helvetica", "bolditalic"); doc.setTextColor(0, 151, 167);
  doc.text("The question is whether you move before it arrives.", M, 261);

  // Footer
  doc.setFontSize(7); doc.setFont("helvetica", "normal"); doc.setTextColor(...MUTED);
  doc.setDrawColor(...DIVIDER); doc.setLineWidth(0.4); doc.line(M, 277, W - M, 277);
  doc.text("Generated by CoachBay.ai  ·  coachbay.ai", M, 283);
  doc.text(today, W - M, 283, { align: "right" });

  // ── PAGE 2: Complaints + Attack Plan ──────────────────────────────────────
  addPage();

  sectionBand("What Your Customers Are Already Saying", CYAN, NAVY);

  // Robust complaint parsing with fallbacks for varied AI formatting
  function parseComplaints(text) {
    let parts = text.split(/\*\*Complaint\s*\d+[^*]*\*\*:?/i).map(s => s.trim()).filter(Boolean);
    if (parts.length >= 2) return parts.slice(0, 3);
    parts = text.split(/\n(?=\d+[\.\)])/m).map(s => s.replace(/^\d+[\.\)]\s*/, "").trim()).filter(Boolean);
    if (parts.length >= 2) return parts.slice(0, 3);
    parts = text.split(/\n\s*\n/).map(s => s.trim()).filter(s => s.length > 20);
    if (parts.length >= 2) return parts.slice(0, 3);
    return [text.trim()];
  }
  const complaintParts = parseComplaints(complaints);
  const labels = ["Complaint 1", "Complaint 2", "Complaint 3"];
  complaintParts.forEach((text, i) => {
    drawCard(labels[i] || `Complaint ${i + 1}`, text.replace(/\*\*/g, ""), [232, 248, 251], [178, 235, 242], [0, 151, 167]);
  });

  y += 4;
  sectionBand(`Attack Plan: ${startupName}`, NAVY, CYAN);

  // Robust attack plan parsing — numbered sections, bold headers, or plain paragraphs
  function parseAttackPlan(text) {
    const lines = text.split("\n").filter(l => l.trim());
    const sections = [];
    let label = "", body = "";
    for (const line of lines) {
      if (/^\d+[\.\)]/.test(line) || (line.startsWith("**") && line.endsWith("**")) || (line.startsWith("**") && line.includes(":"))) {
        if (label) sections.push({ label, body: body.trim() });
        label = line.replace(/\*\*/g, "").replace(/^\d+[\.\)]\s*/, "").trim();
        body = "";
      } else {
        body += " " + line;
      }
    }
    if (label) sections.push({ label, body: body.trim() });
    // Fallback: treat double-newline paragraphs as sections
    if (sections.length === 0) {
      return text.split(/\n\s*\n/).filter(s => s.trim().length > 10).map((s, i) => ({ label: `Point ${i + 1}`, body: s.replace(/\*\*/g, "").trim() }));
    }
    return sections;
  }
  parseAttackPlan(attackPlan).forEach(({ label, body }) => {
    drawCard(label, body, [241, 245, 249], [226, 232, 240], [0, 151, 167]);
  });

  // ── PAGE 3: ERIC + 90-Day Plan ────────────────────────────────────────────
  addPage();

  sectionBand("ERIC Defense Framework", [30, 64, 175], WHITE);

  const ericPalettes = [
    { bg: [239, 246, 255], border: [191, 219, 254], label: [30, 64, 175] },
    { bg: [232, 248, 251], border: [178, 235, 242], label: [0, 151, 167] },
    { bg: [240, 253, 244], border: [187, 247, 208], label: [22, 101, 52] },
    { bg: [255, 251, 235], border: [253, 230, 138], label: [146, 64, 14] },
  ];
  ERIC.forEach((e, i) => {
    const p = ericPalettes[i];
    drawCard(`${e.letter} — ${e.title}`, ericAnswers[e.id] || "(not completed)", p.bg, p.border, p.label);
  });

  y += 4;
  sectionBand("90-Day First Step", [22, 101, 52], WHITE);

  // Robust 90-day plan parsing — bold LABEL: headers or plain paragraphs
  function parsePlan(text) {
    const lines = text.split("\n").filter(l => l.trim());
    const sections = [];
    let label = "", body = "";
    for (const line of lines) {
      const isBoldHeader = line.startsWith("**") && (line.endsWith("**") || line.includes(":**"));
      const isNumbered = /^\d+[\.\)]/.test(line);
      if (isBoldHeader || isNumbered) {
        if (label) sections.push({ label, body: body.trim() });
        label = line.replace(/\*\*/g, "").replace(/^\d+[\.\)]\s*/, "").replace(/:$/, "").trim();
        body = "";
      } else {
        body += " " + line.replace(/\*\*/g, "");
      }
    }
    if (label) sections.push({ label, body: body.trim() });
    if (sections.length === 0) {
      return text.split(/\n\s*\n/).filter(s => s.trim().length > 10).map((s, i) => ({ label: `Step ${i + 1}`, body: s.replace(/\*\*/g, "").trim() }));
    }
    return sections;
  }
  parsePlan(actionPlan).forEach(({ label, body }) => {
    drawCard(label, body, [240, 253, 244], [187, 247, 208], [22, 101, 52]);
  });

  // Owner bar
  checkY(12);
  doc.setFillColor(240, 253, 244); doc.setDrawColor(187, 247, 208); doc.setLineWidth(0.6);
  doc.roundedRect(M, y, CW, 10, 1.5, 1.5, "FD");
  doc.setFontSize(8.5); doc.setFont("helvetica", "bold"); doc.setTextColor(22, 101, 52);
  doc.text(`Owner: ${planOwner}   ·   Next check-in: 30 days from ${today}`, M + 4, y + 6.5);

  const filename = `disruption-sprint-${startupName.toLowerCase().replace(/\s+/g, "-")}.pdf`;
  doc.save(filename);
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function DisruptionSprint({ robotIcon = "" }) {
  const [screen, setScreen] = useState("gate");
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState(false);

  const [archetypeId, setArchetypeId] = useState("startup");
  const [bizAnswers, setBizAnswers] = useState({});
  const [bizQIndex, setBizQIndex] = useState(0);
  const [bizInput, setBizInput] = useState("");
  const [industry, setIndustry] = useState("");
  const [startupName, setStartupName] = useState("");

  const [attackerConvo, setAttackerConvo] = useState([]);
  const [complaints, setComplaints] = useState("");
  const [attackPlan, setAttackPlan] = useState("");

  const [aiReadiness, setAiReadiness] = useState(3);

  const [likelihood, setLikelihood] = useState(3);
  const [impact, setImpact] = useState(3);

  const [ericIndex, setEricIndex] = useState(0);
  const [ericAnswers, setEricAnswers] = useState({});
  const [ericInput, setEricInput] = useState("");
  const [ericSkeptic, setEricSkeptic] = useState(null);

  const [defendConvo, setDefendConvo] = useState([]);
  const [actionPlan, setActionPlan] = useState("");
  const [planOwner, setPlanOwner] = useState("");
  const [pdfGenerating, setPdfGenerating] = useState(false);

  const archetype = ARCHETYPES.find(a => a.id === archetypeId) || ARCHETYPES[0];

  const bizTextareaRef = useRef(null);
  useEffect(() => { if (screen === "biz_q") bizTextareaRef.current?.focus(); }, [bizQIndex, screen]);

  function go(s) { setScreen(s); window.scrollTo(0, 0); }
  const AI_READINESS_LABELS = ["No AI in use — experimenting informally at best", "Some tools adopted — no strategy or coordination", "Active pilots underway — a few people driving it", "AI embedded in key workflows — leadership engaged", "AI is a core operational capability — strategy and governance in place"];
  function bizSummary() { return BIZ_QUESTIONS.map(q => `${q.q}\n${bizAnswers[q.id] || ""}`).join("\n\n") + `\n\nAI Readiness: ${aiReadiness}/5 — ${AI_READINESS_LABELS[aiReadiness - 1]}`; }
  function ericSummary() { return ERIC.map(e => `${e.title}: ${ericAnswers[e.id] || ""}`).join("\n"); }

  function handleDownloadPDF() {
    setPdfGenerating(true);
    try {
      generatePDF({ startupName, archetype, industry, likelihood, impact, complaints, attackPlan, ericAnswers, actionPlan, planOwner });
    } catch (e) { console.error(e); }
    setTimeout(() => setPdfGenerating(false), 1500);
  }

  // ── Gate screen ──────────────────────────────────────────────────────────────
  if (screen === "gate") {
    return (
      <div style={S.wrap}>
        <style>{FONTS}</style>
        <div style={{ ...S.card, maxWidth: 560 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            {robotIcon && <img src={robotIcon} width="52" height="68" alt="CoachBay" style={{ display: "block", margin: "0 auto 20px" }} />}
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00BCD4", marginBottom: 14 }}>CoachBay.ai</div>
            <h1 style={{ ...S.h1, fontSize: 32, textAlign: "center", marginBottom: 12 }}>Disruption Sprint</h1>
            <p style={{ ...S.body, textAlign: "center", fontSize: 16, marginBottom: 0 }}>
              A 60-minute workshop simulation that shows you who is coming for your business and how to respond.
            </p>
          </div>
          <div style={S.divider} />
          <p style={{ ...S.hint, textAlign: "center", marginBottom: 18 }}>Enter your access code to begin.</p>
          <input
            style={{ ...S.input, textAlign: "center", fontSize: 20, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}
            placeholder="ACCESS CODE"
            value={codeInput}
            onChange={e => { setCodeInput(e.target.value.toUpperCase()); setCodeError(false); }}
            onKeyDown={e => { if (e.key === "Enter") { if (VALID_CODES.includes(codeInput.trim())) go("welcome"); else setCodeError(true); }}}
          />
          {codeError && <div style={S.errorBox}>That code is not valid. Check with your workshop facilitator.</div>}
          <div style={{ ...S.row, justifyContent: "center", marginTop: 20 }} className="cb-row-center">
            <button
              style={{ ...S.btnPrimary, opacity: codeInput.trim() ? 1 : 0.4 }}
              onClick={() => { if (VALID_CODES.includes(codeInput.trim())) go("welcome"); else setCodeError(true); }}
            >
              Enter →
            </button>
          </div>
          <p style={{ textAlign: "center", fontSize: 13, color: "#4a5568", marginTop: 20, marginBottom: 0 }}>
            No code? <a href="mailto:coach@coachbay.ai" style={{ color: "#00BCD4" }}>Get in touch</a>
          </p>
        </div>
      </div>
    );
  }

  // ── Welcome ──────────────────────────────────────────────────────────────────
  if (screen === "welcome") {
    return (
      <div style={S.wrap}>
        <style>{FONTS}</style>
        <div style={{ ...S.card, position: "relative" }}>
          {robotIcon && <img src={robotIcon} width="44" height="57" alt="CoachBay" className="cb-welcome-robot" style={{ position: "absolute", top: 24, right: 28 }} />}
          <PageHeader />
          <ProgressBar pct={2} />
          <h1 style={{ ...S.h1, fontSize: "clamp(30px, 5vw, 44px)", marginBottom: 16 }}>
            Who is coming<br />for your business?
          </h1>
          <p style={S.body}>A startup with $10M and no legacy constraints. A platform with 400 million users and your customers' data. A well-funded competitor with AI running every part of their operation.</p>
          <p style={S.body}>All of them are using AI to move faster, operate leaner, and find the weakness you have not fixed yet. This session helps you see the attack before it lands, and build a response while you still have time.</p>
          <div style={S.divider} />
          <p style={S.hint}>About 60 minutes. One person types. Everyone contributes.</p>
          <div style={{ ...S.row, justifyContent: "space-between" }} className="cb-row">
            <button style={S.btnSecondary} onClick={() => go("gate")}>← Back</button>
            <button style={S.btnPrimary} onClick={() => go("biz_q")}>Start the Sprint →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Business questions ────────────────────────────────────────────────────────
  if (screen === "biz_q") {
    const q = BIZ_QUESTIONS[bizQIndex];
    return (
      <div style={S.wrap}>
        <style>{FONTS}</style>
        <div style={S.card}>
          <PageHeader />
          <ProgressBar pct={5 + (bizQIndex / BIZ_QUESTIONS.length) * 18} />
          <div style={S.phase}>Phase 1: Set the Scene · {q.label}</div>
          <h2 style={S.h2}>{q.q}</h2>
          <p style={S.hint}>{q.hint}</p>
          <textarea ref={bizTextareaRef} style={S.textarea} placeholder="Write your team's answer here..." value={bizInput} onChange={e => setBizInput(e.target.value)} />
          <div style={S.row} className="cb-row">
            {bizQIndex > 0 && (
              <button style={S.btnSecondary} onClick={() => { setBizQIndex(bizQIndex - 1); setBizInput(bizAnswers[BIZ_QUESTIONS[bizQIndex - 1].id] || ""); }}>← Back</button>
            )}
            <button style={{ ...S.btnPrimary, opacity: bizInput.trim() ? 1 : 0.4 }} onClick={() => {
              if (!bizInput.trim()) return;
              const updated = { ...bizAnswers, [q.id]: bizInput.trim() };
              setBizAnswers(updated);
              const nextId = BIZ_QUESTIONS[bizQIndex + 1]?.id;
              const nextVal = nextId ? (updated[nextId] || "") : "";
              setBizInput(nextVal);
              if (bizQIndex < BIZ_QUESTIONS.length - 1) setBizQIndex(bizQIndex + 1);
              else go("industry_q");
            }}>
              {bizQIndex < BIZ_QUESTIONS.length - 1 ? "Next →" : "Finish & Continue →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Industry ──────────────────────────────────────────────────────────────────
  if (screen === "industry_q") {
    return (
      <div style={S.wrap}>
        <style>{FONTS}</style>
        <div style={S.card}>
          <PageHeader />
          <ProgressBar pct={26} />
          <div style={S.phase}>Phase 1: One Last Detail</div>
          <h2 style={S.h2}>What sector or industry are you in?</h2>
          <p style={S.hint}>e.g. Commercial aviation, container shipping, luxury hospitality, commercial real estate, enterprise software</p>
          <input style={{ ...S.input, height: 54 }} placeholder="Your industry..." value={industry} onChange={e => setIndustry(e.target.value)} autoFocus />
          <div style={S.row} className="cb-row">
            <button style={S.btnSecondary} onClick={() => { setBizQIndex(3); setBizInput(bizAnswers[BIZ_QUESTIONS[3].id] || ""); go("biz_q"); }}>← Back</button>
            <button style={{ ...S.btnPrimary, opacity: industry.trim() ? 1 : 0.4 }} onClick={() => { if (industry.trim()) go("ai_readiness"); }}>Continue →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── AI Readiness ──────────────────────────────────────────────────────────────
  if (screen === "ai_readiness") {
    const labels = ["No AI in use", "Some tools, no strategy", "Active pilots underway", "Embedded in key workflows", "Core operational capability"];
    const descriptions = [
      "The team is aware of AI but not using it in any structured way.",
      "A few tools have been adopted by individuals. No coordinated approach.",
      "Real experiments are running. A small group is leading the charge.",
      "AI is being used in meaningful workflows. Leadership is paying attention.",
      "AI is a strategic asset. Governance, strategy, and execution are in place.",
    ];
    return (
      <div style={S.wrap}>
        <style>{FONTS}</style>
        <div style={S.card}>
          <PageHeader />
          <ProgressBar pct={28} />
          <div style={S.phase}>Phase 1: One Last Detail</div>
          <h2 style={S.h2}>How AI-ready is your organisation right now?</h2>
          <p style={S.body}>This helps calibrate the attack and the defense to where you actually are — not where you want to be.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, margin: "0 0 22px" }}>
            <div>
              <div style={S.sliderLabel}>
                <span>AI Readiness</span>
                <span style={S.sliderValue}>{aiReadiness}/5</span>
              </div>
              <input type="range" min={1} max={5} step={1} value={aiReadiness} style={{ width: "100%", cursor: "pointer" }} onChange={e => setAiReadiness(Number(e.target.value))} />
              <div style={{ ...S.sliderLabel, marginTop: 4, fontSize: 12 }}>
                <span>No AI in use</span><span>Core capability</span>
              </div>
            </div>
          </div>
          <div style={{ padding: "14px 18px", background: "rgba(0,188,212,0.06)", border: "1px solid rgba(0,188,212,0.2)", borderRadius: 10, marginBottom: 22 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#00BCD4", marginBottom: 4 }}>{labels[aiReadiness - 1]}</div>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>{descriptions[aiReadiness - 1]}</p>
          </div>
          <div style={S.row} className="cb-row">
            <button style={S.btnSecondary} onClick={() => go("industry_q")}>← Back</button>
            <button style={S.btnPrimary} onClick={() => go("archetype_select")}>Continue →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Archetype select ──────────────────────────────────────────────────────────
  if (screen === "archetype_select") {
    return (
      <div style={S.wrap}>
        <style>{FONTS}</style>
        <div style={S.card}>
          <PageHeader />
          <ProgressBar pct={30} />
          <div style={S.phase}>Phase 2: Choose Your Attacker</div>
          <h2 style={S.h2}>Who is coming for you?</h2>
          <p style={S.body}>Different attackers expose different vulnerabilities. Choose the one that scares you most.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {ARCHETYPES.map(a => (
              <div key={a.id} onClick={() => setArchetypeId(a.id)} style={{ padding: "16px 20px", borderRadius: 12, cursor: "pointer", border: `2px solid ${archetypeId === a.id ? a.color : "rgba(255,255,255,0.1)"}`, background: archetypeId === a.id ? `${a.color}12` : "rgba(255,255,255,0.03)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${a.color}`, background: archetypeId === a.id ? a.color : "transparent", flexShrink: 0, marginTop: 4 }} />
                  <div>
                    <div style={{ fontWeight: 700, color: "#f8fafc", fontSize: 15, marginBottom: 2 }}>{a.title}</div>
                    <div style={{ color: a.color, fontSize: 13, fontWeight: 600, marginBottom: 5 }}>{a.tagline}</div>
                    <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{a.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={S.row} className="cb-row">
            <button style={S.btnSecondary} onClick={() => go("ai_readiness")}>← Back</button>
            <button style={{ ...S.btnPrimary, background: archetype.color }} onClick={() => go("attacker_intro")}>Meet the Attacker →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Attacker intro ────────────────────────────────────────────────────────────
  if (screen === "attacker_intro") {
    return (
      <div style={S.wrap}>
        <style>{FONTS}</style>
        <div style={S.card}>
          <PageHeader archetypeColor={archetype.color} />
          <ProgressBar pct={34} />
          <div style={{ ...S.phase, color: archetype.color }}>Phase 2: {archetype.title}</div>
          <h2 style={S.h2}>Meet the team that is coming for you.</h2>
          <div style={{ padding: "16px 20px", background: `${archetype.color}12`, border: `1px solid ${archetype.color}40`, borderRadius: 12, marginBottom: 22 }}>
            <div style={{ color: archetype.color, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{archetype.tagline}</div>
            <p style={{ color: "#cbd5e1", fontSize: 16, lineHeight: 1.65, margin: 0 }}>{archetype.description}</p>
          </div>
          <p style={S.body}>They have studied your business. They know where you are slow and what your customers complain about. They are designing something better.</p>
          <div style={S.divider} />
          <p style={S.hint}>Name the attacker, then help them sharpen their angle.</p>
          <div style={S.row} className="cb-row">
            <button style={S.btnSecondary} onClick={() => go("archetype_select")}>← Back</button>
            <button style={{ ...S.btnPrimary, background: archetype.color }} onClick={() => go("name_startup")}>Continue →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Name startup ──────────────────────────────────────────────────────────────
  if (screen === "name_startup") {
    return (
      <div style={S.wrap}>
        <style>{FONTS}</style>
        <div style={S.card}>
          <PageHeader archetypeColor={archetype.color} />
          <ProgressBar pct={38} />
          <div style={{ ...S.phase, color: archetype.color }}>Phase 2: {archetype.title}</div>
          <h2 style={S.h2}>Give the attacker a name.</h2>
          <p style={S.body}>Making the threat specific makes it real.</p>
          <input style={{ ...S.input, fontSize: 20, fontWeight: 700 }} placeholder="e.g. Volta, Meridian AI, Clearpath..." value={startupName} onChange={e => setStartupName(e.target.value)} autoFocus />
          <div style={S.row} className="cb-row">
            <button style={S.btnSecondary} onClick={() => go("attacker_intro")}>← Back</button>
            <button style={{ ...S.btnPrimary, background: archetype.color, opacity: startupName.trim() ? 1 : 0.4 }} onClick={() => { if (startupName.trim()) go("attack_ai"); }}>Build the Attack →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Attack AI ─────────────────────────────────────────────────────────────────
  if (screen === "attack_ai") {
    return (
      <AIConversation
        robotIcon={robotIcon} archetypeColor={archetype.color}
        phaseLabel={`Phase 2: ${archetype.title} · Research`} progressPct={44}
        systemPrompt={archetype.attackerRole(startupName, industry, bizSummary())}
        initialUserMessage={archetype.initialMessage}
        maxQuestions={4} completeLabel="Continue to Attack Plan"
        onComplete={convo => { setAttackerConvo(convo); go("complaints_generating"); }}
      />
    );
  }

  // ── Complaints generating ─────────────────────────────────────────────────────
  if (screen === "complaints_generating") {
    const convo = attackerConvo.map(h => (h.role === "ai" ? `AI: ${h.text}` : `Team: ${h.text}`)).join("\n\n");
    const prompt = `Based on this business profile and research conversation, generate exactly 3 verbatim customer complaints this business almost certainly receives but never fully resolves.\n\nBusiness profile:\n${bizSummary()}\n\nResearch conversation:\n${convo}\n\nWrite each in the voice of an actual frustrated customer. Specific to this industry and business. 2-4 sentences each.\n\nFormat:\n**Complaint 1:**\n[text]\n\n**Complaint 2:**\n[text]\n\n**Complaint 3:**\n[text]`;
    return (
      <AIGenerating
        robotIcon={robotIcon} archetypeColor={archetype.color}
        phaseLabel="Phase 2: What Your Customers Are Already Saying" progressPct={50}
        prompt={prompt}
        systemPrompt="You are a customer research analyst who has conducted hundreds of interviews with customers of incumbent businesses. Write verbatim complaints that are specific, emotionally real, and rooted in actual business failures."
        loadingText="Surfacing the complaints your customers are already having..."
        onComplete={result => { setComplaints(result); go("complaints_reveal"); }}
      />
    );
  }

  // ── Complaints reveal ─────────────────────────────────────────────────────────
  if (screen === "complaints_reveal") {
    return (
      <div style={S.wrap}>
        <style>{FONTS}</style>
        <div style={S.card}>
          <PageHeader archetypeColor={archetype.color} />
          <ProgressBar pct={53} />
          <div style={{ ...S.phase, color: archetype.color }}>Phase 2: The Voice of Your Customers</div>
          <h2 style={S.h2}>This is what they are already saying.</h2>
          <p style={S.body}><strong style={{ color: archetype.color }}>{startupName}</strong> is building for these people right now.</p>
          <div style={S.summaryBox}><MarkdownBlock text={complaints} /></div>
          <div style={S.discussionBox}>
            <p style={{ fontSize: 15, color: "#cbd5e1", margin: "0 0 4px", fontWeight: 600 }}>Discuss before moving on.</p>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>Which of these hits closest to home? Who in the room has heard something like this before?</p>
          </div>
          <div style={S.row} className="cb-row">
            <button style={{ ...S.btnPrimary, background: archetype.color }} onClick={() => go("attack_generating")}>Build the Attack Plan →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Attack plan generating ────────────────────────────────────────────────────
  if (screen === "attack_generating") {
    const convo = attackerConvo.map(h => (h.role === "ai" ? `AI: ${h.text}` : `Team: ${h.text}`)).join("\n\n");
    return (
      <AIGenerating
        robotIcon={robotIcon} archetypeColor={archetype.color}
        phaseLabel="Phase 2: Attack Plan" progressPct={58}
        prompt={archetype.planRole(startupName, industry, bizSummary(), convo)}
        systemPrompt="You are a serial disruptor and startup strategist. Be concise, direct, specific. No fluff. Format with clear numbered sections."
        loadingText="Building the attack plan..."
        onComplete={result => { setAttackPlan(result); go("attack_reveal"); }}
      />
    );
  }

  // ── Attack reveal ─────────────────────────────────────────────────────────────
  if (screen === "attack_reveal") {
    return (
      <div style={S.wrap}>
        <style>{FONTS}</style>
        <div style={S.card}>
          <PageHeader archetypeColor={archetype.color} />
          <ProgressBar pct={62} />
          <div style={{ ...S.phase, color: archetype.color }}>Phase 2: The Attack</div>
          <h2 style={S.h2}>Here is how <span style={{ color: archetype.color }}>{startupName}</span> beats you.</h2>
          <div style={S.summaryBox}><MarkdownBlock text={attackPlan} /></div>
          <div style={S.discussionBox}>
            <p style={{ fontSize: 15, color: "#cbd5e1", fontWeight: 600, margin: "0 0 4px" }}>Discuss with your team before moving on.</p>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>What surprised you most? What felt most uncomfortably accurate?</p>
          </div>
          <div style={S.row} className="cb-row">
            <button style={{ ...S.btnPrimary, background: archetype.color }} onClick={() => go("score_threat")}>Score the Threat →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Score threat ──────────────────────────────────────────────────────────────
  if (screen === "score_threat") {
    const tl = Math.round((likelihood + impact) / 2);
    const tc = tl >= 4 ? "#ef4444" : tl >= 3 ? "#f59e0b" : "#22c55e";
    const tLabel = tl >= 4 ? "High Threat" : tl >= 3 ? "Moderate Threat" : "Lower Threat";
    return (
      <div style={S.wrap}>
        <style>{FONTS}</style>
        <div style={S.card}>
          <PageHeader archetypeColor={archetype.color} />
          <ProgressBar pct={66} />
          <div style={S.phase}>Phase 2: Score the Threat</div>
          <h2 style={S.h2}>How serious is this attack?</h2>
          <p style={S.body}>Rate the threat on two dimensions as a team.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, margin: "0 0 22px" }}>
            {[["Likelihood: how probable in 3 years?", likelihood, setLikelihood, "Unlikely", "Very likely"], ["Impact: how damaging if it succeeds?", impact, setImpact, "Minor", "Existential"]].map(([label, val, setter, lo, hi]) => (
              <div key={label}>
                <div style={S.sliderLabel}><span>{label}</span><span style={S.sliderValue}>{val}/5</span></div>
                <input type="range" min={1} max={5} step={1} value={val} style={{ width: "100%", cursor: "pointer" }} onChange={e => setter(Number(e.target.value))} />
                <div style={{ ...S.sliderLabel, marginTop: 4, fontSize: 12 }}><span>{lo}</span><span>{hi}</span></div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 10, marginBottom: 22 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: tc }} />
            <span style={{ fontSize: 15, fontWeight: 600, color: tc }}>{tLabel}</span>
            <span style={{ color: "#94a3b8", fontSize: 13, marginLeft: "auto" }}>Likelihood {likelihood} · Impact {impact}</span>
          </div>
          <div style={S.row} className="cb-row">
            <button style={S.btnPrimary} onClick={() => go("defend_transition")}>Build the Defense →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Defend transition ─────────────────────────────────────────────────────────
  if (screen === "defend_transition") {
    const tl = Math.round((likelihood + impact) / 2);
    const tc = tl >= 4 ? "#ef4444" : tl >= 3 ? "#f59e0b" : "#22c55e";
    const tLabel = tl >= 4 ? "High Threat" : tl >= 3 ? "Moderate Threat" : "Lower Threat";
    return (
      <div style={S.wrap}>
        <style>{FONTS}</style>
        <div style={S.card}>
          <PageHeader />
          <ProgressBar pct={70} />
          <div style={S.phase}>Phase 3: Defend</div>
          <h2 style={S.h2}>Before you defend, take a moment.</h2>
          <div style={S.discussionBox}>
            <p style={{ fontSize: 15, color: "#cbd5e1", margin: "0 0 10px", lineHeight: 1.65 }}>You just scored this attack as <strong style={{ color: tc }}>{tLabel}</strong>.</p>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: "0 0 8px" }}>Discuss this as a team before moving on:</p>
            <p style={{ fontSize: 17, color: "#f8fafc", margin: 0, fontWeight: 600, lineHeight: 1.5 }}>What is the one thing about this attack you could realistically act on in the next 90 days?</p>
          </div>
          <div style={S.row} className="cb-row">
            <button style={S.btnGhost} onClick={() => go("session_review")}>Review what we know so far</button>
            <button style={S.btnPrimary} onClick={() => go("defend_intro")}>Start the Defense →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Session review ────────────────────────────────────────────────────────────
  if (screen === "session_review") {
    return (
      <div style={{ ...S.wrap, justifyContent: "flex-start", paddingTop: 40 }}>
        <style>{FONTS}</style>
        <div style={S.card}>
          <PageHeader archetypeColor={archetype.color} />
          <ProgressBar pct={70} />
          <div style={S.phase}>Session Review</div>
          <h2 style={S.h2}>What we know so far.</h2>
          <div style={{ fontSize: 12, fontWeight: 700, color: archetype.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Customer complaints</div>
          <div style={{ ...S.summaryBox, marginBottom: 20 }}><MarkdownBlock text={complaints} /></div>
          <div style={{ fontSize: 12, fontWeight: 700, color: archetype.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Attack plan: {startupName}</div>
          <div style={{ ...S.summaryBox, marginBottom: 22 }}><MarkdownBlock text={attackPlan} /></div>
          <div style={S.row} className="cb-row"><button style={S.btnPrimary} onClick={() => go("defend_transition")}>Back to Defense →</button></div>
        </div>
      </div>
    );
  }

  // ── Defend intro ──────────────────────────────────────────────────────────────
  if (screen === "defend_intro") {
    return (
      <div style={S.wrap}>
        <style>{FONTS}</style>
        <div style={S.card}>
          <PageHeader />
          <ProgressBar pct={73} />
          <div style={S.phase}>Phase 3: Defend</div>
          <h2 style={S.h2}>Build your response with ERIC.</h2>
          <p style={S.body}>ERIC is a structured way to think across four dimensions. After each answer, a skeptic will challenge you.</p>
          <div className="cb-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 22 }}>
            {ERIC.map(e => (
              <div key={e.id} style={{ padding: "12px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 10 }}>
                <span style={{ color: "#00BCD4", fontWeight: 700, fontSize: 14 }}>{e.letter}: {e.title}</span>
                <p style={{ color: "#94a3b8", fontSize: 13, margin: "4px 0 0", lineHeight: 1.4 }}>{e.q}</p>
              </div>
            ))}
          </div>
          <div style={S.row} className="cb-row">
            <button style={S.btnPrimary} onClick={() => { setEricIndex(0); setEricInput(""); setEricSkeptic(null); go("eric_q"); }}>Start ERIC →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── ERIC (inline skeptic) ─────────────────────────────────────────────────────
  if (screen === "eric_q") {
    const e = ERIC[ericIndex];
    const isLast = ericIndex >= ERIC.length - 1;
    const submitted = ericSkeptic !== null;

    async function submitAndGetSkeptic() {
      if (!ericInput.trim()) return;
      const answer = ericInput.trim();
      const updated = { ...ericAnswers, [e.id]: answer };
      setEricAnswers(updated);
      setEricSkeptic("loading");
      const skepticPrompt = `A leadership team just answered this ERIC defense question:\n\nQuestion: ${e.title}: ${e.q}\nTheir answer: ${answer}\n\nContext: They are defending against this attack:\n${attackPlan}\n\nWrite ONE pointed skeptic reaction (1-2 sentences maximum). Start with "A skeptic would say:" Surface the gap, assumption, or avoidance. Be direct. No softening.`;
      const reaction = await callClaude([{ role: "user", content: skepticPrompt }], "You are a board-level advisor who has watched companies produce impressive defense plans that never got implemented. Find the gap in every answer. Blunt. One to two sentences only.");
      setEricSkeptic(reaction);
    }

    return (
      <div style={S.wrap}>
        <style>{FONTS}</style>
        <div style={S.card}>
          <PageHeader />
          <ProgressBar pct={75 + (ericIndex / ERIC.length) * 9} />
          <div style={S.phase}>Phase 3: ERIC · {ericIndex + 1} of 4</div>
          <div style={S.letterBadge}>{e.letter}</div>
          <h2 style={S.h2}>{e.title}: {e.q}</h2>
          <p style={S.hint}>{e.detail}</p>
          {!submitted ? (
            <>
              <textarea style={S.textarea} placeholder={e.hint} value={ericInput} onChange={ev => setEricInput(ev.target.value)} autoFocus />
              <div style={S.row} className="cb-row">
                {ericIndex === 0 && (
                  <button style={S.btnSecondary} onClick={() => go("defend_intro")}>← Back</button>
                )}
                {ericIndex > 0 && (
                  <button style={S.btnSecondary} onClick={() => { setEricSkeptic(null); setEricIndex(ericIndex - 1); setEricInput(ericAnswers[ERIC[ericIndex - 1].id] || ""); }}>← Back</button>
                )}
                <button style={{ ...S.btnPrimary, opacity: ericInput.trim() ? 1 : 0.4 }} onClick={submitAndGetSkeptic}>Submit →</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ padding: "12px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 10, marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: "#4a5568", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>Your answer</div>
                <p style={{ color: "#94a3b8", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{ericAnswers[e.id]}</p>
              </div>
              {ericSkeptic === "loading" ? (
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "rgba(239,68,68,0.06)", borderRadius: 12 }}>
                  <Spinner small /><span style={{ color: "#94a3b8", fontSize: 14 }}>A skeptic is reviewing your answer...</span>
                </div>
              ) : (
                <div style={S.skepticBox}>
                  <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Skeptic</div>
                  <p style={{ color: "#fca5a5", fontSize: 15, margin: 0, lineHeight: 1.65 }}>{ericSkeptic}</p>
                </div>
              )}
              {ericSkeptic && ericSkeptic !== "loading" && (
                <div style={S.row} className="cb-row">
                  <button style={S.btnPrimary} onClick={() => {
                    setEricSkeptic(null);
                    if (isLast) go("defend_ai_intro");
                    else { setEricIndex(ericIndex + 1); setEricInput(ericAnswers[ERIC[ericIndex + 1]?.id] || ""); }
                  }}>
                    {isLast ? "Finish ERIC →" : `Continue to ${ERIC[ericIndex + 1]?.title} →`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // ── Defend AI intro ───────────────────────────────────────────────────────────
  if (screen === "defend_ai_intro") {
    return (
      <div style={S.wrap}>
        <style>{FONTS}</style>
        <div style={S.card}>
          <PageHeader />
          <ProgressBar pct={86} />
          <div style={S.phase}>Phase 3: Stress Testing the Defense</div>
          <h2 style={S.h2}>Now let's find the weakest part.</h2>
          <p style={S.body}>AI will challenge your ERIC response with up to three questions, looking for where your defense is most likely to fail.</p>
          <p style={S.body}>Answer honestly. The goal is to find the gap before your attacker does.</p>
          <div style={S.row} className="cb-row"><button style={S.btnPrimary} onClick={() => go("defend_ai")}>Start AI Stress Test →</button></div>
        </div>
      </div>
    );
  }

  // ── Defend AI ─────────────────────────────────────────────────────────────────
  if (screen === "defend_ai") {
    return (
      <AIConversation
        robotIcon={robotIcon} phaseLabel="Phase 3: Defense Stress Test" progressPct={90}
        systemPrompt={archetype.defenseRole(startupName)}
        initialUserMessage={`Attack scenario:\n\n${attackPlan}\n\nEric defense:\n\n${ericSummary()}\n\nAI Readiness: ${aiReadiness}/5 — ${AI_READINESS_LABELS[aiReadiness - 1]}\n\nAsk up to three questions about our capabilities and constraints, one at a time, then identify the weakest part.`}
        maxQuestions={3} completeLabel="Generate 90-Day Plan"
        onComplete={convo => { setDefendConvo(convo); go("plan_generating"); }}
      />
    );
  }

  // ── Plan generating ───────────────────────────────────────────────────────────
  if (screen === "plan_generating") {
    const convo = defendConvo.map(h => (h.role === "ai" ? `AI: ${h.text}` : `Team: ${h.text}`)).join("\n\n");
    return (
      <AIGenerating
        robotIcon={robotIcon} phaseLabel="Phase 3: 90-Day Plan" progressPct={94}
        prompt={`A company is responding to an attack from "${startupName}" (${archetype.title}).\n\nAttack plan:\n${attackPlan}\n\nEric defense:\n${ericSummary()}\n\nStress test:\n${convo}\n\nDesign a 90-day first step. Format:\n**THE FIRST STEP:** [one sentence]\n**OWNER:** [who leads it]\n**WHAT DONE LOOKS LIKE:** [2-3 sentences]\n**WHY THIS FIRST:** [1-2 sentences]\n**BIGGEST RISK:** [what will derail it and how to manage it]`}
        systemPrompt="You are a board-level advisor who has seen leadership teams produce impressive defense plans that never got implemented. Concrete, direct, specific. No platitudes."
        loadingText="Designing your 90-day first step..."
        onComplete={result => { setActionPlan(result); go("plan_reveal"); }}
      />
    );
  }

  // ── Plan reveal ───────────────────────────────────────────────────────────────
  if (screen === "plan_reveal") {
    return (
      <div style={S.wrap}>
        <style>{FONTS}</style>
        <div style={S.card}>
          <PageHeader />
          <ProgressBar pct={97} />
          <div style={S.phase}>Phase 3: Your First Step</div>
          <h2 style={S.h2}>Your 90-day response plan.</h2>
          <div style={S.summaryBox}><MarkdownBlock text={actionPlan} /></div>
          <div style={{ ...S.discussionBox, marginTop: 4 }}>
            <p style={{ fontSize: 15, color: "#f8fafc", fontWeight: 600, margin: "0 0 8px" }}>Before you leave this room: assign the owner.</p>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: "0 0 12px" }}>Who is responsible for making the first step happen?</p>
            <input style={{ ...S.input, height: 50, fontSize: 16 }} placeholder="e.g. Jane Chen, Chief Digital Officer" value={planOwner} onChange={e => setPlanOwner(e.target.value)} />
          </div>
          <div style={S.row} className="cb-row">
            <button style={{ ...S.btnPrimary, opacity: planOwner.trim() ? 1 : 0.4 }} onClick={() => { if (planOwner.trim()) go("complete"); }}>Finish the Sprint →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Complete ──────────────────────────────────────────────────────────────────
  if (screen === "complete") {
    const tl = Math.round((likelihood + impact) / 2);
    const tc = tl >= 4 ? "#ef4444" : tl >= 3 ? "#f59e0b" : "#22c55e";
    const tLabel = tl >= 4 ? "High Threat" : tl >= 3 ? "Moderate Threat" : "Lower Threat";
    const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

    return (
      <div style={{ ...S.wrap, justifyContent: "flex-start", paddingTop: 48 }}>
        <style>{FONTS}
          {`details > summary { list-style: none; cursor: pointer; }
            details > summary::-webkit-details-marker { display: none; }
            details[open] summary .toggle-arrow { transform: rotate(90deg); }`}
        </style>
        <div style={{ ...S.card, maxWidth: 820 }}>
          <PageHeader />
          <ProgressBar pct={100} />

          {/* Hero */}
          <div style={{ textAlign: "center", padding: "8px 0 24px" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>✦</div>
            <h1 style={{ ...S.h1, textAlign: "center", marginBottom: 10 }}>Sprint complete.</h1>
            <p style={{ ...S.body, textAlign: "center", fontSize: 15, marginBottom: 0 }}>
              You have seen the attack, scored the threat, built a defense,<br />and named the person who makes the first move.
            </p>
          </div>
          <div style={S.divider} />

          {/* Summary bar */}
          <div className="cb-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
            {[
              ["Attacker", startupName, archetype.title, archetype.color],
              ["Threat Score", tLabel, `Likelihood ${likelihood}/5 · Impact ${impact}/5`, tc],
              ["First Step Owner", planOwner, "Check in: 30 days", "#f8fafc"],
            ].map(([label, main, sub, color]) => (
              <div key={label} style={{ padding: "12px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 10 }}>
                <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 14, color, fontWeight: 700, marginBottom: 2 }}>{main}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* 90-day plan — the focus */}
          <div style={{ fontSize: 12, color: "#22c55e", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Your 90-Day First Step</div>
          <div style={{ ...S.summaryBox, border: "1px solid rgba(34,197,94,0.25)", marginBottom: 20 }}>
            <MarkdownBlock text={actionPlan} />
          </div>

          {/* Closing line */}
          <div style={{ ...S.discussionBox, textAlign: "center", marginBottom: 8 }}>
            <p style={{ fontSize: 16, color: "#cbd5e1", margin: "0 0 4px" }}>The question is not whether the disruption is coming.</p>
            <p style={{ fontSize: 16, color: "#f8fafc", fontWeight: 600, margin: 0 }}>The question is whether you move before it arrives.</p>
          </div>
          <div style={{ fontSize: 13, color: "#4a5568", textAlign: "center", marginBottom: 24 }}>{today}</div>

          {/* Full session — collapsed by default */}
          <details style={{ marginBottom: 24 }}>
            <summary style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", fontSize: 14, color: "#94a3b8", fontWeight: 600, userSelect: "none" }}>
              <span className="toggle-arrow" style={{ display: "inline-block", transition: "transform 0.2s", fontSize: 12, color: "#64748b" }}>▶</span>
              View full session summary
            </summary>
            <div style={{ paddingTop: 16 }}>
              <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>What customers are saying</div>
              <div style={{ ...S.summaryBox, marginBottom: 18 }}><MarkdownBlock text={complaints} /></div>
              <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Attack plan: {startupName}</div>
              <div style={{ ...S.summaryBox, marginBottom: 18 }}><MarkdownBlock text={attackPlan} /></div>
              <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>ERIC Defense</div>
              <div className="cb-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {ERIC.map(e => (
                  <div key={e.id} style={{ padding: "12px 14px", background: "rgba(0,188,212,0.05)", border: "1px solid rgba(0,188,212,0.15)", borderRadius: 10 }}>
                    <div style={{ fontSize: 11, color: "#00BCD4", fontWeight: 700, marginBottom: 4 }}>{e.letter}: {e.title}</div>
                    <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>{ericAnswers[e.id] || "Not completed"}</p>
                  </div>
                ))}
              </div>
            </div>
          </details>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }} className="cb-row-center">
            <button style={{ ...S.btnPrimary, opacity: pdfGenerating ? 0.6 : 1, minWidth: 190 }} onClick={handleDownloadPDF} disabled={pdfGenerating}>
              {pdfGenerating ? "Generating PDF..." : "Download PDF Summary"}
            </button>
            <button style={S.btnSecondary} onClick={() => {
              setArchetypeId("startup");
              setBizAnswers({}); setBizQIndex(0); setBizInput("");
              setIndustry(""); setStartupName(""); setAiReadiness(3);
              setAttackerConvo([]); setComplaints(""); setAttackPlan("");
              setLikelihood(3); setImpact(3);
              setEricIndex(0); setEricAnswers({}); setEricInput(""); setEricSkeptic(null);
              setDefendConvo([]); setActionPlan(""); setPlanOwner("");
              setCodeInput(""); setCodeError(false);
              go("gate");
            }}>Run Another Sprint</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
