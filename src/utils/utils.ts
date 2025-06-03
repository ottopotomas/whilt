// Utility to merge class names conditionally
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Utility to capitalize the first letter of a word
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Utility to format numbers with commas (e.g. 1,000)
export function formatNumber(n: number): string {
  return n.toLocaleString();
}

// Utility to pluralize a label (simple)
export function pluralize(count: number, singular: string, plural?: string): string {
  return `${count} ${count === 1 ? singular : plural || `${singular}s`}`;
}
