"""
build-canvases.py
Generates the 9R Deletion Audit Canvas and 9P Digital Project Canvas PDFs.
Landscape A4, 3x3 grid, cyan accents, CoachBay branding.
Run: python build-canvases.py
"""

from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
import os

LW, LH = landscape(A4)  # 297 x 210 mm
CYAN   = colors.HexColor("#00BCD4")
NAVY   = colors.HexColor("#1A1A2E")
BODY   = colors.HexColor("#1E293B")
MUTED  = colors.HexColor("#64748B")
BG     = colors.HexColor("#F1F5F9")
WHITE  = colors.white
DIVIDER = colors.HexColor("#E2E8F0")

MARGIN = 14 * mm
ROBOT_PATH = os.path.join(os.path.dirname(__file__), "public", "coachbay-robot-transparent.png")

CANVASES = [
    {
        "filename": "public/CoachBay_Deletion_Audit_Canvas.pdf",
        "title": "Deletion Audit Canvas",
        "boxes": [
            ("1. ROUTINE",     "What's the recurring work, meeting, or output?"),
            ("2. RESPONSIBLE", "Who spends their time on this?"),
            ("3. REASON",      "Why was this created in the first place?"),
            ("4. REALITY",     "How much time and effort does it consume?"),
            ("5. REPLACEMENT", "Could AI handle this? What would it look like?"),
            ("6. RELIEF",      "Why would people be happy to see this change?"),
            ("7. RISK",        "Why might the AI idea fail?"),
            ("8. REFEREE",     "Who makes the final call?"),
            ("9. RUN",         "How do we test this AI idea in two weeks?"),
        ],
    },
    {
        "filename": "public/CoachBay_Digital_Project_Canvas.pdf",
        "title": "Digital Project Canvas",
        "boxes": [
            ("1. PERSON",    "Who is the customer?"),
            ("2. PROCESS",   "What are they trying to do?"),
            ("3. PROBLEM",   "What's getting in their way?"),
            ("4. PROOF",     "What does the data show?"),
            ("5. PROPOSAL",  "What's the possible AI solution?"),
            ("6. PAYOFF",    "Why will it make the customers smile?"),
            ("7. PITFALLS",  "Why might the idea fail?"),
            ("8. PARTNERS",  "Who do we need support from?"),
            ("9. PROTOTYPE", "How do we test the idea?"),
        ],
    },
]


def draw_canvas(spec):
    path = os.path.join(os.path.dirname(__file__), spec["filename"])
    c = canvas.Canvas(path, pagesize=landscape(A4))

    # ── Background ──────────────────────────────────────────────
    c.setFillColor(BG)
    c.rect(0, 0, LW, LH, fill=1, stroke=0)

    # ── Header band ─────────────────────────────────────────────
    header_h = 18 * mm
    header_y = LH - MARGIN - header_h
    c.setFillColor(WHITE)
    c.rect(MARGIN, header_y, LW - 2 * MARGIN, header_h, fill=1, stroke=0)

    # Robot icon
    robot_h = 11 * mm
    robot_w = robot_h * 0.768
    robot_x = MARGIN + 5 * mm
    robot_y = header_y + (header_h - robot_h) / 2
    if os.path.exists(ROBOT_PATH):
        c.drawImage(ROBOT_PATH, robot_x, robot_y, width=robot_w, height=robot_h,
                    preserveAspectRatio=True, mask="auto")

    # Title
    title_x = robot_x + robot_w + 4 * mm
    title_y = header_y + header_h / 2 - 3 * mm
    c.setFont("Helvetica-Bold", 16)
    c.setFillColor(NAVY)
    c.drawString(title_x, title_y, spec["title"])

    # Name / Topic fields
    field_y = header_y + header_h / 2 + 1 * mm
    line_y = field_y - 4.5 * mm

    name_label_x = LW / 2 - 10 * mm
    c.setFont("Helvetica", 8)
    c.setFillColor(MUTED)
    c.drawString(name_label_x, field_y, "Name:")
    c.setStrokeColor(MUTED)
    c.setLineWidth(0.5)
    c.line(name_label_x, line_y, name_label_x + 45 * mm, line_y)

    topic_label_x = name_label_x + 50 * mm
    c.drawString(topic_label_x, field_y, "Topic:")
    c.line(topic_label_x, line_y, topic_label_x + 65 * mm, line_y)

    # ── Grid ────────────────────────────────────────────────────
    grid_top = header_y - 3 * mm
    grid_bottom = MARGIN + 10 * mm
    grid_left = MARGIN
    grid_right = LW - MARGIN
    grid_w = grid_right - grid_left
    grid_h = grid_top - grid_bottom

    cols = 3
    rows = 3
    cell_w = grid_w / cols
    cell_h = grid_h / rows

    for row in range(rows):
        for col in range(cols):
            idx = row * cols + col
            label, question = spec["boxes"][idx]

            x = grid_left + col * cell_w
            y = grid_top - (row + 1) * cell_h

            # White cell background
            c.setFillColor(WHITE)
            c.rect(x, y, cell_w, cell_h, fill=1, stroke=0)

            # Cyan border
            c.setStrokeColor(CYAN)
            c.setLineWidth(1)
            c.rect(x, y, cell_w, cell_h, fill=0, stroke=1)

            # Number in cyan, rest in navy bold
            num_part = label.split(".")[0] + "."
            name_part = label.split(". ", 1)[1] if ". " in label else label

            text_x = x + 4 * mm
            text_y = y + cell_h - 7 * mm

            c.setFont("Helvetica-Bold", 11)
            c.setFillColor(CYAN)
            c.drawString(text_x, text_y, num_part)
            num_w = c.stringWidth(num_part, "Helvetica-Bold", 11)

            c.setFillColor(NAVY)
            c.drawString(text_x + num_w + 1 * mm, text_y, name_part)

            # Question in italic muted
            q_y = text_y - 5.5 * mm
            c.setFont("Helvetica-Oblique", 9)
            c.setFillColor(MUTED)
            c.drawString(text_x, q_y, question)

    # ── Footer ──────────────────────────────────────────────────
    footer_y = MARGIN + 2 * mm
    c.setFont("Helvetica-Bold", 7)
    c.setFillColor(MUTED)
    # Spaced out COACHBAY.AI
    footer_text = "C O A C H B A Y . A I"
    fw = c.stringWidth(footer_text, "Helvetica-Bold", 7)
    c.drawString((LW - fw) / 2, footer_y, footer_text)

    c.save()
    print(f"  Created: {path}")


if __name__ == "__main__":
    print("Building canvas PDFs...")
    for spec in CANVASES:
        draw_canvas(spec)
    print("Done.")
