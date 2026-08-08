import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

export const stripeConfigured = Boolean(secretKey);

export function getStripe(): Stripe | null {
  if (!secretKey) return null;
  return new Stripe(secretKey);
}

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}
