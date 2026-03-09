from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import Flowable
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate
import datetime

# ── Brand colours ─────────────────────────────────────────────────────────────
CYAN      = colors.HexColor("#00BCD4")
NAVY      = colors.HexColor("#1A1A2E")
WHITE     = colors.white
MUTED     = colors.HexColor("#64748B")
BODY      = colors.HexColor("#334155")
DIVIDER   = colors.HexColor("#E2E8F0")
LABEL_BG  = colors.HexColor("#F1F5F9")
THREAT_BG = colors.HexColor("#7F1D1D")
BLUE_BG   = colors.HexColor("#1E40AF")
GREEN_BG  = colors.HexColor("#166534")
AMBER_BG  = colors.HexColor("#92400E")
CARD_CYAN_BG     = colors.HexColor("#E8F8FB")
CARD_CYAN_BORDER = colors.HexColor("#B2EBF2")
CARD_CYAN_LABEL  = colors.HexColor("#0097A7")
CARD_GREY_BG     = colors.HexColor("#F1F5F9")
CARD_GREY_BORDER = DIVIDER
CARD_GREEN_BG    = colors.HexColor("#F0FDF4")
CARD_GREEN_BORDER= colors.HexColor("#BBF7D0")
CARD_GREEN_LABEL = colors.HexColor("#166534")

W, H = A4
M = 16*mm
CW = W - 2*M
today = datetime.date.today().strftime("%-d %B %Y")

# ── Data ──────────────────────────────────────────────────────────────────────
STARTUP_NAME = "Pacific Devils"
ARCHETYPE    = "The Well-Funded Competitor"
INDUSTRY     = "Container shipping"
LIKELIHOOD   = 4
IMPACT       = 4
PLAN_OWNER   = "Bob Hope, COO"

COMPLAINTS = [
    ("Complaint 1",
     "I submitted a rate request to Swire on Monday for a full container to Samoa - nothing exotic, a route they've done a thousand times - and didn't hear back until Friday. By Friday, my customer had already booked with Maersk at a better price, and I'm left explaining to my sales team why we're not using our preferred carrier anymore. It's not that I want to leave Swire, but when Singapore takes a week to tell me what they can do, I've already solved the problem somewhere else."),
    ("Complaint 2",
     "Every time we negotiate a special rate with Swire, it feels like they're pricing in the cost of their own internal debate. They come back with a number that's not actually competitive - they're hedging their bets on margins, worrying about what it means for their other customers, checking with a general manager who's probably never seen a Fiji shipping lane in person. Meanwhile, the global carriers just say yes or no in 24 hours, even if their service sucks, because at least I know where I stand."),
    ("Complaint 3",
     "We're losing volume to Swire bit by bit, not all at once. We keep them on the remote routes where they actually know what they're doing - those little islands where CMA CGM doesn't show up half the time. But the main lanes to Auckland and Sydney? We're slowly moving those to Maersk because I can't justify paying a premium for a carrier that makes me wait a week to find out if we can even do a deal. It's death by a thousand rate requests."),
]

ATTACK_SECTIONS = [
    ("The Decision Swire Made (and Cannot Undo)",
     "Swire's pricing authority lives in Singapore HQ. Every quote outside the standard matrix requires human escalation, cross-functional sign-off, and margin review. This was rational when shipping moved slowly and customers accepted 5-7 day quote cycles."),
    ("Why We Get It Different",
     "We build probabilistic pricing into the core system from day one. Our AI learns Swire's historical pricing patterns, margin floors by route, and demand elasticity in real-time. We embed pricing authority at the edge - ops teams in Auckland, Sydney, and Fiji can generate and commit to a firm 4-hour quote with full margin protection, because the system has already validated it against live capacity, utilisation targets, and customer lifetime value."),
    ("The Downstream Effect",
     "Swire's structure is now a liability. They cannot decentralise pricing without losing control. This isn't a feature gap - it's an architectural gulf."),
    ("The Target Segment",
     "Mid-market shippers on remote island routes (Fiji, Samoa, Tonga, Vanuatu). Too small to negotiate directly with Maersk/CMA CGM. Too price-sensitive to pay Swire's premium. Currently split 60/40 between Swire (for coverage) and global carriers (for price). They lose 30-40% of deals waiting for Swire's week-long quote cycle."),
    ("The Play",
     "Offer 4-hour firm quotes, local presence in each major port, and pricing within 2-3% of global lines on remote routes. Lock in 12-18 month volume commitments at 5% discount to Swire's historical rates. Win 40-50 customers in Year 1, each pulling 2,000-5,000 TEU/year off Swire's base."),
    ("The Operational Edge",
     "Quote-to-Commitment: Swire takes 7 days (Singapore approval loop). Pacific Devils: 4 hours (AI-validated, ops team commits). Dynamic Capacity: Swire allocates space quarterly. We re-optimise weekly based on demand signals, running at 81% utilisation vs Swire's 73%. Customer Retention AI: flags churn risk automatically and offers 1-2% discount before the customer walks."),
    ("The 24-Month Path",
     "Months 1-6: Beachhead in Fiji. 8,000-12,000 TEU/month captured. Months 7-12: Expand to Samoa, Tonga, Sydney-Auckland. 35,000-45,000 TEU/month total. Months 13-18: $12-15M annual revenue hit to Swire. Months 19-24: 70,000-90,000 TEU/month, 4-ship fleet, PE sponsor sees path to $80-100M EBITDA."),
]

ERIC = [
    ("E - Eliminate", "Less back-and-forth with Singapore."),
    ("R - Reduce",    "Not sure."),
    ("I - Increase",  "Local infrastructure developments (ports, trucking) that complements the container shipping and builds stronger bonds with shippers."),
    ("C - Create",    "The infrastructure developments in the local ports - more comprehensive services onshore."),
]

PLAN_SECTIONS = [
    ("First Step: Map Your Customer Risk (Days 1-30)",
     "Owner: COO + CFO. Build a spreadsheet of your top 50 mid-market shippers on Pacific routes ranked by annual volume and margin, contract status, quote cycle friction, and switching risk. Conduct 15-20 phone calls with your top 25 at-risk customers asking: 'If a new competitor offered you a 4-hour quote, same service, 4% cheaper rate, and locked 18-month terms - what would make you stay with us?' You cannot design a defense that works until you know whether your moat is contractual (strong) or relational (fragile)."),
    ("Biggest Risk (Step 1)",
     "Your CFO can't pull the data fast because contract terms are scattered across legacy systems, or customer interviews surface that your relationships are weaker than you think and you panic into a reactive price-cut. Mitigation: Pre-call your CFO/legal team now. Brief your COO before the calls: 'We're doing discovery, not negotiation.' Expect the honest answer."),
    ("Second Step: Build the 24-Hour Quote Engine (Weeks 5-12)",
     "Owner: AI team lead + one regional ops manager. Build a simplified pricing algorithm for your 15-20 locked, highest-value customers on three Pacific lanes (Fiji, Samoa, Auckland-Sydney). Pilot with 5 customers. Document what breaks and why before you scale. Make the regional ops manager a co-owner of the AI design - they help build the model, not just use it."),
    ("Third Step: Defend the Three Most At-Risk Customers (Weeks 13-90)",
     "Owner: COO directly - not delegated. Identify your three most valuable locked customers who are also highest switching risk. For each, design a specific retention play: either a locked volume commitment + 2-3% rate discount for 18 months, or an expanded service package (dedicated ops contact, priority customs brokerage, 48-hour tracking guarantee). Close at least one before week 90. Before any negotiation, set a hard walk-away point on margin with your CFO."),
]

# ── Custom Flowables ───────────────────────────────────────────────────────────
class RobotIcon(Flowable):
    def __init__(self, x, y, size=28):
        Flowable.__init__(self)
        self.rx, self.ry, self.size = x, y, size

    def draw(self):
        c = self.canv
        s = self.size / 32
        cx, cy = self.rx, self.ry
        # Antenna
        c.setStrokeColor(CYAN); c.setLineWidth(1.2*s)
        c.line(cx, cy+12*s, cx, cy+17*s)
        c.setFillColor(CYAN); c.circle(cx, cy+18*s, 2*s, fill=1, stroke=0)
        # Body circle
        c.setFillColor(CYAN); c.circle(cx, cy, 11*s, fill=1, stroke=0)
        # Eyes
        c.setFillColor(WHITE); c.circle(cx-3.5*s, cy+1*s, 2.8*s, fill=1, stroke=0)
        c.circle(cx+3.5*s, cy+1*s, 2.8*s, fill=1, stroke=0)
        # Pupils
        c.setFillColor(NAVY); c.circle(cx-3.5*s, cy+1*s, 1.2*s, fill=1, stroke=0)
        c.circle(cx+3.5*s, cy+1*s, 1.2*s, fill=1, stroke=0)
        # Mouth
        c.setStrokeColor(NAVY); c.setLineWidth(0.8*s)
        c.line(cx-3*s, cy-4*s, cx+3*s, cy-4*s)

class ColorBand(Flowable):
    def __init__(self, label, bg=None, fg=None, width=None):
        Flowable.__init__(self)
        self.label = label
        self.bg = bg or CYAN
        self.fg = fg or NAVY
        self.width = width or CW
        self.height = 9*mm

    def wrap(self, *args):
        return self.width, self.height + 3*mm

    def draw(self):
        c = self.canv
        c.setFillColor(self.bg)
        c.roundRect(0, 0, self.width, self.height, 2*mm, fill=1, stroke=0)
        c.setFillColor(self.fg)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(4*mm, 3*mm, self.label.upper())

class CardBlock(Flowable):
    def __init__(self, label, body, bg, border, label_color, width=None):
        Flowable.__init__(self)
        self.label = label
        self.body = body
        self.bg = bg
        self.border = border
        self.label_color = label_color
        self.width = width or CW
        self._height = None

    def wrap(self, availW, availH):
        from reportlab.pdfbase.pdfmetrics import stringWidth
        tw = self.width - 8*mm
        # Estimate label lines
        lw = stringWidth(self.label, "Helvetica-Bold", 9)
        label_lines = max(1, int(lw / tw) + 1)
        # Estimate body lines
        bw = stringWidth(self.body, "Helvetica", 9)
        body_lines = max(1, int(bw / tw) + 1)
        self._height = (label_lines * 5*mm) + (body_lines * 5*mm) + 10*mm
        return self.width, self._height + 3*mm

    def draw(self):
        c = self.canv
        h = self._height
        c.setFillColor(self.bg)
        c.setStrokeColor(self.border)
        c.setLineWidth(0.5)
        c.roundRect(0, 0, self.width, h, 2*mm, fill=1, stroke=1)

        # Label
        c.setFillColor(self.label_color)
        c.setFont("Helvetica-Bold", 9)
        tw = self.width - 8*mm
        label_lines = self._wrap_text(self.label, "Helvetica-Bold", 9, tw)
        ty = h - 7*mm
        for line in label_lines:
            c.drawString(4*mm, ty, line)
            ty -= 5*mm

        # Body
        c.setFillColor(BODY)
        c.setFont("Helvetica", 8.5)
        body_lines = self._wrap_text(self.body, "Helvetica", 8.5, tw)
        ty -= 1*mm
        for line in body_lines:
            c.drawString(4*mm, ty, line)
            ty -= 4.8*mm

    def _wrap_text(self, text, font, size, max_width):
        from reportlab.pdfbase.pdfmetrics import stringWidth
        words = text.split()
        lines = []
        current = ""
        for word in words:
            test = (current + " " + word).strip()
            if stringWidth(test, font, size) <= max_width:
                current = test
            else:
                if current:
                    lines.append(current)
                current = word
        if current:
            lines.append(current)
        return lines

# ── Page templates ─────────────────────────────────────────────────────────────


def cover_header(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(CYAN)
    canvas.rect(0, H-14*mm, W, 14*mm, fill=1, stroke=0)
    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica-Bold", 7.5)
    canvas.drawString(M, H-8.5*mm, "COACHBAY.AI  -  DISRUPTION SPRINT")
    canvas.drawRightString(W-M, H-8.5*mm, today.upper())
    # Robot icon — top right of cover, below header band
    robot_path = "/home/claude/coachbay-push/public/coachbay-robot-transparent.png"
    # PNG is 1200x1562 — maintain aspect ratio
    rw = 18*mm
    rh = rw * (1562/1200)
    canvas.drawImage(robot_path, W-M-rw, H-14*mm-rh-6*mm, width=rw, height=rh, mask='auto')
    # Footer
    canvas.setFillColor(DIVIDER)
    canvas.setStrokeColor(DIVIDER)
    canvas.setLineWidth(0.4)
    canvas.line(M, 20*mm, W-M, 20*mm)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7)
    canvas.drawString(M, 16*mm, "Generated by CoachBay.ai  -  coachbay.ai")
    canvas.drawRightString(W-M, 16*mm, today)
    canvas.restoreState()

def inner_header(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(CYAN)
    canvas.rect(0, H-10*mm, W, 10*mm, fill=1, stroke=0)
    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica-Bold", 7)
    canvas.drawString(M, H-6.5*mm, "COACHBAY.AI  -  DISRUPTION SPRINT")
    canvas.drawRightString(W-M, H-6.5*mm, f"PAGE {doc.page}  -  {today.upper()}")
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7)
    canvas.drawString(M, 12*mm, "Generated by CoachBay.ai  -  coachbay.ai")
    canvas.drawRightString(W-M, 12*mm, today)
    canvas.restoreState()

# ── Styles ─────────────────────────────────────────────────────────────────────
styles = getSampleStyleSheet()

def S(name, **kw):
    return ParagraphStyle(name, **kw)

sTitle   = S("Title",   fontName="Helvetica-Bold",   fontSize=26, textColor=NAVY,  spaceAfter=10*mm)
sCyan    = S("Cyan",    fontName="Helvetica-Bold",   fontSize=17, textColor=CYAN,  spaceAfter=4*mm)
sMeta    = S("Meta",    fontName="Helvetica",        fontSize=9,  textColor=NAVY,  spaceAfter=2*mm)
sTagline = S("Tag",     fontName="Helvetica-Oblique",fontSize=11, textColor=MUTED, spaceAfter=3*mm)
sTagline2= S("Tag2",    fontName="Helvetica-BoldOblique",fontSize=11,textColor=colors.HexColor("#0097A7"),spaceAfter=0)
sBody    = S("Body",    fontName="Helvetica",        fontSize=9,  textColor=BODY,  spaceAfter=3*mm, leading=14)
sOwner   = S("Owner",   fontName="Helvetica-Bold",   fontSize=8.5,textColor=CARD_GREEN_LABEL, spaceAfter=0)

# ── Build story ────────────────────────────────────────────────────────────────
story = []

# ── COVER ─────────────────────────────────────────────────────────────────────
story.append(Spacer(1, 18*mm))
story.append(Paragraph("Disruption Sprint Summary", sTitle))
story.append(Paragraph(STARTUP_NAME, sCyan))
story.append(HRFlowable(width=CW, thickness=0.6, color=DIVIDER, spaceAfter=4*mm))

meta_rows = [
    ["ATTACKER TYPE", ARCHETYPE],
    ["INDUSTRY",      INDUSTRY],
    ["THREAT SCORE",  f"Likelihood {LIKELIHOOD}/5  -  Impact {IMPACT}/5"],
    ["FIRST STEP OWNER", PLAN_OWNER],
    ["DATE",          today],
]
for label, val in meta_rows:
    tbl = Table([[Paragraph(f'<font name="Helvetica-Bold" size="7" color="#64748B">{label}</font>', styles["Normal"]),
                  Paragraph(f'<font name="Helvetica" size="9" color="#1A1A2E">{val}</font>', styles["Normal"])]],
                colWidths=[42*mm, CW-42*mm])
    tbl.setStyle(TableStyle([
        ("BACKGROUND",  (0,0),(0,0), LABEL_BG),
        ("BOX",         (0,0),(0,0), 0.3, DIVIDER),
        ("ROUNDEDCORNERS", [1.5]),
        ("VALIGN",      (0,0),(-1,-1), "MIDDLE"),
        ("TOPPADDING",  (0,0),(-1,-1), 3),
        ("BOTTOMPADDING",(0,0),(-1,-1), 3),
        ("LEFTPADDING", (0,0),(0,0), 4),
        ("LEFTPADDING", (1,0),(1,0), 6),
    ]))
    story.append(tbl)
    story.append(Spacer(1, 1.5*mm))

story.append(Spacer(1, 3*mm))

# Threat badge
threat_tbl = Table([[Paragraph(f'<font name="Helvetica-Bold" size="9.5" color="white">HIGH THREAT</font>', styles["Normal"]), ""]],
                   colWidths=[42*mm, CW-42*mm])
threat_tbl.setStyle(TableStyle([
    ("BACKGROUND",    (0,0),(0,0), THREAT_BG),
    ("ROUNDEDCORNERS",[2]),
    ("ALIGN",         (0,0),(0,0), "LEFT"),
    ("VALIGN",        (0,0),(-1,-1), "MIDDLE"),
    ("TOPPADDING",    (0,0),(0,0), 4),
    ("BOTTOMPADDING", (0,0),(0,0), 4),
    ("LEFTPADDING",   (0,0),(0,0), 6),
    ("BACKGROUND",    (1,0),(1,0), WHITE),
]))
story.append(threat_tbl)
# Robot icon on cover — drawn via canvas callback, so we embed as a drawn table cell trick
# Use a fixed-position draw via cover_header instead
story.append(Spacer(1, 55*mm))
story.append(Paragraph("The question is not whether the disruption is coming.", sTagline))
story.append(Paragraph("The question is whether you move before it arrives.", sTagline2))

story.append(PageBreak())

# ── PAGE 2: Complaints ────────────────────────────────────────────────────────
story.append(ColorBand("What Your Customers Are Already Saying", CYAN, NAVY))
story.append(Spacer(1, 2*mm))
for label, body in COMPLAINTS:
    story.append(CardBlock(label, body, CARD_CYAN_BG, CARD_CYAN_BORDER, CARD_CYAN_LABEL))
    story.append(Spacer(1, 1*mm))

story.append(Spacer(1, 4*mm))
story.append(ColorBand(f"Attack Plan: {STARTUP_NAME}", NAVY, CYAN))
story.append(Spacer(1, 2*mm))

for label, body in ATTACK_SECTIONS:
    story.append(CardBlock(label, body, CARD_GREY_BG, CARD_GREY_BORDER, CARD_CYAN_LABEL))
    story.append(Spacer(1, 1*mm))

story.append(PageBreak())

# ── PAGE 3: ERIC + 90-Day Plan ───────────────────────────────────────────────
story.append(ColorBand("ERIC Defense Framework", BLUE_BG, WHITE))
story.append(Spacer(1, 2*mm))

eric_palettes = [
    (colors.HexColor("#EFF6FF"), colors.HexColor("#BFDBFE"), colors.HexColor("#1E40AF")),
    (CARD_CYAN_BG, CARD_CYAN_BORDER, CARD_CYAN_LABEL),
    (CARD_GREEN_BG, CARD_GREEN_BORDER, CARD_GREEN_LABEL),
    (colors.HexColor("#FFFBEB"), colors.HexColor("#FDE68A"), AMBER_BG),
]
for i, (label, body) in enumerate(ERIC):
    bg, border, lc = eric_palettes[i]
    story.append(CardBlock(label, body, bg, border, lc))
    story.append(Spacer(1, 1*mm))

story.append(Spacer(1, 4*mm))
story.append(ColorBand("90-Day First Step", GREEN_BG, WHITE))
story.append(Spacer(1, 2*mm))

for label, body in PLAN_SECTIONS:
    story.append(CardBlock(label, body, CARD_GREEN_BG, CARD_GREEN_BORDER, CARD_GREEN_LABEL))
    story.append(Spacer(1, 1*mm))

story.append(Spacer(1, 3*mm))
owner_tbl = Table([[Paragraph(f'<font name="Helvetica-Bold" size="8.5" color="#166534">Owner: {PLAN_OWNER}   -   Next check-in: 30 days from {today}</font>', styles["Normal"])]],
                  colWidths=[CW])
owner_tbl.setStyle(TableStyle([
    ("BACKGROUND",    (0,0),(0,0), CARD_GREEN_BG),
    ("BOX",           (0,0),(0,0), 0.6, CARD_GREEN_BORDER),
    ("ROUNDEDCORNERS",[1.5]),
    ("TOPPADDING",    (0,0),(0,0), 5),
    ("BOTTOMPADDING", (0,0),(0,0), 5),
    ("LEFTPADDING",   (0,0),(0,0), 6),
]))
story.append(owner_tbl)

# ── Build doc ─────────────────────────────────────────────────────────────────
cover_frame = Frame(M, 22*mm, CW, H-14*mm-22*mm, id="cover")
inner_frame = Frame(M, 18*mm, CW, H-10*mm-18*mm, id="inner")

doc = BaseDocTemplate(
    "/mnt/user-data/outputs/disruption-sprint-pacific-devils.pdf",
    pagesize=A4,
    leftMargin=M, rightMargin=M, topMargin=14*mm, bottomMargin=22*mm,
)
doc.addPageTemplates([
    PageTemplate(id="cover", frames=[cover_frame], onPage=cover_header),
    PageTemplate(id="inner", frames=[inner_frame], onPage=inner_header),
])
story.insert(0, __import__("reportlab.platypus", fromlist=["NextPageTemplate"]).NextPageTemplate("inner"))
story.insert(0, __import__("reportlab.platypus", fromlist=["NextPageTemplate"]).NextPageTemplate("cover"))

# Fix: set cover for page 1, switch to inner after first PageBreak
from reportlab.platypus import NextPageTemplate
story = [NextPageTemplate("cover")] + story

# Insert template switch before first PageBreak
for i, item in enumerate(story):
    if isinstance(item, PageBreak):
        story.insert(i, NextPageTemplate("inner"))
        break

doc.build(story)
print("PDF generated OK")
