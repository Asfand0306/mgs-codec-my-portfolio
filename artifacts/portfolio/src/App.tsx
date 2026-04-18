import { useState, useEffect, useRef, useCallback } from "react";
import { SECTIONS } from "./data/portfolio";
import { PortraitPanel } from "./components/PortraitPanel";
import { SectionContent } from "./components/SectionContent";
import { TypewriterText } from "./components/TypewriterText";
import { FrequencyDisplay } from "./components/FrequencyDisplay";
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

  const playBeep = useCallback(() => {
    if (muted) return;
    try {
      const ctx = ctxRef.current || (() => { getOutput(); return ctxRef.current; })()!;
      const output = masterRef.current!;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(output);
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } catch {}
  }, [muted, getOutput]);

  const playStatic = useCallback(() => {
    if (muted) return;
    try {
      const ctx = ctxRef.current || (() => { getOutput(); return ctxRef.current; })()!;
      const output = masterRef.current!;
      const bufferSize = ctx.sampleRate * 0.18;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.14;
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      source.connect(gain);
      gain.connect(output);
      source.start();
    } catch {}
  }, [muted, getOutput]);

  const playCodecOpen = useCallback(() => {
    if (muted) return;
    try {
      const ctx = ctxRef.current || (() => { getOutput(); return ctxRef.current; })()!;
      const output = masterRef.current!;
      [440, 880, 660, 1100].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(output);
        osc.frequency.value = freq;
        const t = ctx.currentTime + i * 0.08;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.1, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.start(t);
        osc.stop(t + 0.12);
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
  const [booting, setBooting]           = useState(true);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [muted, setMuted]               = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [dialogueKey, setDialogueKey]   = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const { playBeep, playStatic, playCodecOpen, prime, analyserRef } = useAudio(muted);

  const section = SECTIONS[sectionIndex];

  useEffect(() => {
    const t = setTimeout(() => {
      setBooting(false);
      playCodecOpen();
    }, 2200);
    return () => clearTimeout(t);
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
      {booting && (
        <div className="codec-boot">
          <div className="boot-text">CODEC SYSTEM v4.2.1</div>
          <div className="boot-progress">
            <div className="boot-progress-fill" />
          </div>
          <div style={{
            fontFamily: "VT323, monospace", fontSize: 14,
            color: "var(--green-dark)", letterSpacing: 3, marginTop: 8,
          }}>
            INITIALIZING TRANSMISSION...
          </div>
        </div>
      )}

      {/* CRT effects */}
      <div className="crt-overlay" />
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
            <PortraitPanel name={section.speaker} side="left" />

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
              <div
                className="content-area"
                ref={contentRef}
                style={{ opacity: transitioning ? 0.3 : 1, transition: "opacity 0.2s" }}
              >
                <SectionContent sectionCode={section.code} />
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
