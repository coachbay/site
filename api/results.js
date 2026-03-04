const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwZp5izwKVSdR89Y3oNBHG0Zn9iGz_R1-70NfsW7tr_tqMqEwIKRYQswilJtqaI_hWGQg/exec";

export default async function handler(req, res) {
  const { type } = req.query;
  if (!type || !["Company", "Leader", "Team"].includes(type)) {
    return res.status(400).json({ error: "Invalid type" });
  }
  try {
    const response = await fetch(`${SCRIPT_URL}?action=read&type=${type}`);
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=30");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
