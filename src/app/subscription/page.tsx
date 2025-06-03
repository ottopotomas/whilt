"use client";

import { useState } from "react";
import { Tier, tiers as TIERS } from "@/lib/tiers";
import { TierCard } from "@/components/Subscription/TierCard";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  // Ensure TIERS is an array and each tier has expected shape
  const validTiers = Array.isArray(TIERS)
    ? TIERS.filter(
        (tier) =>
          tier &&
          typeof tier.name === "string" &&
          tier.price &&
          typeof tier.price.monthly === "number" &&
          typeof tier.price.yearly === "number"
      )
    : [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Upgrade Your Learning</h1>
        <p className="text-muted-foreground text-lg">
          Choose the plan that fits your pace — and your brain.
        </p>

        <div className="mt-6 flex justify-center">
          <ToggleGroup
            type="single"
            value={billingCycle}
            onValueChange={(val) => {
              if (val === "monthly" || val === "yearly") {
                setBillingCycle(val);
              }
            }}
          >
            <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
            <ToggleGroupItem value="yearly">Yearly</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {validTiers.length > 0 ? (
          validTiers.map((tier: Tier) => (
            <TierCard
              key={tier.name}
              {...tier}
              price={billingCycle === "monthly" ? tier.price.monthly : tier.price.yearly}
              billingCycle={billingCycle}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-muted-foreground">
            Plans are loading or unavailable.
          </p>
        )}
      </div>
    </main>
  );
}
