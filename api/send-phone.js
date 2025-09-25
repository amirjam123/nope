// /api/send-phone.js
import { setJSON, hset } from "../lib/upstash.js";
import { readJson } from "./_utils.js";
import { randomUUID } from "node:crypto";

const BOT = process.env.TELEGRAM_BOT_TOKEN;
const CHAT = process.env.TELEGRAM_CHAT_ID;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  try {
    const { phone } = await readJson(req);
    if (!phone) return res.status(400).json({ ok: false, error: "phone required" });

    const id = randomUUID();

    // Telegram first
    try {
      const text = `📞 <b>Phone submitted</b>\nPhone: <code>${phone}</code>\nReqID: <code>${id}</code>`;
      await sendTelegram(text);
    } catch (e) {
      return res.status(500).json({ ok: false, error: `telegram:${e?.message || e}` });
    }

    // Upstash optional
    let upstash = "skipped";
    try {
      await setJSON(`req:${id}`, { phone, ts: Date.now() }, 900);
      await hset(`phone:${phone}`, { ts: Date.now() });
      upstash = "ok";
    } catch (e) {
      upstash = `error:${e?.message || e}`;
    }

    return res.json({ ok: true, requestId: id, upstash });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || "server error" });
  }
}

async function sendTelegram(text) {
  const relay = process.env.TELEGRAM_SEND_URL;
  if (relay) {
    await fetch(relay, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    return;
  }
  if (!BOT || !CHAT) throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
  const r = await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT, text, parse_mode: "HTML" })
  });
  if (!r.ok) throw new Error(`Telegram sendMessage ${r.status}: ${await r.text()}`);
}
