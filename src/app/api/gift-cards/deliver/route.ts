import { NextRequest, NextResponse } from "next/server";
import { sendGiftCardEmail } from "@/lib/email";

// Sends (or logs, in demo mode) the gift-card delivery email. Called from
// the client once the gift card code has been generated client-side.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { recipientEmail, recipientName, purchaserEmail, amount, code, message } = body;

  if (!recipientEmail || !amount || !code) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const result = await sendGiftCardEmail({
    recipientEmail,
    recipientName,
    purchaserEmail,
    amount,
    code,
    message,
  });

  return NextResponse.json(result);
}
