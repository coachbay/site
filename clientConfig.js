// =============================================
// CLIENT CONFIGURATION
// =============================================
// To add a new client, just add their slug, name, and assessments below.
// Their assessment page will be live at: coachbay.ai/assess/[slug]
//
// assessments options: "company", "leader", "team"
//   - One assessment: skips the picker, goes straight to it
//   - Two or three: shows a choice screen
//
// The master Google Sheet script URL handles all tracking.
// Each company automatically gets its own tab in the sheet.
// =============================================

// Master script URL for client assessments
export const CLIENT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby0gXOqf619DoeCgqh8XJJVKXzgOtkQ0uc8ewU6nWOT9lWefoEYrBX73vVPy0VXgbBFPA/exec";

const clients = {
  // Examples:
  // "mandarin-oriental": {
  //   name: "Mandarin Oriental",
  //   assessments: ["team"],                // one = goes straight to it
  // },
  // "swire": {
  //   name: "Swire Group",
  //   assessments: ["company", "leader"],   // two = shows picker
  // },

  "demo": {
    name: "Demo Company",
    assessments: ["company", "leader", "team"],
  },

  "sprops-digital": {
    name: "Swire Properties",
    assessments: ["company", "leader", "team"],
  },
};

export default clients;
