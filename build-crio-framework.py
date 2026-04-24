# CRIO Framework document.
# Generates public/CoachBay_CRIO.pdf using ReportLab.
# Replaces the old CoachBay_CRIT.pdf.

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
import textwrap

W, H = A4
MARGIN = 15 * mm
CONTENT_W = W - 2 * MARGIN

CYAN = colors.HexColor("#00BCD4")
CYAN_DARK = colors.HexColor("#0097A7")
CYAN_LIGHT = colors.HexColor("#E0F7FA")
CYAN_BORDER = colors.HexColor("#80DEEA")
NAVY = colors.HexColor("#1A1A2E")
BODY = colors.HexColor("#334155")
MUTED = colors.HexColor("#64748B")
DIVIDER = colors.HexColor("#E2E8F0")
WHITE = colors.white

ROBOT = "public/coachbay-robot-transparent.png"
ROBOT_H = 10 * mm
ROBOT_W = ROBOT_H * 0.768
HEADER_H = 16 * mm


def draw_header(c, page_label):
    c.setFillColor(WHITE)
    c.rect(0, H - HEADER_H, W, HEADER_H, fill=1, stroke=0)
    c.setStrokeColor(DIVIDER); c.setLineWidth(0.4)
    c.line(0, H - HEADER_H, W, H - HEADER_H)
    text_y = H - HEADER_H / 2 - 1.5 * mm
    robot_y = H - HEADER_H + (HEADER_H - ROBOT_H) / 2 + 1.41 * mm
    c.drawImage(ROBOT, MARGIN, robot_y, width=ROBOT_W, height=ROBOT_H, mask="auto")
    c.setFont("Helvetica-Bold", 13); c.setFillColor(NAVY)
    c.drawString(MARGIN + ROBOT_W + 2.5 * mm, text_y, "CoachBay")
    cb_w = c.stringWidth("CoachBay", "Helvetica-Bold", 13)
    c.setFillColor(CYAN)
    c.drawString(MARGIN + ROBOT_W + 2.5 * mm + cb_w, text_y, ".ai")
    c.setFont("Helvetica", 7.5); c.setFillColor(MUTED)
    c.drawRightString(W - MARGIN, text_y, page_label)


def draw_footer(c):
    c.setStrokeColor(DIVIDER); c.setLineWidth(0.4)
    c.line(MARGIN, 12 * mm, W - MARGIN, 12 * mm)
    c.setFont("Helvetica", 7.5); c.setFillColor(MUTED)
    c.drawString(MARGIN, 7.5 * mm, "coachbay.ai  |  Tomas Bay, Executive Coach & Consultant")
    c.drawRightString(W - MARGIN, 7.5 * mm, "coach@coachbay.ai")


def wrap_text(c, text, x, y, width, font, size, color, line_h):
    c.setFont(font, size); c.setFillColor(color)
    for line in textwrap.wrap(text, int(width / (size * 0.53))):
        c.drawString(x, y, line)
        y -= line_h
    return y


def build():
    out = "public/CoachBay_CRIO.pdf"
    c = canvas.Canvas(out, pagesize=A4)

    # ── PAGE 1 ────────────────────────────────────────────────────────────────
    draw_header(c, "CRIO Framework")

    # Big title
    y = H - HEADER_H - 14 * mm
    c.setFont("Helvetica-Bold", 48); c.setFillColor(CYAN)
    c.drawString(MARGIN, y, "CRIO")

    # Subtitle
    y -= 9 * mm
    c.setFont("Helvetica-Oblique", 11); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "A framework for getting real value from AI conversations")
    y -= 5 * mm
    c.setFont("Helvetica", 8); c.setFillColor(MUTED)
    c.drawString(MARGIN, y, "A CoachBay framework")

    # Divider
    y -= 6 * mm
    c.setStrokeColor(DIVIDER); c.setLineWidth(0.5)
    c.line(MARGIN, y, W - MARGIN, y)
    y -= 8 * mm

    # Opening hook box
    hook_h = 18 * mm
    c.setFillColor(CYAN_LIGHT); c.setStrokeColor(colors.white)
    c.roundRect(MARGIN, y - hook_h, CONTENT_W, hook_h, 2, fill=1, stroke=0)
    c.setFillColor(CYAN); c.setStrokeColor(CYAN); c.setLineWidth(2)
    c.line(MARGIN, y, MARGIN, y - hook_h)
    hook_text = ("There is a moment that happens when you use AI well on a real problem. "
                 "You have been sitting with something for days. A decision you cannot quite land. "
                 "A challenge that keeps circling back. You open AI, structure the conversation properly, "
                 "and within ten minutes you are looking at angles you had not considered before.")
    tx = MARGIN + 5 * mm
    ty = y - 5 * mm
    c.setFont("Helvetica", 8.5); c.setFillColor(BODY)
    for line in textwrap.wrap(hook_text, 100):
        c.drawString(tx, ty, line); ty -= 4.2 * mm
    y -= hook_h + 6 * mm

    # Pull quote
    c.setFont("Helvetica-BoldOblique", 11); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "That is what CRIO gives you. Not just a better answer. Hope.")
    y -= 8 * mm

    body1 = ("The shift is simple but significant. Most people ask: how can I do this? CRIO teaches "
             "you to ask: how can AI help me do this? That one change in framing opens up a completely "
             "different kind of conversation.")
    y = wrap_text(c, body1, MARGIN, y, CONTENT_W, "Helvetica", 9, BODY, 4.5 * mm)
    y -= 8 * mm

    # Section heading
    c.setFont("Helvetica-Bold", 13); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "The Four Components")
    c.setStrokeColor(DIVIDER); c.setLineWidth(0.5)
    c.line(MARGIN, y - 3 * mm, W - MARGIN, y - 3 * mm)
    y -= 10 * mm

    components = [
        ("C", "Context",
         "Set the scene before you ask for anything. Tell AI what is really going on, not just "
         "the surface request. What is the situation? Why does it matter? Who is involved? What "
         "constraints are you working within? The more honest and specific you are here, the more "
         "useful everything that follows will be. AI can only work with what you give it. Vague "
         "context produces vague output.",
         "In plain terms: What is going on, why does it matter, and what does AI need to understand before it can help?"),
        ("R", "Role",
         "Tell AI who to be. Not what to do yet, but whose perspective to bring. A skeptical CFO. "
         "An executive coach. A competitor's CEO. A board advisor who genuinely wants you to succeed "
         "but will not let you fool yourself. The role shapes everything: the tone, the angle, the "
         "level of challenge. A junior assistant gives you safe answers. A tough board member gives "
         "you the pushback you actually need.",
         "In plain terms: Answer this as if you were a specific expert whose perspective would be most useful to me right now."),
    ]

    for letter, name, body, plain in components:
        # Letter chip
        chip_size = 9 * mm
        c.setFillColor(CYAN); c.setStrokeColor(colors.white)
        c.roundRect(MARGIN, y - chip_size + 2 * mm, chip_size, chip_size, 1.5, fill=1, stroke=0)
        c.setFont("Helvetica-Bold", 14); c.setFillColor(WHITE)
        c.drawCentredString(MARGIN + chip_size / 2, y - chip_size / 2, letter)
        # Name
        c.setFont("Helvetica-Bold", 12); c.setFillColor(NAVY)
        c.drawString(MARGIN + chip_size + 3 * mm, y - 1 * mm, f"\u2014  {name}")
        y -= chip_size + 2 * mm
        # Body
        y = wrap_text(c, body, MARGIN, y, CONTENT_W, "Helvetica", 8.5, BODY, 4.2 * mm)
        y -= 1 * mm
        # Plain terms
        c.setFont("Helvetica-Oblique", 8); c.setFillColor(CYAN_DARK)
        for line in textwrap.wrap(f"In plain terms: {plain.replace('In plain terms: ', '')}", 102):
            c.drawString(MARGIN, y, line); y -= 4 * mm
        y -= 5 * mm

    draw_footer(c)
    c.showPage()

    # ── PAGE 2 ────────────────────────────────────────────────────────────────
    draw_header(c, "CRIO Framework")
    y = H - HEADER_H - 14 * mm

    components2 = [
        ("I", "Interview",
         "Ask AI to slow down before it responds. Tell it to interview you with three questions, "
         "one at a time, before it gives you anything. This is the step most people skip, and it "
         "is the most important one. Without it, AI guesses at your situation and produces something "
         "generic. With it, AI builds a real understanding of your specific context before it says "
         "anything useful. Three questions is the right number. Too few and AI does not have enough. "
         "Too many and it starts to loop.",
         "Before you respond, ask me three questions, one at a time, to make sure you fully understand my situation."),
        ("O", "Output",
         "Now tell AI exactly what you want back. Not a general ask. A specific, concrete deliverable "
         "that you could actually use. Options with trade-offs. A decision memo. Three possible "
         "approaches with a recommendation. A first draft of the communication. A list of the "
         "assumptions you should pressure-test before you commit. The more precise your output "
         "request, the more usable the result. Vague asks produce vague answers.",
         "Here is exactly what I want you to produce for me."),
    ]

    for letter, name, body, plain in components2:
        chip_size = 9 * mm
        c.setFillColor(CYAN); c.setStrokeColor(colors.white)
        c.roundRect(MARGIN, y - chip_size + 2 * mm, chip_size, chip_size, 1.5, fill=1, stroke=0)
        c.setFont("Helvetica-Bold", 14); c.setFillColor(WHITE)
        c.drawCentredString(MARGIN + chip_size / 2, y - chip_size / 2, letter)
        c.setFont("Helvetica-Bold", 12); c.setFillColor(NAVY)
        c.drawString(MARGIN + chip_size + 3 * mm, y - 1 * mm, f"\u2014  {name}")
        y -= chip_size + 2 * mm
        y = wrap_text(c, body, MARGIN, y, CONTENT_W, "Helvetica", 8.5, BODY, 4.2 * mm)
        y -= 1 * mm
        c.setFont("Helvetica-Oblique", 8); c.setFillColor(CYAN_DARK)
        for line in textwrap.wrap(f"In plain terms: {plain}", 102):
            c.drawString(MARGIN, y, line); y -= 4 * mm
        y -= 5 * mm

    # Divider
    c.setStrokeColor(DIVIDER); c.setLineWidth(0.5)
    c.line(MARGIN, y, W - MARGIN, y); y -= 8 * mm

    # Worked example
    c.setFont("Helvetica-Bold", 12); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "A Worked Example")
    y -= 6 * mm
    c.setFont("Helvetica-Oblique", 8.5); c.setFillColor(MUTED)
    c.drawString(MARGIN, y, "A leader is preparing to restructure their team and is not sure how to communicate it.")
    y -= 8 * mm

    # Example box
    ex_lines = [
        ("Context:", "I am the Managing Director of a 40-person marketing agency. We are about to restructure our team, "
         "moving from a department-based model to client-focused pods. Three people will be made redundant. Two others "
         "will move into new roles they did not ask for. I need to communicate this to the team next Friday. I have "
         "done restructures before and they have not always landed well. Trust in leadership is fragile right now."),
        ("Role:", "Act as an organizational psychologist who specializes in helping leaders communicate difficult change "
         "with honesty and empathy."),
        ("Interview:", "Before you give me anything, ask me three questions to understand the deeper context. "
         "Ask me one question at a time."),
        ("Output:", "Once you have enough context, give me a suggested structure for the all-hands communication, "
         "the three things I must say to maintain trust, and the one thing I should avoid saying even if it feels reassuring."),
    ]
    box_x = MARGIN + 3 * mm
    box_w = CONTENT_W - 6 * mm
    total_h = 0
    temp_y = 0
    for label, text in ex_lines:
        lines = textwrap.wrap(text, int(box_w / (8.5 * 0.53)))
        total_h += (1 + len(lines)) * 4.2 * mm + 1.5 * mm
    total_h += 8 * mm
    c.setFillColor(CYAN_LIGHT); c.setStrokeColor(CYAN_BORDER); c.setLineWidth(0.5)
    c.roundRect(MARGIN, y - total_h, CONTENT_W, total_h, 2, fill=1, stroke=1)
    ty = y - 5 * mm
    for label, text in ex_lines:
        c.setFont("Helvetica-Bold", 8.5); c.setFillColor(CYAN_DARK)
        c.drawString(box_x, ty, label)
        ty -= 4.2 * mm
        c.setFont("Helvetica", 8.5); c.setFillColor(BODY)
        for line in textwrap.wrap(text, int(box_w / (8.5 * 0.53))):
            c.drawString(box_x, ty, line); ty -= 4.2 * mm
        ty -= 1.5 * mm
    y -= total_h + 6 * mm

    closing = ("That prompt takes about three minutes to write. What comes back will be more useful than "
               "most things a leader could produce on their own in an hour.")
    y = wrap_text(c, closing, MARGIN, y, CONTENT_W, "Helvetica-Oblique", 8.5, BODY, 4.5 * mm)
    y -= 8 * mm

    draw_footer(c)
    c.showPage()

    # ── PAGE 3 ────────────────────────────────────────────────────────────────
    draw_header(c, "CRIO Framework")
    y = H - HEADER_H - 16 * mm

    c.setFont("Helvetica-Bold", 13); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "The Shift to Remember")
    y -= 7 * mm

    c.setFont("Helvetica", 10); c.setFillColor(BODY)
    c.drawString(MARGIN, y, "Every time you sit down with a problem, the old question is:")
    c.setFont("Helvetica-Oblique", 10); c.setFillColor(MUTED)
    c.drawString(MARGIN, y - 5 * mm, "how can I do this?")
    y -= 10 * mm
    c.setFont("Helvetica", 10); c.setFillColor(BODY)
    c.drawString(MARGIN, y, "The new question is:")
    c.setFont("Helvetica-Bold", 10); c.setFillColor(CYAN)
    c.drawString(MARGIN, y - 5 * mm, "how can AI help me do this?")
    y -= 11 * mm
    c.setFont("Helvetica-Bold", 10); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "It sounds small. It is not.")
    y -= 18 * mm

    # CTA box
    cta_h = 22 * mm
    c.setFillColor(CYAN_LIGHT); c.setStrokeColor(CYAN_BORDER); c.setLineWidth(0.5)
    c.roundRect(MARGIN, y - cta_h, CONTENT_W, cta_h, 3, fill=1, stroke=1)
    c.setFont("Helvetica-Bold", 10); c.setFillColor(NAVY)
    c.drawCentredString(W / 2, y - 7 * mm, "Want to bring CRIO into your leadership team?")
    c.setFont("Helvetica", 9); c.setFillColor(BODY)
    c.drawCentredString(W / 2, y - 12 * mm, "Tomas Bay runs hands-on workshops that go from concept to real workflows in a single session.")
    c.setFont("Helvetica-Bold", 9); c.setFillColor(CYAN)
    c.drawCentredString(W / 2, y - 17 * mm, "coachbay.ai  |  coach@coachbay.ai")

    draw_footer(c)
    c.showPage()

    c.save()
    print(f"Wrote {out}")


if __name__ == "__main__":
    build()
