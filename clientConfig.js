// =============================================
// CLIENT CONFIGURATION
// =============================================
// To add a new client:
// 1. Create a Google Sheet for them
// 2. Deploy an Apps Script (same format as the main one)
// 3. Add an entry below with their slug, name, and script URL
//
// The slug is what appears in the URL: coachbay.ai/assess/[slug]
// =============================================

const clients = {
  // Example:
  // "mandarin-oriental": {
  //   name: "Mandarin Oriental",
  //   scriptUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
  // },

  "demo": {
    name: "Demo Company",
    scriptUrl: "",  // No tracking yet — just for testing
  },
};

export default clients;
