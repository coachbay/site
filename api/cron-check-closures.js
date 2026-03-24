// =============================================
// DAILY CRON JOB — Client Assessment Closure Notifications
// =============================================
// Runs every day at 9am Hong Kong time (1am UTC).
// For any client whose closeDate matches today, sends Tomas an email with:
//   - How many participants submitted
//   - The live dashboard link
//   - A ready-to-send draft email for the client contact
//
// Required Vercel environment variables:
//   RESEND_API_KEY   — from resend.com (free account)
//   NOTIFY_EMAIL     — the email address to notify (Tomas's email)
//   CRON_SECRET      — a random string to secure the endpoint
// =============================================

import clients from "../clientConfig.js";

const SHEET_ID = "1Rh3PqatL8I_FDe1AB4gxF3GnfV7dtSr7dOIxAa_NPwQ";
const SHEET_API = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=`;

async function getParticipantCount(clientName) {
  try {
    const url = SHEET_API + encodeURIComponent(clientName);
    const res = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text.replace(/^[^(]+\(/, "").replace(/\);?\s*$/, ""));
    const rows = json.table?.rows || [];
    // Count rows that have data in the first column
    return rows.filter((r) => r.c?.[0]?.v).length;
  } catch {
    return null;
  }
}

function getTodayHKT() {
  // Hong Kong is UTC+8
  const now = new Date();
  const hkt = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  return hkt.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

async function sendEmail({ to, subject, html }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "CoachBay Notifications <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });
  return res.ok;
}

export default async function handler(req, res) {
  // Secure the endpoint — only Vercel cron (or you) can call it
  // Vercel sends: Authorization: Bearer <CRON_SECRET>
  const authHeader = req.headers["authorization"] || "";
  const secret = authHeader.replace("Bearer ", "") || req.query.secret;
  if (secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const today = getTodayHKT();
  const notified = [];
  const skipped = [];

  for (const [slug, client] of Object.entries(clients)) {
    if (!client.closeDate) {
      skipped.push(slug);
      continue;
    }

    if (client.closeDate !== today) {
      skipped.push(slug);
      continue;
    }

    // This client closes today — get submission count for each assessment type
    const counts = {};
    for (const type of client.assessments) {
      const sheetName = `${client.name} ${type.charAt(0).toUpperCase() + type.slice(1)}`;
      const count = await getParticipantCount(sheetName);
      counts[type] = count;
    }

    // Build dashboard links
    const dashboardUrl = `https://www.coachbay.ai/${slug}-dashboard`;

    // Build one summary line per assessment type
    const countLines = client.assessments
      .map((t) => {
        const n = counts[t];
        return `<li><strong>${t.charAt(0).toUpperCase() + t.slice(1)}</strong>: ${n !== null ? `${n} submission${n !== 1 ? "s" : ""}` : "could not read"}</li>`;
      })
      .join("");

    // Draft client email
    const draftEmail = client.preparedFor
      ? buildDraftEmail(client, slug)
      : `<em>(No "preparedFor" contact set for this client — add it to clientConfig.js to generate a draft email.)</em>`;

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="color: #00BCD4;">Assessment period closed: ${client.name}</h2>
        <p>The assessment window for <strong>${client.name}</strong> closed today (${today}).</p>

        <h3>Submissions received</h3>
        <ul>${countLines}</ul>

        <h3>Live dashboard</h3>
        <p><a href="${dashboardUrl}" style="color: #00BCD4;">${dashboardUrl}</a></p>
        <p style="font-size: 13px; color: #666;">Open this to review before sharing with the client. The AI insights generate fresh each time.</p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />

        <h3>Draft email to client</h3>
        ${draftEmail}

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="font-size: 12px; color: #999;">Sent automatically by CoachBay. To update client settings, edit clientConfig.js in the repo.</p>
      </div>
    `;

    const sent = await sendEmail({
      to: process.env.NOTIFY_EMAIL,
      subject: `CoachBay: ${client.name} assessment closed today`,
      html: emailHtml,
    });

    notified.push({ slug, sent });
  }

  return res.status(200).json({
    date: today,
    notified,
    skipped,
  });
}

function buildDraftEmail(client, slug) {
  const dashboardUrl = `https://www.coachbay.ai/${slug}-dashboard`;
  const [name] = client.preparedFor.split(",");

  return `
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; font-family: sans-serif;">
      <p style="margin: 0 0 8px; font-size: 12px; color: #94a3b8;">DRAFT — copy and send from your email client</p>
      <p><strong>To:</strong> ${client.preparedFor}</p>
      <p><strong>Subject:</strong> Your Team's AI Readiness Results Are Ready</p>
      <br/>
      <p>Hi ${name},</p>
      <p>The assessment period has now closed and your team's AI Readiness Report is ready to view.</p>
      <p>You can access it here:<br/>
        <a href="${dashboardUrl}">${dashboardUrl}</a>
      </p>
      <p>The report includes your team's overall score, how they sit across the five dimensions, and recommended next steps. I'm happy to walk you through the findings together — just let me know a time that works.</p>
      <p>Best,<br/>Tomas</p>
    </div>
  `;
}
