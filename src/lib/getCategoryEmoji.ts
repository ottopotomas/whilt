export function getCategoryEmoji(category: string): string {
  const map: { [key: string]: string } = {
    Mindset: "🧠",
    Productivity: "⚡",
    Science: "🔬",
    Tech: "💻",
    "Words & Language": "🗣️",
    Finance: "💰",
    History: "🏛️",
    Business: "📊",
    Philosophy: "🧘",
    Culture: "🌍",
    Health: "🏃",
    Relationships: "❤️",
    "Random Fact": "🎲",
    Quotes: "📝",
  };
  return map[category] || "📘";
}
