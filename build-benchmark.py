# Benchmark PDF generator — run with: python3 build-benchmark.py
# Creates NLB_Assessment_Benchmark.pdf in /public/
# For Jeremy Utley's AI Mastermind group and general client use.
# Updated April 12, 2026 (Session 12) to reflect v2.1 changes.

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
GREEN = colors.HexColor("#10B981")
AMBER = colors.HexColor("#F59E0B")
RED = colors.HexColor("#EF4444")
ROBOT = "public/coachbay-robot-transparent.png"
ROBOT_H = 10 * mm
ROBOT_W = ROBOT_H * 0.768
HEADER_H = 18 * mm

OUT = "public/NLB_Assessment_Benchmark.pdf"

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

def section_title(c, y, text, size=12):
    c.setFont("Helvetica-Bold", size); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, text)
    c.setStrokeColor(CYAN); c.setLineWidth(1.2)
    tw = c.stringWidth(text, "Helvetica-Bold", size)
    c.line(MARGIN, y - 2 * mm, MARGIN + tw, y - 2 * mm)
    return y - 8 * mm

def body(c, y, text, wrap=115):
    c.setFont("Helvetica", 9); c.setFillColor(BODY)
    for line in textwrap.wrap(text, wrap):
        c.drawString(MARGIN, y, line); y -= 4.5 * mm
    return y - 3 * mm

def bullet(c, y, text, wrap=108, bold_prefix=None):
    if bold_prefix:
        c.setFont("Helvetica-Bold", 9); c.setFillColor(CYAN)
        c.drawString(MARGIN, y, ">")
        c.setFont("Helvetica-Bold", 9); c.setFillColor(NAVY)
        c.drawString(MARGIN + 4 * mm, y, bold_prefix)
        bw = c.stringWidth(bold_prefix, "Helvetica-Bold", 9)
        c.setFont("Helvetica", 9); c.setFillColor(BODY)
        rest = text
        first_line_chars = wrap - int(len(bold_prefix) * 1.1)
        if len(rest) > first_line_chars:
            split = rest.rfind(" ", 0, first_line_chars)
            if split == -1: split = first_line_chars
            c.drawString(MARGIN + 4 * mm + bw, y, rest[:split])
            y -= 4.5 * mm
            for line in textwrap.wrap(rest[split:].strip(), wrap):
                c.drawString(MARGIN + 4 * mm, y, line); y -= 4.5 * mm
        else:
            c.drawString(MARGIN + 4 * mm + bw, y, rest)
            y -= 4.5 * mm
    else:
        c.setFont("Helvetica-Bold", 9); c.setFillColor(CYAN)
        c.drawString(MARGIN, y, ">")
        c.setFont("Helvetica", 9); c.setFillColor(BODY)
        lines = textwrap.wrap(text, wrap)
        for line in lines:
            c.drawString(MARGIN + 4 * mm, y, line); y -= 4.5 * mm
    return y - 1.5 * mm

def table_row(c, y, cols, widths, header=False, fill=None):
    x = MARGIN
    if fill:
        total_w = sum(widths)
        c.setFillColor(fill)
        c.rect(x, y - 1 * mm, total_w, 5.5 * mm, fill=1, stroke=0)
    for i, (col, w) in enumerate(zip(cols, widths)):
        if header:
            c.setFont("Helvetica-Bold", 7.5); c.setFillColor(WHITE if fill else NAVY)
        else:
            c.setFont("Helvetica", 8); c.setFillColor(BODY)
        c.drawString(x + 1.5 * mm, y, col)
        x += w
    return y - 5 * mm

def draw_score_bar(c, y, label, score, max_score, bar_color):
    c.setFont("Helvetica-Bold", 8); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, label)
    bar_x = MARGIN + 38 * mm
    bar_w = 80 * mm
    bar_h = 4 * mm
    # Background
    c.setFillColor(colors.HexColor("#E2E8F0"))
    c.roundRect(bar_x, y - 0.5 * mm, bar_w, bar_h, 2, fill=1, stroke=0)
    # Fill
    fill_w = (score / max_score) * bar_w
    c.setFillColor(bar_color)
    c.roundRect(bar_x, y - 0.5 * mm, fill_w, bar_h, 2, fill=1, stroke=0)
    # Score text
    c.setFont("Helvetica-Bold", 8); c.setFillColor(NAVY)
    c.drawString(bar_x + bar_w + 3 * mm, y, f"{score}/{max_score}")
    return y - 7 * mm


def build():
    c = canvas.Canvas(OUT, pagesize=A4)

    # ── PAGE 1: TITLE + EXECUTIVE SUMMARY ──
    draw_header(c, "NLB Assessment Market Benchmark")
    draw_footer(c)
    y = H - HEADER_H - 15 * mm

    # Title block
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(MARGIN, y, "Nobody Left Behind")
    y -= 8 * mm
    c.setFont("Helvetica-Bold", 14); c.setFillColor(CYAN)
    c.drawString(MARGIN, y, "AI Rollout Readiness Assessment")
    y -= 6 * mm
    c.setFont("Helvetica", 10); c.setFillColor(MUTED)
    c.drawString(MARGIN, y, "Post-Upgrade Market Benchmark  |  v2.1  |  April 2026")
    y -= 12 * mm

    # Divider
    c.setStrokeColor(CYAN); c.setLineWidth(1.5)
    c.line(MARGIN, y, MARGIN + 50 * mm, y)
    y -= 10 * mm

    y = section_title(c, y, "Executive Summary")
    y = body(c, y,
        "The Nobody Left Behind AI Rollout Check is the only assessment that measures whether "
        "the people in your organization are actually being prepared for AI. It does not ask about "
        "data infrastructure or cloud strategy. It asks whether communication is clear, whether "
        "roles are mapped, whether training is real, and whether managers can have honest "
        "conversations about what AI means for their teams.")
    y = body(c, y,
        "After benchmarking against 20+ competing assessments from the Big 4, Gartner, Cisco, "
        "Microsoft, Prosci, and independent providers, the NLB assessment covers 11.5 out of 12 "
        "people-side dimensions. The closest competitor (Prosci ADKAR) covers about half. No "
        "Big 4 assessment covers more than 4. The NLB assessment also covers 3 bonus dimensions "
        "that no competitor addresses at all: timeline expectations, data guidelines, and "
        "cut/create framing.")
    y -= 3 * mm

    # Key stats box
    box_h = 32 * mm
    c.setFillColor(BG); c.setStrokeColor(CYAN_BORDER); c.setLineWidth(0.6)
    c.roundRect(MARGIN, y - box_h, CONTENT_W, box_h, 4, fill=1, stroke=1)
    bx = MARGIN + 5 * mm; by = y - 7 * mm
    c.setFont("Helvetica-Bold", 9); c.setFillColor(NAVY)
    c.drawString(bx, by, "Assessment at a Glance")
    by -= 7 * mm
    stats = [
        ("Format:", "21 statements across 3 sections (WHY / WHAT / HOW), 7 each"),
        ("Scale:", "5 point Likert (strongly disagree to strongly agree), max score 105"),
        ("Stage aware:", "Respondents select Early, Active, or Scaling. Advice adapts to stage."),
        ("Tracking:", "All 21 individual scores logged to Google Sheets automatically"),
    ]
    for label, val in stats:
        c.setFont("Helvetica-Bold", 8); c.setFillColor(CYAN_DARK)
        c.drawString(bx, by, label)
        lw = c.stringWidth(label, "Helvetica-Bold", 8)
        c.setFont("Helvetica", 8); c.setFillColor(BODY)
        c.drawString(bx + lw + 2 * mm, by, val)
        by -= 5 * mm
    y = y - box_h - 10 * mm

    y = section_title(c, y, "Coverage Scores (out of 12 people-side dimensions)")
    y = draw_score_bar(c, y, "CoachBay NLB", 11.5, 12, CYAN)
    y = draw_score_bar(c, y, "Prosci ADKAR", 5.5, 12, AMBER)
    y = draw_score_bar(c, y, "McKinsey", 4, 12, AMBER)
    y = draw_score_bar(c, y, "Gartner", 3.5, 12, RED)
    y = draw_score_bar(c, y, "Deloitte", 3, 12, RED)
    y = draw_score_bar(c, y, "Cisco", 1.5, 12, RED)
    y = draw_score_bar(c, y, "EY", 1.5, 12, RED)
    y = draw_score_bar(c, y, "PwC", 1, 12, RED)

    # ── PAGE 2: DIMENSION COVERAGE TABLE ──
    c.showPage()
    draw_header(c, "NLB Assessment Market Benchmark")
    draw_footer(c)
    y = H - HEADER_H - 15 * mm

    y = section_title(c, y, "Dimension Coverage: NLB vs. Market")
    y = body(c, y,
        "Each row represents a people-side dimension critical to AI rollout success. "
        "\"Yes\" means the assessment directly measures it. \"Partial\" means it is mentioned "
        "but not specifically assessed. \"No\" means it is absent.")
    y -= 2 * mm

    # Table
    col_w = [38*mm, 16*mm, 16*mm, 16*mm, 12*mm, 12*mm, 16*mm, 16*mm, 14*mm]
    headers = ["Dimension", "NLB", "Deloitte", "McKinsey", "PwC", "EY", "Gartner", "Prosci", "Cisco"]
    y = table_row(c, y, headers, col_w, header=True, fill=NAVY)

    data = [
        ["Communication/Why",     "Yes",     "Partial", "Partial", "No",  "No",  "No",      "Yes",     "No"],
        ["Workforce Anxiety",     "Yes",     "No",      "Partial", "No",  "No",  "No",      "Partial", "No"],
        ["Psychological Safety",  "Yes",     "No",      "No",      "No",  "No",  "No",      "No",      "No"],
        ["Change Fatigue",        "Partial", "No",      "No",      "No",  "No",  "No",      "Partial", "No"],
        ["Role/Task Mapping",     "Yes",     "Partial", "Yes",     "No",  "Partial","Partial","No",     "No"],
        ["Gen Z / Junior Impact", "Yes",     "No",      "No",      "No",  "No",  "No",      "No",      "No"],
        ["Shadow AI",             "Yes",     "Partial", "No",      "No",  "No",  "No",      "No",      "No"],
        ["Tool Equity / Access",  "Yes",     "No",      "No",      "No",  "No",  "No",      "No",      "Partial"],
        ["Manager Readiness",     "Yes",     "No",      "Partial", "No",  "No",  "Partial", "Partial", "No"],
        ["Training Quality",      "Yes",     "Partial", "Partial", "Partial","Partial","Yes","Yes",     "Partial"],
        ["Reinforcement",         "Yes",     "No",      "No",      "No",  "No",  "No",      "Yes",     "No"],
        ["Digital Native Myth",   "Yes",     "No",      "No",      "No",  "No",  "No",      "No",      "No"],
    ]
    alt = False
    for row in data:
        fill_bg = CYAN_LIGHT if alt else None
        # Color the NLB cell
        y_row = table_row(c, y, row, col_w, fill=fill_bg)
        # Highlight NLB column
        nlb_val = row[1]
        x_nlb = MARGIN + col_w[0] + 1.5 * mm
        if nlb_val == "Yes":
            c.setFillColor(GREEN)
        elif nlb_val == "Partial":
            c.setFillColor(AMBER)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(x_nlb, y, nlb_val)
        y = y_row
        alt = not alt
    y -= 5 * mm

    y = section_title(c, y, "Three Bonus Dimensions (No Competitor Covers These)")
    y = bullet(c, y, " Asks whether people know the expectations and timeline for AI adoption.", bold_prefix="Timeline Expectations (Statement 12): ")
    y = bullet(c, y, " Asks whether people know the data rules for AI tools. Critical for responsible AI use.", bold_prefix="Data Guidelines (Statement 13): ")
    y = bullet(c, y, " Asks whether people can see what AI creates, not just what it cuts. A coaching reframe no assessment includes.", bold_prefix="Cut/Create Framing (Statement 6): ")

    y -= 3 * mm
    y = section_title(c, y, "Structural Advantages")
    struct = [
        ("Stage aware scoring: ", "Respondents select Early, Active, or Scaling. The advice they receive adapts to where they are in their AI journey. No competitor does this."),
        ("Per statement tracking: ", "All 21 individual answers are logged to Google Sheets automatically. Most assessments return aggregate scores only."),
        ("Balanced 7/7/7 structure: ", "WHY, WHAT, and HOW sections each have 7 statements, aligned with Prosci ADKAR sequencing."),
        ("Framing note: ", "A psychological framing note at the top reduces defensiveness and normalizes mid-range scores. Rare in the market."),
        ("Under 10 minutes: ", "21 items versus 30 to 70+ for most competitors. Designed for busy leaders."),
    ]
    for bp, rest in struct:
        y = bullet(c, y, rest, bold_prefix=bp)

    # ── PAGE 3: UNIQUE ELEMENTS + ACADEMIC ALIGNMENT ──
    c.showPage()
    draw_header(c, "NLB Assessment Market Benchmark")
    draw_footer(c)
    y = H - HEADER_H - 15 * mm

    y = section_title(c, y, "Five Unique Elements (Not Found in Any Competitor)")
    uniques = [
        ("1. Gen Z / Junior Impact (Statement 10): ", "The only assessment that explicitly asks whether the organization has a plan for how entry level roles will grow alongside AI. No Big 4 or independent assessment mentions Gen Z by name or assesses age specific impact."),
        ("2. Digital Native Myth (Statement 16): ", "Explicitly challenges the assumption that younger workers already understand AI by asking whether everyone gets the same structured support regardless of role, age, or background."),
        ("3. Tool Equity (Statement 17): ", "Calls out the gap between paid AI tools for senior people and free versions for everyone else. No competitor assesses this."),
        ("4. Manager Conversation Readiness (Statement 19): ", "Goes beyond whether managers are trained on AI to whether managers can have honest conversations about job security fears."),
        ("5. Psychological Safety (Statements 5, 7): ", "Statement 5 asks whether fears have been acknowledged openly. Statement 7 asks whether people feel safe saying they are worried. Together they treat psychological safety as a prerequisite for AI adoption."),
    ]
    for bp, rest in uniques:
        y = bullet(c, y, rest, bold_prefix=bp)
    y -= 3 * mm

    y = section_title(c, y, "Academic Framework Alignment")
    y = body(c, y,
        "The assessment is not just opinion based. Each section aligns with validated academic "
        "frameworks, giving it credibility with research minded audiences.")
    y -= 2 * mm
    acad = [
        ("Prosci ADKAR: ", "WHY = Awareness + Desire. WHAT = Knowledge. HOW = Ability + Reinforcement. The 7/7/7 structure mirrors ADKAR sequencing."),
        ("AI Anxiety Scale (AIAS): ", "Statement 4 captures cognitive anxiety about personal impact. Statement 5 captures affective anxiety through open acknowledgment of fears."),
        ("Edmondson Psychological Safety: ", "Statements 5 and 7 directly measure team level psychological safety in an AI context."),
        ("UTAUT2: ", "Statement 4 (performance expectancy), Statement 15 (effort expectancy via training), Statement 18 (social influence via managers)."),
        ("Transformation Fatigue (HBR 2025): ", "Change fatigue is addressed indirectly through Statement 3 (investment in people framing) and Statement 5 (acknowledging fears). The research informs the overall design."),
    ]
    for bp, rest in acad:
        y = bullet(c, y, rest, bold_prefix=bp)
    y -= 3 * mm

    y = section_title(c, y, "What Competitors Do Better (Honest Assessment)")
    y = bullet(c, y, "Gartner, Cisco, and Microsoft assess data infrastructure, governance, and technology stacks. NLB is people focused by design. It works best alongside a technical readiness assessment.", bold_prefix="Technical maturity: ")
    y = bullet(c, y, "Cisco has assessed thousands of companies globally. NLB is new and does not yet have benchmarking data. This will build over time.", bold_prefix="Benchmarking data: ")
    y = bullet(c, y, "Academic instruments like the AI Anxiety Scale have Cronbach's alpha of 0.87+. NLB is research informed but has not undergone formal psychometric validation.", bold_prefix="Validation: ")

    # ── PAGE 4: COMPETITIVE POSITION + CTA ──
    c.showPage()
    draw_header(c, "NLB Assessment Market Benchmark")
    draw_footer(c)
    y = H - HEADER_H - 15 * mm

    y = section_title(c, y, "Competitive Position")
    y = body(c, y,
        "The AI readiness assessment market splits into two worlds. On one side, the Big 4 and "
        "tech companies (Cisco, Microsoft, Gartner) assess organizational maturity: strategy, data, "
        "infrastructure, governance. They are useful for CIOs and boards. On the other side, change "
        "management frameworks (Prosci ADKAR, Edmondson's psychological safety) address the human "
        "side but are general purpose, not AI specific.")
    y = body(c, y,
        "The NLB assessment sits in a gap that nobody else occupies: a people specific, AI specific "
        "rollout readiness tool. It does not ask about your data infrastructure or your cloud "
        "strategy. It asks whether the humans in your organization are actually being prepared for "
        "what is coming.")
    y -= 3 * mm

    y = section_title(c, y, "What Changed in v2.1 (April 2026)")
    changes = [
        ("Statement quality: ", "Seven double barreled statements fixed. Each item now measures exactly one thing."),
        ("Statement 1 replaced: ", "The original change fatigue item was replaced with a clear AI vision statement. Opens the assessment with the big picture and leads into Statement 2 (can someone two levels down explain the why)."),
        ("Change fatigue: ", "Now addressed indirectly through Statement 3 (investment in people, not compliance) and Statement 5 (fears acknowledged openly). A deliberate design choice, reducing coverage from 12/12 to 11.5/12."),
        ("Stage aware scoring: ", "Respondents select Early, Active, or Scaling before answering. The advice adapts to their rollout stage."),
        ("Google Sheets tracking: ", "Individual answers for all 21 statements are logged automatically for trend analysis across clients."),
    ]
    for bp, rest in changes:
        y = bullet(c, y, rest, bold_prefix=bp)
    y -= 5 * mm

    # CTA box
    box_h = 42 * mm
    c.setFillColor(NAVY)
    c.roundRect(MARGIN, y - box_h, CONTENT_W, box_h, 4, fill=1, stroke=0)
    bx = MARGIN + 8 * mm; by = y - 10 * mm
    c.setFont("Helvetica-Bold", 14); c.setFillColor(WHITE)
    c.drawString(bx, by, "Try the Assessment")
    by -= 8 * mm
    c.setFont("Helvetica", 10); c.setFillColor(CYAN)
    c.drawString(bx, by, "coachbay.ai/rollout-check")
    by -= 7 * mm
    c.setFont("Helvetica", 9); c.setFillColor(colors.HexColor("#94A3B8"))
    c.drawString(bx, by, "Access codes: NOLEFTBEHIND  |  COACHBAY  |  ROLLOUT2026")
    by -= 7 * mm
    c.setFont("Helvetica", 9); c.setFillColor(colors.HexColor("#94A3B8"))
    c.drawString(bx, by, "10 minutes. 21 statements. Find out if your people are actually ready.")
    y = y - box_h - 10 * mm

    # Research sources
    y -= 3 * mm
    c.setFont("Helvetica-Bold", 8); c.setFillColor(MUTED)
    c.drawString(MARGIN, y, "Research Sources")
    y -= 5 * mm
    c.setFont("Helvetica", 6.5); c.setFillColor(MUTED)
    sources = ("Deloitte State of AI 2025, McKinsey Superagency Report 2025, PwC Responsible AI Survey 2025, "
        "EY.ai Confidence Index, Prosci Best Practices 2025, Gartner AI Maturity Model, "
        "Cisco AI Readiness Index 2025, Microsoft AI Readiness Assessment, "
        "Nature AI Anxiety Studies 2024-2025, Edmondson Psychological Safety Research, "
        "UTAUT2 Applied Research 2026, HBR Transformation Fatigue 2025, Shadow AI State Report 2025.")
    for line in textwrap.wrap(sources, 140):
        c.drawString(MARGIN, y, line); y -= 3.5 * mm

    c.save()
    print(f"Created {OUT}")

if __name__ == "__main__":
    build()
