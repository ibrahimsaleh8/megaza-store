import { Stripe } from "stripe";
export const stripe = new Stripe(process.env.stripe_private_key as string, {
  apiVersion: "2025-01-27.acacia",
  typescript: true,
});
