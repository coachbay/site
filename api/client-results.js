const CLIENT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyTL4-Si-hnlmh6oq9coGmHLcBhESRscifBZvuNVfiyDeSxvBtBVl17_5HWaFBcG14bbw/exec";

// Companies and their available assessment types
// Keep this in sync with clientConfig.js
const CLIENTS = {
  "Swire Properties": ["Company", "Leader", "Team"],
  "Finnair": ["Team"],
  "Swire Coca-Cola": ["Team"],
};

export default async function handler(req, res) {
  const { company, type } = req.query;

  // Return client list if no params
  if (!company && !type) {
    return res.status(200).json(CLIENTS);
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
