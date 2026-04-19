# 9 AI Archetypes one page handout — run with: python3 build-archetypes.py
# Generates /public/CoachBay_AI_Archetypes.pdf using ReportLab.
# Matches the Sprint PDF look: robot header, cyan accents, DM Sans (Helvetica stand in).
# Layout: 3 groups of 3, each group with a label and description.

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
ROBOT = "public/coachbay-robot-transparent.png"

ROBOT_H = 10 * mm
ROBOT_W = ROBOT_H * 0.768
HEADER_H = 18 * mm


def draw_header(c, doc_label):
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
    c.drawRightString(W - MARGIN, text_y, doc_label)


def draw_footer(c):
    c.setStrokeColor(DIVIDER); c.setLineWidth(0.4)
    c.line(MARGIN, 14 * mm, W - MARGIN, 14 * mm)
    c.setFont("Helvetica-Bold", 8); c.setFillColor(CYAN_DARK)
    c.drawString(MARGIN, 9 * mm, "Designed and delivered by Tomas Bay")
    c.setFont("Helvetica", 8); c.setFillColor(MUTED)
    c.drawRightString(W - MARGIN, 9 * mm, "coach@coachbay.ai")


def draw_title_block(c, y):
    c.setFont("Helvetica-Bold", 20); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "The 9 People in Every AI Rollout")
    # Cyan accent bar
    c.setFillColor(CYAN)
    c.rect(MARGIN, y - 4.5 * mm, 18 * mm, 1.1 * mm, fill=1, stroke=0)
    # Intro paragraph
    intro = ("Every organization has the same cast of characters when AI arrives. "
             "They fall into three groups. Knowing who is who is the first step "
             "to moving everyone forward.")
    c.setFont("Helvetica", 9.5); c.setFillColor(BODY)
    y2 = y - 10 * mm
    for line in textwrap.wrap(intro, 100):
        c.drawString(MARGIN, y2, line); y2 -= 4.5 * mm
    return y2 - 3 * mm


def draw_group_label(c, y, label, description):
    """Draw a group heading with cyan left bar and description."""
    # Cyan left accent bar
    c.setFillColor(CYAN)
    c.rect(MARGIN, y - 9 * mm, 1.2 * mm, 10 * mm, fill=1, stroke=0)
    # Group label
    c.setFont("Helvetica-Bold", 11); c.setFillColor(NAVY)
    c.drawString(MARGIN + 4 * mm, y, label)
    # Description
    c.setFont("Helvetica", 8); c.setFillColor(MUTED)
    c.drawString(MARGIN + 4 * mm, y - 5 * mm, description)
    return y - 13 * mm


def draw_archetype_card(c, x, y, w, h, title, body):
    """Draw a single archetype card without a number chip."""
    # Card background
    c.setFillColor(WHITE); c.setStrokeColor(DIVIDER); c.setLineWidth(0.5)
    c.roundRect(x, y - h, w, h, 4, fill=1, stroke=1)
    # Title
    c.setFont("Helvetica-Bold", 10); c.setFillColor(NAVY)
    c.drawString(x + 5 * mm, y - 7 * mm, title)
    # Body
    c.setFont("Helvetica", 8.5); c.setFillColor(BODY)
    ty = y - 13 * mm
    wrap_chars = int((w - 10 * mm) / (8.5 * 0.45))
    for line in textwrap.wrap(body, wrap_chars):
        c.drawString(x + 5 * mm, ty, line); ty -= 3.8 * mm


def build_pdf(path):
    c = canvas.Canvas(path, pagesize=A4)
    draw_header(c, "AI Adoption Archetypes")
    draw_footer(c)

    # Title block
    y = draw_title_block(c, H - HEADER_H - 12 * mm)

    # Groups and archetypes
    groups = [
        ("Not Starting", "On the sidelines. Different reasons, same result: no AI use. Your job: get them in the door.",
         [
             ("The Skeptic", "Refuses to engage. Thinks AI is overhyped or dangerous. Will not try it until forced to."),
             ("The Anxious", "Worried AI will take their job. Avoids the topic. Needs reassurance before they can learn."),
             ("The Principled", "Could use AI well but holds back on ethical grounds. Needs a framework, not a sales pitch."),
         ]),
        ("Using But Stuck", "Doing something with AI but not reaching their potential. Your job: push them further.",
         [
             ("The Coaster", "Uses AI for basic tasks every day. Never pushes beyond the obvious. Comfortable, not growing."),
             ("The Overconfident", "Had one good aha moment and now thinks they know AI. Dangerous because they do not know what they do not know."),
             ("The Humble", "Making real progress with AI but does not see it as impressive. Quietly effective. Needs a stage, not a push."),
         ]),
        ("Skilled But Not Scaling", "Real AI skills, but the organization is not benefiting. Your job: unlock their impact.",
         [
             ("The Gatekeeper", "Uses AI well but hides it. Keeps the advantage to themselves. Blocks team progress without realizing it."),
             ("The Tinkerer", "Builds their own AI tools at home for fun. Often hidden from the organization. Huge untapped potential."),
             ("The Fluent", "Uses AI across their work. Shares wins. Keeps learning. The person you want everyone to become."),
         ]),
    ]

    gap = 4 * mm
    card_w = (CONTENT_W - 2 * gap) / 3
    card_h = 38 * mm
    group_gap = 6 * mm

    for group_label, group_desc, archetypes in groups:
        y = draw_group_label(c, y, group_label, group_desc)
        # Draw 3 cards in a row
        for i, (title, body) in enumerate(archetypes):
            cx = MARGIN + i * (card_w + gap)
            draw_archetype_card(c, cx, y, card_w, card_h, title, body)
        y -= card_h + group_gap

    # Closing question
    closing_y = y - 2 * mm
    c.setFont("Helvetica-Bold", 11); c.setFillColor(NAVY)
    closing = "Can you name each one on your team?"
    cw = c.stringWidth(closing, "Helvetica-Bold", 11)
    c.drawString((W - cw) / 2, closing_y, closing)

    # CTA banner
    cta_y = closing_y - 12 * mm
    c.setFillColor(CYAN_LIGHT)
    c.roundRect(MARGIN, cta_y - 5 * mm, CONTENT_W, 12 * mm, 3, fill=1, stroke=0)
    c.setFont("Helvetica", 8.5); c.setFillColor(CYAN_DARK)
    cta = "Want to move your team from Skeptic to Fluent? Take the free AI Fitness Test or book a Sprint at coachbay.ai"
    cta_w = c.stringWidth(cta, "Helvetica", 8.5)
    c.drawString((W - cta_w) / 2, cta_y - 0.5 * mm, cta)

    c.showPage()
    c.save()
    print(f"Wrote {path}")


if __name__ == "__main__":
    build_pdf("public/CoachBay_AI_Archetypes.pdf")
