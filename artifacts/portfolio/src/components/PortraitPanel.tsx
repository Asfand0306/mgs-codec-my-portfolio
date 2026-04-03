interface PortraitPanelProps {
  name: string;
  side: "left" | "right";
}

function AvatarSVG({ name }: { name: string }) {
  const isCommand = name === "COMMAND";

  if (isCommand) {
    return (
      <svg viewBox="0 0 100 120" className="avatar-svg" style={{ width: '75%', height: '75%' }}>
        {/* FOXHOUND logo / command figure */}
        <circle cx="50" cy="30" r="18" />
        <rect x="28" y="52" width="44" height="55" rx="4" />
        <rect x="16" y="58" width="14" height="38" rx="4" />
        <rect x="70" y="58" width="14" height="38" rx="4" />
        <rect x="30" y="107" width="16" height="12" rx="3" />
        <rect x="54" y="107" width="16" height="12" rx="3" />
        {/* headset */}
        <path d="M32 25 Q50 8 68 25" strokeWidth="2" fill="none" />
        <rect x="27" y="24" width="6" height="10" rx="2" />
        <rect x="67" y="24" width="6" height="10" rx="2" />
        {/* eyes */}
        <ellipse cx="43" cy="28" rx="4" ry="4" />
        <ellipse cx="57" cy="28" rx="4" ry="4" />
        <circle cx="43" cy="28" r="2" fill="var(--bg)" />
        <circle cx="57" cy="28" r="2" fill="var(--bg)" />
        {/* badge */}
        <rect x="38" y="65" width="24" height="16" rx="2" fill="var(--bg)" strokeWidth="1" />
        <text x="50" y="77" textAnchor="middle" fontSize="7" fill="var(--green-dim)" fontFamily="VT323, monospace">FOX</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 120" className="avatar-svg" style={{ width: '75%', height: '75%' }}>
      {/* Developer figure */}
      <circle cx="50" cy="28" r="20" />
      <rect x="26" y="52" width="48" height="55" rx="4" />
      <rect x="14" y="56" width="14" height="40" rx="4" />
      <rect x="72" y="56" width="14" height="40" rx="4" />
      <rect x="28" y="107" width="18" height="12" rx="3" />
      <rect x="54" y="107" width="18" height="12" rx="3" />
      {/* hair / detail */}
      <path d="M30 22 Q50 5 70 22 Q72 10 60 6 Q50 2 40 6 Q28 10 30 22" fill="var(--green-dim)" stroke="none" opacity="0.7" />
      {/* eyes */}
      <ellipse cx="43" cy="26" rx="4" ry="4" />
      <ellipse cx="57" cy="26" rx="4" ry="4" />
      <circle cx="43" cy="26" r="2" fill="var(--bg)" />
      <circle cx="57" cy="26" r="2" fill="var(--bg)" />
      {/* laptop on chest */}
      <rect x="34" y="65" width="32" height="22" rx="2" fill="var(--bg)" strokeWidth="1" />
      <rect x="36" y="67" width="28" height="18" rx="1" fill="var(--bg-panel)" strokeWidth="0.5" />
      {/* code lines */}
      <line x1="38" y1="71" x2="52" y2="71" strokeWidth="1.5" />
      <line x1="38" y1="75" x2="48" y2="75" strokeWidth="1.5" />
      <line x1="40" y1="79" x2="56" y2="79" strokeWidth="1.5" />
      <line x1="38" y1="83" x2="50" y2="83" strokeWidth="1.5" />
    </svg>
  );
}

export function PortraitPanel({ name, side }: PortraitPanelProps) {
  return (
    <div className="portrait-panel" style={side === 'right' ? { borderLeft: '1px solid var(--green-dark)' } : {}}>
      <div className="corner corner-tl" />
      <div className="corner corner-tr" />
      <div className="corner corner-bl" />
      <div className="corner corner-br" />

      <div className="portrait-frame">
        <div className="portrait-avatar">
          <AvatarSVG name={name} />
          {/* Scanlines on avatar */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)',
            zIndex: 1,
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      <div className="portrait-name glow-dim">{name}</div>
    </div>
  );
}
