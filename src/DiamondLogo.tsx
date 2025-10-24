export function DiamondLogo() {
  return (
    <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00F5FF" />
          <stop offset="50%" stopColor="#00B4D8" />
          <stop offset="100%" stopColor="#7B2CBF" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L2 10L12 26L22 10L12 2Z"
        fill="url(#diamondGradient)"
        stroke="url(#diamondGradient)"
        strokeWidth="1"
        strokeLinejoin="miter"
      />
      <path
        d="M12 2L12 26M2 10L22 10M6 6L12 10M18 6L12 10M6 14L12 18M18 14L12 18"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="0.5"
      />
    </svg>
  )
}

