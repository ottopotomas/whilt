export function BrainIcon({ size = 24, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2a2 2 0 0 1 2 2v1h2a2 2 0 0 1 0 4h-1" />
      <path d="M10 2a2 2 0 0 0-2 2v1H6a2 2 0 0 0 0 4h1" />
      <path d="M8 16H6a2 2 0 0 0 0 4h2v1a2 2 0 0 0 4 0v-1h2a2 2 0 0 0 0-4h-2v-1a2 2 0 0 0-4 0v1z" />
      <path d="M16 9h1a2 2 0 0 1 0 4h-1" />
      <path d="M8 9H7a2 2 0 0 0 0 4h1" />
    </svg>
  );
}