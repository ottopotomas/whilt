// /src/app/api/paddle/webhook.ts

import type { NextApiRequest, NextApiResponse } from "next";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const event = req.body.alert_name;
  const email = req.body.email;

  if (!email || !event) {
    return res.status(400).json({ error: "Missing email or event type" });
  }

  const { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return res.status(404).json({ error: "User not found" });
  }

  const updates: Partial<{
    is_premium: boolean;
    premium_tier: string;
    trial_end: string | null;
    paddle_user_id: string;
    trial_expired: boolean;
  }> = {};

  switch (event) {
    case "subscription_created":
      updates.is_premium = true;
      updates.trial_expired = true;
      updates.premium_tier = req.body.plan_name?.toLowerCase().includes("full") ? "full" : "basic";
      updates.paddle_user_id = req.body.user_id || null;
      updates.trial_end = null;
      break;

    case "subscription_cancelled":
    case "subscription_payment_failed":
      updates.is_premium = false;
      updates.premium_tier = "free";
      break;

    case "subscription_updated":
      updates.premium_tier = req.body.plan_name?.toLowerCase().includes("full") ? "full" : "basic";
      break;

    default:
      console.log("Unhandled Paddle event:", event);
      break;
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (updateError) {
    return res.status(500).json({ error: "Failed to update user" });
  }

  return res.status(200).send("OK");
}
