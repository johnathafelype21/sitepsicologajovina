import { useEffect, useRef, useState } from 'react';

export interface CinematicScrollProps {
  readonly className?: string;
}

const FRAME_COUNT = 240;
const CACHE_LIMIT = 18;
const LOAD_CONCURRENCY = 3;
const PRELOAD_DECODE_COUNT = 12;
const PREFETCH_BYTE_COUNT = 72;
const AHEAD_RADIUS = 12;
const BEHIND_RADIUS = 4;
const FRAME_ASSET_VERSION = 'manual240-ultrasmooth-v4';

function frameUrl(isMobile: boolean, index: number) {
  const folder = isMobile ? 'mobile' : 'desktop';
  return `/frames-final/${folder}/frame-${String(index + 1).padStart(4, '0')}.webp?v=${FRAME_ASSET_VERSION}`;
}

function drawCover(
  context: CanvasRenderingContext2D,
  image: CanvasImageSource,
  imageWidth: number,
  imageHeight: number,
  width: number,
  height: number,
) {
  const imageRatio = imageWidth / imageHeight;
  const canvasRatio = width / height;

  let sourceWidth = imageWidth;
  let sourceHeight = imageHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > canvasRatio) {
    sourceWidth = imageHeight * canvasRatio;
    sourceX = (imageWidth - sourceWidth) / 2;
  } else {
    sourceHeight = imageWidth / canvasRatio;
    sourceY = (imageHeight - sourceHeight) / 2;
  }

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
    let animationRaf: number | null = null;
    let resizeRaf: number | null = null;
    let idleHandle: number | null = null;

    let targetFrame = 0;
    let animatedFrame = 0;
    let renderedFrame = -1;
    let direction = 1;
    let lastScrollY = window.scrollY;
    let lastWarmCenter = -1;
    let activeLoads = 0;
    let isNearSection = false;

    const cache = new Map<number, ImageBitmap>();
    const loading = new Set<number>();
    const queued = new Set<number>();
    const queue: number[] = [];

    const getPixelsPerFrame = () => (isMobile ? 12 : 16);

    const syncSectionHeight = () => {
      const travel = (FRAME_COUNT - 1) * getPixelsPerFrame();
      section.style.height = `${window.innerHeight + travel}px`;
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();

      // Mobile GPUs are much more sensitive to large backing canvases.
      const dprCap = isMobile ? 1.15 : 1.35;
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        renderedFrame = -1;
      }
    };

    const pruneCache = (center: number) => {
      if (cache.size <= CACHE_LIMIT) return;

      const removable = [...cache.keys()]
        .filter((index) => index !== renderedFrame && index !== center)
        .sort((a, b) => Math.abs(b - center) - Math.abs(a - center));

      while (cache.size > CACHE_LIMIT && removable.length > 0) {
        const index = removable.shift();
        if (index === undefined) break;

        const bitmap = cache.get(index);
        cache.delete(index);
        bitmap?.close();
      }
    };

    const drawFrame = (index: number) => {
      if (index === renderedFrame) return true;

      const bitmap = cache.get(index);
      if (!bitmap) return false;

      context.clearRect(0, 0, canvas.width, canvas.height);
      drawCover(
        context,
        bitmap,
        bitmap.width,
        bitmap.height,
        canvas.width,
        canvas.height,
      );

      renderedFrame = index;
      return true;
    };

    const pumpQueue = () => {
      while (!cancelled && activeLoads < LOAD_CONCURRENCY && queue.length > 0) {
        const index = queue.shift();
        if (index === undefined) break;

        queued.delete(index);
        if (cache.has(index) || loading.has(index)) continue;

        activeLoads += 1;
        loading.add(index);

        void (async () => {
          try {
            const response = await fetch(frameUrl(isMobile, index), {
              cache: 'force-cache',
              priority: index <= 3 ? 'high' : 'auto',
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
            pruneCache(Math.round(animatedFrame));

            if (index === 0 && renderedFrame < 0) {
              drawFrame(0);
            }

            if (isNearSection) {
              scheduleAnimation();
            }
          } catch {
            // A próxima janela de prioridade tenta novamente se necessário.
          } finally {
            loading.delete(index);
            activeLoads -= 1;
            pumpQueue();
          }
        })();
      }
    };

    const enqueueFrame = (index: number, highPriority = false) => {
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
      if (highPriority) queue.unshift(index);
      else queue.push(index);
    };

    const warmWindow = (center: number) => {
      if (center === lastWarmCenter) return;
      lastWarmCenter = center;

      // Descarta apenas solicitações que ainda nem começaram. Assim um scroll
      // rápido não deixa uma fila enorme de frames que já ficaram para trás.
      queue.length = 0;
      queued.clear();

      enqueueFrame(center, true);

      for (let distance = 1; distance <= AHEAD_RADIUS; distance += 1) {
        enqueueFrame(center + distance * direction, distance <= 4);
      }

      for (let distance = 1; distance <= BEHIND_RADIUS; distance += 1) {
        enqueueFrame(center - distance * direction);
      }

      pumpQueue();
    };

    const nearestReadyFrame = (index: number) => {
      if (cache.has(index)) return index;

      for (let distance = 1; distance <= 2; distance += 1) {
        const behind = index - distance * direction;
        if (cache.has(behind)) return behind;

        const ahead = index + distance * direction;
        if (cache.has(ahead)) return ahead;
      }

      return renderedFrame;
    };

    const updateTargetFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      targetFrame = progress * (FRAME_COUNT - 1);

      const currentScrollY = window.scrollY;
      if (currentScrollY !== lastScrollY) {
        direction = currentScrollY > lastScrollY ? 1 : -1;
        lastScrollY = currentScrollY;
      }

      const center = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(targetFrame)));
      warmWindow(center);
    };

    const animate = () => {
      animationRaf = null;
      if (cancelled || !isNearSection) return;

      const delta = targetFrame - animatedFrame;

      if (Math.abs(delta) > 0.015) {
        // Easing adaptativo: suave para pequenos movimentos e capaz de
        // acompanhar flicks maiores sem ficar muitos frames atrasado.
        const easedStep = delta * 0.2;
        const maxStep = isMobile ? 1.35 : 1.6;
        const step = Math.max(-maxStep, Math.min(maxStep, easedStep));
        animatedFrame += step;
      } else {
        animatedFrame = targetFrame;
      }

      const wanted = Math.max(
        0,
        Math.min(FRAME_COUNT - 1, Math.round(animatedFrame)),
      );

      warmWindow(wanted);

      const ready = nearestReadyFrame(wanted);
      if (ready >= 0) drawFrame(ready);

      const stillMoving = Math.abs(targetFrame - animatedFrame) > 0.015;
      const exactFrameMissing = !cache.has(Math.round(targetFrame));

      if (stillMoving || exactFrameMissing) {
        animationRaf = window.requestAnimationFrame(animate);
      }
    };

    function scheduleAnimation() {
      if (!isNearSection || animationRaf !== null) return;
      animationRaf = window.requestAnimationFrame(animate);
    }

    const handleScroll = () => {
      if (!isNearSection) return;
      updateTargetFromScroll();
      scheduleAnimation();
    };

    const handleResize = () => {
      if (resizeRaf !== null) return;

      resizeRaf = window.requestAnimationFrame(() => {
        resizeRaf = null;
        syncSectionHeight();
        resizeCanvas();

        if (isNearSection) {
          updateTargetFromScroll();
          scheduleAnimation();
        }
      });
    };

    // O componente só entra em modo de animação quando se aproxima da tela.
    // Fora dessa área não existe loop contínuo de RAF.
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isNearSection = entry.isIntersecting;

        if (isNearSection) {
          updateTargetFromScroll();
          scheduleAnimation();
        } else if (animationRaf !== null) {
          window.cancelAnimationFrame(animationRaf);
          animationRaf = null;
        }
      },
      { rootMargin: '125% 0px 125% 0px', threshold: 0 },
    );

    const prefetchCompressedBytes = async () => {
      let cursor = PRELOAD_DECODE_COUNT;

      const worker = async () => {
        while (!cancelled && cursor < PREFETCH_BYTE_COUNT) {
          const index = cursor;
          cursor += 1;

          try {
            const response = await fetch(frameUrl(isMobile, index), {
              cache: 'force-cache',
              priority: 'low',
            } as RequestInit);

            if (response.ok) await response.arrayBuffer();
          } catch {
            // Prefetch é opcional: a janela ativa ainda consegue carregar.
          }
        }
      };

      await Promise.all([worker(), worker()]);
    };

    syncSectionHeight();
    resizeCanvas();

    // Um pequeno conjunto inicial fica pronto antes de o usuário chegar ao efeito.
    for (let index = 0; index < PRELOAD_DECODE_COUNT; index += 1) {
      enqueueFrame(index, index <= 2);
    }
    pumpQueue();

    const ric = window.requestIdleCallback?.bind(window);
    if (ric) {
      idleHandle = ric(() => {
        void prefetchCompressedBytes();
      }, { timeout: 1200 });
    } else {
      idleHandle = window.setTimeout(() => {
        void prefetchCompressedBytes();
      }, 700);
    }

    visibilityObserver.observe(section);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      cancelled = true;
      visibilityObserver.disconnect();

      if (animationRaf !== null) window.cancelAnimationFrame(animationRaf);
      if (resizeRaf !== null) window.cancelAnimationFrame(resizeRaf);

      if (idleHandle !== null) {
        if (window.cancelIdleCallback) window.cancelIdleCallback(idleHandle);
        else window.clearTimeout(idleHandle);
      }

      window.removeEventListener('scroll', handleScroll);
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
