export function TrophyIcon({ size = 24, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M17 4H7v4a5 5 0 0 0 10 0V4z" />
      <path d="M18 4h2a2 2 0 0 1 0 4h-2" />
      <path d="M6 4H4a2 2 0 0 0 0 4h2" />
    </svg>
  );
}