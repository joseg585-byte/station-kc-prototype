import { NextRequest, NextResponse } from "next/server";
import { getStripe, stripeConfigured, siteUrl } from "@/lib/stripe";

// Creates a Stripe Checkout Session (test mode) for a pickup order. Falls
// back to `mock: true` when STRIPE_SECRET_KEY isn't set, so the prototype
// runs end-to-end without any keys — the client then skips the Stripe
// redirect and finalizes the order directly.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { lines, orderId, locationName } = body as {
    lines: { name: string; price: number; qty: number }[];
    orderId: string;
    locationName: string;
  };

  if (!Array.isArray(lines) || lines.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  if (!stripeConfigured) {
    return NextResponse.json({ mock: true, orderId });
  }

  const stripe = getStripe()!;
  const base = siteUrl();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lines.map((l) => ({
        price_data: {
          currency: "usd",
          product_data: { name: l.name },
          unit_amount: Math.round(l.price * 100),
        },
        quantity: l.qty,
      })),
      success_url: `${base}/checkout/success?orderId=${encodeURIComponent(orderId)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/checkout/cancel`,
      metadata: { orderId, locationName },
    });

    return NextResponse.json({ url: session.url, mock: false });
  } catch (err) {
    console.error("Stripe checkout session error", err);
    return NextResponse.json({ error: "Unable to start checkout" }, { status: 500 });
  }
}
