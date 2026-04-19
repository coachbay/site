# Three Buckets one page handout - run with: python3 build-three-buckets.py
# Generates /public/CoachBay_Three_Buckets.pdf using ReportLab.

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas

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
WHITE = colors.white

BUCKET_COLORS = [
    {  # 1. CUT (red)
        "chip": colors.HexColor("#E53935"),
        "chip_bg": colors.HexColor("#FFEBEE"),
        "chip_border": colors.HexColor("#FFCDD2"),
    },
    {  # 2. CREATE (amber)
        "chip": colors.HexColor("#FB8C00"),
        "chip_bg": colors.HexColor("#FFF3E0"),
        "chip_border": colors.HexColor("#FFE0B2"),
    },
    {  # 3. AMPLIFY (brand cyan)
        "chip": colors.HexColor("#00BCD4"),
        "chip_bg": colors.HexColor("#E0F7FA"),
        "chip_border": colors.HexColor("#80DEEA"),
    },
]

ROBOT = "public/coachbay-robot-transparent.png"
ROBOT_H = 10 * mm
ROBOT_W = ROBOT_H * 0.768
HEADER_H = 18 * mm


def _wrap(c, text, font, size, max_w):
    words = text.split()
    lines = []
    cur = []
    cur_w = 0
    space_w = c.stringWidth(" ", font, size)
    for word in words:
        ww = c.stringWidth(word, font, size)
        add = ww + (space_w if cur else 0)
        if cur and cur_w + add > max_w:
            lines.append(" ".join(cur))
            cur = [word]
            cur_w = ww
        else:
            cur.append(word)
            cur_w += add
    if cur:
        lines.append(" ".join(cur))
    return lines


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
    c.drawString(MARGIN, y, "The Three Buckets")
    c.setFillColor(CYAN)
    c.rect(MARGIN, y - 5 * mm, 18 * mm, 1.1 * mm, fill=1, stroke=0)

    intro = (
        "The Three Buckets is a simple sorting exercise I use in my Manifesto Workshop "
        "and Leadership Sprint. List about a dozen tasks you do in a typical week, sort "
        "each into one of the three buckets below, and over time shift your energy from "
        "Cut toward Amplify."
    )
    c.setFont("Helvetica", 10); c.setFillColor(BODY)
    y2 = y - 11 * mm
    for line in _wrap(c, intro, "Helvetica", 10, CONTENT_W):
        c.drawString(MARGIN, y2, line); y2 -= 4.8 * mm
    return y2 - 3 * mm


def draw_bucket_card(c, x, y, w, h, number, label, title, body, examples, questions, palette):
    # Card shell
    c.setFillColor(WHITE); c.setStrokeColor(DIVIDER); c.setLineWidth(0.5)
    c.roundRect(x, y - h, w, h, 4, fill=1, stroke=1)

    # Number chip (top left)
    chip_size = 8 * mm
    chip_x = x + 5 * mm
    chip_y = y - 11 * mm
    c.setFillColor(palette["chip_bg"]); c.setStrokeColor(palette["chip_border"]); c.setLineWidth(0.5)
    c.roundRect(chip_x, chip_y, chip_size, chip_size, 2, fill=1, stroke=1)
    c.setFont("Helvetica-Bold", 11); c.setFillColor(palette["chip"])
    num_w = c.stringWidth(number, "Helvetica-Bold", 11)
    c.drawString(chip_x + (chip_size - num_w) / 2, chip_y + 2.4 * mm, number)

    # Label (CUT / CREATE / AMPLIFY)
    baseline_y = chip_y + 2.4 * mm
    label_x = chip_x + chip_size + 3 * mm
    c.setFont("Helvetica-Bold", 13); c.setFillColor(palette["chip"])
    c.drawString(label_x, baseline_y, label)
    label_w = c.stringWidth(label, "Helvetica-Bold", 13)

    # Subtitle
    c.setFont("Helvetica-Bold", 10); c.setFillColor(NAVY)
    c.drawString(label_x + label_w + 3 * mm, baseline_y, title)

    # Body paragraph
    body_indent = 5 * mm
    body_max_w = w - 2 * body_indent
    c.setFont("Helvetica", 9); c.setFillColor(BODY)
    ty = y - 19 * mm
    for line in _wrap(c, body, "Helvetica", 9, body_max_w):
        c.drawString(x + body_indent, ty, line); ty -= 4.3 * mm

    # Examples line (italic, muted)
    ty -= 1 * mm
    c.setFont("Helvetica-BoldOblique", 8.5); c.setFillColor(MUTED)
    c.drawString(x + body_indent, ty, "Examples:")
    ex_prefix_w = c.stringWidth("Examples:", "Helvetica-BoldOblique", 8.5) + 1.5 * mm
    c.setFont("Helvetica-Oblique", 8.5); c.setFillColor(MUTED)
    first_line_w = body_max_w - ex_prefix_w
    ex_lines = _wrap(c, examples, "Helvetica-Oblique", 8.5, first_line_w)
    if ex_lines:
        c.drawString(x + body_indent + ex_prefix_w, ty, ex_lines[0])
        ty -= 4 * mm
        rest = " ".join(ex_lines[1:]) if len(ex_lines) > 1 else ""
        if rest:
            for ln in _wrap(c, rest, "Helvetica-Oblique", 8.5, body_max_w):
                c.drawString(x + body_indent, ty, ln); ty -= 4 * mm

    # Ask yourself block
    ty -= 1 * mm
    c.setFont("Helvetica-Bold", 8.5); c.setFillColor(palette["chip"])
    c.drawString(x + body_indent, ty, "Ask yourself:")
    ty -= 4 * mm
    c.setFont("Helvetica", 9); c.setFillColor(BODY)
    bullet = "\u2022"  # round bullet
    bullet_indent = 3 * mm
    for q in questions:
        c.setFillColor(palette["chip"])
        c.drawString(x + body_indent, ty, bullet)
        c.setFillColor(BODY)
        q_lines = _wrap(c, q, "Helvetica", 9, body_max_w - bullet_indent)
        for i, ln in enumerate(q_lines):
            c.drawString(x + body_indent + bullet_indent, ty, ln); ty -= 4.3 * mm


def build_pdf(path):
    c = canvas.Canvas(path, pagesize=A4)
    draw_header(c, "The Three Buckets")
    draw_footer(c)

    y_after_title = draw_title_block(c, H - HEADER_H - 12 * mm)

    buckets = [
        (
            "1", "CUT", "Tasks AI can do now or soon",
            "The efficiency work. Hand it to AI so you get your time back for the work that matters. Every hour saved here becomes an hour for Create or Amplify.",
            "first drafts, meeting notes, quick summaries, routine analysis, basic coding, scheduling, data cleanup",
            [
                "What do I do every week that feels mechanical?",
                "Which tasks drain me because they are tedious, not because they are hard?",
                "What could a capable assistant do with clear instructions?",
            ],
        ),
        (
            "2", "CREATE", "New things you can do because of AI",
            "The stretch work. AI makes the ceiling higher for everyone. Learn a skill you thought was out of reach, bridge an expertise gap, or take on a project that used to feel too big.",
            "build a prototype, learn a new field, ship an idea you could not ship alone, analyze something you never had time for",
            [
                "What have I wanted to build or learn but felt I lacked the time or skill?",
                "Where does my expertise stop, and could AI help bridge the gap?",
                "What project have I shelved because it felt too ambitious?",
            ],
        ),
        (
            "3", "AMPLIFY", "What is uniquely you",
            "The work only you can do. Deep judgment, complex relationships, original ideas, your distinct strengths. This is where the time you save lets you double down. No one beats you at being you.",
            "coaching a team member, closing a tough deal, making a hard call, shaping culture, telling your story",
            [
                "What can we get better at that we are already great at?",
                "What do people consistently come to me for?",
                "Where could AI make my strongest work even stronger?",
            ],
        ),
    ]

    gap = 4 * mm
    card_h = 62 * mm
    card_w = CONTENT_W
    y = y_after_title
    for (num, label, title, body, examples, questions), palette in zip(buckets, BUCKET_COLORS):
        draw_bucket_card(c, MARGIN, y, card_w, card_h, num, label, title, body, examples, questions, palette)
        y -= card_h + gap

    # Closing italic lines, anchored to the footer
    footer_top = 14 * mm
    closing_y = footer_top + 22 * mm
    c.setFont("Helvetica-Oblique", 10); c.setFillColor(MUTED)
    closing = "Shift your energy from Cut toward Amplify. That is where the real value lives."
    cw = c.stringWidth(closing, "Helvetica-Oblique", 10)
    c.drawString((W - cw) / 2, closing_y, closing)
    tag = "No one beats you at being you."
    c.setFont("Helvetica-BoldOblique", 10); c.setFillColor(CYAN_DARK)
    tw = c.stringWidth(tag, "Helvetica-BoldOblique", 10)
    c.drawString((W - tw) / 2, closing_y - 6 * mm, tag)

    c.showPage()
    c.save()
    print(f"Wrote {path}")


if __name__ == "__main__":
    build_pdf("public/CoachBay_Three_Buckets.pdf")
