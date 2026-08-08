import { NextRequest, NextResponse } from "next/server";
import { getStripe, stripeConfigured, siteUrl } from "@/lib/stripe";

// Creates a Stripe Checkout Session (test mode) for a gift-card purchase.
// Falls back to `mock: true` when STRIPE_SECRET_KEY isn't set.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount, giftId } = body as { amount: number; giftId: string };

  if (!amount || amount < 5 || amount > 500) {
    return NextResponse.json({ error: "Amount must be between $5 and $500" }, { status: 400 });
  }

  if (!stripeConfigured) {
    return NextResponse.json({ mock: true, giftId });
  }

  const stripe = getStripe()!;
  const base = siteUrl();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "the station Gift Card" },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${base}/gift-cards/success?giftId=${encodeURIComponent(giftId)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/gift-cards`,
      metadata: { giftId },
    });

    return NextResponse.json({ url: session.url, mock: false });
  } catch (err) {
    console.error("Stripe gift card session error", err);
    return NextResponse.json({ error: "Unable to start checkout" }, { status: 500 });
  }
}
