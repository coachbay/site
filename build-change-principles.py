# Change Principles one page handout — run with: python3 build-change-principles.py
# Generates /public/CoachBay_Change_Principles.pdf using ReportLab.

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
    c.drawString(MARGIN, y, "How We Think About Change")
    c.setFillColor(CYAN)
    c.rect(MARGIN, y - 5 * mm, 18 * mm, 1.1 * mm, fill=1, stroke=0)

    paragraphs = [
        ("CoachBay subscribes to four key change principles and they are not new. Each "
         "one sits on decades of research in how organizations change, how adults learn, "
         "and how habits form. We did not invent them. We stress tested them over 25 "
         "years, across companies from Maersk to Swire, and kept the four that held up "
         "every time."),
        ("What CoachBay adds is not the theory. It is the discipline of applying all four "
         "at once, inside a single organization, over the course of a program. Most change "
         "efforts get one or two right. The real work is refusing to skip any of them."),
    ]
    c.setFont("Helvetica", 10); c.setFillColor(BODY)
    y2 = y - 12 * mm
    for i, para in enumerate(paragraphs):
        for line in textwrap.wrap(para, 100):
            c.drawString(MARGIN, y2, line); y2 -= 5 * mm
        if i == 0:
            y2 -= 2 * mm  # paragraph gap
    return y2 - 5 * mm


def draw_principle_card(c, x, y, w, h, number, title, body):
    c.setFillColor(WHITE); c.setStrokeColor(DIVIDER); c.setLineWidth(0.5)
    c.roundRect(x, y - h, w, h, 4, fill=1, stroke=1)
    chip_x = x + 5 * mm
    chip_y = y - 11 * mm
    c.setFillColor(CYAN_LIGHT); c.setStrokeColor(CYAN_BORDER); c.setLineWidth(0.5)
    c.roundRect(chip_x, chip_y, 8 * mm, 8 * mm, 2, fill=1, stroke=1)
    c.setFont("Helvetica-Bold", 11); c.setFillColor(CYAN_DARK)
    num_w = c.stringWidth(number, "Helvetica-Bold", 11)
    c.drawString(chip_x + (8 * mm - num_w) / 2, chip_y + 2.4 * mm, number)
    c.setFont("Helvetica-Bold", 12); c.setFillColor(NAVY)
    c.drawString(x + 5 * mm, y - 17 * mm, title)
    c.setFont("Helvetica", 9); c.setFillColor(BODY)
    ty = y - 23 * mm
    wrap_chars = 50
    for line in textwrap.wrap(body, wrap_chars):
        c.drawString(x + 5 * mm, ty, line); ty -= 4.5 * mm


def draw_cta_banner(c, y_top):
    # Light cyan banner with a single centered line
    banner_h = 16 * mm
    c.setFillColor(CYAN_LIGHT); c.setStrokeColor(CYAN_BORDER); c.setLineWidth(0.6)
    c.roundRect(MARGIN, y_top - banner_h, CONTENT_W, banner_h, 4, fill=1, stroke=1)
    # Main message
    c.setFont("Helvetica-Bold", 11); c.setFillColor(NAVY)
    main = "Curious?"
    main_w = c.stringWidth(main, "Helvetica-Bold", 11)
    c.setFont("Helvetica", 11); c.setFillColor(BODY)
    rest = "  Take the free AI Fitness Test or book a Sprint at "
    rest_w = c.stringWidth(rest, "Helvetica", 11)
    c.setFont("Helvetica-Bold", 11); c.setFillColor(CYAN_DARK)
    link = "coachbay.ai"
    link_w = c.stringWidth(link, "Helvetica-Bold", 11)
    total = main_w + rest_w + link_w
    start_x = (W - total) / 2
    text_y = y_top - banner_h / 2 - 1.2 * mm
    # Draw each segment
    c.setFont("Helvetica-Bold", 11); c.setFillColor(NAVY)
    c.drawString(start_x, text_y, main)
    c.setFont("Helvetica", 11); c.setFillColor(BODY)
    c.drawString(start_x + main_w, text_y, rest)
    c.setFont("Helvetica-Bold", 11); c.setFillColor(CYAN_DARK)
    c.drawString(start_x + main_w + rest_w, text_y, link)


def build_pdf(path):
    c = canvas.Canvas(path, pagesize=A4)
    draw_header(c, "Our Approach to Change")
    draw_footer(c)

    y_after_title = draw_title_block(c, H - HEADER_H - 14 * mm)

    principles = [
        ("1", "Leaders go first",
         "Change starts at the top or it stalls. Teams read their leaders before they read the memo. If the CEO is using AI openly, the organization follows. If the CEO delegates AI to a task force, so does everyone else."),
        ("2", "Start with the willing",
         "Convert the curious, not the skeptics. A small Pilot Squad of early adopters creates the evidence that pulls the rest of the organization along. Skeptics change their minds when they see their colleagues winning, not when they are told to."),
        ("3", "Experience beats a lecture",
         "People change when they feel it, not when they hear about it. Demos and slides can set the stage, but the real shift happens when participants do the work themselves. Every Sprint is built around a real problem, not a theory. You leave with something you built."),
        ("4", "Build habits, not knowledge",
         "One workshop does not change behavior. Fitness is not a fact you learn. It is a practice you keep. Pit Stop sessions after each Sprint turn new skills into permanent habits."),
    ]

    gap = 5 * mm
    card_w = (CONTENT_W - gap) / 2
    card_h = 52 * mm

    row1_y = y_after_title
    row2_y = row1_y - card_h - gap

    positions = [
        (MARGIN, row1_y),
        (MARGIN + card_w + gap, row1_y),
        (MARGIN, row2_y),
        (MARGIN + card_w + gap, row2_y),
    ]

    for (num, title, body), (x, y) in zip(principles, positions):
        draw_principle_card(c, x, y, card_w, card_h, num, title, body)

    # Closing italic line
    closing_y = row2_y - card_h - 10 * mm
    c.setFont("Helvetica-Oblique", 10); c.setFillColor(MUTED)
    closing = "Simple principles. Hard to live by. Worth the work."
    cw = c.stringWidth(closing, "Helvetica-Oblique", 10)
    c.drawString((W - cw) / 2, closing_y, closing)

    # CTA banner
    banner_top = closing_y - 8 * mm
    draw_cta_banner(c, banner_top)

    c.showPage()
    c.save()
    print(f"Wrote {path}")


if __name__ == "__main__":
    build_pdf("public/CoachBay_Change_Principles.pdf")
