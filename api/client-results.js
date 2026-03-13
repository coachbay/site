import clients from "../clientConfig.js";

const CLIENT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyTL4-Si-hnlmh6oq9coGmHLcBhESRscifBZvuNVfiyDeSxvBtBVl17_5HWaFBcG14bbw/exec";

// Build the client list dynamically from clientConfig.js — no manual sync needed.
// Maps slug config to { "Client Name": ["Company", "Leader", "Team"] } shape.
function buildClientList() {
  const list = {};
  for (const slug of Object.keys(clients)) {
    const client = clients[slug];
    list[client.name] = client.assessments.map(
      (a) => a.charAt(0).toUpperCase() + a.slice(1)
    );
  }
  return list;
}

export default async function handler(req, res) {
  const { company, type } = req.query;

  // Return client list if no params
  if (!company && !type) {
    return res.status(200).json(buildClientList());
  }

  if (!company || !type) {
    return res.status(400).json({ error: "Both company and type are required" });
  }

  try {
    const url = `${CLIENT_SCRIPT_URL}?action=read&company=${encodeURIComponent(company)}&type=${encodeURIComponent(type)}`;
    const response = await fetch(url, { redirect: "follow" });
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({ error: "Invalid response from script", raw: text.slice(0, 300) });
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=30");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
