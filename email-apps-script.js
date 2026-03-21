/**
 * CoachBay Email Results — Google Apps Script
 *
 * This script handles sending assessment results via email.
 * It also logs each email to a Google Sheet and notifies Tomas.
 *
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Go to https://script.google.com and create a new project
 * 2. Paste this entire file into Code.gs
 * 3. Click Deploy > New deployment
 * 4. Select type: Web app
 * 5. Set "Execute as": Me
 * 6. Set "Who has access": Anyone
 * 7. Click Deploy
 * 8. Copy the URL and give it to Claude to update EMAIL_SCRIPT_URL in DiagnosticEngine.jsx
 */

var SHEET_ID = "13d-oTAjj2mRCio_Q6Guu0M3o81sRTkB-wX5xDmuKEZo";
var NOTIFY_EMAIL = "coach@coachbay.ai";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.action === "emailResults") {
      // Build PDF blob from base64
      var pdfBlob = Utilities.newBlob(
        Utilities.base64Decode(data.pdfBase64),
        "application/pdf",
        data.pdfFilename
      );

      // Send results to the user
      MailApp.sendEmail({
        to: data.email,
        subject: "Your CoachBay Assessment Results: " + data.assessmentTitle,
        htmlBody: buildUserEmail(data),
        attachments: [pdfBlob],
        name: "CoachBay.ai",
      });

      // Notify Tomas
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "New Assessment: " + data.assessmentTitle + " (" + data.tier + ")",
        htmlBody: buildNotificationEmail(data),
        name: "CoachBay Assessments",
      });

      // Log to Google Sheet
      logToSheet(data);

      return ContentService.createTextOutput(
        JSON.stringify({ success: true })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ error: "Unknown action" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("CoachBay Email Service is running.");
}

function logToSheet(data) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName("Email Results");

  // Create the sheet if it does not exist
  if (!sheet) {
    sheet = ss.insertSheet("Email Results");
    sheet.appendRow(["Timestamp", "Email", "Assessment", "Score", "Tier"]);
    sheet.getRange("1:1").setFontWeight("bold");
  }

  sheet.appendRow([
    new Date(),
    data.email,
    data.assessmentTitle,
    data.score,
    data.tier,
  ]);
}

function buildUserEmail(data) {
  return (
    '<div style="font-family: Helvetica Neue, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 0;">' +
    '  <div style="text-align: center; margin-bottom: 24px;">' +
    '    <span style="font-size: 20px; font-weight: 700; color: #1A1A2E;">CoachBay</span>' +
    '    <span style="font-size: 20px; font-weight: 700; color: #00BCD4;">.ai</span>' +
    "  </div>" +
    '  <h1 style="font-size: 22px; color: #1A1A2E; text-align: center; margin-bottom: 8px;">Your Assessment Results</h1>' +
    '  <p style="color: #64748B; text-align: center; margin-bottom: 24px;">' +
    data.assessmentTitle +
    "</p>" +
    '  <div style="background: #f8fafb; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">' +
    '    <div style="font-size: 36px; font-weight: 700; color: #00BCD4;">' +
    data.score +
    "</div>" +
    '    <div style="font-size: 14px; color: #64748B; margin-bottom: 8px;">Your Score</div>' +
    '    <div style="display: inline-block; background: #E0F7FA; color: #0097A7; padding: 4px 16px; border-radius: 100px; font-weight: 600; font-size: 14px;">' +
    data.tier +
    "</div>" +
    "  </div>" +
    '  <p style="color: #64748B; font-size: 14px; text-align: center;">Your full results are attached as a PDF.</p>' +
    '  <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 24px 0;">' +
    '  <p style="color: #94a3b8; font-size: 12px; text-align: center;">' +
    "    Want help accelerating your AI journey?<br>" +
    '    <a href="mailto:coach@coachbay.ai" style="color: #00BCD4; text-decoration: none;">coach@coachbay.ai</a>' +
    '    · <a href="https://coachbay.ai" style="color: #00BCD4; text-decoration: none;">coachbay.ai</a>' +
    "  </p>" +
    "</div>"
  );
}

function buildNotificationEmail(data) {
  return (
    '<div style="font-family: Helvetica Neue, Arial, sans-serif; max-width: 520px; padding: 24px 0;">' +
    '  <h2 style="color: #1A1A2E; margin-bottom: 16px;">New Assessment Completed</h2>' +
    '  <p style="color: #64748B; margin-bottom: 20px;">Someone just emailed themselves their assessment results.</p>' +
    '  <table style="border-collapse: collapse; width: 100%;">' +
    '    <tr><td style="padding: 8px 12px; color: #64748B; font-size: 14px; border-bottom: 1px solid #E2E8F0;">Assessment</td>' +
    '    <td style="padding: 8px 12px; font-weight: 600; border-bottom: 1px solid #E2E8F0;">' +
    data.assessmentTitle +
    "</td></tr>" +
    '    <tr><td style="padding: 8px 12px; color: #64748B; font-size: 14px; border-bottom: 1px solid #E2E8F0;">Email</td>' +
    '    <td style="padding: 8px 12px; font-weight: 600; border-bottom: 1px solid #E2E8F0;">' +
    data.email +
    "</td></tr>" +
    '    <tr><td style="padding: 8px 12px; color: #64748B; font-size: 14px; border-bottom: 1px solid #E2E8F0;">Score</td>' +
    '    <td style="padding: 8px 12px; font-weight: 600; border-bottom: 1px solid #E2E8F0;">' +
    data.score +
    "</td></tr>" +
    '    <tr><td style="padding: 8px 12px; color: #64748B; font-size: 14px;">Tier</td>' +
    '    <td style="padding: 8px 12px; font-weight: 600;">' +
    data.tier +
    "</td></tr>" +
    "  </table>" +
    "</div>"
  );
}
