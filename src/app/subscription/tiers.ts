export type Tier = {
  id: "free" | "basic" | "premium";
  name: string;
  priceMonthly: string;
  priceYearly: string;
  features: { text: string; available: boolean }[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
};

export const TIERS: Tier[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: "£0",
    priceYearly: "£0",
    features: [
      { text: "Add up to 10 manual TILs/day", available: true },
      { text: "Public feed access", available: true },
      { text: "Basic memory tests", available: true },
      { text: "Self-assessed Full Recall", available: true },
      { text: "Capy Explorer", available: false },
      { text: "Private TILs", available: false },
      { text: "Neural Links", available: false },
    ],
    cta: "Start Free",
  },
  {
    id: "basic",
    name: "Basic",
    priceMonthly: "£3.99",
    priceYearly: "£39",
    features: [
      { text: "Everything in Free", available: true },
      { text: "AI test timing", available: true },
      { text: "Test Mode", available: true },
      { text: "Weekly performance summary", available: true },
      { text: "Capy Explorer (monthly, green loot)", available: true },
      { text: "Private TILs", available: true },
      { text: "Neural Links", available: false },
    ],
    cta: "Upgrade to Basic",
  },
  {
    id: "premium",
    name: "Premium",
    priceMonthly: "£5.99",
    priceYearly: "£59",
    features: [
      { text: "Everything in Basic", available: true },
      { text: "AI-reviewed Full Recall", available: true },
      { text: "Neural Links", available: true },
      { text: "Essay Tests", available: true },
      { text: "Capy Explorer (weekly, rare loot)", available: true },
      { text: "Premium achievement badges", available: true },
    ],
    cta: "Start 7-Day Free Trial",
    highlighted: true,
    badge: "Most Popular",
  },
];
