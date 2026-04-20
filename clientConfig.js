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
//   version     — assessment version (optional, defaults to 2)
//                 1 = original format (24 questions team/leader, 25 company, max 120/125)
//                 2 = expanded format (26 questions all, max 130) — March 2026 onward
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
    version: 1,
  },

  "sprops-changeagents": {
    name: "Swire Properties",
    assessments: ["team"],
    preparedFor: "Christine Ling, Director Human Resources",
    closeDate: "2026-04-30",
    version: 2,
  },

  "swireproperties": {
    name: "Swire Properties",
    assessments: ["team"],
    preparedFor: "Christine Ling, Director Human Resources",
    closeDate: "2026-04-30",
    version: 2,
  },

  "finnair-sym": {
    name: "Finnair",
    assessments: ["team"],
    preparedFor: "Simon Large, Chief Customer Officer",
    version: 1,
  },

  "scchk-core": {
    name: "Swire Coca-Cola",
    assessments: ["team"],
    preparedFor: "Lily Chu, Sales & Marketing Director",
    closeDate: "2026-03-25",
    version: 1,
  },

  "cpcs-sym": {
    name: "Cathay Subsidiary Services",
    assessments: ["team"],
    preparedFor: "Sally Wong",
    closeDate: "2026-03-21",
    version: 1,
  },

  "swirehotels-sym": {
    name: "Swire Hotels",
    assessments: ["team"],
    preparedFor: "Charissa Chan",
    closeDate: "2026-03-29",
    version: 1,
  },
};

export default clients;
