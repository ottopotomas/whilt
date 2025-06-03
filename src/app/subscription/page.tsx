"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

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
    </main>
  );
}
