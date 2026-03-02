// =============================================
// CLIENT CONFIGURATION
// =============================================
// To add a new client, just add their slug and name below.
// Their assessment page will be live at: coachbay.ai/assess/[slug]
//
// The master Google Sheet script URL handles all tracking.
// Each company automatically gets its own tab in the sheet.
// =============================================

// Master script URL for client assessments
// (Update this after deploying the Apps Script — see setup guide)
export const CLIENT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx8OhBY3oGNkJEq-u-2T2FdweRrGYDm3sCQ3qkpseoIAOLg-wZJRTM9xFUqzGDyAtdk/exec";

const clients = {
  // Example:
  // "mandarin-oriental": {
  //   name: "Mandarin Oriental",
  // },

  "demo": {
    name: "Demo Company",
  },
};

export default clients;
