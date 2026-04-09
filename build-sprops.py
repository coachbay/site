# SPROPS AI Training Overview PDF generator
# Run with: python3 build-sprops.py
# Generates: public/CoachBay_SPROPS_AI_Training_Overview.pdf

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
import textwrap

W, H = A4
MARGIN = 20 * mm
CONTENT_W = W - 2 * MARGIN
CYAN = colors.HexColor("#00BCD4")
CYAN_DARK = colors.HexColor("#0097A7")
CYAN_LIGHT = colors.HexColor("#E0F7FA")
CYAN_BORDER = colors.HexColor("#80DEEA")
NAVY = colors.HexColor("#1A1A2E")
BODY = colors.HexColor("#334155")
MUTED = colors.HexColor("#64748B")
DIVIDER = colors.HexColor("#E2E8F0")
BG = colors.HexColor("#F8FAFC")
WHITE = colors.white
TEAL = colors.HexColor("#00897B")
TEAL_LIGHT = colors.HexColor("#E0F2F1")
GREEN = colors.HexColor("#2E7D32")
GREEN_LIGHT = colors.HexColor("#E8F5E9")
INDIGO = colors.HexColor("#283593")
INDIGO_LIGHT = colors.HexColor("#E8EAF6")

ROBOT = "public/coachbay-robot-transparent.png"
ROBOT_H = 10 * mm
ROBOT_W = ROBOT_H * 0.768
HEADER_H = 18 * mm
DOC_LABEL = "AI Training Overview  |  April 2026"
OUTPUT = "public/CoachBay_SPROPS_AI_Training_Overview.pdf"

# ── shared helpers ──────────────────────────────────────────────

def draw_header(c):
    c.setFillColor(WHITE)
    c.rect(0, H - HEADER_H, W, HEADER_H, fill=1, stroke=0)
    c.setStrokeColor(DIVIDER); c.setLineWidth(0.4)
    c.line(0, H - HEADER_H, W, H - HEADER_H)
    text_y = H - HEADER_H / 2 - 1.5 * mm
    robot_y = H - HEADER_H + (HEADER_H - ROBOT_H) / 2 + 1.41 * mm
    c.drawImage(ROBOT, MARGIN, robot_y, width=ROBOT_W, height=ROBOT_H, mask='auto')
    c.setFont("Helvetica-Bold", 13); c.setFillColor(NAVY)
    c.drawString(MARGIN + ROBOT_W + 2.5 * mm, text_y, "CoachBay")
    cb_w = c.stringWidth("CoachBay", "Helvetica-Bold", 13)
    c.setFillColor(CYAN)
    c.drawString(MARGIN + ROBOT_W + 2.5 * mm + cb_w, text_y, ".ai")
    c.setFont("Helvetica", 7.5); c.setFillColor(MUTED)
    c.drawRightString(W - MARGIN, text_y, DOC_LABEL)

def draw_page_footer(c, page_num, total=3):
    c.setStrokeColor(DIVIDER); c.setLineWidth(0.4)
    c.line(MARGIN, 14 * mm, W - MARGIN, 14 * mm)
    c.setFont("Helvetica", 7); c.setFillColor(MUTED)
    c.drawString(MARGIN, 9 * mm, "coachbay.ai")
    c.drawRightString(W - MARGIN, 9 * mm, f"Page {page_num} of {total}")

def draw_section_title(c, y, text, size=14):
    c.setFont("Helvetica-Bold", size); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, text)
    return y - 8 * mm

def draw_body_text(c, y, text, wrap_w=95, font_size=9):
    c.setFont("Helvetica", font_size); c.setFillColor(BODY)
    for line in textwrap.wrap(text, wrap_w):
        c.drawString(MARGIN, y, line); y -= 4.5 * mm
    return y

# ── PAGE 1 ──────────────────────────────────────────────────────

def build_page1(c):
    draw_header(c)
    draw_page_footer(c, 1)

    y = H - HEADER_H - 18 * mm

    # Title
    c.setFont("Helvetica-Bold", 24); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "AI Training for Swire Properties")
    y -= 8 * mm
    c.setFont("Helvetica", 11); c.setFillColor(MUTED)
    c.drawString(MARGIN, y, "Building AI fitness from strategy to daily practice")
    y -= 7 * mm

    # cyan divider
    c.setStrokeColor(CYAN); c.setLineWidth(2)
    c.line(MARGIN, y, MARGIN + 40 * mm, y)
    y -= 10 * mm

    # Intro paragraph
    intro = (
        "SPROPS has built strong foundations: 20+ AI initiatives delivered since 2024, "
        "a digital curriculum launched across the organisation, and 100+ new initiatives "
        "now proposed by Directors for 2026. The focus areas are clear: Operating "
        "Effectiveness, Deeper Insights, and New Digital Propositions. The goal is not "
        "AI adoption. The goal is better business through better decisions, better "
        "leadership, and better outcomes for your people. AI is how you get there "
        "faster. Our approach focuses on using AI as a thinking partner, not just a "
        "productivity tool, at every level of the organisation."
    )
    c.setFont("Helvetica", 9); c.setFillColor(BODY)
    for line in textwrap.wrap(intro, 120):
        c.drawString(MARGIN, y, line); y -= 4.5 * mm
    y -= 6 * mm

    # Five Workshops heading
    c.setFont("Helvetica-Bold", 16); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "Five Workshops. One Journey.")
    y -= 6 * mm
    c.setFont("Helvetica", 9); c.setFillColor(MUTED)
    c.drawString(MARGIN, y, "Mapped to SPROPS audience segments, from strategic direction to daily practice.")
    y -= 10 * mm

    # ── Diagram: 3 audience tiers with 5 workshop boxes ──
    left_col_w = 38 * mm      # audience labels
    box_x = MARGIN + left_col_w + 4 * mm
    box_w = CONTENT_W - left_col_w - 4 * mm
    box_h = 16 * mm
    gap = 4 * mm

    # Tier 1: Senior Leaders (teal)
    tier1_y = y
    c.setFont("Helvetica-Bold", 9); c.setFillColor(TEAL)
    c.drawString(MARGIN, tier1_y - 5 * mm, "Senior Leaders")
    c.setFont("Helvetica", 7.5); c.setFillColor(MUTED)
    c.drawString(MARGIN, tier1_y - 9 * mm, "DTCs and Directors")

    # Box: The AI Manifesto
    c.setFillColor(TEAL_LIGHT); c.setStrokeColor(TEAL); c.setLineWidth(0.5)
    c.roundRect(box_x, tier1_y - box_h, box_w, box_h, 3, fill=1, stroke=1)
    c.setFont("Helvetica-Bold", 10); c.setFillColor(NAVY)
    c.drawString(box_x + 4 * mm, tier1_y - 6 * mm, "The AI Manifesto")
    c.setFont("Helvetica", 8); c.setFillColor(BODY)
    c.drawString(box_x + 4 * mm, tier1_y - 11.5 * mm, "Write the enterprise AI manifesto. Set the direction.")

    y = tier1_y - box_h - gap

    # Tier 2: Senior Managers (green)
    tier2_y = y
    c.setFont("Helvetica-Bold", 9); c.setFillColor(GREEN)
    c.drawString(MARGIN, tier2_y - 5 * mm, "Senior Managers")
    c.setFont("Helvetica", 7.5); c.setFillColor(MUTED)
    c.drawString(MARGIN, tier2_y - 9 * mm, "DTCs and GMs")

    # Box: AI Leadership Sprint
    c.setFillColor(GREEN_LIGHT); c.setStrokeColor(GREEN); c.setLineWidth(0.5)
    c.roundRect(box_x, tier2_y - box_h, box_w, box_h, 3, fill=1, stroke=1)
    c.setFont("Helvetica-Bold", 10); c.setFillColor(NAVY)
    c.drawString(box_x + 4 * mm, tier2_y - 6 * mm, "AI Leadership Sprint")
    c.setFont("Helvetica", 8); c.setFillColor(BODY)
    c.drawString(box_x + 4 * mm, tier2_y - 11.5 * mm, "Build AI leadership habits. Turn personal use into team wide impact.")

    y = tier2_y - box_h - gap

    # Box: AI Strategy Sprint
    c.setFillColor(GREEN_LIGHT); c.setStrokeColor(GREEN); c.setLineWidth(0.5)
    c.roundRect(box_x, y - box_h, box_w, box_h, 3, fill=1, stroke=1)
    c.setFont("Helvetica-Bold", 10); c.setFillColor(NAVY)
    c.drawString(box_x + 4 * mm, y - 6 * mm, "AI Strategy Sprint")
    c.setFont("Helvetica", 8); c.setFillColor(BODY)
    c.drawString(box_x + 4 * mm, y - 11.5 * mm, "Learn to think strategically about AI. Not just which buttons to click.")

    y = y - box_h - gap

    # Tier 3: Frontline (indigo)
    tier3_y = y
    c.setFont("Helvetica-Bold", 9); c.setFillColor(INDIGO)
    c.drawString(MARGIN, tier3_y - 5 * mm, "Frontline")
    c.setFont("Helvetica", 7.5); c.setFillColor(MUTED)
    c.drawString(MARGIN, tier3_y - 9 * mm, "Change Agents and")
    c.drawString(MARGIN, tier3_y - 12.5 * mm, "wider SPROPS")

    # Box: AI Core Sprint
    c.setFillColor(INDIGO_LIGHT); c.setStrokeColor(INDIGO); c.setLineWidth(0.5)
    c.roundRect(box_x, tier3_y - box_h, box_w, box_h, 3, fill=1, stroke=1)
    c.setFont("Helvetica-Bold", 10); c.setFillColor(NAVY)
    c.drawString(box_x + 4 * mm, tier3_y - 6 * mm, "AI Core Sprint")
    c.setFont("Helvetica", 8); c.setFillColor(BODY)
    c.drawString(box_x + 4 * mm, tier3_y - 11.5 * mm, "Build daily AI skills. Use AI as a thinking partner, not just a search engine.")

    y = tier3_y - box_h - gap

    # Box: Cut & Create Sprint
    c.setFillColor(INDIGO_LIGHT); c.setStrokeColor(INDIGO); c.setLineWidth(0.5)
    c.roundRect(box_x, y - box_h, box_w, box_h, 3, fill=1, stroke=1)
    c.setFont("Helvetica-Bold", 10); c.setFillColor(NAVY)
    c.drawString(box_x + 4 * mm, y - 6 * mm, "Cut & Create Sprint")
    c.setFont("Helvetica", 8); c.setFillColor(BODY)
    c.drawString(box_x + 4 * mm, y - 11.5 * mm, "Identify what to stop, what to start, what to amplify.")

    y = y - box_h - gap

    # Vertical dashed arrow label: "Direction flows down, capability builds up"
    arrow_x = box_x - 6 * mm
    arrow_top = tier1_y - 2 * mm
    arrow_bot = y + box_h + 2 * mm
    c.saveState()
    c.setStrokeColor(MUTED); c.setLineWidth(0.5); c.setDash(2, 2)
    c.line(arrow_x, arrow_top, arrow_x, arrow_bot)
    c.restoreState()
    # Arrow head at bottom
    c.setFillColor(MUTED)
    c.drawString(arrow_x - 1 * mm, arrow_bot - 2 * mm, "\u25BC")
    # Rotated text
    c.saveState()
    c.translate(arrow_x - 3 * mm, (arrow_top + arrow_bot) / 2)
    c.rotate(90)
    c.setFont("Helvetica", 6.5); c.setFillColor(MUTED)
    c.drawCentredString(0, 0, "Direction flows down, capability builds up")
    c.restoreState()

    y -= 4 * mm

    # Italic footnote
    c.setFont("Helvetica-Oblique", 9); c.setFillColor(MUTED)
    note = (
        "The AI Manifesto is a full day workshop (~7 hours). All sprints are standalone "
        "half day sessions (3 to 4 hours). They can be delivered individually or as a "
        "connected sequence. All workshops are hands on and practical, designed for "
        "groups of 8 to 20 people."
    )
    for line in textwrap.wrap(note, 120):
        c.drawString(MARGIN, y, line); y -= 4.5 * mm
    y -= 5 * mm

    # How this connects box
    box_top = y
    c.setFillColor(CYAN_LIGHT); c.setStrokeColor(CYAN_BORDER); c.setLineWidth(0.5)
    # Draw left accent bar
    accent_w = 3 * mm

    # Content for the box
    connect_title = "How this connects to SPROPS priorities"
    connect_body = (
        "Gartner frames AI value as three business cases: Defend (Return on Employee), "
        "Extend (Return on Investment), and Upend (Return on Future). SPROPS\u2019s 100+ "
        "initiatives are heavily weighted toward Operating Effectiveness (Defend). There "
        "is a push to increase ROI through deeper insights and process gains. But the "
        "foundation of all three is ROE: giving your people great tools, great training, "
        "and the skills to use them. That is where these workshops live. The AI Manifesto "
        "sets the direction (all three). The Leadership Sprint equips leaders to drive all "
        "three through the Three Buckets exercise. The remaining Sprints build daily "
        "capability (ROE). Cut & Create moves teams into new value creation (ROI)."
    )
    wrapped_body = textwrap.wrap(connect_body, 112)
    box_inner_h = (7 + len(wrapped_body) * 4.5 + 6) * mm
    c.roundRect(MARGIN, box_top - box_inner_h, CONTENT_W, box_inner_h, 3, fill=1, stroke=1)
    # Accent bar
    c.setFillColor(CYAN); c.setStrokeColor(CYAN)
    c.roundRect(MARGIN, box_top - box_inner_h, accent_w, box_inner_h, 3, fill=1, stroke=0)

    ty = box_top - 6 * mm
    c.setFont("Helvetica-Bold", 9); c.setFillColor(NAVY)
    c.drawString(MARGIN + accent_w + 3 * mm, ty, connect_title)
    ty -= 6 * mm
    c.setFont("Helvetica", 9); c.setFillColor(BODY)
    for line in wrapped_body:
        c.drawString(MARGIN + accent_w + 3 * mm, ty, line); ty -= 4.5 * mm


# ── PAGE 2 ──────────────────────────────────────────────────────

WORKSHOPS = [
    {
        "num": "1",
        "name": "The AI Manifesto",
        "audience": "C-Level executives and Senior Leaders (8 to 15 people)",
        "description": (
            "A focused full day workshop (~7 hours) where your leadership team writes "
            "a draft AI manifesto: a clear statement of what AI means to this organisation, "
            "what you expect from your people, and how you will invest. The workshop covers "
            "vision, strategy, culture, ownership, governance, guardrails, and budget. This "
            "is not a policy document. It is a call to action. Section AI data shows only "
            "10% of companies have one. Those that do see dramatically higher adoption."
        ),
        "takeaways": [
            "Draft AI manifesto (2 to 4 pages) covering vision, strategy, culture, governance, guardrails, and budget",
            "Three Buckets clarity: what to cut, what to create, what to amplify",
            "Cultural norms: what you tolerate, what you reward, where the hard lines are",
            "Clear ownership and guardrails: who runs it, how it gets updated, what gets funded, and what stays off limits",
        ],
    },
    {
        "num": "2",
        "name": "AI Leadership Sprint",
        "audience": "DTCs and senior managers / GMs (10 to 20 people)",
        "description": (
            "A half day workshop that holds up a mirror, then builds habits. Participants "
            "start with the AI Leader Assessment (26 questions, 6 dimensions) to see where "
            "they really stand as AI leaders. Then they work through the identity shift: from "
            "'a leader who sometimes uses AI' to 'an AI leader.' Research shows that when "
            "leaders actively model AI use, team adoption jumps from 15% to 55%. The sprint "
            "includes a Three Buckets exercise for leaders to map what their teams should cut, "
            "create, and amplify, then turns these insights into a personal leadership contract."
        ),
        "takeaways": [
            "AI Leader Assessment results: personal shape across 6 dimensions",
            "Three Buckets map: what your team should cut, create, and amplify",
            "Personal AI operating model mapped to five leadership areas",
            "Three committed AI leadership habits for the next 90 days",
        ],
    },
    {
        "num": "3",
        "name": "AI Strategy Sprint",
        "audience": "DTCs, senior managers, GMs (15 to 20 people)",
        "description": (
            "A half day workshop using CoachBay\u2019s 4D Framework (Define, Discover, Debate, "
            "Deliver) to build strategic AI thinking. Participants work through real business "
            "challenges, not abstract scenarios. They learn to evaluate where AI adds value, "
            "where it does not, and how to make better decisions about AI investment and priorities."
        ),
        "takeaways": [
            "Strategic thinking skills: evaluate AI opportunities with judgement, not hype",
            "Practice with the CRIT framework for challenging AI outputs",
            "A personal AI strategy connected to their role and department goals",
            "Confidence to lead AI conversations with their teams",
        ],
    },
    {
        "num": "4",
        "name": "AI Core Sprint",
        "audience": "Change Agents, wider SPROPS staff (15 to 20 people)",
        "description": (
            "The hands on skills workshop. Participants learn the 5 AI Employee roles "
            "(Assistant, Expert, Coach, Creative, Conductor) and practice each one using "
            "their actual work. This is not prompting training. It is teaching people to "
            "think about AI as a colleague with five different skill sets, then use the "
            "right one for the right task."
        ),
        "takeaways": [
            "Practical experience with all 5 AI Employee roles using real work",
            "A personal AI action plan: three things to start doing differently this week",
            "Understanding the difference between using AI and thinking with AI",
            "Confidence to experiment with AI tools already available at SPROPS",
        ],
    },
    {
        "num": "5",
        "name": "Cut & Create Sprint",
        "audience": "Change Agents, wider SPROPS staff (15 to 20 people)",
        "description": (
            "Two structured exercises using CoachBay\u2019s original canvas tools. The 9R Deletion "
            "Audit helps teams identify work to stop doing or hand to AI (the Cut). The 9P "
            "Digital Project Canvas helps teams define new, higher value work to start (the "
            "Create). Together, they ensure AI adoption is not just about efficiency but about "
            "building something new."
        ),
        "takeaways": [
            "Completed Deletion Audit: specific work items identified for AI handover",
            "Completed Project Canvas: a new initiative scoped from person to prototype",
            "The two sides of AI adoption in one session: stop and start with intention",
            "Practical tools teams can reuse for every new AI initiative",
        ],
    },
]

def draw_workshop_card(c, y, ws):
    """Draw a single workshop card, returns y after the card."""
    inner_pad = 4 * mm
    text_x = MARGIN + inner_pad
    text_w = CONTENT_W - 2 * inner_pad
    wrap_chars = 115

    # Pre-calculate height
    desc_lines = textwrap.wrap(ws["description"], wrap_chars)
    takeaway_lines = sum(len(textwrap.wrap(t, wrap_chars - 4)) for t in ws["takeaways"])
    card_h = (
        8       # top pad + number/title
        + 6     # audience line
        + len(desc_lines) * 4.5 + 4   # description
        + 6     # "THEY LEAVE WITH" label
        + takeaway_lines * 4.5 + len(ws["takeaways"]) * 1.5
        + 6     # bottom pad
    ) * mm

    # Card background
    c.setFillColor(BG); c.setStrokeColor(DIVIDER); c.setLineWidth(0.4)
    c.roundRect(MARGIN, y - card_h, CONTENT_W, card_h, 4, fill=1, stroke=1)

    ty = y - 7 * mm

    # Number badge
    badge_r = 4 * mm
    badge_x = text_x + badge_r
    badge_y = ty + 1 * mm
    c.setFillColor(CYAN)
    c.circle(badge_x, badge_y, badge_r, fill=1, stroke=0)
    c.setFont("Helvetica-Bold", 9); c.setFillColor(WHITE)
    c.drawCentredString(badge_x, badge_y - 1.2 * mm, ws["num"])

    # Title
    c.setFont("Helvetica-Bold", 13); c.setFillColor(NAVY)
    c.drawString(text_x + badge_r * 2 + 3 * mm, ty - 1 * mm, ws["name"])
    ty -= 8 * mm

    # Audience
    c.setFont("Helvetica-Bold", 9); c.setFillColor(CYAN_DARK)
    c.drawString(text_x, ty, "AUDIENCE: ")
    aud_w = c.stringWidth("AUDIENCE: ", "Helvetica-Bold", 9)
    c.setFont("Helvetica", 9); c.setFillColor(BODY)
    c.drawString(text_x + aud_w, ty, ws["audience"])
    ty -= 7 * mm

    # Description
    c.setFont("Helvetica", 9); c.setFillColor(BODY)
    for line in desc_lines:
        c.drawString(text_x, ty, line); ty -= 4.5 * mm
    ty -= 4 * mm

    # THEY LEAVE WITH
    c.setFont("Helvetica-Bold", 9); c.setFillColor(CYAN_DARK)
    c.drawString(text_x, ty, "THEY LEAVE WITH:")
    ty -= 6 * mm

    # Bullet items
    for item in ws["takeaways"]:
        lines = textwrap.wrap(item, wrap_chars - 6)
        first = True
        for line in lines:
            if first:
                c.setFont("Helvetica-Bold", 9); c.setFillColor(CYAN)
                c.drawString(text_x, ty, "\u2022"); first = False
            c.setFont("Helvetica", 9); c.setFillColor(BODY)
            c.drawString(text_x + 5 * mm, ty, line); ty -= 4.5 * mm
        ty -= 1.5 * mm

    return y - card_h - 5 * mm


def build_page2(c):
    draw_header(c)
    draw_page_footer(c, 2)
    y = H - HEADER_H - 14 * mm

    c.setFont("Helvetica-Bold", 18); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "Workshop Details")
    y -= 10 * mm

    # Workshops 1, 2, 3
    for ws in WORKSHOPS[:3]:
        y = draw_workshop_card(c, y, ws)


def build_page3(c):
    draw_header(c)
    draw_page_footer(c, 3)
    y = H - HEADER_H - 14 * mm

    c.setFont("Helvetica-Bold", 18); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "Workshop Details (continued)")
    y -= 10 * mm

    # Workshops 4, 5
    for ws in WORKSHOPS[3:]:
        y = draw_workshop_card(c, y, ws)

    y -= 4 * mm

    # Suggested Next Step box
    next_step = (
        "We recommend starting with The AI Manifesto for senior leaders to set strategic "
        "direction, followed by the AI Leadership Sprint to equip senior managers "
        "with the habits to lead the change. The Strategy Sprint deepens strategic "
        "thinking for senior managers. Core Sprint builds capability across Change "
        "Agents and wider staff. The Cut & Create Sprint can run alongside or after "
        "the Core Sprint to move from skills to action. Each workshop stands alone, "
        "but the full sequence creates lasting organisational change."
    )
    wrapped = textwrap.wrap(next_step, 108)
    box_h = (8 + len(wrapped) * 4.5 + 6) * mm

    c.setFillColor(CYAN_LIGHT); c.setStrokeColor(CYAN_BORDER); c.setLineWidth(0.5)
    accent_w = 3 * mm
    c.roundRect(MARGIN, y - box_h, CONTENT_W, box_h, 3, fill=1, stroke=1)
    c.setFillColor(CYAN); c.setStrokeColor(CYAN)
    c.roundRect(MARGIN, y - box_h, accent_w, box_h, 3, fill=1, stroke=0)

    ty = y - 6 * mm
    c.setFont("Helvetica-Bold", 10); c.setFillColor(NAVY)
    c.drawString(MARGIN + accent_w + 3 * mm, ty, "Suggested Next Step")
    ty -= 6 * mm
    c.setFont("Helvetica", 9); c.setFillColor(BODY)
    for line in wrapped:
        c.drawString(MARGIN + accent_w + 3 * mm, ty, line); ty -= 4.5 * mm

    # Contact footer (above page footer)
    fy = 20 * mm
    c.setStrokeColor(DIVIDER); c.setLineWidth(0.4)
    c.line(MARGIN, fy, W - MARGIN, fy)
    c.setFont("Helvetica-Bold", 8.5); c.setFillColor(NAVY)
    c.drawString(MARGIN, fy - 5 * mm, "Tomas Bay")
    tb_w = c.stringWidth("Tomas Bay", "Helvetica-Bold", 8.5)
    c.setFont("Helvetica", 8.5); c.setFillColor(MUTED)
    c.drawString(MARGIN + tb_w, fy - 5 * mm, "   |  coach@coachbay.com  |  coachbay.ai")
    c.setFont("Helvetica-Oblique", 7.5); c.setFillColor(MUTED)
    c.drawRightString(W - MARGIN, fy - 5 * mm, "Sprints are half day (3 to 4 hours). Manifesto Workshop is full day (~7 hours).")


# ── Build ───────────────────────────────────────────────────────

c = canvas.Canvas(OUTPUT, pagesize=A4)
build_page1(c)
c.showPage()
build_page2(c)
c.showPage()
build_page3(c)
c.save()
print(f"Built {OUTPUT}")
print("Done. Now run: npm run build && git add -A && git commit && git push")
