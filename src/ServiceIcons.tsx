export function NotionIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="notion-icon-group">
        {/* Database icon with animated connections */}
        <rect x="10" y="15" width="15" height="12" rx="2" fill="rgba(0, 180, 216, 0.3)" stroke="#00B4D8" strokeWidth="1.5">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="35" y="15" width="15" height="12" rx="2" fill="rgba(0, 180, 216, 0.3)" stroke="#00B4D8" strokeWidth="1.5">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="10" y="33" width="15" height="12" rx="2" fill="rgba(0, 180, 216, 0.3)" stroke="#00B4D8" strokeWidth="1.5">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.5s" />
        </rect>
        <rect x="35" y="33" width="15" height="12" rx="2" fill="rgba(0, 180, 216, 0.3)" stroke="#00B4D8" strokeWidth="1.5">
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" begin="0.5s" />
        </rect>
        {/* Connecting lines */}
        <line x1="25" y1="21" x2="35" y2="21" stroke="#00B4D8" strokeWidth="1.5" strokeDasharray="2 2">
          <animate attributeName="stroke-dashoffset" from="0" to="4" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="25" y1="39" x2="35" y2="39" stroke="#00B4D8" strokeWidth="1.5" strokeDasharray="2 2">
          <animate attributeName="stroke-dashoffset" from="0" to="4" dur="1s" repeatCount="indefinite" />
        </line>
      </g>
    </svg>
  )
}

export function ZapierIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="zapier-icon-group">
        {/* Lightning bolt with pulse */}
        <path d="M35 10 L20 30 L28 30 L25 50 L40 28 L32 28 Z" fill="url(#zapierGradient)" stroke="#F5A623" strokeWidth="1.5">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
        </path>
        <defs>
          <linearGradient id="zapierGradient" x1="20" y1="10" x2="40" y2="50">
            <stop offset="0%" stopColor="#F5A623" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F5A623" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Orbiting particles */}
        <circle cx="30" cy="30" r="2" fill="#F5A623">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 30 30"
            to="360 30 30"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  )
}

export function AIIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="ai-icon-group">
        {/* Brain/neural network */}
        <circle cx="30" cy="30" r="18" fill="none" stroke="url(#aiGradient)" strokeWidth="1.5">
          <animate attributeName="stroke-dasharray" values="0 113; 113 0; 0 113" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="30" cy="30" r="12" fill="none" stroke="url(#aiGradient)" strokeWidth="1.5">
          <animate attributeName="stroke-dasharray" values="0 75; 75 0; 0 75" dur="3s" repeatCount="indefinite" begin="0.5s" />
        </circle>
        <circle cx="30" cy="30" r="6" fill="none" stroke="url(#aiGradient)" strokeWidth="1.5">
          <animate attributeName="stroke-dasharray" values="0 38; 38 0; 0 38" dur="3s" repeatCount="indefinite" begin="1s" />
        </circle>
        {/* Center pulse */}
        <circle cx="30" cy="30" r="3" fill="#7B2CBF">
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <defs>
          <linearGradient id="aiGradient" x1="12" y1="12" x2="48" y2="48">
            <stop offset="0%" stopColor="#7B2CBF" />
            <stop offset="100%" stopColor="#00B4D8" />
          </linearGradient>
        </defs>
      </g>
    </svg>
  )
}

export function FullStackIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="fullstack-icon-group">
        {/* Layered stack with animation */}
        <rect x="15" y="12" width="30" height="8" rx="2" fill="rgba(0, 180, 216, 0.4)" stroke="#00B4D8" strokeWidth="1.5">
          <animate attributeName="y" values="12;10;12" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="15" y="26" width="30" height="8" rx="2" fill="rgba(0, 255, 136, 0.4)" stroke="#00FF88" strokeWidth="1.5">
          <animate attributeName="y" values="26;24;26" dur="2s" repeatCount="indefinite" begin="0.3s" />
        </rect>
        <rect x="15" y="40" width="30" height="8" rx="2" fill="rgba(123, 44, 191, 0.4)" stroke="#7B2CBF" strokeWidth="1.5">
          <animate attributeName="y" values="40;38;40" dur="2s" repeatCount="indefinite" begin="0.6s" />
        </rect>
        {/* Code brackets */}
        <text x="20" y="20" fill="#00B4D8" fontSize="10" fontFamily="monospace">&lt;/&gt;</text>
        <text x="20" y="34" fill="#00FF88" fontSize="10" fontFamily="monospace">{ }</text>
        <text x="20" y="48" fill="#7B2CBF" fontSize="10" fontFamily="monospace">[ ]</text>
      </g>
    </svg>
  )
}

