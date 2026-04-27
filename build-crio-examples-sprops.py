# CRIO Examples handout for Swire Properties.
# Generates public/CoachBay_CRIO_Examples_SPROPS.pdf using ReportLab.
# Replaces the old CoachBay_CRIT_Examples_SPROPS.pdf.
# 4 prompts across 2 pages.

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.utils import simpleSplit
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
FOOTER_H = 16 * mm
USABLE_H = H - HEADER_H - FOOTER_H


def draw_header(c, page_num, total):
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
    label = f"CRIO™ EXAMPLES  |  SWIRE PROPERTIES  |  PAGE {page_num} OF {total}"
    c.setFont("Helvetica", 7.5); c.setFillColor(MUTED)
    c.drawRightString(W - MARGIN, text_y, label)


def draw_footer(c):
    c.setStrokeColor(DIVIDER); c.setLineWidth(0.4)
    c.line(MARGIN, 12 * mm, W - MARGIN, 12 * mm)
    c.setFont("Helvetica-Bold", 7.5); c.setFillColor(CYAN_DARK)
    c.drawString(MARGIN, 7.5 * mm, "Designed and delivered by Tomas Bay")
    c.setFont("Helvetica", 7.5); c.setFillColor(MUTED)
    c.drawRightString(W - MARGIN, 7.5 * mm, "coach@coachbay.ai")


def draw_page_intro(c, y):
    c.setFont("Helvetica-Bold", 18); c.setFillColor(NAVY)
    c.drawString(MARGIN, y, "CRIO™ Examples")
    y -= 5 * mm
    c.setFont("Helvetica", 10); c.setFillColor(CYAN_DARK)
    c.drawString(MARGIN, y, "4D Discover phase. Tuned for Swire Properties.")
    c.setStrokeColor(CYAN); c.setLineWidth(1.2)
    c.line(MARGIN, y - 2.5 * mm, MARGIN + 50 * mm, y - 2.5 * mm)
    y -= 7 * mm
    intro = ("Three worked prompts you can copy, adjust, and paste into Copilot. Each uses the CRIO™ pattern: Context, Role, "
             "Interview, Output. The Interview step is the one most people skip. Let the AI ask you questions before it answers.")
    c.setFont("Helvetica", 8.5); c.setFillColor(BODY)
    for line in textwrap.wrap(intro, 108):
        c.drawString(MARGIN, y, line); y -= 4.2 * mm
    return y - 4 * mm


def draw_prompt_card(c, y, number, title, use_when, context, role, interview, output_text, available_h):
    """Draw a prompt card. Returns the y position after the card and the height used."""
    pad = 4 * mm
    inner_w = CONTENT_W - 2 * pad
    char_w = int(inner_w / (8.5 * 0.52))

    def count_lines(text, font="Helvetica", size=8.5):
        return len(textwrap.wrap(text, char_w))

    # Calculate height
    title_h = 6 * mm
    use_label_h = 4 * mm
    use_h = count_lines(use_when) * 4.2 * mm
    prompt_label_h = 5 * mm
    sections = [
        ("Context.", context),
        ("Role.", role),
        ("Interview.", interview),
        ("Output.", output_text),
    ]
    sections_h = 0
    for label, text in sections:
        sections_h += 4.5 * mm  # label
        sections_h += count_lines(text) * 4 * mm + 1.5 * mm
    total_h = pad + title_h + use_label_h + use_h + 3 * mm + prompt_label_h + sections_h + pad

    # Draw card background
    c.setFillColor(WHITE); c.setStrokeColor(DIVIDER); c.setLineWidth(0.5)
    c.roundRect(MARGIN, y - total_h, CONTENT_W, total_h, 3, fill=1, stroke=1)
    # Left accent bar
    c.setFillColor(CYAN_LIGHT); c.setStrokeColor(colors.white)
    c.roundRect(MARGIN, y - total_h, 2 * mm, total_h, 1, fill=1, stroke=0)

    ty = y - pad

    # Number + title
    num_txt = f"{number}."
    c.setFont("Helvetica-Bold", 11); c.setFillColor(CYAN)
    c.drawString(MARGIN + pad, ty, num_txt)
    num_w = c.stringWidth(num_txt, "Helvetica-Bold", 11)
    c.setFont("Helvetica-Bold", 11); c.setFillColor(NAVY)
    c.drawString(MARGIN + pad + num_w + 1.5 * mm, ty, title)
    ty -= title_h

    # USE WHEN label
    c.setFont("Helvetica-Bold", 7); c.setFillColor(CYAN_DARK)
    c.drawString(MARGIN + pad, ty, "USE WHEN")
    ty -= use_label_h
    c.setFont("Helvetica", 8.5); c.setFillColor(BODY)
    for line in textwrap.wrap(use_when, char_w):
        c.drawString(MARGIN + pad, ty, line); ty -= 4.2 * mm
    ty -= 3 * mm

    # PROMPT label
    c.setFont("Helvetica-Bold", 7); c.setFillColor(CYAN_DARK)
    c.drawString(MARGIN + pad, ty, "PROMPT")
    ty -= prompt_label_h

    # Sections
    for label, text in sections:
        c.setFont("Helvetica-Bold", 8.5); c.setFillColor(CYAN_DARK)
        c.drawString(MARGIN + pad, ty, label)
        ty -= 4.5 * mm
        c.setFont("Helvetica-Oblique", 8.5); c.setFillColor(BODY)
        for line in textwrap.wrap(text, char_w):
            c.drawString(MARGIN + pad, ty, line); ty -= 4 * mm
        ty -= 1.5 * mm

    return y - total_h - 5 * mm


def draw_facilitator_tip(c, y):
    tip_h = 18 * mm
    c.setFillColor(CYAN_LIGHT); c.setStrokeColor(CYAN_BORDER); c.setLineWidth(0.6)
    c.roundRect(MARGIN, y - tip_h, CONTENT_W, tip_h, 3, fill=1, stroke=1)
    c.setFont("Helvetica-Bold", 8.5); c.setFillColor(CYAN_DARK)
    c.drawString(MARGIN + 4 * mm, y - 5 * mm, "FACILITATOR TIP")
    c.setFont("Helvetica", 8.5); c.setFillColor(BODY)
    line1 = ("Use these during the Discover phase of the 4D Framework, when you are trying to understand the situation "
             "deeply before deciding.")
    line2 = ("The Interview step is where the real value comes from. If you skip it, you are just prompting. If you use "
             "it, the AI becomes a thinking partner.")
    c.drawString(MARGIN + 4 * mm, y - 9 * mm, line1)
    c.drawString(MARGIN + 4 * mm, y - 13.5 * mm, line2)
    return y - tip_h - 4 * mm


PROMPTS = [
    {
        "number": 1,
        "title": "Tenant at risk",
        "use_when": "A flagship tenant is signaling possible non-renewal and you need to prep a response.",
        "context": ("I am a senior leasing or tenant experience lead at Swire Properties in Hong Kong. One of our top ten tenants at Taikoo "
                    "Place, a global financial services firm occupying 120,000 square feet across two buildings, has gone quiet. "
                    "They were one of the most engaged clients in our portfolio when I took this account over three years ago. "
                    "Over the last quarter they have stopped responding to my outreach in the usual way. Their space planning "
                    "review, originally scheduled for last month, has been postponed twice with no new date given. A new regional "
                    "head arrived from London six weeks ago and has not taken any of my meeting invitations. I have heard "
                    "indirectly that they have started looking at space at Landmark in Central. Their lease expires in nine "
                    "months. The fit out we delivered four years ago is showing its age and they have not raised any capex "
                    "request. Internally this renewal is on our board risk register because of its size."),
        "role": "Act as a seasoned Hong Kong commercial real estate tenant retention expert with twenty years of Grade A office experience.",
        "interview": "Now, ask me 3 questions to understand the deeper context. Ask one question at a time.",
        "output": ("Once I have answered, produce a one page retention brief with the three most likely root causes ranked by probability, a "
                   "recommended first move, and three talking points for my next conversation with the tenant. Explain your "
                   "thinking and your reasoning."),
    },
    {
        "number": 2,
        "title": "Fuzzy new initiative",
        "use_when": "You have been asked to lead something new and you are not sure where to start.",
        "context": ("I am a manager or director at Swire Properties. Three weeks ago my business unit head asked me to lead our response to "
                    "an industry shift. Grade A office demand has softened, hybrid working is now the norm among our best "
                    "tenants, and the traditional lease model is under pressure. The board wants to see a point of view by end of "
                    "Q3. I have been asked to lead this because I have range, not because I have done anything like it before. "
                    "There is no internal playbook. I have not been given a team, a budget, or a clear definition of done. My "
                    "sponsor thinks this is a six month piece of work. I suspect it is closer to eighteen. The initiative is high "
                    "visibility and I know two other directors quietly wanted this role."),
        "role": "Act as an experienced change leader who has rolled out similar initiatives inside large Hong Kong conglomerates.",
        "interview": "Now, ask me 3 questions to understand the deeper context. Ask one question at a time.",
        "output": ("Once I have answered, produce a one page initiative outline with a suggested three phase approach with rough timing, the top "
                   "three risks and how to mitigate them, and a stakeholder map showing who I must engage early. Explain your "
                   "thinking and your reasoning."),
    },
    {
        "number": 3,
        "title": "Difficult conversation prep",
        "use_when": "A team member's work has slipped and you need to prepare for the conversation.",
        "context": ("I have a direct report at Swire Properties who has been with my team for four years. Steady performer, well liked by peers, "
                    "and someone I promoted into a senior role eighteen months ago. They have always been the kind of person who "
                    "would stay late to get something right. Over the last quarter something has shifted. Two deliverables have "
                    "missed their deadlines. The quality on a board paper last month was below our standard and I had to rework "
                    "large parts of it myself. Peers have started quietly routing around them on cross team work. I do not know "
                    "if something is going on outside work. I have not raised any of this with them yet. We have a 1 on 1 "
                    "scheduled for later this week and I want to use it. I am worried about either going in too soft and losing "
                    "my chance, or going in too hard and damaging a relationship I value."),
        "role": "Act as an experienced executive coach who has prepared hundreds of leaders for tough conversations.",
        "interview": "Now, ask me 3 questions to understand the deeper context. Ask one question at a time.",
        "output": ("Once I have answered, produce a one page conversation plan with a suggested opening, two or three likely pushbacks and "
                   "how to respond to each, my walkaway position, and one sentence I should have ready if the conversation gets "
                   "heated. Explain your thinking and your reasoning."),
    },
    {
        "number": 4,
        "title": "Strategic reset under pressure",
        "use_when": "Your portfolio is losing ground and the team needs a new commercial strategy.",
        "context": ("I lead a team inside one of Swire Properties' commercial business units. Over the last twelve months our market share in "
                    "Grade A office leasing in our core district has dropped from thirty four percent to twenty six percent. "
                    "Margins have compressed as we have offered longer rent free periods and heavier capex contributions to hold "
                    "onto existing tenants. A new competitor, a joint venture between a mainland developer and a regional family "
                    "office, has launched a 1.4 million square foot premium development five minutes from our flagship asset. "
                    "They are quoting rents fifteen percent below ours and offering tenants shorter, more flexible leases with "
                    "built in expansion options. We have already lost two major tenants to them and a third is in active "
                    "conversation. My team is split. Some want to compete on price, some want to double down on service and "
                    "amenity, and some think we need to reposition into a different segment entirely. I have eight weeks to "
                    "present a strategic direction to my business unit head. The team is nervous. I have my own instinct about "
                    "where to go but I do not want to push it until the team has done its own thinking."),
        "role": ("Act as a seasoned commercial real estate strategy advisor who has led similar portfolio resets in markets with new entrants and "
                 "compressing margins."),
        "interview": "Now, ask me 3 questions to understand the deeper context. Ask one question at a time.",
        "output": ("Once I have answered, produce a one page strategic reset brief with a one paragraph diagnosis of what is actually happening, "
                   "three strategic options with the rough tradeoffs of each, a recommended direction, and a plan for how I "
                   "should take my team through this decision so they own the outcome. Explain your thinking and your reasoning."),
    },
]


def build():
    out = "public/CoachBay_CRIO_Examples_SPROPS.pdf"
    c = canvas.Canvas(out, pagesize=A4)

    # Page 1: intro + prompts 1 & 2
    draw_header(c, 1, 2)
    y = H - HEADER_H - 8 * mm
    y = draw_page_intro(c, y)
    y = draw_prompt_card(c, y, 1, PROMPTS[0]["title"], PROMPTS[0]["use_when"],
                         PROMPTS[0]["context"], PROMPTS[0]["role"],
                         PROMPTS[0]["interview"], PROMPTS[0]["output"], y - FOOTER_H)
    y = draw_prompt_card(c, y, 2, PROMPTS[1]["title"], PROMPTS[1]["use_when"],
                         PROMPTS[1]["context"], PROMPTS[1]["role"],
                         PROMPTS[1]["interview"], PROMPTS[1]["output"], y - FOOTER_H)
    draw_footer(c)
    c.showPage()

    # Page 2: prompts 3 & 4 + facilitator tip
    draw_header(c, 2, 2)
    y = H - HEADER_H - 8 * mm
    y = draw_prompt_card(c, y, 3, PROMPTS[2]["title"], PROMPTS[2]["use_when"],
                         PROMPTS[2]["context"], PROMPTS[2]["role"],
                         PROMPTS[2]["interview"], PROMPTS[2]["output"], y - FOOTER_H)
    y = draw_prompt_card(c, y, 4, PROMPTS[3]["title"], PROMPTS[3]["use_when"],
                         PROMPTS[3]["context"], PROMPTS[3]["role"],
                         PROMPTS[3]["interview"], PROMPTS[3]["output"], y - FOOTER_H)
    y = draw_facilitator_tip(c, y)
    draw_footer(c)
    c.showPage()

    c.save()
    print(f"Wrote {out}")


if __name__ == "__main__":
    build()
