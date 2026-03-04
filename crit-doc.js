const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  LevelFormat, BorderStyle, HeadingLevel, PageNumber,
  Header, Footer, TabStopType, TabStopPosition, ShadingType,
  WidthType, Table, TableRow, TableCell, ImageRun, PageBreak
} = require('docx');
const fs = require('fs');

const CYAN = "00BCD4";
const DARK = "1a1a2e";
const LIGHT_CYAN_BG = "E0F7FA";
const GRAY = "64748B";
const DARK_TEXT = "1E293B";

function spacer(pts = 120) {
  return new Paragraph({ children: [new TextRun("")], spacing: { before: pts, after: 0 } });
}

function rule(color = CYAN) {
  return new Paragraph({
    children: [new TextRun("")],
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color, space: 1 } },
    spacing: { before: 80, after: 80 },
  });
}

function componentBox(letter, title, body, italicLine) {
  // Letter badge row
  const badge = new Paragraph({
    children: [
      new TextRun({ text: letter, bold: true, color: CYAN, size: 52, font: "DM Sans" }),
      new TextRun({ text: "  —  " + title, bold: true, color: DARK_TEXT, size: 28, font: "DM Sans" }),
    ],
    spacing: { before: 240, after: 120 },
  });

  const bodyPara = new Paragraph({
    children: [new TextRun({ text: body, color: DARK_TEXT, size: 22, font: "DM Sans" })],
    spacing: { before: 0, after: 120 },
  });

  const italicPara = new Paragraph({
    children: [
      new TextRun({ text: "In plain terms: ", bold: true, italics: true, color: CYAN, size: 22, font: "DM Sans" }),
      new TextRun({ text: italicLine, italics: true, color: GRAY, size: 22, font: "DM Sans" }),
    ],
    spacing: { before: 0, after: 0 },
  });

  const divider = new Paragraph({
    children: [new TextRun("")],
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "E2E8F0", space: 1 } },
    spacing: { before: 200, after: 80 },
  });

  return [badge, bodyPara, italicPara, divider];
}

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "DM Sans", size: 22, color: DARK_TEXT } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 },
      }
    },
    headers: {
      default: new Header({
        children: [
          new Table({
            width: { size: 9638, type: WidthType.DXA },
            columnWidths: [9638],
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: {
                      top: { style: BorderStyle.NIL },
                      left: { style: BorderStyle.NIL },
                      right: { style: BorderStyle.NIL },
                      bottom: { style: BorderStyle.SINGLE, size: 6, color: "E2E8F0" },
                    },
                    margins: { top: 0, bottom: 60, left: 0, right: 0 },
                    width: { size: 9638, type: WidthType.DXA },
                    verticalAlign: "center",
                    children: [
                      new Paragraph({
                        children: [
                          new ImageRun({
                            data: fs.readFileSync('/home/claude/robot_transparent.png'),
                            transformation: { width: 20, height: 20 },
                            type: "png",
                          }),
                          new TextRun({ text: " CoachBay.ai", bold: true, color: CYAN, size: 26, font: "DM Sans", position: 3 }),
                          new TextRun({ text: "   |   CRIT Framework", color: GRAY, size: 26, font: "DM Sans", position: 3 }),
                        ],
                        spacing: { after: 0 },
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "coachbay.ai", color: CYAN, size: 16, font: "DM Sans" }),
              new TextRun({ text: "   |   Tomas Bay, Executive Coach & Consultant", color: GRAY, size: 16, font: "DM Sans" }),
            ],
            border: { top: { style: BorderStyle.SINGLE, size: 6, color: "E2E8F0", space: 1 } },
            spacing: { before: 80 },
          }),
        ],
      }),
    },
    children: [

      // ── TITLE BLOCK ──
      new Paragraph({
        children: [new TextRun({ text: "CRIT", bold: true, color: CYAN, size: 96, font: "DM Sans" })],
        spacing: { before: 240, after: 40 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "A framework for getting real value from AI conversations", color: GRAY, size: 26, font: "DM Sans", italics: true })],
        spacing: { before: 0, after: 60 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "Framework by Geoff Woods", color: GRAY, size: 18, font: "DM Sans" })],
        spacing: { before: 0, after: 0 },
      }),

      rule(CYAN),

      // ── OPENING ──
      new Paragraph({
        children: [new TextRun({ text: "There is a moment that happens when you use AI well on a real problem.", color: DARK_TEXT, size: 24, font: "DM Sans", bold: true })],
        spacing: { before: 200, after: 120 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "You have been sitting with something for days. A decision you cannot quite land. A challenge that keeps circling back. A conversation you are dreading. You open AI, you structure the conversation properly, and within ten minutes you are looking at angles and possibilities you had not considered before.", color: DARK_TEXT, size: 22, font: "DM Sans" })],
        spacing: { before: 0, after: 120 },
      }),

      // Pull quote box
      new Table({
        width: { size: 9638, type: WidthType.DXA },
        columnWidths: [9638],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: LIGHT_CYAN_BG, type: ShadingType.CLEAR },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 12, color: CYAN },
                  bottom: { style: BorderStyle.SINGLE, size: 12, color: CYAN },
                  left: { style: BorderStyle.SINGLE, size: 32, color: CYAN },
                  right: { style: BorderStyle.NIL },
                },
                margins: { top: 120, bottom: 120, left: 200, right: 200 },
                width: { size: 9638, type: WidthType.DXA },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: "That is what CRIT gives you. Not just a better answer. Hope.", bold: true, color: DARK, size: 28, font: "DM Sans", italics: true })],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),

      new Paragraph({
        children: [new TextRun({ text: "The shift is simple but significant. Most people ask: how can I do this? CRIT teaches you to ask: how can AI help me do this? That one change in framing opens up a completely different kind of conversation.", color: DARK_TEXT, size: 22, font: "DM Sans" })],
        spacing: { before: 200, after: 120 },
      }),

      spacer(80),

      // ── SECTION HEADING ──
      new Paragraph({
        children: [new TextRun({ text: "The Four Components", bold: true, color: DARK, size: 32, font: "DM Sans" })],
        spacing: { before: 80, after: 0 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: CYAN, space: 1 } },
      }),

      // C
      ...componentBox(
        "C",
        "Context",
        "Set the scene before you ask for anything. Tell AI what is really going on, not just the surface request. What is the situation? Why does it matter? Who is involved? What constraints are you working within?\n\nThe more honest and specific you are here, the more useful everything that follows will be. AI can only work with what you give it. Vague context produces vague output.",
        "What is going on, why does it matter, and what does AI need to understand before it can help?"
      ),

      // R
      ...componentBox(
        "R",
        "Role",
        "Tell AI who to be. Not what to do yet, but whose perspective to bring. A skeptical CFO. An executive coach. A competitor's CEO. A board advisor who genuinely wants you to succeed but will not let you fool yourself.\n\nThe role shapes everything: the tone, the angle, the level of challenge. A junior assistant gives you safe answers. A tough board member gives you the pushback you actually need.",
        "Answer this as if you were a specific expert whose perspective would be most useful to me right now."
      ),

      // I
      ...componentBox(
        "I",
        "Interview",
        "Ask AI to slow down before it responds. Tell it to interview you with three questions, one at a time, before it gives you anything.\n\nThis is the step most people skip, and it is the most important one. Without it, AI guesses at your situation and produces something generic. With it, AI builds a real understanding of your specific context before it says anything useful.\n\nThree questions is the right number. Too few and AI does not have enough. Too many and it starts to loop.",
        "Before you respond, ask me three questions, one at a time, to make sure you fully understand my situation."
      ),

      // T
      ...componentBox(
        "T",
        "Task",
        "Now tell AI exactly what you want back. Not a general ask. A specific, concrete deliverable that you could actually use.\n\nOptions with trade-offs. A decision memo. Three possible approaches with a recommendation. A first draft of the communication. A list of the assumptions you should pressure-test before you commit.\n\nThe more precise your task, the more usable the output. Vague tasks produce vague answers.",
        "Here is exactly what I want you to produce for me."
      ),

      spacer(100),

      // ── WORKED EXAMPLE ──
      new Paragraph({
        children: [new TextRun({ text: "A Worked Example", bold: true, color: DARK, size: 32, font: "DM Sans" })],
        spacing: { before: 80, after: 0 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: CYAN, space: 1 } },
      }),

      new Paragraph({
        children: [new TextRun({ text: "A leader is preparing to restructure their team and is not sure how to communicate it.", color: GRAY, size: 22, font: "DM Sans", italics: true })],
        spacing: { before: 200, after: 200 },
      }),

      // Example box
      new Table({
        width: { size: 9638, type: WidthType.DXA },
        columnWidths: [9638],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: "F8FAFC", type: ShadingType.CLEAR },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
                  bottom: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
                  left: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
                  right: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
                },
                margins: { top: 160, bottom: 160, left: 240, right: 240 },
                width: { size: 9638, type: WidthType.DXA },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: "Context:  ", bold: true, color: CYAN, size: 22, font: "DM Sans" }),
                      new TextRun({ text: "I am the Managing Director of a 40-person marketing agency. We are about to restructure our team, moving from a department-based model to client-focused pods. Three people will be made redundant. Two others will move into new roles they did not ask for. I need to communicate this to the team next Friday. I have done restructures before and they have not always landed well. Trust in leadership is fragile right now.", color: DARK_TEXT, size: 22, font: "DM Sans" }),
                    ],
                    spacing: { after: 160 },
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: "Role:  ", bold: true, color: CYAN, size: 22, font: "DM Sans" }),
                      new TextRun({ text: "Act as an organizational psychologist who specializes in helping leaders communicate difficult change with honesty and empathy.", color: DARK_TEXT, size: 22, font: "DM Sans" }),
                    ],
                    spacing: { after: 160 },
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: "Interview:  ", bold: true, color: CYAN, size: 22, font: "DM Sans" }),
                      new TextRun({ text: "Before you give me anything, ask me three questions to understand the deeper context. Ask me one question at a time.", color: DARK_TEXT, size: 22, font: "DM Sans" }),
                    ],
                    spacing: { after: 160 },
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: "Task:  ", bold: true, color: CYAN, size: 22, font: "DM Sans" }),
                      new TextRun({ text: "Once you have enough context, give me a suggested structure for the all-hands communication, the three things I must say to maintain trust, and the one thing I should avoid saying even if it feels reassuring.", color: DARK_TEXT, size: 22, font: "DM Sans" }),
                    ],
                    spacing: { after: 0 },
                  }),
                ],
              }),
            ],
          }),
        ],
      }),

      new Paragraph({
        children: [new TextRun({ text: "That prompt takes about three minutes to write. What comes back will be more useful than most things a leader could produce on their own in an hour.", color: DARK_TEXT, size: 22, font: "DM Sans", italics: true })],
        spacing: { before: 240, after: 0 },
      }),

      new Paragraph({
        children: [new PageBreak()],
        spacing: { before: 0, after: 0 },
      }),

      // ── CLOSING ──
      new Paragraph({
        children: [new TextRun({ text: "The Shift to Remember", bold: true, color: DARK, size: 28, font: "DM Sans" })],
        spacing: { before: 200, after: 120 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Every time you sit down with a problem, the old question is: ", color: DARK_TEXT, size: 22, font: "DM Sans" }),
          new TextRun({ text: "how can I do this?", color: DARK_TEXT, size: 22, font: "DM Sans", italics: true }),
        ],
        spacing: { before: 0, after: 80 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "The new question is: ", color: DARK_TEXT, size: 22, font: "DM Sans" }),
          new TextRun({ text: "how can AI help me do this?", bold: true, color: CYAN, size: 22, font: "DM Sans" }),
        ],
        spacing: { before: 0, after: 120 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "It sounds small. It is not.", bold: true, color: DARK_TEXT, size: 22, font: "DM Sans" })],
        spacing: { before: 0, after: 280 },
      }),

      // CTA box
      new Table({
        width: { size: 9638, type: WidthType.DXA },
        columnWidths: [9638],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: "E0F7FA", type: ShadingType.CLEAR },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 8, color: CYAN },
                  bottom: { style: BorderStyle.SINGLE, size: 8, color: CYAN },
                  left: { style: BorderStyle.SINGLE, size: 8, color: CYAN },
                  right: { style: BorderStyle.SINGLE, size: 8, color: CYAN },
                },
                margins: { top: 160, bottom: 160, left: 240, right: 240 },
                width: { size: 9638, type: WidthType.DXA },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: "Want to bring CRIT into your leadership team?", bold: true, color: DARK, size: 24, font: "DM Sans" })],
                    spacing: { after: 80 },
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: "Tomas Bay runs hands-on workshops that go from concept to real workflows in a single session.", color: GRAY, size: 22, font: "DM Sans" })],
                    spacing: { after: 80 },
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: "coachbay.ai  |  coach@coachbay.ai", bold: true, color: CYAN, size: 22, font: "DM Sans" })],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/home/claude/CRIT_CoachBay.docx', buffer);
  console.log('Done');
});
