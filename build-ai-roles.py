from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
import os

W, H = A4
CYAN        = colors.HexColor("#00BCD4")
NAVY        = colors.HexColor("#1A1A2E")
BODY        = colors.HexColor("#1E293B")
MUTED       = colors.HexColor("#64748B")
LIGHT_CYAN  = colors.HexColor("#E0F7FA")
DIVIDER     = colors.HexColor("#E2E8F0")
BG_LIGHT    = colors.HexColor("#F8FAFC")
WHITE       = colors.white

ML = 18*mm   # margin left
MR = 18*mm   # margin right
TW = W - ML - MR  # text width

ROBOT_PATH = "/home/claude/coachbay-push/public/coachbay-robot-transparent.png"

def header(c, title="The Five AI Roles"):
    """Top header band — matches CRIT style."""
    HEADER_H = 14*mm
    # White background
    c.setFillColor(WHITE)
    c.rect(0, H - HEADER_H, W, HEADER_H, fill=1, stroke=0)
    # Bottom border
    c.setStrokeColor(DIVIDER)
    c.setLineWidth(0.5)
    c.line(0, H - HEADER_H, W, H - HEADER_H)

    # Robot icon
    ROBOT_H = 7*mm
    ROBOT_W = ROBOT_H * 0.768
    ry = H - HEADER_H + (HEADER_H - ROBOT_H) / 2 + 1*mm
    if os.path.exists(ROBOT_PATH):
        c.drawImage(ROBOT_PATH, ML, ry, width=ROBOT_W, height=ROBOT_H,
                    preserveAspectRatio=True, mask="auto")

    # "CoachBay" bold navy + ".ai" cyan
    tx = ML + ROBOT_W + 2*mm
    ty = H - HEADER_H/2 - 1.5*mm
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(NAVY)
    c.drawString(tx, ty, "CoachBay")
    cb_w = c.stringWidth("CoachBay", "Helvetica-Bold", 9)
    c.setFillColor(CYAN)
    c.drawString(tx + cb_w, ty, ".ai")
    ai_w = c.stringWidth(".ai", "Helvetica-Bold", 9)

    # Separator pipe
    sep_x = tx + cb_w + ai_w + 3*mm
    c.setFillColor(DIVIDER)
    c.rect(sep_x, ty - 0.5*mm, 0.3*mm, 4*mm, fill=1, stroke=0)

    # Title text
    c.setFont("Helvetica", 8)
    c.setFillColor(MUTED)
    c.drawString(sep_x + 3*mm, ty, title)

def footer(c):
    """Bottom footer."""
    FH = 8*mm
    c.setFillColor(WHITE)
    c.rect(0, 0, W, FH, fill=1, stroke=0)
    c.setStrokeColor(DIVIDER)
    c.setLineWidth(0.4)
    c.line(0, FH, W, FH)
    c.setFont("Helvetica", 7)
    c.setFillColor(MUTED)
    c.drawString(ML, 2.8*mm, "coachbay.ai  |  Tomas Bay, Executive Coach & Consultant")

def cyan_rule(c, y, width=None):
    w = width or TW
    c.setStrokeColor(CYAN)
    c.setLineWidth(0.8)
    c.line(ML, y, ML + w, y)

def divider_rule(c, y):
    c.setStrokeColor(DIVIDER)
    c.setLineWidth(0.4)
    c.line(ML, y, ML + TW, y)

def draw_text_block(c, x, y, text, font, size, color, max_width, line_height):
    """Draw wrapped text, return y position after last line."""
    c.setFont(font, size)
    c.setFillColor(color)
    words = text.split()
    line = ""
    for word in words:
        test = (line + " " + word).strip()
        if c.stringWidth(test, font, size) <= max_width:
            line = test
        else:
            c.drawString(x, y, line)
            y -= line_height
            line = word
    if line:
        c.drawString(x, y, line)
        y -= line_height
    return y

def draw_italic_block(c, x, y, label, rest, max_width, size=8.5):
    """Draw 'In plain terms: ...' with cyan italic label."""
    lh = size * 1.5
    label_w = c.stringWidth(label, "Helvetica-Oblique", size)
    c.setFont("Helvetica-Oblique", size)
    c.setFillColor(CYAN)
    c.drawString(x, y, label)
    # rest of text
    full = rest
    c.setFillColor(MUTED)
    # first segment on same line
    remaining_w = max_width - label_w - 1*mm
    words = full.split()
    line = ""
    first_line = True
    for word in words:
        test = (line + " " + word).strip()
        w = remaining_w if first_line else max_width
        if c.stringWidth(test, "Helvetica-Oblique", size) <= w:
            line = test
        else:
            if first_line:
                c.drawString(x + label_w + 1*mm, y, line)
                first_line = False
            else:
                c.drawString(x, y, line)
            y -= lh
            line = word
    if line:
        ox = (x + label_w + 1*mm) if first_line else x
        c.drawString(ox, y, line)
        y -= lh
    return y

def role_section(c, y, letter, color_letter, name, body_lines, plain_terms, gap_after=5*mm):
    """
    Draw one role section. Returns updated y.
    name        — role name e.g. "Assistant"
    body_lines  — list of paragraph strings
    plain_terms — the "In plain terms" text
    """
    LH_BODY = 6.2*mm

    # Role name as a clean bold heading — no oversized letter
    NAME_SIZE = 13
    c.setFont("Helvetica-Bold", NAME_SIZE)
    c.setFillColor(NAVY)
    c.drawString(ML, y, name)
    y -= 7*mm

    # Body paragraphs
    for para in body_lines:
        y = draw_text_block(c, ML, y, para, "Helvetica", 10.5, BODY, TW, LH_BODY)
        y -= 2*mm

    y -= 1*mm
    # Plain terms
    y = draw_italic_block(c, ML, y, "In plain terms:  ", plain_terms, TW, size=10.5)
    y -= gap_after
    return y


# ── BUILD PDF ────────────────────────────────────────────────────────────────

out_path = "/home/claude/CoachBay_Five_AI_Roles.pdf"
c = canvas.Canvas(out_path, pagesize=A4)

# ── PAGE 1 ───────────────────────────────────────────────────────────────────
header(c)
footer(c)

y = H - 34*mm  # start below header with more breathing room

# Big title
c.setFont("Helvetica-Bold", 38)
c.setFillColor(CYAN)
c.drawString(ML, y, "THE FIVE")
title1_w = c.stringWidth("THE FIVE", "Helvetica-Bold", 38)
c.setFillColor(NAVY)
c.drawString(ML + title1_w + 4*mm, y, "AI ROLES")
y -= 8*mm

# Subtitle
c.setFont("Helvetica-Oblique", 11)
c.setFillColor(MUTED)
c.drawString(ML, y, "A framework for thinking about how AI can work for you")
y -= 5*mm

cyan_rule(c, y)
y -= 9*mm

# Intro paragraph
intro = (
    "With AI, every person gains a team of four. Not four tools. "
    "Four roles that change how you work, think, and create. "
    "The key is knowing which role to call on, and when."
)
y = draw_text_block(c, ML, y, intro, "Helvetica", 10.5, BODY, TW, 6.2*mm)
y -= 4*mm

intro2 = (
    "You are the Conductor. AI plays the other four."
)
y = draw_text_block(c, ML, y, intro2, "Helvetica", 10.5, BODY, TW, 6.2*mm)
y -= 5*mm

# Pull quote box
QUOTE_H = 14*mm
c.setFillColor(LIGHT_CYAN)
c.setStrokeColor(CYAN)
c.setLineWidth(0.5)
box_top = y
box_bottom = y - QUOTE_H + 4*mm
c.roundRect(ML, box_bottom, TW, QUOTE_H, 3, fill=1, stroke=1)
c.setFont("Helvetica-BoldOblique", 10.5)
c.setFillColor(NAVY)
quote = "The question is not whether AI can help. It is which role you need it to play."
qw = c.stringWidth(quote, "Helvetica-BoldOblique", 10.5)
quote_y = box_bottom + QUOTE_H/2 - 1.5*mm
c.drawString(ML + (TW - qw)/2, quote_y, quote)
y -= QUOTE_H + 3*mm

cyan_rule(c, y)
y -= 7*mm

# ── ROLE 1: ASSISTANT ────────────────────────────────────────────────────────
y = role_section(c, y,
    letter="A",
    color_letter=True,
    name="Assistant",
    body_lines=[
        "The starting point for most people. The Assistant handles the routine: "
        "drafting emails, summarising documents, organising notes, formatting. "
        "The work that eats your time but not your brain.",

        "Free yourself from the admin so you can focus on the work that actually matters.",
    ],
    plain_terms="Summarise this. Draft a response. Turn these notes into a clean summary I can send.",
    gap_after=5*mm,
)

divider_rule(c, y)
y -= 7*mm

# ── ROLE 2: EXPERT ───────────────────────────────────────────────────────────
y = role_section(c, y,
    letter="E",
    color_letter=True,
    name="Expert",
    body_lines=[
        "AI becomes a knowledgeable colleague you can consult on demand. Need to "
        "understand a regulation, break down a technical concept, or get up to speed "
        "on an unfamiliar topic? The Expert gives you access to depth without needing "
        "to be the specialist yourself.",

        "It does not replace professional advice. But it gets you to an informed "
        "position faster, so your conversations with actual experts are sharper and shorter.",
    ],
    plain_terms="Explain this to me like I am new to it. Keep it practical, not academic.",
    gap_after=5*mm,
)

divider_rule(c, y)
y -= 7*mm

# ── ROLE 3: COACH ────────────────────────────────────────────────────────────
y = role_section(c, y,
    letter="C",
    color_letter=True,
    name="Coach",
    body_lines=[
        "This is where it gets personal. The Coach asks you the hard questions, "
        "challenges your thinking, and helps you reflect. It does not judge, "
        "it does not get tired, and it does not have an agenda.",

        "Use it to prepare for difficult conversations, think through decisions, "
        "or stress test your ideas before you commit to them.",
    ],
    plain_terms="Challenge my thinking on this. What am I missing?",
    gap_after=5*mm,
)

# ── PAGE 2 ───────────────────────────────────────────────────────────────────
c.showPage()
header(c)
footer(c)
y = H - 24*mm

# ── ROLE 4: CREATIVE ────────────────────────────────────────────────────────
y = role_section(c, y,
    letter="Cr",
    color_letter=True,
    name="Creative",
    body_lines=[
        "AI as a brainstorming partner, a writer, a designer of first drafts. "
        "It generates options you would never have considered and helps you move "
        "from blank page to working draft in minutes.",

        "The Creative does not replace your ideas. It gives you more to work with. "
        "Give it a brief and ask for ten versions. Then choose, combine, or go "
        "in a direction you would never have reached alone.",
    ],
    plain_terms="Give me 10 different ways I could approach this. Include some that feel unconventional.",
    gap_after=5*mm,
)

divider_rule(c, y)
y -= 8*mm

# ── ROLE 5: CONDUCTOR ───────────────────────────────────────────────────────
c.setFont("Helvetica-Bold", 13)
c.setFillColor(NAVY)
c.drawString(ML, y, "Conductor")
y -= 4*mm

# Conductor gets a slightly highlighted background to signal it is different
BOX_H = 60*mm
c.setFillColor(colors.HexColor("#F0FAFB"))
c.setStrokeColor(CYAN)
c.setLineWidth(0.6)
c.roundRect(ML, y - BOX_H, TW, BOX_H, 3, fill=1, stroke=1)

y -= 9*mm
cond1 = (
    "This is you. The Conductor decides which role to call on, sets the direction, "
    "and makes the final call. AI does not lead. You do."
)
y = draw_text_block(c, ML + 4*mm, y, cond1, "Helvetica", 10.5, BODY, TW - 8*mm, 6.2*mm)
y -= 4*mm

cond2 = (
    "The Conductor does not have prompts. The Conductor has judgment. "
    "Your job is to look at the situation in front of you and ask: "
    "which of my four AI team members do I need right now?"
)
y = draw_text_block(c, ML + 4*mm, y, cond2, "Helvetica", 10.5, BODY, TW - 8*mm, 6.2*mm)
y -= 4*mm

cond3 = (
    "The magic is not in any single role. It is in knowing how to orchestrate all four."
)
y = draw_text_block(c, ML + 4*mm, y, cond3, "Helvetica-Bold", 10.5, NAVY, TW - 8*mm, 6.2*mm)
y -= 4*mm

y = draw_italic_block(c, ML + 4*mm, y, "In plain terms:  ",
    "I am not outsourcing my thinking. I am directing AI to extend it.",
    TW - 8*mm, size=10.5)
y -= 14*mm

# ── HOW TO USE THEM TOGETHER ─────────────────────────────────────────────────
cyan_rule(c, y)
y -= 10*mm

c.setFont("Helvetica-Bold", 13)
c.setFillColor(NAVY)
c.drawString(ML, y, "How to Use Them Together")
y -= 8*mm

example_intro = (
    "A leader needs to reorganise their team and is not sure where to start. "
    "Here is how the five roles might work in a single conversation:"
)
y = draw_text_block(c, ML, y, example_intro, "Helvetica-Oblique", 10.5, MUTED, TW, 6.2*mm)
y -= 6*mm

# Example box
EBOX_H = 40*mm
c.setFillColor(BG_LIGHT)
c.setStrokeColor(DIVIDER)
c.setLineWidth(0.5)
c.roundRect(ML, y - EBOX_H, TW, EBOX_H, 3, fill=1, stroke=1)

ex_x = ML + 4*mm
ex_w = TW - 8*mm
ey = y - 6*mm

def example_line(c, ey, label, text, ex_x, ex_w):
    label_w = c.stringWidth(label + "  ", "Helvetica-Bold", 8.5)
    c.setFont("Helvetica-Bold", 8.5)
    c.setFillColor(CYAN)
    c.drawString(ex_x, ey, label)
    c.setFont("Helvetica", 8.5)
    c.setFillColor(BODY)
    ey = draw_text_block(c, ex_x + label_w, ey, text, "Helvetica", 8.5, BODY,
                         ex_w - label_w, 5*mm)
    ey -= 3*mm
    return ey

ey = example_line(c, ey, "Expert:",
    "Give me an overview of how high-performing organisations handle team reorganisations.",
    ex_x, ex_w)
ey = example_line(c, ey, "Coach:",
    "Challenge my assumptions about why this reorganisation is necessary right now.",
    ex_x, ex_w)
ey = example_line(c, ey, "Creative:",
    "Give me three different structural models I have not considered.",
    ex_x, ex_w)
ey = example_line(c, ey, "Assistant:",
    "Draft a communication I can send to the team on Friday.",
    ex_x, ex_w)
ey = example_line(c, ey, "Conductor:",
    "You, deciding what to use, what to discard, and what to do next.",
    ex_x, ex_w)

y -= EBOX_H + 14*mm

# ── CLOSING CTA ─────────────────────────────────────────────────────────────
CTA_H = 18*mm
c.setFillColor(LIGHT_CYAN)
c.setStrokeColor(CYAN)
c.setLineWidth(0.5)
c.roundRect(ML, y - CTA_H + 4*mm, TW, CTA_H, 3, fill=1, stroke=1)

c.setFont("Helvetica-Bold", 10)
c.setFillColor(NAVY)
cta_title = "Want to put all five roles to work in your leadership team?"
cta_w = c.stringWidth(cta_title, "Helvetica-Bold", 10)
c.drawString(ML + (TW - cta_w)/2, y - 1*mm, cta_title)

c.setFont("Helvetica", 8.5)
c.setFillColor(MUTED)
cta_sub = "Tomas Bay runs hands-on workshops that go from concept to real workflows in a single session."
cta_sub_w = c.stringWidth(cta_sub, "Helvetica", 8.5)
c.drawString(ML + (TW - cta_sub_w)/2, y - 5.5*mm, cta_sub)

c.setFont("Helvetica-Bold", 8.5)
c.setFillColor(CYAN)
cta_link = "coachbay.ai  |  coach@coachbay.ai"
cta_link_w = c.stringWidth(cta_link, "Helvetica-Bold", 8.5)
c.drawString(ML + (TW - cta_link_w)/2, y - 10*mm, cta_link)

c.save()
print(f"Saved: {out_path}")
