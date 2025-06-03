"use client";

import { Check, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tier } from "@/lib/tiers";
import { cn } from "@/lib/utils";

// ✅ Corrected prop type: omit `price` from Tier, then define our own
type TierCardProps = Omit<Tier, "price"> & {
  price: number;
  billingCycle: "monthly" | "yearly";
};

export default function TierCard({
  name,
  badge,
  highlight,
  features,
  price,
  billingCycle,
}: TierCardProps) {
  return (
    <Card
      className={cn(
        "border shadow-sm transition hover:shadow-md relative flex flex-col justify-between",
        highlight && "border-teal-500 ring-2 ring-teal-300"
      )}
    >
      <CardContent className="p-6 space-y-4 flex flex-col h-full">
        {/* Header */}
        <div>
          <h3 className="text-xl font-semibold">
            {name}
            {badge && (
              <span className="ml-2 text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </h3>
          <p className="text-sm text-muted-foreground">{highlight}</p>
        </div>

        {/* Price */}
        <div>
          <span className="text-3xl font-bold">
            {price === 0 ? "Free" : `£${price}`}
          </span>
          {price !== 0 && (
            <span className="text-sm text-muted-foreground ml-1">
              /{billingCycle === "monthly" ? "mo" : "yr"}
            </span>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-2 text-sm text-muted-foreground flex-1">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              {feature.included ? (
                <Check className="w-4 h-4 text-teal-600" />
              ) : (
                <Lock className="w-4 h-4 text-gray-400" />
              )}
              {feature.label}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          className={cn(
            "w-full mt-auto",
            name === "Free"
              ? "bg-gray-200 text-gray-600 cursor-default"
              : "bg-teal-600 hover:bg-teal-700 text-white"
          )}
          disabled={name === "Free"}
        >
          {name === "Free" ? "Current Plan" : `Upgrade to ${name}`}
        </Button>
      </CardContent>
    </Card>
  );
}
