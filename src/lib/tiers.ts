export type Tier = {
  name: "Free" | "Basic" | "Premium";
  badge?: string;
  price: {
    monthly: number;
    yearly: number;
  };
  highlight: string;
  features: { label: string; included: boolean }[];
};

export const tiers: Tier[] = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    highlight: "Great for casual learning",
    features: [
      { label: "Up to 10 TILs/day", included: true },
      { label: "Comment, upvote, save", included: true },
      { label: "Basic test ladder (manual)", included: true },
      { label: "Achievement system", included: true },
      { label: "Weekly quiz access", included: true },
      { label: "Suggested TILs (1)", included: true },
      { label: "AI smart review", included: false },
      { label: "Essay challenge tests", included: false },
      { label: "Capy Explorer rewards", included: false },
      { label: "Profile visibility", included: false },
    ],
  },
  {
    name: "Basic",
    badge: "Smarter Review",
    price: { monthly: 3.99, yearly: 39 },
    highlight: "Optimize your memory with AI review",
    features: [
      { label: "Unlimited TILs/day", included: true },
      { label: "AI smart review & insights", included: true },
      { label: "Test Mode toggle", included: true },
      { label: "Achievement system", included: true },
      { label: "Weekly quiz + performance summary", included: true },
      { label: "Suggested TILs (2–3)", included: true },
      { label: "Capy Explorer (monthly, green only)", included: true },
      { label: "Essay challenge tests", included: false },
      { label: "Neural links & smart clusters", included: false },
      { label: "Full profile visibility", included: true },
    ],
  },
  {
    name: "Premium",
    badge: "Full Optimisation",
    price: { monthly: 5.99, yearly: 59 },
    highlight: "Maximum retention + exclusive rewards",
    features: [
      { label: "Everything in Basic", included: true },
      { label: "AI-graded Full Recall tests", included: true },
      { label: "Essay challenge tests", included: true },
      { label: "Neural links & clustered learning", included: true },
      { label: "Capy Explorer (weekly, full loot)", included: true },
      { label: "Weekly Gazette from Capy", included: true },
      { label: "Unlimited suggested TILs", included: true },
      { label: "Full profile visibility", included: true },
    ],
  },
];
