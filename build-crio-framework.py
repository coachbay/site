# CRIO Framework — 2-page version.
# Page 1: title block + compact intro + all four CRIO components
# Page 2: worked example + The Shift to Remember + CTA

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
import textwrap

W, H = A4
MARGIN    = 18 * mm
CONTENT_W = W - 2 * MARGIN

CYAN       = colors.HexColor("#00BCD4")
CYAN_DARK  = colors.HexColor("#0097A7")
CYAN_LIGHT = colors.HexColor("#E0F7FA")
NAVY       = colors.HexColor("#1A1A2E")
BODY       = colors.HexColor("#334155")
MUTED      = colors.HexColor("#64748B")
DIVIDER    = colors.HexColor("#E2E8F0")
WHITE      = colors.white

ROBOT    = "public/coachbay-robot-transparent.png"
ROBOT_H  = 10 * mm
ROBOT_W  = ROBOT_H * 0.768
HEADER_H = 16 * mm


def draw_header(c, label):
    c.setFillColor(WHITE)
    c.rect(0, H - HEADER_H, W, HEADER_H, fill=1, stroke=0)
    c.setStrokeColor(DIVIDER); c.setLineWidth(0.4)
    c.line(0, H - HEADER_H, W, H - HEADER_H)
    ty = H - HEADER_H / 2 - 1.5 * mm
    ry = H - HEADER_H + (HEADER_H - ROBOT_H) / 2 + 1.4 * mm
    c.drawImage(ROBOT, MARGIN, ry, width=ROBOT_W, height=ROBOT_H, mask="auto")
    c.setFont("Helvetica-Bold", 13); c.setFillColor(NAVY)
    c.drawString(MARGIN + ROBOT_W + 2.5 * mm, ty, "CoachBay")
    cw = c.stringWidth("CoachBay", "Helvetica-Bold", 13)
    c.setFillColor(CYAN)
    c.drawString(MARGIN + ROBOT_W + 2.5 * mm + cw, ty, ".ai")
    c.setFont("Helvetica", 7.5); c.setFillColor(MUTED)
    c.drawRightString(W - MARGIN, ty, label)


def draw_footer(c):
    c.setStrokeColor(DIVIDER); c.setLineWidth(0.4)
    c.line(MARGIN, 11 * mm, W - MARGIN, 11 * mm)
    c.setFont("Helvetica", 7.5); c.setFillColor(MUTED)
    c.drawString(MARGIN, 7 * mm, "coachbay.ai  |  Tomas Bay, Executive Coach & Consultant")
    c.drawRightString(W - MARGIN, 7 * mm, "coach@coachbay.ai")


def wraptext(c, text, x, y, width, font, size, color, leading):
    c.setFont(font, size); c.setFillColor(color)
    chars = max(1, int(width / (size * 0.52)))
    for line in textwrap.wrap(text, chars):
        c.drawString(x, y, line)
        y -= leading
    return y


def hdivider(c, y):
    c.setStrokeColor(DIVIDER); c.setLineWidth(0.5)
    c.line(MARGIN, y, W - MARGIN, y)


def component(c, y, letter, name, body, plain):
    """Draw one CRIO component. Returns y after block."""
    # Large cyan letter
    c.setFont("Helvetica-Bold", 26); c.setFillColor(CYAN)
    c.drawString(MARGIN, y, letter)
    # Name beside it
    c.setFont("Helvetica-Bold", 12); c.setFillColor(NAVY)
    c.drawString(MARGIN + 10 * mm, y + 2 * mm, f"\u2014  {name}")
    y -= 7 * mm
    # Body at 9pt
    y = wraptext(c, body, MARGIN, y, CONTENT_W, "Helvetica", 9, BODY, 4.2 * mm)
    y -= 1.5 * mm
    # Plain terms at 9pt italic cyan
    y = wraptext(c, f"In plain terms: {plain}", MARGIN, y, CONTENT_W,
                 "Helvetica-Oblique", 9, CYAN_DARK, 4.2 * mm)
    return y


# ── PAGE 1: title + intro + all four components ────────────────────────────────

def page1(c):
    draw_header(c, "CRIO™ Framework")
    y = H - HEADER_H - 18 * mm

    # Title with TM superscript
    c.setFont("Helvetica-Bold", 48); c.setFillColor(CYAN)
    c.drawString(MARGIN, y, "CRIO")
    crio_w = c.stringWidth("CRIO", "Helvetica-Bold", 48)
    c.setFont("Helvetica-Bold", 18); c.setFillColor(CYAN)
    c.drawString(MARGIN + crio_w + 0.5 * mm, y + 8 * mm, "™")
    y -= 8 * mm
    c.setFont("Helvetica-Oblique", 10.5); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "A framework for getting real value from AI conversations")
    y -= 4.5 * mm
    c.setFont("Helvetica", 8.5); c.setFillColor(MUTED)
    c.drawString(MARGIN, y, "A CoachBay framework")
    y -= 5.5 * mm
    hdivider(c, y); y -= 7 * mm

    # Compact intro — single para + slim callout + one-liner bridge
    hook = ("You have been sitting with something for days. A decision you cannot quite land. "
            "A challenge that keeps circling back. You open AI, structure the conversation properly, "
            "and within ten minutes you are looking at angles and possibilities you had not considered before.")
    y = wraptext(c, hook, MARGIN, y, CONTENT_W, "Helvetica", 9, BODY, 4.2 * mm)
    y -= 4 * mm

    # Slim callout box
    bh = 10 * mm
    c.setFillColor(CYAN_LIGHT); c.setStrokeColor(WHITE); c.setLineWidth(0)
    c.roundRect(MARGIN, y - bh, CONTENT_W, bh, 2, fill=1, stroke=0)
    c.setFillColor(CYAN); c.setStrokeColor(CYAN); c.setLineWidth(2)
    c.line(MARGIN, y, MARGIN, y - bh)
    c.setFont("Helvetica-BoldOblique", 10); c.setFillColor(NAVY)
    c.drawString(MARGIN + 5 * mm, y - 6.5 * mm,
                 "That is what CRIO gives you. Not just a better answer. Hope.")
    y -= bh + 4 * mm

    bridge = ("The shift is simple but significant. Most people ask: how can I do this? "
              "CRIO teaches you to ask: how can AI help me do this?")
    y = wraptext(c, bridge, MARGIN, y, CONTENT_W, "Helvetica", 9, BODY, 4.2 * mm)
    y -= 7 * mm

    # Section heading
    c.setFont("Helvetica-Bold", 12); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "The Four Components")
    y -= 2.5 * mm
    hdivider(c, y); y -= 12 * mm

    # All four components
    y = component(c, y, "C", "Context",
        "Set the scene before you ask for anything. Tell AI what is really going on, not just the surface "
        "request. What is the situation? Why does it matter? Who is involved? What constraints are you "
        "working within? The more honest and specific you are here, the more useful everything that follows "
        "will be. AI can only work with what you give it. Vague context produces vague output.",
        "What is going on, why does it matter, and what does AI need to understand before it can help?")
    y -= 10 * mm

    y = component(c, y, "R", "Role",
        "Tell AI who to be. Not what to do yet, but whose perspective to bring. A skeptical CFO. An "
        "executive coach. A competitor's CEO. A board advisor who genuinely wants you to succeed but will "
        "not let you fool yourself. The role shapes everything: the tone, the angle, the level of challenge. "
        "A junior assistant gives you safe answers. A tough board member gives you the pushback you need.",
        "Answer this as if you were a specific expert whose perspective would be most useful to me right now.")
    y -= 10 * mm

    y = component(c, y, "I", "Interview",
        "Ask AI to slow down before it responds. Tell it to interview you with three questions, one at a "
        "time, before it gives you anything. This is the step most people skip, and it is the most important "
        "one. Without it, AI guesses at your situation and produces something generic. With it, AI builds "
        "real understanding before it says anything useful. Three questions is the right number.",
        "Before you respond, ask me three questions, one at a time, to make sure you fully understand my situation.")
    y -= 10 * mm

    y = component(c, y, "O", "Output",
        "Now tell AI exactly what you want back. Not a general ask. A specific, concrete deliverable you "
        "could actually use. Options with trade-offs. A decision memo. Three possible approaches with a "
        "recommendation. A first draft of the communication. A list of assumptions to pressure-test before "
        "you commit. The more precise your output request, the more usable the result.",
        "Here is exactly what I want you to produce for me.")

    draw_footer(c)
    c.showPage()


# ── PAGE 2: worked example + shift + CTA ──────────────────────────────────────

def page2(c):
    draw_header(c, "CRIO™ Framework")
    y = H - HEADER_H - 18 * mm

    # Worked example
    c.setFont("Helvetica-Bold", 13); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "A Worked Example")
    y -= 4 * mm
    c.setFont("Helvetica-Oblique", 9); c.setFillColor(MUTED)
    c.drawString(MARGIN, y, "A leader is preparing to restructure their team and is not sure how to communicate it.")
    y -= 7 * mm

    ex = [
        ("Context:", "I am the Managing Director of a 40-person marketing agency. We are about to restructure "
         "our team, moving from a department-based model to client-focused pods. Three people will be made "
         "redundant. Two others will move into new roles they did not ask for. I need to communicate this to "
         "the team next Friday. I have done restructures before and they have not always landed well. Trust "
         "in leadership is fragile right now."),
        ("Role:", "Act as an organizational psychologist who specializes in helping leaders communicate "
         "difficult change with honesty and empathy."),
        ("Interview:", "Before you give me anything, ask me three questions to understand the deeper context. "
         "Ask me one question at a time."),
        ("Output:", "Once you have enough context, give me a suggested structure for the all-hands "
         "communication, the three things I must say to maintain trust, and the one thing I should avoid "
         "saying even if it feels reassuring."),
    ]
    cw = int((CONTENT_W - 8 * mm) / (9 * 0.52))
    total_h = 8 * mm
    for _, t in ex:
        total_h += 5 * mm + len(textwrap.wrap(t, cw)) * 4.5 * mm + 2 * mm
    c.setFillColor(CYAN_LIGHT)
    c.setStrokeColor(colors.HexColor("#80DEEA")); c.setLineWidth(0.5)
    c.roundRect(MARGIN, y - total_h, CONTENT_W, total_h, 3, fill=1, stroke=1)
    ty = y - 5 * mm
    for label, text in ex:
        c.setFont("Helvetica-Bold", 9.5); c.setFillColor(CYAN_DARK)
        c.drawString(MARGIN + 4 * mm, ty, label); ty -= 5 * mm
        c.setFont("Helvetica", 9); c.setFillColor(BODY)
        for line in textwrap.wrap(text, cw):
            c.drawString(MARGIN + 4 * mm, ty, line); ty -= 4.5 * mm
        ty -= 2 * mm
    y -= total_h + 6 * mm

    c.setFont("Helvetica-Oblique", 9); c.setFillColor(BODY)
    c.drawString(MARGIN, y,
        "That prompt takes about three minutes to write. What comes back will be more useful than most things")
    c.drawString(MARGIN, y - 4.5 * mm, "a leader could produce on their own in an hour.")
    y -= 14 * mm

    # Divider
    hdivider(c, y); y -= 9 * mm

    # The Shift to Remember
    c.setFont("Helvetica-Bold", 13); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "The Shift to Remember")
    y -= 8 * mm
    c.setFont("Helvetica", 10); c.setFillColor(BODY)
    c.drawString(MARGIN, y, "Every time you sit down with a problem, the old question is:")
    y -= 5.5 * mm
    c.setFont("Helvetica-Oblique", 10); c.setFillColor(MUTED)
    c.drawString(MARGIN, y, "how can I do this?")
    y -= 6 * mm
    c.setFont("Helvetica", 10); c.setFillColor(BODY)
    c.drawString(MARGIN, y, "The new question is:")
    y -= 5.5 * mm
    c.setFont("Helvetica-Bold", 10); c.setFillColor(CYAN)
    c.drawString(MARGIN, y, "how can AI help me do this?")
    y -= 7 * mm
    c.setFont("Helvetica-Bold", 10); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "It sounds small. It is not.")
    y -= 16 * mm

    # CTA box
    cta_h = 24 * mm
    c.setFillColor(CYAN_LIGHT)
    c.setStrokeColor(colors.HexColor("#80DEEA")); c.setLineWidth(0.5)
    c.roundRect(MARGIN, y - cta_h, CONTENT_W, cta_h, 3, fill=1, stroke=1)
    c.setFont("Helvetica-Bold", 11); c.setFillColor(NAVY)
    c.drawCentredString(W / 2, y - 8 * mm, "Want to bring CRIO into your leadership team?")
    c.setFont("Helvetica", 9.5); c.setFillColor(BODY)
    c.drawCentredString(W / 2, y - 14 * mm,
        "Tomas Bay runs hands-on workshops that go from concept to real workflows in a single session.")
    c.setFont("Helvetica-Bold", 10); c.setFillColor(CYAN)
    c.drawCentredString(W / 2, y - 20 * mm, "coachbay.ai  |  coach@coachbay.ai")

    draw_footer(c)
    c.showPage()


def build():
    out = "public/CoachBay_CRIO.pdf"
    c = canvas.Canvas(out, pagesize=A4)
    page1(c)
    page2(c)
    c.save()
    print(f"Wrote {out}")


if __name__ == "__main__":
    build()
