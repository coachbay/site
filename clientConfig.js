// =============================================
// CLIENT CONFIGURATION
// =============================================
// To add a new client, add their slug below with:
//   name        — company name (must match the Google Sheet tab name exactly)
//   assessments — one or more of "company", "leader", "team"
//                 one assessment skips the picker and goes straight to it
//                 two or three shows a choice screen
//   preparedFor — name and title of the person receiving the report
//                 shown in the dashboard header, e.g. "Jane Smith, HR Director"
//                 ask Tomas for this when setting up each new client
//
// Assessment page:  coachbay.ai/assess/[slug]
// Dashboard URL:    coachbay.ai/[slug]-dashboard
//
// The master Google Sheet script URL handles all tracking.
// Each company automatically gets its own tab in the sheet.
// =============================================

// Master script URL for client assessments
export const CLIENT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyTL4-Si-hnlmh6oq9coGmHLcBhESRscifBZvuNVfiyDeSxvBtBVl17_5HWaFBcG14bbw/exec";

const clients = {
  "sprops-digital": {
    name: "Swire Properties",
    assessments: ["company", "leader", "team"],
    preparedFor: "Christine Ling, Director Human Resources",
  },

  "finnair-sym": {
    name: "Finnair",
    assessments: ["team"],
    preparedFor: "Simon Large, Chief Customer Officer",
  },

  "scchk-core": {
    name: "Swire Coca-Cola",
    assessments: ["team"],
    preparedFor: "Lily Chu, Sales & Marketing Director",
    closeDate: "2026-03-23",
  },

  "cpcs-sym": {
    name: "Cathay Dining",
    assessments: ["team"],
    preparedFor: "Sally Wong",
    closeDate: "2026-03-21",
  },
};

export default clients;
