import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface CinematicScrollProps {
  readonly className?: string;
}

const FRAME_COUNT = 240;
const FRAME_ASSET_VERSION = 'manual240-gsap-v5';

function frameUrl(isMobile: boolean, index: number) {
  const folder = isMobile ? 'mobile' : 'desktop';
  return `/frames-final/${folder}/frame-${String(index + 1).padStart(4, '0')}.webp?v=${FRAME_ASSET_VERSION}`;
}

function drawCover(
  context: CanvasRenderingContext2D,
  image: ImageBitmap,
  width: number,
  height: number,
) {
  const imageRatio = image.width / image.height;
  const canvasRatio = width / height;

  let sourceWidth = image.width;
  let sourceHeight = image.height;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > canvasRatio) {
    sourceWidth = image.height * canvasRatio;
    sourceX = (image.width - sourceWidth) / 2;
  } else {
    sourceHeight = image.width / canvasRatio;
    sourceY = (image.height - sourceHeight) / 2;
  }

  context.clearRect(0, 0, width, height);
  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    width,
    height,
  );
}

export default function CinematicScroll({ className = '' }: Readonly<CinematicScrollProps>) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const syncViewport = () => setIsMobile(media.matches);

    syncViewport();
    media.addEventListener('change', syncViewport);
    return () => media.removeEventListener('change', syncViewport);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const context = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,
    });
    if (!context) return;

    let cancelled = false;
    let resizeRaf: number | null = null;
    let activeLoads = 0;
    let lastRendered = -1;
    let lastRequestedCenter = -1;
    let prefetchStarted = false;

    const cacheLimit = isMobile ? 14 : 22;
    const loadConcurrency = isMobile ? 3 : 5;
    const ahead = isMobile ? 10 : 16;
    const behind = isMobile ? 3 : 5;

    const cache = new Map<number, ImageBitmap>();
    const loading = new Set<number>();
    const queued = new Set<number>();
    const queue: number[] = [];

    const playhead = { frame: 0 };

    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });

    const syncSectionHeight = () => {
      const pixelsPerFrame = isMobile ? 11 : 15;
      const travel = (FRAME_COUNT - 1) * pixelsPerFrame;
      section.style.height = `${window.innerHeight + travel}px`;
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.35);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        lastRendered = -1;
      }
    };

    const pruneCache = (center: number) => {
      if (cache.size <= cacheLimit) return;

      const removable = [...cache.keys()]
        .filter((index) => index !== lastRendered && index !== center)
        .sort((a, b) => Math.abs(b - center) - Math.abs(a - center));

      while (cache.size > cacheLimit && removable.length > 0) {
        const index = removable.shift();
        if (index === undefined) break;
        const bitmap = cache.get(index);
        cache.delete(index);
        bitmap?.close();
      }
    };

    const drawFrame = (index: number) => {
      if (index === lastRendered) return true;
      const bitmap = cache.get(index);
      if (!bitmap) return false;

      drawCover(context, bitmap, canvas.width, canvas.height);
      lastRendered = index;
      return true;
    };

    const nearestReady = (index: number) => {
      if (cache.has(index)) return index;

      for (let distance = 1; distance <= 2; distance += 1) {
        if (cache.has(index - distance)) return index - distance;
        if (cache.has(index + distance)) return index + distance;
      }

      return lastRendered;
    };

    const pumpQueue = () => {
      while (!cancelled && activeLoads < loadConcurrency && queue.length > 0) {
        const index = queue.shift();
        if (index === undefined) break;

        queued.delete(index);
        if (index < 0 || index >= FRAME_COUNT || cache.has(index) || loading.has(index)) continue;

        activeLoads += 1;
        loading.add(index);

        void (async () => {
          try {
            const response = await fetch(frameUrl(isMobile, index), {
              cache: 'force-cache',
              priority: index <= 2 ? 'high' : 'auto',
            } as RequestInit);

            if (!response.ok || cancelled) return;

            const blob = await response.blob();
            if (cancelled) return;

            const bitmap = await createImageBitmap(blob);
            if (cancelled) {
              bitmap.close();
              return;
            }

            cache.set(index, bitmap);
            pruneCache(Math.round(playhead.frame));

            const wanted = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(playhead.frame)));
            if (index === wanted || lastRendered < 0) {
              drawFrame(nearestReady(wanted));
            }
          } catch {
            // A janela de prioridade tenta novamente se esse frame voltar a ser necessário.
          } finally {
            loading.delete(index);
            activeLoads -= 1;
            pumpQueue();
          }
        })();
      }
    };

    const enqueue = (index: number, priority = false) => {
      if (
        index < 0 ||
        index >= FRAME_COUNT ||
        cache.has(index) ||
        loading.has(index) ||
        queued.has(index)
      ) {
        return;
      }

      queued.add(index);
      if (priority) queue.unshift(index);
      else queue.push(index);
    };

    const warmWindow = (center: number) => {
      if (center === lastRequestedCenter) return;
      lastRequestedCenter = center;

      queue.length = 0;
      queued.clear();

      enqueue(center, true);
      enqueue(center + 1, true);
      enqueue(center - 1, true);

      for (let distance = 2; distance <= ahead; distance += 1) {
        enqueue(center + distance, distance <= 4);
      }

      for (let distance = 2; distance <= behind; distance += 1) {
        enqueue(center - distance);
      }

      pumpQueue();
    };

    const renderPlayhead = () => {
      const wanted = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(playhead.frame)));
      warmWindow(wanted);
      const ready = nearestReady(wanted);
      if (ready >= 0) drawFrame(ready);
    };

    const prefetchCompressed = async () => {
      if (prefetchStarted || cancelled) return;
      prefetchStarted = true;

      let cursor = 0;
      const workers = isMobile ? 2 : 3;

      const worker = async () => {
        while (!cancelled && cursor < FRAME_COUNT) {
          const index = cursor;
          cursor += 1;

          try {
            const response = await fetch(frameUrl(isMobile, index), {
              cache: 'force-cache',
              priority: 'low',
            } as RequestInit);
            if (response.ok) await response.arrayBuffer();
          } catch {
            // O carregamento ativo continua independente do prefetch.
          }
        }
      };

      await Promise.all(Array.from({ length: workers }, () => worker()));
    };

    syncSectionHeight();
    resizeCanvas();

    for (let index = 0; index < (isMobile ? 8 : 12); index += 1) {
      enqueue(index, index <= 2);
    }
    pumpQueue();

    const tween = gsap.to(playhead, {
      frame: FRAME_COUNT - 1,
      ease: 'none',
      paused: false,
      onUpdate: renderPlayhead,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: isMobile ? 0.16 : 0.12,
        invalidateOnRefresh: true,
        fastScrollEnd: false,
        onEnter: () => void prefetchCompressed(),
        onEnterBack: () => void prefetchCompressed(),
      },
    });

    const prefetchObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void prefetchCompressed();
          prefetchObserver.disconnect();
        }
      },
      {
        rootMargin: isMobile ? '90% 0px 90% 0px' : '130% 0px 130% 0px',
        threshold: 0,
      },
    );
    prefetchObserver.observe(section);

    const handleResize = () => {
      if (resizeRaf !== null) return;

      resizeRaf = window.requestAnimationFrame(() => {
        resizeRaf = null;
        syncSectionHeight();
        resizeCanvas();
        renderPlayhead();
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelled = true;
      prefetchObserver.disconnect();
      tween.scrollTrigger?.kill();
      tween.kill();

      if (resizeRaf !== null) window.cancelAnimationFrame(resizeRaf);
      window.removeEventListener('resize', handleResize);

      cache.forEach((bitmap) => bitmap.close());
      cache.clear();
      loading.clear();
      queued.clear();
      queue.length = 0;

      section.style.removeProperty('height');
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className={`cinematic-scroll ${className}`}
      aria-label="Experiência visual controlada pela rolagem"
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
