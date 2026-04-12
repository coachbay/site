// =============================================
// CoachBay STANDARD Assessments — Apps Script v4
// Sheet: Public diagnostics from coachbay.ai
// ID: 13d-oTAjj2mRCio_Q6Guu0M3o81sRTkB-wX5xDmuKEZo
// =============================================
//
// HOW TO UPDATE THIS SCRIPT
// -------------------------
// This file is the source of truth for the Google Apps Script
// that tracks all CoachBay assessment results.
//
// If you need to make changes:
// 1. Edit this file
// 2. Open Google Apps Script: Extensions > Apps Script from the Google Sheet
// 3. Select ALL the code in Code.gs (Cmd+A) and DELETE it
// 4. Paste the ENTIRE contents of this file
// 5. Save (Cmd+S)
// 6. Click Deploy > New deployment (NEVER edit an existing one)
// 7. Select Web app, Execute as Me, Anyone can access
// 8. Click Deploy and copy the new URL
// 9. Update GOOGLE_SCRIPT_URL in DiagnosticEngine.jsx with the new URL
// 10. Run npm run build, commit, and push to GitHub
//
// CURRENT DEPLOYMENT URL (v4, April 12 2026):
// https://script.google.com/macros/s/AKfycbycTO_eQjfzSLAFNzD19fzXU5AREGR8q8SG5n7IDrAPlveBokC57HljETbGAYtC6juzhw/exec
//
// SCHEMAS EXPLAINED
// -----------------
// Each assessment type has a schema that defines:
//   sections: the IDs used in the URL parameters (must match diagnosticData.js)
//   sectionLabels: the human readable column headers in the sheet
//   questionsPerSection: how many questions in each section
//   hasGap: whether the Empathy Gap column is included
//
// To add a new assessment type, just add a new entry to SCHEMAS
// following the same pattern. The script automatically creates
// the sheet tab and column headers on the first result.
// =============================================

var SHEET_ID = "13d-oTAjj2mRCio_Q6Guu0M3o81sRTkB-wX5xDmuKEZo";

var SCHEMAS = {
  Company: {
    sections: ["clarity", "leadership", "sentiment", "culture", "foundations"],
    sectionLabels: ["Strategic Clarity", "Leadership Readiness", "Employee Sentiment", "Culture of Change", "Practical Foundations"],
    questionsPerSection: 5,
    hasGap: true,
  },
  Leader: {
    sections: ["integration", "depth", "deletion", "judgment", "enabling", "environment"],
    sectionLabels: ["Integration", "Depth", "Deletion", "Judgment", "Enabling", "Environment"],
    questionsPerSection: 4,
    hasGap: false,
  },
  Team: {
    sections: ["integration", "depth", "deletion", "influence", "judgment", "environment"],
    sectionLabels: ["Integration", "Depth", "Deletion", "Influence", "Judgment", "Environment"],
    questionsPerSection: 4,
    hasGap: false,
  },
  Rollout: {
    sections: ["the_why", "the_what", "the_how"],
    sectionLabels: ["The Why", "The What", "The How"],
    questionsPerSection: 7,
    hasGap: false,
  },
};

function doGet(e) {
  if (\!e || \!e.parameter) {
    return ContentService.createTextOutput("No parameters received");
  }

  var params = e.parameter;

  // READ mode — return sheet data as JSON
  if (params.action === "read") {
    var type = params.type;
    if (\!type || \!SCHEMAS[type]) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Invalid type" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(type);
    if (\!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Sheet not found" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    var data = sheet.getDataRange().getValues();
    var result = JSON.stringify(data);
    if (params.callback) {
      return ContentService.createTextOutput(params.callback + "(" + result + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService.createTextOutput(result)
      .setMimeType(ContentService.MimeType.JSON);
  }

  // WRITE mode — log assessment results
  Logger.log("Received params: " + JSON.stringify(params));

  var type = params.type;
  if (\!type || \!SCHEMAS[type]) {
    Logger.log("Invalid or missing type: " + type);
    return ContentService.createTextOutput("Invalid type: " + type);
  }

  var ss = SpreadsheetApp.openById(SHEET_ID);
  var schema = SCHEMAS[type];
  var sheet = ss.getSheetByName(type);
  var correctHeaders = buildDetailHeaders(schema);

  if (\!sheet) {
    sheet = ss.insertSheet(type);
    sheet.getRange(1, 1, 1, correctHeaders.length).setValues([correctHeaders]);
    sheet.getRange(1, 1, 1, correctHeaders.length).setFontWeight("bold");
  } else {
    sheet.getRange(1, 1, 1, correctHeaders.length).setValues([correctHeaders]);
    sheet.getRange(1, 1, 1, correctHeaders.length).setFontWeight("bold");
  }

  var row = [new Date(), params.score || "", params.tier || ""];

  // Add stage column for Rollout type
  if (type === "Rollout") {
    row.push(params.stage || "");
  }

  schema.sections.forEach(function (sectionId) {
    row.push(params[sectionId] || "");
    for (var q = 1; q <= schema.questionsPerSection; q++) {
      row.push(params[sectionId + "_q" + q] || "");
    }
  });

  if (schema.hasGap) {
    row.push(params.gap || "");
  }

  sheet.appendRow(row);

  writeToDashboard(ss, schema, params, type);

  return ContentService.createTextOutput("OK");
}

function writeToDashboard(ss, schema, params, type) {
  var dashName = "Dashboard - " + type;
  var dashboard = ss.getSheetByName(dashName);
  var dashHeaders = buildDashboardHeaders(schema);

  if (\!dashboard) {
    dashboard = ss.insertSheet(dashName);
    dashboard.getRange(1, 1, 1, dashHeaders.length).setValues([dashHeaders]);
    dashboard.getRange(1, 1, 1, dashHeaders.length).setFontWeight("bold");
  } else {
    dashboard.getRange(1, 1, 1, dashHeaders.length).setValues([dashHeaders]);
    dashboard.getRange(1, 1, 1, dashHeaders.length).setFontWeight("bold");
  }

  var dashRow = [new Date(), params.score || "", params.tier || ""];

  // Add stage column for Rollout type
  if (type === "Rollout") {
    dashRow.push(params.stage || "");
  }

  schema.sections.forEach(function (sectionId) {
    dashRow.push(params[sectionId] || "");
  });

  if (schema.hasGap) {
    dashRow.push(params.gap || "");
  }

  dashboard.appendRow(dashRow);
}

function buildDetailHeaders(schema) {
  var headers = ["Timestamp", "Total Score", "Tier"];

  // Check if this is the Rollout schema (has the_why section)
  if (schema.sections.indexOf("the_why") \!== -1) {
    headers.push("Stage");
  }

  for (var i = 0; i < schema.sections.length; i++) {
    var label = schema.sectionLabels[i];
    headers.push(label + " Total");
    for (var q = 1; q <= schema.questionsPerSection; q++) {
      headers.push(label + " Q" + q);
    }
  }
  if (schema.hasGap) {
    headers.push("Empathy Gap");
  }
  return headers;
}

function buildDashboardHeaders(schema) {
  var headers = ["Timestamp", "Total Score", "Tier"];

  // Check if this is the Rollout schema (has the_why section)
  if (schema.sections.indexOf("the_why") \!== -1) {
    headers.push("Stage");
  }

  for (var i = 0; i < schema.sections.length; i++) {
    headers.push(schema.sectionLabels[i] + " Total");
  }
  if (schema.hasGap) {
    headers.push("Empathy Gap");
  }
  return headers;
}
