const CLIENT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyTL4-Si-hnlmh6oq9coGmHLcBhESRscifBZvuNVfiyDeSxvBtBVl17_5HWaFBcG14bbw/exec";

export default async function handler(req, res) {
  const { company, type } = req.query;

  try {
    let url = CLIENT_SCRIPT_URL + "?action=read";
    if (company) url += "&company=" + encodeURIComponent(company);
    if (type) url += "&type=" + encodeURIComponent(type);

    const response = await fetch(url);
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=30");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
