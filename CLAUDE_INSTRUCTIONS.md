# CoachBay Website — Working Instructions for Claude

## How We Work Together

### 1. Plan Before Building
- For any change that touches more than one file, or has more than two or three steps, state the plan clearly before starting
- If something breaks or goes wrong mid-task: stop, explain what happened, and re-plan — don't push broken code
- For bigger changes (new sections, new diagnostics, restructured layouts), confirm the approach with Tomas before writing any code

### 2. Always Pull Fresh Code First
- Before making any change, clone the latest version from github.com/coachbay/site
- Never edit from project files in the chat — they may be out of date
- Clone to /home/claude/coachbay-push and work from there

### 3. Brand Rules Are Non-Negotiable
Every change must respect these without being reminded:
- **Colours**: Cyan `#00BCD4` for accents and highlights, dark navy `#1A1A2E` for backgrounds
- **Fonts**: DM Serif Display for headings, DM Sans for body text (loaded from Google Fonts)
- **Copy tone**: Professional but human. No jargon. Speaks to leaders, not developers
- **Icons**: Flat cyan SVG line icons — no emojis on the landing page
- **No em dashes or hyphens in any CoachBay copy**
- **American English throughout** (organization, judgment, program)
- **Mobile**: Minimum 15px font size; body text `#e2e8f0`; `#94a3b8` only for minor detail text

### 4. Never Change Copy Without Flagging It
- If a task requires changing any wording, headline, description, or label — flag the proposed change first
- Tomas approves copy before it goes live
- Do not rewrite or "improve" existing text unless explicitly asked

### 5. Build and Test Before Pushing
- Run `npm run build` before every commit — dist files are committed to the repo
- Verify the build completes without errors
- For layout or visual changes: describe what the result will look like so Tomas can anticipate it
- After pushing, confirm the Vercel deployment is expected to trigger (push to main = live in ~30 seconds)

### 6. Pushing to GitHub
- Always `git pull --rebase` before pushing to avoid conflicts
- Push pattern: `git push https://ghp_[token]@github.com/coachbay/site.git main`
- Write clear, specific commit messages (e.g. "Add Swire Properties section to landing page" not "update")
- Ask Tomas for his GitHub token if not already available in the session

### 7. Self-Check Before Calling It Done
Before declaring a task complete, run through this checklist:
- [ ] Brand colours correct (cyan, navy)?
- [ ] Fonts correct (DM Serif for headings, DM Sans for body)?
- [ ] No em dashes or hyphens in copy?
- [ ] American English used throughout?
- [ ] Mobile font sizes at least 15px?
- [ ] Build passed without errors?
- [ ] No copy changed without Tomas's approval?
- [ ] Pushed to GitHub and deployment triggered?

### 8. Fixing Bugs
- When given a bug report: investigate, identify the cause, explain it simply, then fix it
- Don't ask Tomas to dig through code — he's not a developer
- Use plain language to explain what was wrong and what the fix does (like explaining what went wrong with a car, not how to rebuild the engine)

---

## Key Files to Know

| File | What It Does |
|---|---|
| `App.jsx` | Controls which page shows (landing page vs diagnostics) |
| `LandingPage.jsx` | The main hub page |
| `DiagnosticEngine.jsx` | Powers all three diagnostics — changes here affect all of them |
| `diagnosticData.js` | All questions, tiers, and advice — edit content here, not in the engine |
| `ClientAssessment.jsx` | Client-specific assessment flow |
| `clientConfig.js` | Client slugs and configuration |
| `DisruptionSprint.jsx` | Disruption Sprint feature and PDF export |

---

## Core Principles

- **Minimal footprint**: Only change what's needed for the task. Don't refactor or tidy unrelated code
- **No assumptions on copy**: When in doubt about wording, ask — don't invent
- **Explain in plain English**: Tomas is not a developer. Describe changes like you're explaining to a smart non-technical colleague
- **One question at a time**: If clarification is needed, ask one question, wait for the answer, then continue
