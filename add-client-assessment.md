# How to Add a New Client Assessment

## What This Does
Adds a branded assessment page for a client at `coachbay.ai/assess/[slug]`.
The page collects name and email, shows CoachBay + client co-branding, and sends results to the master Google Sheet (auto-creates a tab per company).

## What You Need From Tomas
1. **Slug** (the URL bit, e.g. `sprops-digital`)
2. **Company display name** (e.g. `Swire Properties`)
3. **Which assessments**: any combination of `company`, `leader`, `team`
   - One assessment = skips the picker, goes straight to it
   - Two or three = shows a choice screen

## Steps

### 1. Clone latest from GitHub
```bash
cd /home/claude && git clone https://coachbay:TOKEN@github.com/coachbay/site.git coachbay-push
```
Use the GitHub token from memory.

### 2. Edit clientConfig.js
Add the new client inside the `clients` object:
```js
"slug-here": {
  name: "Company Name",
  assessments: ["company", "leader", "team"],
},
```

### 3. Push to GitHub
```bash
cd /home/claude/coachbay-push
git config user.email "coach@coachbay.ai"
git config user.name "CoachBay"
git add clientConfig.js
git commit -m "Add [Company Name] client assessment ([slug])"
git push origin main
```

### 4. Confirm to Tomas
- Page goes live in ~30 seconds at `coachbay.ai/assess/[slug]`
- First submission auto-creates a tab named after the company in the master Google Sheet
- No Google Sheets or Apps Script changes needed

## Key Files
- **clientConfig.js** — the only file you edit to add a client
- **ClientAssessment.jsx** — the assessment entry/picker page (don't edit unless changing layout)
- **DiagnosticEngine.jsx** — the assessment engine with `clientMode` prop (don't edit unless changing tracking)
