"use client";

import { Check, Lock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TierCardProps = {
  name: string;
  badge?: string;
  highlight?: string;
  features: { label: string; included: boolean }[];
  price: number; // number, from tier.price.monthly/yearly
  billingCycle: "monthly" | "yearly";
};

export function TierCard({
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
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            {name}
            {badge && (
              <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </CardTitle>
          {highlight && <CardDescription>{highlight}</CardDescription>}
        </CardHeader>

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
      </CardContent>

      {/* CTA Button */}
      <CardFooter>
        <button
          className={cn(
            "w-full py-2 rounded-md text-white font-semibold",
            name === "Free"
              ? "bg-gray-200 text-gray-600 cursor-default"
              : "bg-teal-600 hover:bg-teal-700"
          )}
          disabled={name === "Free"}
        >
          {name === "Free" ? "Current Plan" : `Upgrade to ${name}`}
        </button>
      </CardFooter>
    </Card>
  );
}
