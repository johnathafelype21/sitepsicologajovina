import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 240;

function getFrameUrl(index: number, isMobile: boolean): string {
  // 1-indexed: frame-0001.webp to frame-0240.webp
  const frameNum = Math.min(TOTAL_FRAMES, Math.max(1, index + 1));
  const padded = String(frameNum).padStart(4, '0');
  const dir = isMobile ? 'mobile' : 'desktop';
  return `/frames-final/${dir}/frame-${padded}.webp`;
}

export interface CinematicScrollProps {
  readonly className?: string;
}

export default function CinematicScroll({ className = '' }: Readonly<CinematicScrollProps>) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 768px)').matches;
  });

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);

  // Responsive device switch listener
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let isDisposed = false;
    let rafId: number | null = null;

    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);
    currentFrameRef.current = 0;
    targetFrameRef.current = 0;
    lastDrawnFrameRef.current = -1;

    const getNearestFrame = (target: number): HTMLImageElement | null => {
      const frames = imagesRef.current;
      if (frames[target]?.complete && frames[target]?.naturalWidth) {
        return frames[target];
      }
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = target - offset;
        if (prev >= 0 && frames[prev]?.complete && frames[prev]?.naturalWidth) {
          return frames[prev];
        }
        const next = target + offset;
        if (next < TOTAL_FRAMES && frames[next]?.complete && frames[next]?.naturalWidth) {
          return frames[next];
        }
      }
      return null;
    };

    const drawFrame = (frameIndex: number) => {
      if (!ctx || !canvas) return;

      const img = getNearestFrame(frameIndex);
      if (!img || !img.complete || !img.naturalWidth) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      if (!cw || !ch || !iw || !ih) return;

      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;

      ctx.fillStyle = '#EDE2D5';
      ctx.fillRect(0, 0, cw, ch);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, iw, ih, sx, sy, sw, sh);
      lastDrawnFrameRef.current = frameIndex;
    };

    const syncCanvasSize = (force = false) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);

      const diffW = Math.abs(canvas.width - w);
      const diffH = Math.abs(canvas.height - h);

      if (force || diffW > 2 || (isMobile ? diffH > 40 : diffH > 2)) {
        canvas.width = w;
        canvas.height = h;
      }

      drawFrame(Math.round(currentFrameRef.current));
    };

    const requestFrame = (index: number) => {
      if (index < 0 || index >= TOTAL_FRAMES) return;
      if (imagesRef.current[index] || isDisposed) return;
      const img = new Image();
      imagesRef.current[index] = img;
      img.onload = () => {
        if (isDisposed) return;
        const currentTarget = Math.round(currentFrameRef.current);
        if (Math.abs(currentTarget - index) <= 2) {
          drawFrame(currentTarget);
        }
      };
      img.src = getFrameUrl(index, isMobile);
    };

    // 1. Instantly load first frame
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0, isMobile);
    firstImg.onload = () => {
      if (isDisposed) return;
      imagesRef.current[0] = firstImg;
      syncCanvasSize(true);
      drawFrame(0);
    };

    // 2. Preload anchor frames (every 5 frames across the timeline)
    for (let i = 0; i < TOTAL_FRAMES; i += 5) {
      requestFrame(i);
    }

    // 3. Sliding preloader around current scroll position
    const prioritizeAround = (frameIdx: number) => {
      for (let offset = -8; offset <= 16; offset++) {
        const idx = frameIdx + offset;
        if (idx >= 0 && idx < TOTAL_FRAMES && !imagesRef.current[idx]) {
          requestFrame(idx);
        }
      }
    };

    // 4. Background progressive batch loader
    let batchIdx = 0;
    const loadRemaining = () => {
      if (isDisposed || batchIdx >= TOTAL_FRAMES) return;
      const end = Math.min(batchIdx + 12, TOTAL_FRAMES);
      for (; batchIdx < end; batchIdx++) {
        requestFrame(batchIdx);
      }
      if (batchIdx < TOTAL_FRAMES) {
        window.setTimeout(loadRemaining, 25);
      }
    };
    const batchTimer = window.setTimeout(loadRemaining, 50);

    syncCanvasSize(true);
    const onResize = () => syncCanvasSize(true);
    window.addEventListener('resize', onResize, { passive: true });

    const updateTargetFromScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const target = progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = target;
      prioritizeAround(Math.round(target));
    };

    window.addEventListener('scroll', updateTargetFromScroll, { passive: true });
    updateTargetFromScroll();

    const lerpRate = isMobile ? 0.45 : 0.35;

    const renderLoop = () => {
      if (isDisposed) return;

      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) < 0.02) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        currentFrameRef.current += diff * lerpRate;
      }

      const frameIndex = Math.round(currentFrameRef.current);
      if (frameIndex !== lastDrawnFrameRef.current) {
        drawFrame(frameIndex);
      }

      rafId = window.requestAnimationFrame(renderLoop);
    };

    rafId = window.requestAnimationFrame(renderLoop);

    return () => {
      isDisposed = true;
      window.clearTimeout(batchTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', updateTargetFromScroll);

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className={`cinematic-scroll ${className}`}
      aria-label="Abertura visual cinematográfica"
    >
      <div className="cinematic-scroll-sticky">
        <canvas
          ref={canvasRef}
          className="cinematic-scroll-canvas"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
