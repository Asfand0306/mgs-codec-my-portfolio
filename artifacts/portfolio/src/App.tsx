import { useState, useEffect, useRef, useCallback } from "react";
import { SECTIONS } from "./data/portfolio";
import { PortraitPanel } from "./components/PortraitPanel";
import { SectionContent } from "./components/SectionContent";
import { TypewriterText } from "./components/TypewriterText";
import "./index.css";

function useAudio(muted: boolean) {
  const audioCtx = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtx.current;
  }, []);

  const playBeep = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } catch {}
  }, [muted, getCtx]);

  const playStatic = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.12;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start();
    } catch {}
  }, [muted, getCtx]);

  const playCodecOpen = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();
      const freqs = [440, 880, 660, 1100];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        const startTime = ctx.currentTime + i * 0.08;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.1, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);
        osc.start(startTime);
        osc.stop(startTime + 0.12);
      });
    } catch {}
  }, [muted, getCtx]);

  return { playBeep, playStatic, playCodecOpen };
}

export default function App() {
  const [booting, setBooting] = useState(true);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [dialogueKey, setDialogueKey] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const { playBeep, playStatic, playCodecOpen } = useAudio(muted);

  const section = SECTIONS[sectionIndex];

  // Boot sequence
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

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

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
            fontFamily: 'VT323, monospace',
            fontSize: '14px',
            color: 'var(--green-dark)',
            letterSpacing: '3px',
            marginTop: '8px',
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

          {/* Static transition overlay */}
          <div className={`static-overlay ${transitioning ? 'active' : ''}`} />

          {/* Top bar */}
          <div className="codec-topbar">
            <div className="codec-topbar-label">◈ CODEC SYSTEM — ACTIVE</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="signal-indicator">
                {[1,2,3,4,5].map(i => <div key={i} className="signal-bar" />)}
              </div>
              <button
                className={`mute-toggle ${!muted ? 'active' : ''}`}
                onClick={() => setMuted(!muted)}
              >
                {muted ? '🔇 MUTED' : '🔊 SFX ON'}
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="codec-body">

            {/* Left portrait */}
            <PortraitPanel name={section.speaker} side="left" />

            {/* Center panel */}
            <div className="center-panel">

              {/* Frequency display */}
              <div className="freq-display-area">
                <button
                  className="freq-nav-btn glow-dim"
                  onClick={() => navigate(-1)}
                  aria-label="Previous frequency"
                >
                  ◄
                </button>

                <div className="freq-display">
                  <div className={`freq-number ${transitioning ? 'rolling' : ''}`}>
                    {section.freq}
                  </div>
                  <div className="freq-labels">
                    <span className="freq-label active">PTT</span>
                    <span className="freq-label active">MEMORY</span>
                    <span className="freq-label">ENC</span>
                  </div>
                </div>

                <button
                  className="freq-nav-btn glow-dim"
                  onClick={() => navigate(1)}
                  aria-label="Next frequency"
                >
                  ►
                </button>
              </div>

              {/* Contacts list */}
              <div className="contacts-list">
                <div className="contacts-label">◈ FREQ DIRECTORY</div>
                <div className="contacts-grid">
                  {SECTIONS.map((s, i) => (
                    <button
                      key={s.freq}
                      className={`contact-chip ${i === sectionIndex ? 'active' : ''}`}
                      onClick={() => goToSection(i)}
                    >
                      {s.freq} · {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content area */}
              <div
                className="content-area"
                ref={contentRef}
                style={{ opacity: transitioning ? 0.3 : 1, transition: 'opacity 0.2s' }}
              >
                <SectionContent sectionCode={section.code} />
              </div>
            </div>

          </div>

          {/* Dialogue */}
          <div className="codec-dialogue">
            <div className="dialogue-label">RECV&gt;</div>
            <TypewriterText key={dialogueKey} text={section.dialogue} speed={28} />
          </div>

        </div>
      </div>
    </>
  );
}
