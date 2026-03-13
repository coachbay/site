# Client Dashboards

## How It Works Now (Automated)

Dashboards are fully automated. No manual data entry needed.

When a participant submits an assessment, their scores land in the Google Sheet automatically. When anyone opens the dashboard URL, the page fetches live data from the sheet and generates AI insights on the spot. Every load reflects the current state of the data.

The URL for any client dashboard is always:
**coachbay.ai/[client-slug]-dashboard**

The slug is whatever is defined in clientConfig.js. No extra steps needed.

Examples:
- finnair-sym is in clientConfig.js → coachbay.ai/finnair-sym-dashboard
- scchk-core is in clientConfig.js → coachbay.ai/scchk-core-dashboard
- sprops-digital is in clientConfig.js → coachbay.ai/sprops-digital-dashboard

Adding a new client to clientConfig.js automatically activates their dashboard with no other changes required.

---

## What Tomas Needs to Do

1. Add the client to clientConfig.js (already done when setting up their assessment)
2. Wait for participants to complete the assessment
3. Open the dashboard URL to review before sharing with the client
4. Send the URL to the client

That is it. No data entry. No file creation. No manual steps.

---

## The Live Dashboard: LiveDashboard.jsx

This single component powers all client dashboards. Key behaviours:

- Reads the client slug from the URL path
- Looks up the client name and assessment types from clientConfig.js
- Fetches live data from the sheet via /api/client-results
- Parses participant scores (handles column names like "Total Score", "Integration Total" etc.)
- Calculates stats: team average, tier distribution, section averages, min/max/range
- Calls the Claude API via /api/claude to generate insights
- Renders the full dashboard with all sections

For clients with multiple assessment types (e.g. Company + Leader + Team), tab buttons appear at the top to switch between them.

---

## AI Insight Generation

The dashboard calls /api/claude with a structured prompt containing:
- Company name and assessment type
- Participant count, team average, tier breakdown
- Section averages with min/max per dimension
- Finnair example takeaways and next steps as a quality reference

The AI returns JSON with three fields: summary, takeaways (4 items), nextSteps (3 items).

### Language rules baked into the prompt
- Team assessment: refer to participants as "team members" or "participants" — never "leaders"
- Leader assessment: refer to participants as "leaders" throughout
- Company assessment: refer to the organisation collectively
- Always use actual numbers (e.g. "at 13.5/20" not "scores suggest")
- Name sections by their actual names (Depth, Influence, Deletion etc.)
- Titles must be insight-driven, not dimension labels
- Next steps must be concrete actions, not program names
- No hyphens or em dashes. American English. No jargon.

---

## Dashboard Design Rules

### Layout (3 print pages)

Page 1: Overview
- Header: CoachBay logo + client name + participant count + date
- Executive Summary (AI generated, 2 paragraphs)
- 4 stat cards: Group Average, Score Range, Strongest Area, Growth Opportunity
- 2-column row: Tier Distribution (colored bar chart) + Radar chart (capability profile)

Page 2: Detail
- Section Breakdown: one row per dimension with min/avg/max bar visualization
  - Light cyan band shows the range from min to max
  - Solid cyan marker shows the team average position

Page 3: Insights
- Key Takeaways: single card, 4 items stacked vertically with icon + bold title + 2-sentence text
- Recommended Next Steps: cyan-tinted card, numbered 1 to 3 with title + explanation
- Footer: CoachBay branding + participant count + date + Print button (hidden on print)

### Colors
- Background: #ffffff
- Body text: #1e293b, #334155
- Muted text: #475569, #64748b
- Accent: #00BCD4 (CoachBay cyan)
- Card background: #f8fafc, border: #e2e8f0
- Next steps card background: rgba(0,188,212,0.04), border: rgba(0,188,212,0.15)
- Tier colors: Starting Out #ef4444, Early Progress #f59e0b, Gaining Momentum #3b82f6, AI Advanced #00BCD4, AI Pioneer #7c3aed

### Typography
- Headings: DM Serif Display, font-weight 400
- Body: DM Sans
- Stat card values: DM Serif Display
- Section labels: DM Sans 600

### Print
- @page size A4, margin 12mm 14mm
- .print-page-break forces a page break before the element
- .no-break prevents a section splitting across pages
- .no-print hides the element (tab buttons, Print button)
- All colors forced with print-color-adjust: exact

---

## Assessment Structures

### Team Assessment (6 sections x 4 questions, max 120)
Sections (each out of 20): Integration, Depth, Deletion, Influence, Judgment, Environment

Tiers:
- 24 to 48: Starting Out
- 49 to 72: Early Progress
- 73 to 96: Gaining Momentum
- 97 to 108: AI Advanced
- 109 to 120: AI Pioneer

### Leader Assessment (6 sections x 4 questions, max 120)
Sections (each out of 20): Integration, Depth, Deletion, Enabling, Judgment, Environment

Tiers:
- 24 to 48: Untapped Potential
- 49 to 72: Getting Started
- 73 to 96: Active Explorer
- 97 to 108: AI Advanced
- 109 to 120: AI Pioneer

### Company Assessment (5 sections x 5 questions, max 125)
Sections (each out of 25): Strategic Clarity, Leadership Readiness, Employee Sentiment, Culture of Change, Practical Foundations

Tiers:
- 25 to 49: Not Yet. And That's Okay
- 50 to 74: Groundwork Needed
- 75 to 99: Ready to Start, With Focus
- 100 to 112: Ready to Accelerate
- 113 to 125: AI-Driven Organization

---

## Google Sheet Column Format

The sheet stores data with these column names (case-insensitive matching used):
- Timestamp
- Name
- Email
- Total Score
- Tier
- [Section] Total (e.g. Integration Total, Depth Total)
- [Section] Q1, Q2, Q3, Q4 (individual question scores)

The LiveDashboard parser matches columns by checking if the lowercase header contains the section id and "total". This is flexible and handles minor naming variations.

---

## If Something Breaks

Common issues:

"No valid participant data found"
- Check the Google Sheet has data for this client in the correct tab
- Verify the client name in clientConfig.js exactly matches the sheet tab name
- Check /api/client-results?company=[name]&type=[Team/Leader/Company] directly in the browser

"Could Not Load Dashboard"
- Open the URL and check the error message shown on screen
- If it says "No submissions found yet" the sheet tab is empty or the company name does not match

AI insights not generating
- Check /api/claude is returning a valid response
- The ANTHROPIC_API_KEY environment variable must be set in Vercel

---

## Key Files

| File | Purpose |
|---|---|
| LiveDashboard.jsx | Powers all automated dashboards |
| clientConfig.js | Client slugs and assessment types |
| api/client-results.js | Fetches data from Google Sheet |
| api/claude.js | Proxies Claude API calls |
| App.jsx | Routes [slug]-dashboard URLs to LiveDashboard |
