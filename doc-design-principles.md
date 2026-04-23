# CoachBay Document Design Principles

Use this as the reference whenever creating a branded Word doc or PDF for CoachBay.

---

## Brand Colors

| Name | Hex | Used for |
|---|---|---|
| Cyan | `#00BCD4` | Headings, highlights, links, icons, borders |
| Dark navy | `#1a1a2e` | Logo background, strong heading text |
| Dark text | `#1E293B` | All body copy |
| Gray | `#64748B` | Subtitles, captions, secondary text |
| Light cyan bg | `#E0F7FA` | Pull quote and CTA box backgrounds |
| Light gray bg | `#F8FAFC` | Example box backgrounds |
| Divider | `#E2E8F0` | Horizontal rules, header/footer borders |

Do not use brighter or darker variants of cyan — always use `#00BCD4` consistently across headers, body, and footers.

---

## Fonts

- **Body and UI**: DM Sans (loaded from Google Fonts)
- **No fallback fonts** — DM Sans should be specified on every TextRun

---

## Page Setup

- **Size**: A4 (11906 x 16838 DXA)
- **Margins**: 1134 DXA on all sides (approx 2cm)
- **Content width**: 9638 DXA — use this for all full-width tables

---

## Font Sizes

Sizes in docx-js are in half-points, so divide by 2 to get the point size.

| Element | docx size | Point size |
|---|---|---|
| Large title (e.g. CRIO) | 96 | 48pt |
| Section heading | 32 | 16pt |
| Subheading | 28 | 14pt |
| Pull quote / closing heading | 28 | 14pt |
| Subtitle / tagline | 26 | 13pt |
| Header and footer text | 26 | 13pt |
| Body text | 22 | 11pt |
| Footer fine print | 16 | 8pt |

---

## Header

- Robot icon (transparent PNG, 20x20px) followed by " CoachBay.ai" in bold cyan, then " | Document Title" in gray
- Text raised by `position: 3` to align with the icon baseline
- Bottom border: `#E2E8F0`, size 6
- Implemented as a single-column table to allow vertical alignment control

### Robot icon

The robot PNG is generated from `favicon.svg` with the dark background rect removed, exported at 60x60px with a tight viewBox (`10 5 80 85`) so there is no empty space around it.

---

## Footer

- Top border: `#E2E8F0`, size 6
- Left: `coachbay.ai` in cyan
- Right: `Tomas Bay, Executive Coach & Consultant` in gray
- Font size 16 (8pt) — intentionally small fine print

---

## Text Alignment

- Body copy: left-aligned
- CTA box content: centered

---

## Spacing Conventions

- Before major section heading: 200-240 DXA
- After section heading: 120 DXA
- Between body paragraphs: 120 DXA after
- Before pull quote / CTA box: 200-280 DXA
- Component letter badge before: 240 DXA
- Page break: use a dedicated empty Paragraph with `new PageBreak()` — no spacers or rules immediately before it

---

## Tables and Boxes

All tables use `WidthType.DXA` (never percentage). `columnWidths` must match the table width exactly.

### Pull quote box
- Background: `#E0F7FA`
- Left border: cyan, size 32 (thick accent)
- Top and bottom borders: cyan, size 12
- Right border: none
- Cell padding: `top/bottom 120, left/right 200`

### Example / code box
- Background: `#F8FAFC`
- All borders: `#CBD5E1`, size 4
- Cell padding: `top/bottom 160, left/right 240`

### CTA box
- Background: `#E0F7FA`
- All borders: cyan, size 8
- Cell padding: `top/bottom 160, left/right 240`
- Content centered

---

## Page Breaks

Use an explicit page break paragraph when a new section needs to start on a fresh page:

```javascript
new Paragraph({
  children: [new PageBreak()],
  spacing: { before: 0, after: 0 },
})
```

Do not put spacers or horizontal rules immediately before a page break — they create floating lines at the bottom of the page.

---

## Section Dividers

Thin horizontal rule between major sections:

```javascript
new Paragraph({
  children: [new TextRun("")],
  border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: "00BCD4", space: 1 } },
  spacing: { before: 80, after: 80 },
})
```

Component dividers (between C, R, I, T):

```javascript
new Paragraph({
  children: [new TextRun("")],
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "E2E8F0", space: 1 } },
  spacing: { before: 200, after: 80 },
})
```

---

## Writing Style

- American English (organization, program, personalized, judgment)
- No em dashes — use commas or rewrite the sentence
- No hyphens in copy unless grammatically required
- Direct and human tone — speaks to leaders, not developers
- Short paragraphs — one idea per paragraph where possible

---

## Source Files

- `crio-doc.js` — the CRIO framework doc, the first document built to these standards. Use it as the template when creating new docs.
- `favicon.svg` — source for the robot icon. Remove the background rect before exporting to PNG for documents.
