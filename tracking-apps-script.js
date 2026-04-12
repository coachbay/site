/**
 * CoachBay Assessment Tracking — Google Apps Script
 *
 * This script receives assessment results via GET request (image pixel)
 * and logs them to a Google Sheet. Each diagnostic type gets its own tab.
 *
 * The Rollout Check tab captures all 21 individual statement scores.
 *
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Open the project attached to the CoachBay tracking spreadsheet
 *    (Sheet ID: 13d-oTAjj2mRCio_Q6Guu0M3o81sRTkB-wX5xDmuKEZo)
 * 3. Replace the contents of Code.gs with this entire file
 * 4. Click Deploy > New deployment (NEVER edit an existing deployment)
 * 5. Select type: Web app
 * 6. Set "Execute as": Me
 * 7. Set "Who has access": Anyone
 * 8. Click Deploy and copy the new URL
 * 9. Give the new URL to Claude to update GOOGLE_SCRIPT_URL in DiagnosticEngine.jsx
 */

var SHEET_ID = "13d-oTAjj2mRCio_Q6Guu0M3o81sRTkB-wX5xDmuKEZo";

function doGet(e) {
  try {
    var params = e.parameter;
    var type = params.type || "Unknown";

    if (type === "Rollout") {
      logRollout(params);
    } else {
      logStandard(params);
    }

    return ContentService.createTextOutput("")
      .setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function logRollout(params) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName("Rollout Check");

  if (\!sheet) {
    sheet = ss.insertSheet("Rollout Check");
    var headers = [
      "Timestamp",
      "Score",
      "Max",
      "Tier",
      "Stage",
      "The Why (total)",
      "The What (total)",
      "The How (total)",
      "WHY 1: Clear AI vision communicated",
      "WHY 2: Two levels down can explain why",
      "WHY 3: Positioned as investment in people",
      "WHY 4: People see what gets better for them",
      "WHY 5: Fears acknowledged openly",
      "WHY 6: People see what AI creates not just cuts",
      "WHY 7: Safe to say I do not understand AI",
      "WHAT 1: Clear which roles and tasks affected",
      "WHAT 2: Honest about how work changes",
      "WHAT 3: Plan for entry level growth",
      "WHAT 4: People know what to do with freed time",
      "WHAT 5: People know expectations and timeline",
      "WHAT 6: People know data rules for AI tools",
      "WHAT 7: Understand unofficial AI tool use",
      "HOW 1: Real hands on role specific training",
      "HOW 2: Same structured support for everyone",
      "HOW 3: Paid AI tools for every team member",
      "HOW 4: Managers equipped to support teams",
      "HOW 5: Managers trained for honest AI conversations",
      "HOW 6: Clear next steps after training",
      "HOW 7: 30 60 90 day follow up plan"
    ];
    sheet.appendRow(headers);
    sheet.getRange("1:1").setFontWeight("bold");
    sheet.setFrozenRows(1);
    for (var i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }

  var row = [
    new Date(),
    params.score || "",
    "105",
    params.tier || "",
    params.stage || "",
    params.the_why || "",
    params.the_what || "",
    params.the_how || ""
  ];

  var sections = ["the_why", "the_what", "the_how"];
  for (var s = 0; s < sections.length; s++) {
    for (var q = 1; q <= 7; q++) {
      row.push(params[sections[s] + "_q" + q] || "");
    }
  }

  sheet.appendRow(row);
}

function logStandard(params) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var type = params.type || "Unknown";
  var sheetName = type + " Results";
  var sheet = ss.getSheetByName(sheetName);

  if (\!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(["Timestamp", "Type", "Score", "Tier", "Stage", "Details"]);
    sheet.getRange("1:1").setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  var skip = { type: 1, score: 1, tier: 1, stage: 1, name: 1, email: 1, company: 1 };
  var details = [];
  for (var key in params) {
    if (\!skip[key]) {
      details.push(key + "=" + params[key]);
    }
  }

  var row = [
    new Date(),
    type,
    params.score || "",
    params.tier || "",
    params.stage || "",
    details.join(", ")
  ];

  if (params.name || params.email || params.company) {
    var lastCol = sheet.getLastColumn();
    var headerRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    if (headerRow.indexOf("Name") === -1) {
      sheet.getRange(1, lastCol + 1).setValue("Name");
      sheet.getRange(1, lastCol + 2).setValue("Email");
      sheet.getRange(1, lastCol + 3).setValue("Company");
    }
    row.push(params.name || "");
    row.push(params.email || "");
    row.push(params.company || "");
  }

  sheet.appendRow(row);
}
