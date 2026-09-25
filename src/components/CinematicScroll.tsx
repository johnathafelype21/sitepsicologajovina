import { useEffect, useRef, useState } from 'react';

export interface CinematicScrollProps {
  readonly className?: string;
}

const FRAME_COUNT = 240;
const CACHE_LIMIT = 20;
const LOAD_CONCURRENCY = 4;
const AHEAD_RADIUS = 14;
const BEHIND_RADIUS = 5;
const MAX_FRAME_STEP_PER_TICK = 1;
const FRAME_ASSET_VERSION = 'manual240-smooth-v3';

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
    let rafId: number | null = null;
    let resizeRafId: number | null = null;
    let targetFrame = 0;
    let animatedFrame = 0;
    let renderedFrame = -1;
    let direction = 1;
    let lastScrollY = window.scrollY;
    let activeLoads = 0;

    const cache = new Map<number, ImageBitmap>();
    const loading = new Set<number>();
    const queued = new Set<number>();
    const queue: number[] = [];

    // Mantém aproximadamente a mesma duração visual do layout original:
    // ~600vh no desktop e ~500vh no mobile, mas distribui os 240 frames
    // densamente para eliminar a sensação de "degraus" no scroll.
    const getPixelsPerFrame = () => (isMobile ? 14 : 18);

    const syncSectionHeight = () => {
      const travel = (FRAME_COUNT - 1) * getPixelsPerFrame();
      section.style.height = `${window.innerHeight + travel}px`;
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();

      // DPR muito alto aumenta drasticamente o custo de cada drawImage.
      // 1.5 preserva nitidez e reduz o trabalho por frame.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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
        .filter((index) => index !== renderedFrame)
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

        if (cache.has(index) || loading.has(index)) {
          continue;
        }

        activeLoads += 1;
        loading.add(index);

        void (async () => {
          try {
            const response = await fetch(frameUrl(isMobile, index), {
              cache: 'force-cache',
            });

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
          } catch {
            // Se um frame falhar momentaneamente, ele poderá ser enfileirado
            // novamente quando entrar na janela prioritária.
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

      if (highPriority) {
        queue.unshift(index);
      } else {
        queue.push(index);
      }
    };

    const warmWindow = (center: number) => {
      enqueueFrame(center, true);

      // Prioriza primeiro os próximos quadros no sentido do movimento.
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

      // Pequeno fallback apenas para não congelar a tela caso um arquivo
      // específico ainda esteja terminando de decodificar.
      for (let distance = 1; distance <= 3; distance += 1) {
        const towardMotion = index - distance * direction;
        if (cache.has(towardMotion)) return towardMotion;

        const opposite = index + distance * direction;
        if (cache.has(opposite)) return opposite;
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

      warmWindow(Math.round(targetFrame));
    };

    const tick = () => {
      if (cancelled) return;

      const delta = targetFrame - animatedFrame;

      if (Math.abs(delta) > 0.01) {
        // O alvo pode saltar vários frames por causa da roda do mouse/trackpad,
        // mas a imagem avança no máximo 1 frame por repaint. Isso transforma
        // saltos de scroll em uma sequência visual contínua de até 60 fps.
        const step = Math.max(
          -MAX_FRAME_STEP_PER_TICK,
          Math.min(MAX_FRAME_STEP_PER_TICK, delta),
        );

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
      if (ready >= 0) {
        drawFrame(ready);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const handleScroll = () => {
      updateTargetFromScroll();
    };

    const handleResize = () => {
      if (resizeRafId !== null) return;

      resizeRafId = window.requestAnimationFrame(() => {
        resizeRafId = null;
        syncSectionHeight();
        resizeCanvas();
        updateTargetFromScroll();
      });
    };

    syncSectionHeight();
    resizeCanvas();
    updateTargetFromScroll();

    // Só prepara uma pequena janela inicial; não decodifica dezenas de imagens
    // de uma vez e não baixa os 240 arquivos concorrendo com a rolagem.
    for (let index = 0; index <= 10; index += 1) {
      enqueueFrame(index, index <= 2);
    }
    pumpQueue();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    rafId = window.requestAnimationFrame(tick);

    return () => {
      cancelled = true;

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      if (resizeRafId !== null) {
        window.cancelAnimationFrame(resizeRafId);
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
