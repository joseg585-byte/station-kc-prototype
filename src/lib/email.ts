// Transactional email via Resend for gift-card delivery. Falls back to a
// console log (visible in the server terminal) when RESEND_API_KEY isn't
// set, so the prototype's gift-card flow works end-to-end without keys —
// the code is also always shown on-screen to the purchaser as a backup.

const RESEND_API_URL = "https://api.resend.com/emails";

export const emailConfigured = Boolean(process.env.RESEND_API_KEY);

export async function sendGiftCardEmail(params: {
  recipientEmail: string;
  recipientName?: string;
  purchaserEmail: string;
  amount: number;
  code: string;
  message?: string;
}) {
  const { recipientEmail, recipientName, purchaserEmail, amount, code, message } = params;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "gifts@thestationkc.com";

  const subject = `You've received a $${amount} the station gift card!`;
  const html = `
    <div style="font-family:sans-serif;background:#faf6ec;padding:32px;">
      <div style="max-width:480px;margin:0 auto;background:#fffdf7;border-radius:16px;overflow:hidden;border:1px solid #05703422;">
        <div style="background:#057034;padding:24px;text-align:center;">
          <h1 style="color:#faf6ec;margin:0;font-size:22px;">the station</h1>
        </div>
        <div style="padding:28px;">
          <p style="color:#16211a;font-size:15px;">Hi${recipientName ? ` ${recipientName}` : ""},</p>
          <p style="color:#16211a;font-size:15px;">${purchaserEmail} sent you a gift card to <strong>the station</strong> — good at all 4 Kansas City locations.</p>
          ${message ? `<p style="color:#33443a;font-style:italic;border-left:3px solid #f5a623;padding-left:12px;">&ldquo;${message}&rdquo;</p>` : ""}
          <div style="background:#f1e9d6;border-radius:12px;padding:20px;text-align:center;margin:20px 0;">
            <p style="margin:0;color:#33443a;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Gift Card Value</p>
            <p style="margin:4px 0 12px;color:#057034;font-size:32px;font-weight:800;">$${amount.toFixed(2)}</p>
            <p style="margin:0;color:#33443a;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Redemption Code</p>
            <p style="margin:4px 0 0;color:#16211a;font-size:20px;font-weight:700;letter-spacing:0.05em;">${code}</p>
          </div>
          <p style="color:#33443a;font-size:13px;">Redeem in-app at checkout or in-store at any the station location.</p>
        </div>
      </div>
    </div>`;

  if (!apiKey) {
    console.log(`[EMAIL] (demo) Gift card email to ${recipientEmail}`);
    console.log(`  Subject: ${subject}`);
    console.log(`  Code: ${code} — $${amount}`);
    console.log("  Set RESEND_API_KEY to send real emails via Resend.");
    return { sent: false, demo: true };
  }

  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: recipientEmail,
        subject,
        html,
      }),
    });
    if (!res.ok) {
      console.error("Resend email failed", await res.text());
      return { sent: false, demo: false, error: true };
    }
    return { sent: true, demo: false };
  } catch (err) {
    console.error("Resend email error", err);
    return { sent: false, demo: false, error: true };
  }
}
