# How to Create a Client Dashboard

## What This Does
Creates a branded team results dashboard at coachbay.ai/[client]-dashboard.
The client shares this URL with their leadership team. It shows team assessment results with charts, insights, and next steps. Optimized for print (Ctrl+P produces a clean PDF).

## What You Need From Tomas
1. Client name (e.g. Swire Properties)
2. URL slug (e.g. sprops-dashboard)
3. Who it is prepared for (name + title, e.g. Christine Ling, HR Director)
4. Team data. Per person you need:
   - Total score and tier (see thresholds below)
   - Section scores (see dimensions below)
5. Executive summary: a paragraph summarizing what the data shows
6. Key takeaways: 4 to 6 insights specific to this client results
7. Recommended next steps: 2 to 3 actions for the client

If Tomas only provides the raw scores, Claude can calculate tiers and write the summary/takeaways/next steps based on the data patterns.

## Assessment Structures

### Company Assessment (5 sections x 5 questions = 25 total, max 125)
Sections (each out of 25): Strategic Clarity, Leadership Readiness, Employee Sentiment, Culture of Change, Practical Foundations

Tiers:
- 25 to 49: Not Yet. And That's Okay
- 50 to 74: Groundwork Needed
- 75 to 99: Ready to Start, With Focus
- 100 to 112: Ready to Accelerate
- 113 to 125: AI-Driven Organization

### Leader Assessment (6 sections x 4 questions = 24 total, max 120)
Sections (each out of 20): Integration, Depth, Deletion, Enabling, Judgment, Environment

Tiers:
- 24 to 48: Untapped Potential
- 49 to 72: Getting Started
- 73 to 96: Active Explorer
- 97 to 108: AI Advanced
- 109 to 120: AI Pioneer

### Personal/Team Assessment (6 sections x 4 questions = 24 total, max 120)
Sections (each out of 20): Integration, Depth, Deletion, Influence, Judgment, Environment

Tiers:
- 24 to 48: Starting Out
- 49 to 72: Early Progress
- 73 to 96: Gaining Momentum
- 97 to 108: AI Advanced
- 109 to 120: AI Pioneer

## Steps

### 1. Clone latest from GitHub
cd /home/claude and git clone https://coachbay:TOKEN@github.com/coachbay/site.git coachbay-push
Use the GitHub token from memory.

### 2. Duplicate SwireDashboard.jsx as a template
cp SwireDashboard.jsx [NewClient]Dashboard.jsx

### 3. Edit the new dashboard file
Replace these parts with the new client data:

Component name: Rename the function export to match the new file name

Team data array (top of file):
One object per team member with id, total, tier, and section scores.
Note: section count and max scores depend on which assessment was used (see structures above).

Header section:
- Client name
- Prepared for line (name + title)
- Team size + date line

Executive Summary:
- Replace the paragraph text with client-specific summary

Key Takeaways:
- Replace the array of takeaway objects (each has icon, title, text)
- Keep the same SVG icons, just update title and text
- Some takeaways use dynamic data from the scores (tier counts, section averages). Keep those patterns where relevant

Recommended Next Steps:
- Replace the numbered steps with client-specific recommendations

Footer:
- Update footer text if needed

### 4. Add the route in App.jsx
Add an import at the top for the new dashboard component.
Add a route block after existing dashboard blocks, before the /assess/ block.

### 5. Build and test locally (recommended for first-time dashboards)
npm install then npm run build. Check for build errors before pushing.

### 6. Push to GitHub
git add, commit with descriptive message, push origin main.

### 7. Confirm to Tomas
- Page goes live in ~30 seconds at coachbay.ai/[slug]
- Client can print to PDF using Ctrl+P (print styles are built in)
- No Vercel or Google Sheets changes needed

## Dashboard Structure (2 to 3 print pages)

Page 1: Overview
- Header with CoachBay branding + client name + prepared for
- Executive Summary paragraph
- Three stat cards: Team Average, Score Range, Key Insight (biggest gap)
- Tier Distribution (Where the Team Sits) with colored bars per tier
- Radar chart (team capability profile across all dimensions)

Page 2: Detail
- Section Breakdown with min/avg/max bars for each dimension

Page 3: Insights
- Key Takeaways (4 to 6 items with icons)
- Recommended Next Steps (numbered list)
- CoachBay footer

## Design Rules
- White background (#ffffff), dark text (#1e293b)
- DM Sans body, DM Serif Display headings
- Primary accent: #00BCD4 (CoachBay cyan)
- Tier colors: red (#ef4444), amber (#f59e0b), blue (#3b82f6), teal (#0d9488), cyan (#00BCD4)
- Card style: #f8fafc background, 1px #e2e8f0 border, 14px border radius
- Uses recharts library (already installed) for all charts
- Print-optimized with page break classes

## Key Files
- SwireDashboard.jsx: the template to duplicate (do not edit this for new clients)
- App.jsx: add the new route here
- package.json: recharts is already a dependency, no changes needed
