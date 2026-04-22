import { useState, useEffect, useRef, useCallback } from "react";
import { SECTIONS } from "./data/portfolio";
import { SectionContent } from "./components/SectionContent";
import { TypewriterText } from "./components/TypewriterText";
import { FrequencyDisplay } from "./components/FrequencyDisplay";
import { CRTNoise } from "./components/CRTNoise";
import "./index.css";

/* ─── Audio hook ─────────────────────────────────────────────────── */
function useAudio(muted: boolean) {
  const ctxRef      = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const masterRef   = useRef<GainNode | null>(null);

  /** Lazily create and return the master gain node (and analyser on first call). */
  const getOutput = useCallback((): GainNode | null => {
    if (ctxRef.current) return masterRef.current;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      ctxRef.current = ctx;

      // Graph: sources → master gain → analyser → destination
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;               // 32 frequency bins
      analyser.smoothingTimeConstant = 0.75;
      analyser.connect(ctx.destination);
      analyserRef.current = analyser;

      const master = ctx.createGain();
      master.connect(analyser);
      masterRef.current = master;

      return master;
    } catch {
      return null;
    }
  }, []);

  /** Tight square-wave blip — the codec page-change/select tone. */
  const playBeep = useCallback(() => {
    if (muted) return;
    try {
      const ctx = ctxRef.current || (() => { getOutput(); return ctxRef.current; })()!;
      const output = masterRef.current!;
      const t = ctx.currentTime;

      // Bandpass to give it that tinny, narrow-speaker codec quality
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 1400;
      bp.Q.value = 6;
      bp.connect(output);

      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.setValueAtTime(1320, t);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

      osc.connect(gain);
      gain.connect(bp);
      osc.start(t);
      osc.stop(t + 0.08);
    } catch {}
  }, [muted, getOutput]);

  /** Bandpass-filtered noise burst — radio interference between channels. */
  const playStatic = useCallback(() => {
    if (muted) return;
    try {
      const ctx = ctxRef.current || (() => { getOutput(); return ctxRef.current; })()!;
      const output = masterRef.current!;
      const t = ctx.currentTime;

      const dur = 0.22;
      const bufferSize = Math.floor(ctx.sampleRate * dur);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      // Pink-ish noise: low-passed random values, more like radio hiss than white noise
      let lp = 0;
      for (let i = 0; i < bufferSize; i++) {
        const w = Math.random() * 2 - 1;
        lp = lp * 0.6 + w * 0.4;
        data[i] = (lp * 0.7 + w * 0.3);
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Bandpass — mid/high range, like a small speaker
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 1800;
      bp.Q.value = 0.8;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.28, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      source.connect(bp);
      bp.connect(gain);
      gain.connect(output);
      source.start(t);
    } catch {}
  }, [muted, getOutput]);

  /** Classic codec call ring — two paired chirps, "deet-doot · deet-doot". */
  const playCodecOpen = useCallback(() => {
    if (muted) return;
    try {
      const ctx = ctxRef.current || (() => { getOutput(); return ctxRef.current; })()!;
      const output = masterRef.current!;
      const start = ctx.currentTime;

      // Bandpass shapes the whole ring like it's coming through a tiny speaker
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 1500;
      bp.Q.value = 4;
      bp.connect(output);

      // pattern: high-low pair, gap, high-low pair
      // each beep ~70ms, intra-pair gap 30ms, inter-pair gap 140ms
      const beeps: { f: number; t: number }[] = [
        { f: 1400, t: 0.00 },
        { f: 1050, t: 0.10 },
        { f: 1400, t: 0.34 },
        { f: 1050, t: 0.44 },
      ];

      beeps.forEach(({ f, t: offset }) => {
        const t = start + offset;
        const osc = ctx.createOscillator();
        osc.type = "square";
        osc.frequency.setValueAtTime(f, t);

        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.14, t + 0.006);
        g.gain.setValueAtTime(0.14, t + 0.055);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.075);

        osc.connect(g);
        g.connect(bp);
        osc.start(t);
        osc.stop(t + 0.085);
      });
    } catch {}
  }, [muted, getOutput]);

  /** Initialise audio context on first user interaction so the
      analyser is ready before any sound plays. */
  const prime = useCallback(() => { getOutput(); }, [getOutput]);

  return { playBeep, playStatic, playCodecOpen, prime, analyserRef };
}

/* ─── App ────────────────────────────────────────────────────────── */
export default function App() {
  const [bootStage, setBootStage]       = useState<"warmup" | "loading" | "off" | "done">("warmup");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [muted, setMuted]               = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [dialogueKey, setDialogueKey]   = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const { playBeep, playStatic, playCodecOpen, prime, analyserRef } = useAudio(muted);

  const section = SECTIONS[sectionIndex];

  useEffect(() => {
    // CRT power-on warm-up (line scan) → loading text → CRT power-off → main content reveal
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setBootStage("loading"), 650));
    timers.push(window.setTimeout(() => playCodecOpen(),       2150));
    timers.push(window.setTimeout(() => setBootStage("off"),   2400));
    timers.push(window.setTimeout(() => setBootStage("done"),  2900));
    return () => timers.forEach(clearTimeout);
  }, []);

  const navigate = useCallback((dir: -1 | 1) => {
    if (transitioning) return;
    const next = (sectionIndex + dir + SECTIONS.length) % SECTIONS.length;
    setTransitioning(true);
    playStatic();
    setTimeout(() => {
      setSectionIndex(next);
      setDialogueKey((k) => k + 1);
      setTransitioning(false);
      if (contentRef.current) contentRef.current.scrollTop = 0;
      playBeep();
    }, 350);
  }, [sectionIndex, transitioning, playStatic, playBeep]);

  const goToSection = useCallback((idx: number) => {
    if (idx === sectionIndex || transitioning) return;
    setTransitioning(true);
    playStatic();
    setTimeout(() => {
      setSectionIndex(idx);
      setDialogueKey((k) => k + 1);
      setTransitioning(false);
      if (contentRef.current) contentRef.current.scrollTop = 0;
      playBeep();
    }, 350);
  }, [sectionIndex, transitioning, playStatic, playBeep]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft")  navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  const toggleMute = () => {
    prime(); // ensure AudioContext exists on first interaction
    setMuted((m) => !m);
  };

  return (
    <>
      {/* Boot overlay */}
      {bootStage !== "done" && (
        <div className={`codec-boot stage-${bootStage}`}>
          <div className="boot-crt">
            <div className="boot-crt-line" />
            <div className="boot-crt-content">
              <div className="boot-text">CODEC SYSTEM v4.2.1</div>
              <div className="boot-progress">
                <div className="boot-progress-fill" />
              </div>
              <div className="boot-subtext">INITIALIZING TRANSMISSION...</div>
            </div>
          </div>
        </div>
      )}

      {/* CRT effects */}
      <div className="crt-overlay" />
      <CRTNoise />
      <div className="crt-vignette" />

      {/* Main codec */}
      <div className="codec-outer">
        <div className="codec-screen">

          <div className={`static-overlay ${transitioning ? "active" : ""}`} />

          {/* Top bar */}
          <div className="codec-topbar">
            <div className="codec-topbar-label">◈ CODEC SYSTEM — ACTIVE</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="signal-indicator">
                {[1,2,3,4,5].map(i => <div key={i} className="signal-bar" />)}
              </div>
              <button
                className={`mute-toggle ${!muted ? "active" : ""}`}
                onClick={toggleMute}
              >
                {muted ? "🔇 MUTED" : "🔊 SFX ON"}
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="codec-body">
            <div className="center-panel">

              {/* Frequency display */}
              <div className="freq-display-area">
                <button
                  className="freq-nav-btn glow-dim"
                  onClick={() => navigate(-1)}
                  aria-label="Previous frequency"
                >◄</button>

                <FrequencyDisplay
                  freq={section.freq}
                  transitioning={transitioning}
                  analyser={analyserRef}
                />

                <button
                  className="freq-nav-btn glow-dim"
                  onClick={() => navigate(1)}
                  aria-label="Next frequency"
                >►</button>
              </div>

              {/* Section directory */}
              <div className="contacts-list">
                <div className="contacts-label">◈ FREQ DIRECTORY</div>
                <div className="contacts-grid">
                  {SECTIONS.map((s, i) => (
                    <button
                      key={s.freq}
                      className={`contact-chip ${i === sectionIndex ? "active" : ""}`}
                      onClick={() => goToSection(i)}
                    >
                      {s.freq} · {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="content-area" ref={contentRef}>
                <div
                  key={dialogueKey}
                  className={`crt-screen ${transitioning ? "crt-off" : "crt-on"}`}
                >
                  <SectionContent sectionCode={section.code} />
                </div>
              </div>
            </div>
          </div>

          {/* Dialogue bar */}
          <div className="codec-dialogue">
            <div className="dialogue-label">RECV&gt;</div>
            <TypewriterText key={dialogueKey} text={section.dialogue} speed={28} />
          </div>

        </div>
      </div>
    </>
  );
}
