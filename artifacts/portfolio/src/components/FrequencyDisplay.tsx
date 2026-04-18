import { useEffect, useRef } from "react";

/* ─── Seven-segment data ──────────────────────────────────────────────
   Segments: [top, topRight, botRight, bottom, botLeft, topLeft, middle]
────────────────────────────────────────────────────────────────────── */
const SEG: Record<string, boolean[]> = {
  "0": [1,1,1,1,1,1,0].map(Boolean),
  "1": [0,1,1,0,0,0,0].map(Boolean),
  "2": [1,1,0,1,1,0,1].map(Boolean),
  "3": [1,1,1,1,0,0,1].map(Boolean),
  "4": [0,1,1,0,0,1,1].map(Boolean),
  "5": [1,0,1,1,0,1,1].map(Boolean),
  "6": [1,0,1,1,1,1,1].map(Boolean),
  "7": [1,1,1,0,0,0,0].map(Boolean),
  "8": [1,1,1,1,1,1,1].map(Boolean),
  "9": [1,1,1,1,0,1,1].map(Boolean),
};

const W = 28, H = 52, T = 4;
const ON  = "#cdfce8";
const OFF = "#0b2216";
const GLOW = "0 0 7px rgba(160,255,210,0.9), 0 0 14px rgba(0,220,120,0.5)";

function seg(on: boolean, style: React.CSSProperties) {
  return (
    <div style={{
      position: "absolute",
      background: on ? ON : OFF,
      boxShadow: on ? GLOW : "none",
      transition: "background 0.05s, box-shadow 0.05s",
      ...style,
    }} />
  );
}

function Digit({ char }: { char: string }) {
  if (char === ".") {
    return (
      <div style={{ display: "inline-flex", alignItems: "flex-end", width: 10, paddingBottom: 3, flexShrink: 0 }}>
        <div style={{
          width: 5, height: 5,
          background: ON,
          boxShadow: GLOW,
          borderRadius: 1,
        }} />
      </div>
    );
  }

  const s = SEG[char] ?? new Array(7).fill(false);
  const half = H / 2;

  return (
    <div style={{ position: "relative", width: W, height: H, display: "inline-block", flexShrink: 0 }}>
      {/* a – top */}
      {seg(s[0], { left: T + 1, top: 0,         width: W - 2*(T+1), height: T })}
      {/* b – top right */}
      {seg(s[1], { right: 0,   top: T + 1,      width: T, height: half - T - 2 })}
      {/* c – bot right */}
      {seg(s[2], { right: 0,   top: half + 2,   width: T, height: half - T - 2 })}
      {/* d – bottom */}
      {seg(s[3], { left: T + 1, bottom: 0,      width: W - 2*(T+1), height: T })}
      {/* e – bot left */}
      {seg(s[4], { left: 0,    top: half + 2,   width: T, height: half - T - 2 })}
      {/* f – top left */}
      {seg(s[5], { left: 0,    top: T + 1,      width: T, height: half - T - 2 })}
      {/* g – middle */}
      {seg(s[6], { left: T + 1, top: half - T/2, width: W - 2*(T+1), height: T })}
    </div>
  );
}

/* ─── Waveform bar canvas ─────────────────────────────────────────── */
const NUM_BARS   = 16;
const BAR_PX     = 3;
const BAR_GAP    = 3;
const CANVAS_H   = NUM_BARS * (BAR_PX + BAR_GAP) + BAR_GAP;

interface WaveformCanvasProps {
  analyser: React.RefObject<AnalyserNode | null>;
  active: boolean; // true while transitioning / burst
}

function WaveformCanvas({ analyser, active }: WaveformCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const timeRef   = useRef(0);
  const burstRef  = useRef(0); // countdown frames for burst

  useEffect(() => {
    if (active) burstRef.current = 22;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const freqData = new Uint8Array(analyser.current?.frequencyBinCount ?? 32);

    function draw() {
      rafRef.current = requestAnimationFrame(draw);
      timeRef.current += 0.04;
      if (burstRef.current > 0) burstRef.current--;

      if (analyser.current) {
        analyser.current.getByteFrequencyData(freqData);
      }

      const W = canvas!.width;
      const H = canvas!.height;
      ctx!.clearRect(0, 0, W, H);

      for (let i = 0; i < NUM_BARS; i++) {
        const y = BAR_GAP + i * (BAR_PX + BAR_GAP);

        // Audio data (normalized 0–1)
        const binIndex = Math.min(Math.floor(i * freqData.length / NUM_BARS), freqData.length - 1);
        const audioAmp = freqData[binIndex] / 255;

        // Idle sine-wave envelope — bars form a curved signal shape
        const phase   = timeRef.current * 1.4 + i * (Math.PI / (NUM_BARS - 1)) * 3.5;
        const envPos  = i / (NUM_BARS - 1); // 0 at top, 1 at bottom
        const envelope = Math.sin(envPos * Math.PI); // bell curve peak in middle
        const idleAmp  = envelope * (0.18 + 0.12 * Math.sin(phase));

        // Burst animation
        const burstPhase  = burstRef.current / 22;
        const burstNoise  = burstRef.current > 0
          ? burstPhase * (0.3 + 0.5 * Math.abs(Math.sin(i * 1.7 + timeRef.current * 8)))
          : 0;

        const amp = Math.max(audioAmp * 0.85, idleAmp) + burstNoise;
        const barW = Math.max(2, Math.min(W, amp * W));

        // Dim background track
        ctx!.fillStyle = "#0c2318";
        ctx!.fillRect(0, y, W, BAR_PX);

        // Active bar — gradient from left
        const grad = ctx!.createLinearGradient(0, 0, barW, 0);
        const intensity = Math.min(1, amp * 1.4);
        grad.addColorStop(0,   `rgba(0, 160, 80,  ${0.4 + intensity * 0.3})`);
        grad.addColorStop(0.6, `rgba(0, 220, 110, ${0.5 + intensity * 0.4})`);
        grad.addColorStop(1,   `rgba(160,255,200, ${0.7 + intensity * 0.3})`);
        ctx!.fillStyle = grad;
        ctx!.fillRect(0, y, barW, BAR_PX);

        // Bright leading-edge pixel
        if (barW > 4) {
          ctx!.fillStyle = `rgba(200,255,220,${0.6 + intensity * 0.4})`;
          ctx!.fillRect(barW - 1, y, 1, BAR_PX);
        }
      }
    }

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [analyser]);

  return (
    <canvas
      ref={canvasRef}
      width={90}
      height={CANVAS_H}
      style={{ display: "block", imageRendering: "pixelated" }}
    />
  );
}

/* ─── Main LCD display ────────────────────────────────────────────── */
interface FrequencyDisplayProps {
  freq: string;
  transitioning: boolean;
  analyser: React.RefObject<AnalyserNode | null>;
}

export function FrequencyDisplay({ freq, transitioning, analyser }: FrequencyDisplayProps) {
  const chars = freq.split("");

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 0,
      background: "#071510",
      border: "2px solid #1a4a28",
      boxShadow: "inset 0 0 20px rgba(0,0,0,0.8), 0 0 12px rgba(0,80,40,0.3)",
      padding: "6px 10px 6px 6px",
      position: "relative",
      overflow: "hidden",
      minWidth: 230,
    }}>
      {/* LCD phosphor tint overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 50%, rgba(0,120,60,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Scanline overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.18) 1px, rgba(0,0,0,0.18) 2px)",
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* Waveform bars */}
      <div style={{
        display: "flex", alignItems: "center",
        marginRight: 8, flexShrink: 0,
        borderRight: "1px solid #102a18",
        paddingRight: 8,
      }}>
        <WaveformCanvas analyser={analyser} active={transitioning} />
      </div>

      {/* Seven-segment digits */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        opacity: transitioning ? 0.25 : 1,
        transition: "opacity 0.15s",
        zIndex: 1,
        flexShrink: 0,
      }}>
        {chars.map((ch, i) => <Digit key={i} char={ch} />)}
      </div>

      {/* PTT / MEM labels below digits */}
      <div style={{
        position: "absolute", right: 8, bottom: 4,
        display: "flex", gap: 6, zIndex: 1,
      }}>
        {["PTT", "MEM"].map(lbl => (
          <span key={lbl} style={{
            fontFamily: "'VT323', monospace",
            fontSize: 10, letterSpacing: 2,
            color: "#2a6a3a",
            border: "1px solid #1a3a24",
            padding: "0 3px",
          }}>{lbl}</span>
        ))}
      </div>
    </div>
  );
}
