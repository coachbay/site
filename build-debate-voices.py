# Debate Voices reference card for the 4D Debate phase.
# Generates /public/CoachBay_Debate_Voices.pdf using ReportLab.
# Generic handout. Works for any company and any industry.

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
BG = colors.HexColor("#F8FAFC")
WHITE = colors.white

ROBOT = "public/coachbay-robot-transparent.png"
ROBOT_H = 10 * mm
ROBOT_W = ROBOT_H * 0.768
HEADER_H = 16 * mm


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
    c.line(MARGIN, 12 * mm, W - MARGIN, 12 * mm)
    c.setFont("Helvetica-Bold", 7.5); c.setFillColor(CYAN_DARK)
    c.drawString(MARGIN, 7.5 * mm, "Designed and delivered by Tomas Bay")
    c.setFont("Helvetica", 7.5); c.setFillColor(MUTED)
    c.drawRightString(W - MARGIN, 7.5 * mm, "coach@coachbay.ai")


def draw_title_block(c, y):
    c.setFont("Helvetica-Bold", 20); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "Debate Voices")
    c.setFont("Helvetica", 10); c.setFillColor(CYAN_DARK)
    c.drawString(MARGIN, y - 6 * mm, "4D Debate phase. Six roles to pressure test any proposal.")
    c.setStrokeColor(CYAN); c.setLineWidth(1.2)
    c.line(MARGIN, y - 9 * mm, MARGIN + 40 * mm, y - 9 * mm)
    return y - 14 * mm


def draw_intro(c, y):
    text = ("Pressure test the most promising options before you commit. Ask AI to take one "
            "of these roles, let it push back, then decide what the plan needs.")
    c.setFont("Helvetica", 9); c.setFillColor(BODY)
    for line in textwrap.wrap(text, 110):
        c.drawString(MARGIN, y, line); y -= 4.5 * mm
    return y - 3 * mm


def draw_voice_card(c, x, y, w, h, name, lens, prompt):
    c.setFillColor(WHITE); c.setStrokeColor(DIVIDER); c.setLineWidth(0.5)
    c.roundRect(x, y - h, w, h, 2, fill=1, stroke=1)
    c.setFillColor(CYAN); c.setStrokeColor(CYAN)
    c.rect(x, y - h, 1.2 * mm, h, fill=1, stroke=0)

    inner_x = x + 5 * mm
    cur_y = y - 5.5 * mm

    c.setFont("Helvetica-Bold", 10.5); c.setFillColor(NAVY)
    c.drawString(inner_x, cur_y, name)
    cur_y -= 5 * mm

    c.setFont("Helvetica-Bold", 7.5); c.setFillColor(CYAN_DARK)
    c.drawString(inner_x, cur_y, "LENS")
    cur_y -= 3.8 * mm
    c.setFont("Helvetica", 8.5); c.setFillColor(BODY)
    for line in textwrap.wrap(lens, 58):
        c.drawString(inner_x, cur_y, line); cur_y -= 3.8 * mm
    cur_y -= 1.5 * mm

    c.setFont("Helvetica-Bold", 7.5); c.setFillColor(CYAN_DARK)
    c.drawString(inner_x, cur_y, "PROMPT")
    cur_y -= 3.8 * mm
    c.setFont("Helvetica-Oblique", 8); c.setFillColor(BODY)
    for line in textwrap.wrap(prompt, 64):
        c.drawString(inner_x, cur_y, line); cur_y -= 3.5 * mm


VOICES = [
    {
        "name": "1. Long serving senior executive",
        "lens": "Brand, reputation, and whether this is worthy of your organization.",
        "prompt": ("You are a long serving senior executive who has been with this organization "
                   "for twenty years. You have seen initiatives come and go. You care deeply "
                   "about the organization's name and the standard it represents. You are not "
                   "easily impressed by new technology. Review the proposal above as that "
                   "person. Give us three reasons you would turn this proposal down today, and "
                   "for each one explain what we could do to change your mind. Finish by "
                   "telling us the one thing in this proposal that would make you proud if we "
                   "got it right."),
    },
    {
        "name": "2. Skeptical CFO",
        "lens": "Capital, cost, return, and opportunity cost.",
        "prompt": ("You are the CFO of this organization. You think in long cycle economics, "
                   "not quarterly tech spend. You want real numbers, not vague benefits. "
                   "Review the proposal above as that person. Tell us what numbers you would "
                   "need to see before you could approve this. Then list the three financial "
                   "risks that concern you most and what you would need to see to be satisfied "
                   "that each one is managed. Finish with the one commercial condition you "
                   "would attach to an approval."),
    },
    {
        "name": "3. Front line employee",
        "lens": "Can this actually be done on the ground, with the time and people available.",
        "prompt": ("You are a front line team lead or operations manager in this organization. "
                   "You already have a full plate of daily work. Review the proposal above as "
                   "that person. Tell us what you like about it, what you do not like, and "
                   "what you would change so it works on the ground. Then describe what a "
                   "typical Monday morning looks like after this is rolled out, and where it "
                   "could go wrong. Explain your reasoning throughout."),
    },
    {
        "name": "4. Demanding customer",
        "lens": "The experience of a key customer paying premium for your product or service.",
        "prompt": ("You are a key customer of this organization. You pay premium prices and "
                   "expect premium service. Review the proposal above as that person. Tell us "
                   "what you like, what you do not like, and what you would change. Then tell "
                   "us whether this would make you buy more from us, stay the same, or quietly "
                   "start looking elsewhere. Explain your reasoning throughout."),
    },
    {
        "name": "5. Red team executive",
        "lens": "Find the three weakest points and make the plan bulletproof.",
        "prompt": ("You are a tough, experienced executive who has seen similar initiatives "
                   "fail inside large organizations. You are not trying to kill the idea. You "
                   "are trying to make it bulletproof. Review the proposal above as that "
                   "person. Name the three weakest points in the plan. For each one, explain "
                   "why it could cause the plan to fail and what would need to be true for the "
                   "plan to survive it. Finish with the one assumption in this plan that you "
                   "would bet against."),
    },
    {
        "name": "6. Competitor",
        "lens": "What a rival would do in response.",
        "prompt": ("You are the strategy lead at a major competitor of this organization. You "
                   "have just learned that we are making this move. Review the proposal above "
                   "as that person. Tell us what you would do in response. Where do you see "
                   "the opening? What is your counter move? And if you chose not to respond at "
                   "all, what would be your reasoning? Explain your thinking throughout."),
    },
]


def draw_tip_box(c, y):
    text = ("Run two or three voices, not all six. Pick the ones that matter most for this "
            "specific project. Read the responses out loud, then ask the team which pushback "
            "is fair and what the plan needs to address.")
    lines = textwrap.wrap(text, 95)
    box_h = (6 + len(lines) * 4) * mm + 3 * mm
    c.setFillColor(CYAN_LIGHT); c.setStrokeColor(CYAN_BORDER); c.setLineWidth(0.5)
    c.roundRect(MARGIN, y - box_h, CONTENT_W, box_h, 2, fill=1, stroke=1)
    c.setFont("Helvetica-Bold", 8); c.setFillColor(CYAN_DARK)
    c.drawString(MARGIN + 4 * mm, y - 4.5 * mm, "FACILITATOR TIP")
    c.setFont("Helvetica", 8.5); c.setFillColor(BODY)
    ty = y - 8.5 * mm
    for line in lines:
        c.drawString(MARGIN + 4 * mm, ty, line); ty -= 4 * mm
    return y - box_h - 3 * mm


def build():
    out_path = "public/CoachBay_Debate_Voices.pdf"
    c = canvas.Canvas(out_path, pagesize=A4)

    draw_header(c, "DEBATE VOICES  |  4D DEBATE PHASE")
    draw_footer(c)

    y = H - HEADER_H - 10 * mm
    y = draw_title_block(c, y)
    y = draw_intro(c, y)

    col_gap = 4 * mm
    col_w = (CONTENT_W - col_gap) / 2
    tip_space = 22 * mm
    footer_space = 18 * mm
    grid_top = y
    grid_bottom = footer_space + tip_space
    grid_h = grid_top - grid_bottom
    row_gap = 3 * mm
    card_h = (grid_h - 2 * row_gap) / 3

    positions = []
    for row in range(3):
        for col in range(2):
            x = MARGIN + col * (col_w + col_gap)
            card_y = grid_top - row * (card_h + row_gap)
            positions.append((x, card_y))

    for i, v in enumerate(VOICES):
        x, card_y = positions[i]
        draw_voice_card(c, x, card_y, col_w, card_h, v["name"], v["lens"], v["prompt"])

    draw_tip_box(c, grid_bottom - 1 * mm)

    c.showPage()
    c.save()
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    build()
