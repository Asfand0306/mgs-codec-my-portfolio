import { useEffect, useRef } from "react";

export function CRTNoise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const W = 220;
    const H = 140;
    canvas.width = W;
    canvas.height = H;

    const img = ctx.createImageData(W, H);
    const buf = img.data;
    let raf = 0;
    let last = 0;
    const FPS = 24;
    const FRAME_MS = 1000 / FPS;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < FRAME_MS) return;
      last = now;

      for (let i = 0; i < buf.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        buf[i]     = (v * 0.05) | 0;
        buf[i + 1] = v;
        buf[i + 2] = (v * 0.78) | 0;
        buf[i + 3] = v < 200 ? 0 : 90 + ((Math.random() * 60) | 0);
      }
      ctx.putImageData(img, 0, 0);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className="crt-noise-canvas" aria-hidden="true" />;
}
