# 8 AI Archetypes one page handout — run with: python3 build-archetypes.py
# Generates /public/CoachBay_AI_Archetypes.pdf using ReportLab.
# Matches the Sprint PDF look: robot header, cyan accents, DM Sans (Helvetica stand in).

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
    c.setFont("Helvetica-Bold", 22); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "The 8 People in Every AI Rollout")
    # Cyan accent bar
    c.setFillColor(CYAN)
    c.rect(MARGIN, y - 5 * mm, 18 * mm, 1.1 * mm, fill=1, stroke=0)
    # Intro paragraph
    intro = ("Every organization has the same cast of characters when AI arrives. "
             "Knowing who is who is the first step to moving everyone forward. "
             "Where does each person on your team sit?")
    c.setFont("Helvetica", 10.5); c.setFillColor(BODY)
    y2 = y - 12 * mm
    for line in textwrap.wrap(intro, 95):
        c.drawString(MARGIN, y2, line); y2 -= 5.2 * mm
    return y2 - 4 * mm


def draw_archetype_card(c, x, y, w, h, number, title, body, emoji):
    # Card background
    c.setFillColor(WHITE); c.setStrokeColor(DIVIDER); c.setLineWidth(0.5)
    c.roundRect(x, y - h, w, h, 4, fill=1, stroke=1)
    # Number chip top left
    chip_x = x + 5 * mm
    chip_y = y - 11 * mm
    c.setFillColor(CYAN_LIGHT); c.setStrokeColor(CYAN_BORDER); c.setLineWidth(0.5)
    c.roundRect(chip_x, chip_y, 8 * mm, 8 * mm, 2, fill=1, stroke=1)
    c.setFont("Helvetica-Bold", 10); c.setFillColor(CYAN_DARK)
    num_w = c.stringWidth(number, "Helvetica-Bold", 10)
    c.drawString(chip_x + (8 * mm - num_w) / 2, chip_y + 2.4 * mm, number)
    # Title
    c.setFont("Helvetica-Bold", 11); c.setFillColor(NAVY)
    c.drawString(x + 16 * mm, y - 9 * mm, title)
    # Body
    c.setFont("Helvetica", 9); c.setFillColor(BODY)
    ty = y - 16 * mm
    wrap_chars = 46
    for line in textwrap.wrap(body, wrap_chars):
        c.drawString(x + 5 * mm, ty, line); ty -= 4.2 * mm


def build_pdf(path):
    c = canvas.Canvas(path, pagesize=A4)
    draw_header(c, "AI Adoption Archetypes")
    draw_footer(c)

    # Title block
    y_after_title = draw_title_block(c, H - HEADER_H - 14 * mm)

    # 8 archetypes in a 2x4 grid
    archetypes = [
        ("1", "The Skeptic",
         "Refuses to engage. Thinks AI is overhyped or dangerous. Will not try it until forced to.",
         None),
        ("2", "The Anxious",
         "Worried AI will take their job. Avoids the topic. Needs reassurance before they can learn.",
         None),
        ("3", "The Coaster",
         "Uses AI for basic tasks every day. Never pushes beyond the obvious. Comfortable, not growing.",
         None),
        ("4", "The Overconfident",
         "Had one good aha moment and now thinks they know AI. Dangerous because they do not know what they do not know.",
         None),
        ("5", "The Gatekeeper",
         "Uses AI but hides it. Keeps the advantage to themselves. Blocks team progress without realizing it.",
         None),
        ("6", "The Tinkerer",
         "Builds their own AI tools at home for fun. Often hidden from the organization. Huge untapped potential.",
         None),
        ("7", "The Principled",
         "Could use AI well but holds back on ethical grounds. Needs a framework, not a sales pitch.",
         None),
        ("8", "The Fluent",
         "Uses AI across their work. Shares wins. Keeps learning. The person you want everyone to become.",
         None),
    ]

    gap = 5 * mm
    card_w = (CONTENT_W - gap) / 2
    card_h = 38 * mm

    # Calculate positions for 4 rows x 2 columns
    positions = []
    row_y = y_after_title
    for row in range(4):
        for col in range(2):
            px = MARGIN + col * (card_w + gap)
            py = row_y
            positions.append((px, py))
        row_y -= card_h + gap

    for (num, title, body, emoji), (x, y) in zip(archetypes, positions):
        draw_archetype_card(c, x, y, card_w, card_h, num, title, body, emoji)

    # Closing question under the grid
    closing_y = row_y + gap - 14 * mm
    c.setFont("Helvetica-Bold", 12); c.setFillColor(NAVY)
    closing = "Can you name each one on your team?"
    cw = c.stringWidth(closing, "Helvetica-Bold", 12)
    c.drawString((W - cw) / 2, closing_y, closing)

    # CTA banner
    cta_y = closing_y - 10 * mm
    c.setFillColor(CYAN_LIGHT)
    c.roundRect(MARGIN, cta_y - 6 * mm, CONTENT_W, 14 * mm, 3, fill=1, stroke=0)
    c.setFont("Helvetica", 9); c.setFillColor(CYAN_DARK)
    cta = "Want to move your team from Skeptic to Fluent? Take the free AI Fitness Test or book a Sprint at coachbay.ai"
    cta_w = c.stringWidth(cta, "Helvetica", 9)
    c.drawString((W - cta_w) / 2, cta_y - 1 * mm, cta)

    c.showPage()
    c.save()
    print(f"Wrote {path}")


if __name__ == "__main__":
    build_pdf("public/CoachBay_AI_Archetypes.pdf")
