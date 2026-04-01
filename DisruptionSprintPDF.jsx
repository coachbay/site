import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";

// ── Fonts ──────────────────────────────────────────────────────────────────
// Using Helvetica (built-in to react-pdf) for reliable PDF generation.
// Custom woff2/ttf fonts cause glyph subsetting errors with dynamic content.
Font.registerHyphenationCallback(word => [word]);

// ── Colours ────────────────────────────────────────────────────────────────
const C = {
  cyan:       "#00BCD4",
  cyanDark:   "#0097A7",
  cyanLight:  "#E0F7FA",
  cyanBorder: "#80DEEA",
  navy:       "#1A1A2E",
  navyText:   "#1E293B",
  body:       "#334155",
  muted:      "#64748B",
  divider:    "#E2E8F0",
  bg:         "#F8FAFC",
  white:      "#FFFFFF",
  threatHigh: "#7F1D1D",
  threatMid:  "#92400E",
  threatLow:  "#166534",
};

// ── Styles ─────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: C.white,
    paddingTop: 0,
    paddingBottom: 32,
    paddingHorizontal: 0,
    fontSize: 9,
    color: C.body,
  },

  // Header band — top of every page
  headerBand: {
    backgroundColor: C.white,
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
  },
  headerLogo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  headerLogoText: {
    fontFamily: "Helvetica",
    fontWeight: 700,
    fontSize: 18,
    color: C.navy,
  },
  headerLogoAccent: {
    fontFamily: "Helvetica",
    fontWeight: 700,
    fontSize: 18,
    color: C.cyan,
  },
  headerDocLabel: {
    fontFamily: "Helvetica",
    fontWeight: 400,
    fontSize: 8,
    color: C.muted,
    letterSpacing: 0.8,
  },
  headerText: {
    fontFamily: "Helvetica",
    fontWeight: 700,
    fontSize: 7,
    color: C.white,
    letterSpacing: 1.2,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 14,
    left: 24,
    right: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderTopColor: C.divider,
    paddingTop: 6,
  },
  footerText: {
    fontFamily: "Helvetica",
    fontSize: 7,
    color: C.muted,
  },

  // Page content wrapper
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  // ── Cover page ──────────────────────────────────────────────────────────
  coverTitle: {
    fontFamily: "Helvetica",
    fontWeight: 700,
    fontSize: 28,
    color: C.navy,
    marginTop: 32,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  coverSubtitle: {
    fontFamily: "Helvetica",
    fontWeight: 700,
    fontSize: 18,
    color: C.cyan,
    marginBottom: 20,
  },
  divider: {
    borderBottomWidth: 0.75,
    borderBottomColor: C.divider,
    marginBottom: 18,
  },

  // Meta table
  metaRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  metaLabel: {
    fontFamily: "Helvetica",
    fontWeight: 700,
    fontSize: 7,
    color: C.muted,
    letterSpacing: 0.8,
    width: 80,
    paddingTop: 2,
  },
  metaValue: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: C.navyText,
    flex: 1,
  },

  // Threat badge
  threatBadge: {
    marginTop: 16,
    marginBottom: 28,
    alignSelf: "flex-start",
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  threatText: {
    fontFamily: "Helvetica",
    fontWeight: 700,
    fontSize: 9,
    color: C.white,
    letterSpacing: 1.2,
  },

  // Tagline block
  taglineBlock: {
    borderLeftWidth: 3,
    borderLeftColor: C.cyan,
    paddingLeft: 12,
    marginTop: 4,
  },
  taglineLine1: {
    fontFamily: "Helvetica",
    fontWeight: 400,
    fontStyle: "italic",
    fontSize: 11,
    color: C.muted,
    marginBottom: 4,
  },
  taglineLine2: {
    fontFamily: "Helvetica",
    fontWeight: 700,
    fontStyle: "italic",
    fontSize: 11,
    color: C.cyanDark,
  },

  // ── Section band ────────────────────────────────────────────────────────
  sectionBand: {
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
    marginTop: 4,
  },
  sectionBandText: {
    fontFamily: "Helvetica",
    fontWeight: 700,
    fontSize: 7.5,
    letterSpacing: 1,
  },

  // ── Card ────────────────────────────────────────────────────────────────
  card: {
    borderRadius: 5,
    borderWidth: 0.5,
    padding: 10,
    marginBottom: 8,
  },
  cardLabel: {
    fontFamily: "Helvetica",
    fontWeight: 700,
    fontSize: 8.5,
    marginBottom: 5,
  },
  cardBody: {
    fontFamily: "Helvetica",
    fontSize: 8.5,
    color: C.body,
    lineHeight: 1.55,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 2,
  },
  bulletDot: {
    fontSize: 8.5,
    color: C.cyanDark,
    marginRight: 5,
    marginTop: 1,
    lineHeight: 1.55,
  },
  bulletText: {
    fontFamily: "Helvetica",
    fontSize: 8.5,
    color: C.body,
    flex: 1,
    lineHeight: 1.55,
  },

  // Owner box
  ownerBox: {
    backgroundColor: C.bg,
    borderWidth: 0.5,
    borderColor: C.divider,
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ownerLabel: {
    fontFamily: "Helvetica",
    fontWeight: 700,
    fontSize: 7.5,
    color: C.cyanDark,
    letterSpacing: 0.5,
    marginRight: 8,
  },
  ownerValue: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: C.navyText,
  },
});

// ── Helpers ────────────────────────────────────────────────────────────────
function clean(text) {
  return (text || "")
    .replace(/#{1,4}\s+/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^---+$/gm, "")
    .replace(/ — /g, " - ").replace(/—/g, " - ")
    .replace(/ – /g, " - ").replace(/–/g, " - ")
    .replace(/→/g, "->")
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/…/g, "...")
    .trim();
}

function parseSegments(text) {
  const segments = [];
  for (const line of (text || "").split("\n")) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith("- ") || t.startsWith("* ")) {
      segments.push({ type: "bullet", content: clean(t.slice(2)) });
    } else {
      segments.push({ type: "text", content: clean(t) });
    }
  }
  return segments;
}

function parseComplaints(text) {
  let parts = text.split(/\*\*Complaint\s*\d+[^*]*\*\*:?/i).map(s => s.trim()).filter(Boolean);
  if (parts.length >= 2) return parts.slice(0, 3);
  parts = text.split(/\n(?=\d+[.)])/m).map(s => s.replace(/^\d+[.\)]\s*/, "").trim()).filter(Boolean);
  if (parts.length >= 2) return parts.slice(0, 3);
  parts = text.split(/\n\s*\n/).map(s => s.trim()).filter(s => s.length > 20);
  if (parts.length >= 2) return parts.slice(0, 3);
  return [text.trim()];
}

function parseSections(text) {
  const normalised = text
    .replace(/^---+$/gm, "")
    .replace(/^#{1,4}\s+(.+)$/gm, "HEADER::$1")
    .split("\n")
    .filter(l => l.trim());
  const sections = [];
  let label = "", body = "";
  for (const line of normalised) {
    if (line.startsWith("HEADER::")) {
      if (label) sections.push({ label, body: body.trim() });
      label = line.replace("HEADER::", "").trim(); body = "";
    } else if (/^\d+[.)]/.test(line) || (line.startsWith("**") && (line.endsWith("**") || line.includes(":**")))) {
      if (label) sections.push({ label, body: body.trim() });
      label = line.replace(/\*\*/g, "").replace(/^\d+[.]\s*/, "").trim(); body = "";
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      body += "- " + line.slice(2) + "\n";
    } else {
      body += " " + line;
    }
  }
  if (label) sections.push({ label, body: body.trim() });
  if (sections.length === 0) {
    return text.split(/\n\s*\n/).filter(s => s.trim().length > 10)
      .map((s, i) => ({ label: `Section ${i + 1}`, body: s.trim() }));
  }
  return sections;
}

// ── Sub-components ─────────────────────────────────────────────────────────
function HeaderBand({ docLabel }) {
  return (
    <View style={S.headerBand} fixed>
      <View style={S.headerLogo}>
        <Image src="/coachbay-robot-transparent.png" style={{ width: 22, height: 28, marginTop: -4 }} />
        <View style={{ flexDirection: "row" }}>
          <Text style={S.headerLogoText}>CoachBay</Text>
          <Text style={S.headerLogoAccent}>.ai</Text>
        </View>
      </View>
      <Text style={S.headerDocLabel}>{docLabel || ""}</Text>
    </View>
  );
}

function Footer({ date, pageLabel }) {
  return (
    <View style={S.footer} fixed>
      <Text style={S.footerText}>coachbay.ai  ·  Generated by CoachBay  ·  {date}</Text>
      <Text style={S.footerText}>{pageLabel || ""}</Text>
    </View>
  );
}

function SectionBand({ label, dark = false }) {
  return (
    <View style={[S.sectionBand, { backgroundColor: dark ? C.navy : C.cyan }]}>
      <Text style={[S.sectionBandText, { color: dark ? C.cyan : C.navy }]}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}

function Card({ label, body, accent = false }) {
  const segments = parseSegments(body);
  const bg       = accent ? C.cyanLight  : C.bg;
  const border   = accent ? C.cyanBorder : C.divider;
  const labelCol = C.cyanDark;

  return (
    <View style={[S.card, { backgroundColor: bg, borderColor: border }]}>
      <Text style={[S.cardLabel, { color: labelCol }]}>{clean(label)}</Text>
      {segments.map((seg, i) =>
        seg.type === "bullet" ? (
          <View key={i} style={S.bulletRow}>
            <Text style={S.bulletDot}>·</Text>
            <Text style={S.bulletText}>{seg.content}</Text>
          </View>
        ) : (
          <Text key={i} style={S.cardBody}>{seg.content}</Text>
        )
      )}
    </View>
  );
}

// ── Main document ──────────────────────────────────────────────────────────
export default function DisruptionSprintPDF({
  startupName, archetype, industry, likelihood, impact,
  complaints, attackPlan, ericAnswers, actionPlan, planOwner,
  ERIC,
}) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
  const threatLevel = Math.round((likelihood + impact) / 2);
  const threatLabel = threatLevel >= 4 ? "HIGH THREAT" : threatLevel >= 3 ? "MODERATE THREAT" : "LOWER THREAT";
  const threatColor = threatLevel >= 4 ? C.threatHigh : threatLevel >= 3 ? C.threatMid : C.threatLow;

  const complaintParts  = parseComplaints(complaints);
  const attackSections  = parseSections(attackPlan);
  const actionSections  = parseSections(actionPlan);

  return (
    <Document title={`Disruption Sprint — ${startupName}`} author="CoachBay">

      {/* ── COVER ─────────────────────────────────────────────────────── */}
      <Page size="A4" style={S.page}>
        <HeaderBand docLabel="DISRUPTION SPRINT" />
        <Footer date={today} />

        <View style={S.content}>
          <Text style={[S.coverTitle, { marginTop: 32, marginBottom: 4 }]}>Disruption Sprint Summary</Text>
          <Text style={S.coverSubtitle}>{clean(startupName)}</Text>
          <View style={S.divider} />

          {[
            ["ATTACKER TYPE",     archetype.title],
            ["INDUSTRY",          industry],
            ["THREAT SCORE",      `Likelihood ${likelihood}/5  ·  Impact ${impact}/5`],
            ["FIRST STEP OWNER",  planOwner],
            ["DATE",              today],
          ].map(([label, value]) => (
            <View key={label} style={S.metaRow}>
              <Text style={S.metaLabel}>{label}</Text>
              <Text style={S.metaValue}>{clean(value)}</Text>
            </View>
          ))}

          <View style={[S.threatBadge, { backgroundColor: threatColor }]}>
            <Text style={S.threatText}>{threatLabel}</Text>
          </View>

          <View style={S.taglineBlock}>
            <Text style={S.taglineLine1}>
              The question is not whether the disruption is coming.
            </Text>
            <Text style={S.taglineLine2}>
              The question is whether you move before it arrives.
            </Text>
          </View>
        </View>
      </Page>

      {/* ── PAGE 2: Complaints + Attack Plan ──────────────────────────── */}
      <Page size="A4" style={S.page}>
        <HeaderBand docLabel="DISRUPTION SPRINT" />
        <Footer date={today} pageLabel="Page 2" />

        <View style={S.content}>
          <SectionBand label="What Your Customers Are Already Saying" />
          {complaintParts.map((text, i) => (
            <Card key={i} label={`Complaint ${i + 1}`} body={text} accent={i % 2 === 0} />
          ))}

          <View style={{ marginTop: 14 }} />
          <SectionBand label={`Attack Plan: ${clean(startupName)}`} dark />
          {attackSections.map(({ label, body }, i) => (
            <Card key={i} label={label} body={body} accent={i % 2 !== 0} />
          ))}
        </View>
      </Page>

      {/* ── PAGE 3: ERIC + 90-Day Plan ────────────────────────────────── */}
      <Page size="A4" style={S.page}>
        <HeaderBand docLabel="DISRUPTION SPRINT" />
        <Footer date={today} pageLabel="Page 3" />

        <View style={S.content}>
          <SectionBand label="ERIC Defense Framework" dark />
          {ERIC.map((e, i) => (
            <Card
              key={e.id}
              label={`${e.letter} — ${e.title}`}
              body={ericAnswers[e.id] || "(not completed)"}
              accent={i % 2 === 0}
            />
          ))}

          <View style={{ marginTop: 14 }} />
          <SectionBand label="90-Day First Step" />
          {actionSections.map(({ label, body }, i) => (
            <Card key={i} label={label} body={body} accent={i % 2 !== 0} />
          ))}

          <View style={S.ownerBox}>
            <Text style={S.ownerLabel}>OWNER</Text>
            <Text style={S.ownerValue}>
              {clean(planOwner)}  ·  Next check-in: 30 days from {today}
            </Text>
          </View>
        </View>
      </Page>

    </Document>
  );
}
