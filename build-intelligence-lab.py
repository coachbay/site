# The Intelligence Lab - Workshop Agenda PDFs
# For Swire Properties three-day workshop series in April 2026.
#
# Generates one page A4 agendas in /public/:
#   - CoachBay_Intelligence_Lab_Day2_Agenda.pdf  (Monday 27 April 2026)
#   - CoachBay_Intelligence_Lab_Day3_Agenda.pdf  (Wednesday 29 April 2026)
#
# Day 2 is revised from Day 1 based on what worked on April 20:
#   - CRIO Demo shortened, new Personal CRIO Test block added
#   - Define shortened, extra mid-morning break added
#   - Discover expanded
#   - Debate split into two halves with break
#   - Deliver names Lovable as a prototyping option
#   - Presentations and Wrap separated
#   - One case per team (was one shared case on Day 1)
#   - Day ends at 17:20
#
# Run with: python3 build-intelligence-lab.py

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
import textwrap

W, H = A4
MARGIN_L = 18 * mm
MARGIN_R = 18 * mm
MARGIN_T = 15 * mm
MARGIN_B = 13 * mm
CONTENT_W = W - MARGIN_L - MARGIN_R

# CoachBay brand palette
CYAN = colors.HexColor("#00BCD4")
CYAN_DARK = colors.HexColor("#0097A7")
NAVY = colors.HexColor("#1A1A2E")
BODY = colors.HexColor("#334155")
MUTED = colors.HexColor("#64748B")
DIVIDER = colors.HexColor("#E2E8F0")
SOFT = colors.HexColor("#F1F5F9")
WHITE = colors.white

# Column layout for the agenda rows
COL_TIME_W = 28 * mm
COL_DUR_W = 18 * mm
COL_BLOCK_W = CONTENT_W - COL_TIME_W - COL_DUR_W


# -----------------------------------------------------------------------------
# Day definitions.
# Each item is (time, title, description, duration_minutes).
# Special titles:  __break__  __lunch__  render as muted divider rows.
# -----------------------------------------------------------------------------

DAY2_MORNING = [
    ("09:00 - 09:10", "Opening",
     "Welcome, group assignments, agenda, outcomes.", 10),
    ("09:10 - 09:35", "Assessment and Debrief",
     "Individual AI readiness assessment followed by group conversation on what it surfaced. Sets the tone for the day.", 25),
    ("09:35 - 10:10", "CRIO™ Framework: Live Demonstration",
     "Walk through CRIO™ (Context, Role, Interview, Output). Live demo on a real challenge from someone in the room. Short debrief: what you noticed, what to steal, where the quality jumps.", 35),
    ("10:10 - 10:20", "__break__", "", 10),
    ("10:20 - 10:45", "Personal CRIO Test",
     "Each participant runs a short CRIO on a personal challenge of their own. Hands on practice before the case work begins. Quick share of what surprised them.", 25),
    ("10:45 - 10:55", "Case Introduction",
     "Hand out the case sheets. Each team receives their own case. Teams read. Quick clarifications.", 10),
    ("10:55 - 11:10", "DEFINE",
     "Team huddle without AI. What is the real challenge here, what does a good outcome look like, what are we not solving.", 15),
    ("11:10 - 11:20", "__break__", "", 10),
    ("11:20 - 12:30", "DISCOVER",
     "Apply CRIO™ to the case. Build the prompt, generate first solution directions, react to what AI gives back.", 70),
    ("12:30 - 13:30", "__lunch__", "", 60),
]

DAY2_AFTERNOON = [
    ("13:30 - 14:00", "DISCOVER Finetune",
     "Sharpen the top direction after lunch. Short term, mid term, long term implementation.", 30),
    ("14:00 - 14:30", "DEBATE",
     "Prompt AI to argue against the chosen solution: risks, pushback, blind spots. First pass.", 30),
    ("14:30 - 14:40", "__break__", "", 10),
    ("14:40 - 15:10", "DEBATE continued",
     "Compare alternatives. Refine into an evidence backed recommendation.", 30),
    ("15:10 - 16:00", "DELIVER",
     "Draft the presentation in PowerPoint, or prototype the solution in Lovable if the idea is digital. Structure: problem, solution, implementation, next steps. Prompt AI to anticipate tough questions from senior leadership.", 50),
    ("16:00 - 16:10", "__break__", "", 10),
    ("16:10 - 17:00", "Presentations",
     "Each team presents (5 to 6 min) plus Q&A.", 50),
    ("17:00 - 17:20", "Wrap",
     "Group debrief: what AI did well, where human judgment mattered most. Each participant commits to one AI use for next week. Close.", 20),
]

DAY2_FOOTER = ("Day 2 timings refined after Day 1 delivery on 20 April. The main shifts: a shorter CRIO demo "
               "followed by personal CRIO practice, one case per team instead of one shared case, an extra break before "
               "Presentations, and Lovable added as a prototyping option for teams with a digital solution.")


# Day 3 is expected to mirror Day 2 structure. Update when agenda is confirmed.
DAY3_MORNING = DAY2_MORNING
DAY3_AFTERNOON = DAY2_AFTERNOON
DAY3_FOOTER = ("Day 3 follows the same structure as Day 2. Update this footer and the rows when the final "
               "agenda is confirmed.")


# -----------------------------------------------------------------------------
# Drawing primitives
# -----------------------------------------------------------------------------

def draw_header(c, day_num, day_date, end_time):
    c.setFillColor(CYAN)
    c.rect(0, H - 5 * mm, W, 5 * mm, fill=1, stroke=0)

    y_title = H - MARGIN_T
    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(NAVY)
    c.drawString(MARGIN_L, y_title - 4 * mm, "The Intelligence Lab")

    c.setFont("Helvetica", 10.5)
    c.setFillColor(MUTED)
    subtitle = f"Day {day_num} Agenda  |  {day_date}  |  09:00 to {end_time}  |  Swire Properties"
    c.drawString(MARGIN_L, y_title - 10 * mm, subtitle)

    c.setStrokeColor(CYAN)
    c.setLineWidth(1.2)
    c.line(MARGIN_L, y_title - 13 * mm, W - MARGIN_R, y_title - 13 * mm)

    return y_title - 20 * mm


def draw_section_header(c, y, label):
    c.setFont("Helvetica-Bold", 13.5)
    c.setFillColor(CYAN_DARK)
    c.drawString(MARGIN_L, y, label)
    c.setStrokeColor(DIVIDER)
    c.setLineWidth(0.5)
    c.line(MARGIN_L, y - 2.5 * mm, W - MARGIN_R, y - 2.5 * mm)
    return y - 7 * mm


def wrap_text(text, width_chars):
    return textwrap.wrap(text, width_chars) if text else []


def draw_block_row(c, y, time_str, title, description, duration_min):
    c.setFont("Helvetica-Bold", 9.5)
    c.setFillColor(NAVY)
    c.drawString(MARGIN_L, y, time_str)

    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(NAVY)
    title_x = MARGIN_L + COL_TIME_W
    c.drawString(title_x, y, title)

    c.setFont("Helvetica-Oblique", 9)
    c.setFillColor(MUTED)
    c.drawRightString(W - MARGIN_R, y, f"{duration_min} min")

    cur_y = y - 4.5 * mm
    c.setFont("Helvetica", 9)
    c.setFillColor(BODY)
    for line in wrap_text(description, 80):
        c.drawString(title_x, cur_y, line)
        cur_y -= 3.5 * mm

    c.setStrokeColor(DIVIDER)
    c.setLineWidth(0.3)
    c.line(MARGIN_L, cur_y - 0.8 * mm, W - MARGIN_R, cur_y - 0.8 * mm)

    return cur_y - 3 * mm


def draw_break_row(c, y, time_str, label):
    c.setFont("Helvetica-Oblique", 9)
    c.setFillColor(MUTED)
    c.drawString(MARGIN_L, y, time_str)
    c.drawString(MARGIN_L + COL_TIME_W, y, label)

    c.setStrokeColor(DIVIDER)
    c.setLineWidth(0.3)
    c.line(MARGIN_L, y - 1.8 * mm, W - MARGIN_R, y - 1.8 * mm)

    return y - 5 * mm


def draw_rows(c, y, rows):
    for time_str, title, description, dur in rows:
        if title == "__break__":
            y = draw_break_row(c, y, time_str, "Break")
        elif title == "__lunch__":
            y = draw_break_row(c, y, time_str, "Lunch")
        else:
            y = draw_block_row(c, y, time_str, title, description, dur)
    return y


def draw_footer(c, footer_note):
    y = MARGIN_B + 8 * mm
    c.setStrokeColor(DIVIDER)
    c.setLineWidth(0.4)
    c.line(MARGIN_L, y + 6 * mm, W - MARGIN_R, y + 6 * mm)

    c.setFont("Helvetica-Oblique", 8.5)
    c.setFillColor(MUTED)
    for line in wrap_text(footer_note, 120):
        c.drawString(MARGIN_L, y, line)
        y -= 3.4 * mm

    # CoachBay.ai branding, right aligned
    c.setFont("Helvetica-Bold", 8.5)
    label = "CoachBay"
    label_ai = ".ai"
    label_w = c.stringWidth(label, "Helvetica-Bold", 8.5)
    ai_w = c.stringWidth(label_ai, "Helvetica-Bold", 8.5)
    start_x = W - MARGIN_R - label_w - ai_w
    c.setFillColor(NAVY)
    c.drawString(start_x, MARGIN_B - 1 * mm, label)
    c.setFillColor(CYAN)
    c.drawString(start_x + label_w, MARGIN_B - 1 * mm, label_ai)


# -----------------------------------------------------------------------------
# Build one day to a single page PDF.
# -----------------------------------------------------------------------------

def build_day(out_path, day_num, day_date, end_time, morning, afternoon, footer_note):
    c = canvas.Canvas(out_path, pagesize=A4)
    y = draw_header(c, day_num=day_num, day_date=day_date, end_time=end_time)

    y = draw_section_header(c, y, "Morning")
    y = draw_rows(c, y, morning)

    y -= 2 * mm
    y = draw_section_header(c, y, "Afternoon")
    y = draw_rows(c, y, afternoon)

    draw_footer(c, footer_note)
    c.showPage()
    c.save()
    print(f"Wrote {out_path}")


def main():
    build_day(
        out_path="public/CoachBay_Intelligence_Lab_Day2_Agenda.pdf",
        day_num=2,
        day_date="Monday, 27 April 2026",
        end_time="17:20",
        morning=DAY2_MORNING,
        afternoon=DAY2_AFTERNOON,
        footer_note=DAY2_FOOTER,
    )

    # Day 3 currently mirrors Day 2. Update the DAY3_* blocks above when the final
    # Day 3 agenda is confirmed, then uncomment this call.
    # build_day(
    #     out_path="public/CoachBay_Intelligence_Lab_Day3_Agenda.pdf",
    #     day_num=3,
    #     day_date="Wednesday, 29 April 2026",
    #     end_time="17:20",
    #     morning=DAY3_MORNING,
    #     afternoon=DAY3_AFTERNOON,
    #     footer_note=DAY3_FOOTER,
    # )


if __name__ == "__main__":
    main()
