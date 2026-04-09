# Sprint PDF generator — run with: python3 build-sprints.py
# Rebuilds all three Sprint PDFs in /public/ using ReportLab.
# After running, do: npm run build && git add -A && git commit && git push

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

# Robot PNG is 1200x1562 — ratio 0.768 (taller than wide)
ROBOT_H = 10 * mm
ROBOT_W = ROBOT_H * 0.768
HEADER_H = 18 * mm

def draw_header(c, doc_label):
    c.setFillColor(WHITE)
    c.rect(0, H - HEADER_H, W, HEADER_H, fill=1, stroke=0)
    c.setStrokeColor(DIVIDER); c.setLineWidth(0.4)
    c.line(0, H - HEADER_H, W, H - HEADER_H)
    text_y = H - HEADER_H / 2 - 1.5 * mm
    # Centre geometrically then nudge up 1.41mm (mirrors react-pdf marginTop:-4pt)
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

def draw_info_box(c, y, audience, fmt, class_size):
    box_h = 22 * mm
    c.setFillColor(BG); c.setStrokeColor(DIVIDER); c.setLineWidth(0.4)
    c.roundRect(MARGIN, y - box_h, CONTENT_W, box_h, 3, fill=1, stroke=1)
    col_w = CONTENT_W / 3
    for i, (label, value) in enumerate(zip(["AUDIENCE", "FORMAT", "CLASS SIZE"], [audience, fmt, class_size])):
        x = MARGIN + i * col_w + 4 * mm
        c.setFont("Helvetica-Bold", 7); c.setFillColor(CYAN_DARK)
        c.drawString(x, y - 7 * mm, label)
        c.setFont("Helvetica", 8.5); c.setFillColor(BODY)
        c.drawString(x, y - 13 * mm, value)
    return y - box_h - 12 * mm

def draw_section_title(c, y, text, size=12):
    c.setFont("Helvetica-Bold", size); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, text)
    c.setStrokeColor(CYAN); c.setLineWidth(1.2)
    c.line(MARGIN, y - 2 * mm, MARGIN + c.stringWidth(text, "Helvetica-Bold", size), y - 2 * mm)
    return y - 8 * mm

def draw_body_text(c, y, text, wrap=95):
    c.setFont("Helvetica", 8.5); c.setFillColor(BODY)
    for line in textwrap.wrap(text, wrap):
        c.drawString(MARGIN, y, line); y -= 5 * mm
    return y - 4 * mm

def draw_bullets(c, y, items):
    for item in items:
        lines = textwrap.wrap(item, width=88)
        first = True
        for line in lines:
            if first:
                c.setFont("Helvetica-Bold", 8); c.setFillColor(CYAN)
                c.drawString(MARGIN, y, "•"); first = False
            c.setFont("Helvetica", 8.5); c.setFillColor(BODY)
            c.drawString(MARGIN + 4 * mm, y, line); y -= 5 * mm
        y -= 1.5 * mm
    return y - 1 * mm

def draw_takeaway_box(c, y, items):
    line_count = sum(len(textwrap.wrap(item, 82)) for item in items)
    box_h = (line_count * 5 + len(items) * 1.5 + 14) * mm
    c.setFillColor(CYAN_LIGHT); c.setStrokeColor(CYAN_BORDER); c.setLineWidth(0.5)
    c.roundRect(MARGIN, y - box_h, CONTENT_W, box_h, 3, fill=1, stroke=1)
    c.setFont("Helvetica-Bold", 9); c.setFillColor(CYAN_DARK)
    c.drawString(MARGIN + 4 * mm, y - 7 * mm, "What you walk away with")
    ty = y - 14 * mm
    for item in items:
        lines = textwrap.wrap(item, width=82)
        first = True
        for line in lines:
            if first:
                c.setFont("Helvetica-Bold", 8); c.setFillColor(CYAN)
                c.drawString(MARGIN + 4 * mm, ty, "•"); first = False
            c.setFont("Helvetica", 8.5); c.setFillColor(BODY)
            c.drawString(MARGIN + 8 * mm, ty, line); ty -= 5 * mm
        ty -= 1.5 * mm
    return y - box_h - 10 * mm

def draw_pitstop(c, y):
    y = draw_section_title(c, y, "Optional: Pit Stops", size=10)
    c.setFont("Helvetica", 8.5); c.setFillColor(BODY)
    for line in textwrap.wrap("Each Sprint can be followed by two Pit Stops (1 hour each, max 6 people) to turn learning into lasting habits.", 95):
        c.drawString(MARGIN, y, line); y -= 5 * mm
    return y

SPRINTS = [
    {
        "filename": "CoachBay_Core_Sprint.pdf",
        "doc_label": "AI CORE SPRINT",
        "title": "AI Core Sprint",
        "subtitle": "for skills",
        "tagline": "Helping managers and team leads move beyond basic AI use and start treating AI as your AI team of four, led by you.",
        "audience": "Managers, team leads, and specialists",
        "format": "3.5 to 4 hours. In person or online.",
        "class_size": "8 to 20 people",
        "what_you_do": "For anyone still using AI mainly as an assistant who wants to get much more from it. This session uses a realistic day in the life scenario involving decisions, communication, and problem solving. Through short inputs, live demonstrations, and hands on practice, you will move between all four AI roles on a single end to end case.",
        "after_this": [
            "Use the Assistant to handle routine tasks like emails, summaries, and formatting, freeing up time for work that actually matters.",
            "Call on the Expert to break down complex topics, regulations, or unfamiliar areas, getting depth on demand without being the specialist.",
            "Engage the Coach to challenge your thinking, prepare for difficult conversations, and stress test decisions, without judgment or agenda.",
            "Activate the Creative to brainstorm ideas, generate options, and move from blank page to working draft, getting more to work with, faster.",
            "As the Conductor, you decide which role to call on, when to switch, and when the output is good enough. That is the human judgment AI cannot replace.",
        ],
        "takeaways": [
            "A clear understanding of the 4 AI roles and when to use each one.",
            "A reusable AI Employee role card with ready to use prompts for each role.",
            "Confidence and a clear plan for getting more out of AI at work.",
        ],
    },
    {
        "filename": "CoachBay_Strategy_Sprint.pdf",
        "doc_label": "AI STRATEGY SPRINT",
        "title": "AI Strategy Sprint",
        "subtitle": "for thinking",
        "tagline": "Helping business leaders use AI as a thinking partner on real strategy and innovation questions.",
        "audience": "Senior managers and executives",
        "format": "3.5 to 4 hours. In person or online.",
        "class_size": "8 to 20 people",
        "what_you_do": "For leaders who want AI to sharpen their strategic thinking, not just save time. This session uses a realistic go to market, growth, or culture challenge. Through short inputs, live demonstrations, and small group work, you will use AI on a single end to end case.",
        "after_this": [
            "Define the most important strategic challenges to focus AI and maximize the impact on the business.",
            "Discover more and better options by creating a structured prompt and having AI interview you about context before proposing tailored moves.",
            "Debate and stress test options with AI playing roles like CFO, competitor, or key customer, so risks and trade offs surface earlier.",
            "Deliver sharper recommendations and storylines, using AI to draft and refine memos or slides while keeping a human voice.",
        ],
        "takeaways": [
            "1 to 2 draft recommendations from the case you worked on.",
            "A reusable Define, Discover, Debate, Deliver worksheet.",
            "At least 2 to 3 prompts you can copy, adapt, and use immediately in your own strategy, innovation, or change work.",
            "A repeatable process for using AI on any strategic question.",
        ],
    },
    {
        "filename": "CoachBay_Change_Sprint.pdf",
        "doc_label": "AI CHANGE SPRINT",
        "title": "AI Change Sprint",
        "subtitle": "for adoption",
        "tagline": "Helping leaders drive AI adoption across their teams using pull, not push, and turning early wins into real momentum.",
        "audience": "Leaders driving AI adoption",
        "format": "3.5 to 4 hours. In person or online.",
        "class_size": "8 to 20 people",
        "what_you_do": "For leaders driving AI adoption across their organization or a large department. This session uses a realistic adoption challenge involving readiness, team engagement, and early wins. Through short inputs, examples, and hands on work, you will design a real pilot plan.",
        "after_this": [
            "Read the room using the Readiness Diagnostic to see where your organization actually stands, not where you assume it is.",
            "Find the 15% by spotting the curious early adopters already hiding in your teams and bringing them into the light.",
            "Design a Pilot Squad around a real problem with a clear weekly rhythm, so experimentation has structure without becoming a program.",
            "Turn wins into pull by capturing results as human stories that create genuine demand from the rest of the organization.",
            "Avoid the classic traps like pushing too hard, mandating usage, or writing policy before anyone has used the tools.",
        ],
        "takeaways": [
            "A completed Readiness Diagnostic showing where your organization actually stands on AI adoption.",
            "A draft pilot squad plan covering who to recruit, what problem to solve, and a 6 week timeline.",
            "A future Win Story usable as both a planning tool and communication template.",
            "Confidence to lead AI adoption without mandating it.",
        ],
    },
    {
        "filename": "CoachBay_Manifesto_Sprint.pdf",
        "doc_label": "AI MANIFESTO SPRINT",
        "title": "AI Manifesto Sprint",
        "subtitle": "for direction",
        "tagline": "Helping leadership teams write their AI manifesto: a clear statement of what AI means to the organization, what is expected of people, and how to invest.",
        "audience": "Senior leaders and directors",
        "format": "3.5 to 4 hours. In person or online.",
        "class_size": "8 to 15 people",
        "what_you_do": "For leadership teams who need to move beyond AI policies and governance into a clear, bold statement of intent. This session uses diagnostic data, the Three Buckets exercise (Cut, Create, Strengths), and a culture framework (Tolerate, Don't Tolerate, Reward) to build a manifesto that is specific to your organization.",
        "after_this": [
            "Diagnose your current state using CoachBay's AI Fitness Diagnostic, including the Empathy Gap between what leaders think and what employees experience.",
            "Sort your company's work into Three Buckets: what to hand to AI (the Cut), what new work to start (the Create), and what makes your organization unique (your Strengths).",
            "Define your AI culture by agreeing on what you tolerate, what you do not tolerate, and what you reward when it comes to AI use.",
            "Draft your AI manifesto in the room: a 2 to 4 page document with assigned ownership and a timeline for sign off.",
        ],
        "takeaways": [
            "A draft AI manifesto ready for refinement and sign off.",
            "Three Buckets clarity: what to cut, what to create, and what to protect.",
            "Cultural norms: what you tolerate, what you reward, and where the hard lines are.",
            "Assigned owner and a clear timeline for the next steps.",
        ],
    },
    {
        "filename": "CoachBay_Cut_Create_Sprint.pdf",
        "doc_label": "AI CUT & CREATE SPRINT",
        "title": "AI Cut & Create Sprint",
        "subtitle": "for focus",
        "tagline": "Helping teams identify what to stop doing or hand to AI (the Cut) and what new, higher value work to start (the Create).",
        "audience": "Managers, team leads, and specialists",
        "format": "3.5 to 4 hours. In person or online.",
        "class_size": "8 to 20 people",
        "what_you_do": "For teams ready to move beyond general AI skills into focused action. This session pairs two structured exercises using CoachBay's original canvas tools. The 9R Deletion Audit helps teams identify recurring work to retire or hand to AI. The 9P Digital Project Canvas helps teams define new, higher value work to start. Together, they ensure AI adoption is not just about efficiency but about building something new.",
        "after_this": [
            "Complete a Deletion Audit using the 9R Canvas to identify specific work your team should stop doing or hand to AI, from routine reports to approval bottlenecks.",
            "Scope a new initiative using the 9P Digital Project Canvas, starting with the person and the problem before jumping to solutions.",
            "Connect the two sides: see how the time freed by the Cut directly fuels the Create, giving your team a clear before and after story.",
            "Build a practical action plan with owners, timelines, and a first checkpoint to keep momentum going after the session.",
        ],
        "takeaways": [
            "A completed 9R Deletion Audit with specific work items identified for AI handover.",
            "A completed 9P Digital Project Canvas with a new initiative scoped from person to prototype.",
            "Both sides of AI adoption in one session: stop and start with intention.",
            "Practical tools your team can reuse for every new AI initiative going forward.",
        ],
    },
    {
        "filename": "CoachBay_Project_Sprint.pdf",
        "doc_label": "AI PROJECT SPRINT",
        "title": "AI Project Sprint",
        "subtitle": "for results",
        "tagline": "Helping cross functional teams use AI to find new and better ways to move real business projects forward.",
        "audience": "Cross functional project teams",
        "format": "3.5 to 4 hours. In person or online.",
        "class_size": "8 to 20 people",
        "what_you_do": "For teams with a real business challenge who want to make tangible progress in a single session. Each team brings a genuine project, whether it is revenue, operations, supply chain, or customer experience. Using the CRIT framework and AI as a thinking partner, teams pressure test their assumptions, discover options they had not considered, and build sharper plans. Cross functional composition ensures the context and answers are richer and more useful.",
        "after_this": [
            "Define the real challenge clearly using structured prompts that give AI the context it needs to add genuine value.",
            "Discover new options by having AI interview your team about context, constraints, and goals before proposing tailored moves.",
            "Debate and stress test ideas with AI playing different perspectives, so risks and blind spots surface before decisions are made.",
            "Deliver a sharper project plan with concrete next steps, clearer priorities, and recommendations built by the team with AI support.",
        ],
        "takeaways": [
            "Tangible progress on a real business project your team cares about.",
            "A set of AI generated options and recommendations stress tested by the team.",
            "A repeatable process for using AI on any future project challenge.",
            "Confidence that cross functional collaboration with AI produces better outcomes.",
        ],
    },
]

for sprint in SPRINTS:
    path = f"public/{sprint['filename']}"
    c = canvas.Canvas(path, pagesize=A4)
    draw_header(c, sprint["doc_label"])
    draw_footer(c)
    y = H - HEADER_H - 16 * mm
    c.setFont("Helvetica-Bold", 26); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, sprint["title"]); y -= 6 * mm
    c.setFont("Helvetica-Bold", 13); c.setFillColor(CYAN)
    c.drawString(MARGIN, y, sprint["subtitle"]); y -= 6 * mm
    c.setStrokeColor(DIVIDER); c.setLineWidth(0.5)
    c.line(MARGIN, y, W - MARGIN, y); y -= 7 * mm
    c.setFont("Helvetica-Oblique", 9.5); c.setFillColor(MUTED)
    for line in textwrap.wrap(sprint["tagline"], 90):
        c.drawString(MARGIN, y, line); y -= 5.5 * mm
    y -= 5 * mm
    y = draw_info_box(c, y, sprint["audience"], sprint["format"], sprint["class_size"])
    y = draw_section_title(c, y, "What you will do")
    y = draw_body_text(c, y, sprint["what_you_do"])
    y = draw_section_title(c, y, "After this, you can")
    y = draw_bullets(c, y, sprint["after_this"])
    y = draw_takeaway_box(c, y, sprint["takeaways"])
    y = draw_pitstop(c, y)
    c.save()
    print(f"Built {path}")

print("Done. Now run: npm run build && git add -A && git commit -m 'Rebuild Sprint PDFs' && git push")
