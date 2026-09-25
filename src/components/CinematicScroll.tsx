import { useEffect, useRef, useState } from 'react';

export interface CinematicScrollProps {
  readonly className?: string;
}

const FRAME_COUNT = 240;
const MAX_DECODED_FRAMES = 28;
const DECODE_RADIUS = 10;
const PREFETCH_WORKERS = 5;

function frameUrl(isMobile: boolean, index: number) {
  const folder = isMobile ? 'mobile' : 'desktop';
  return `/frames/${folder}/frame-${String(index + 1).padStart(3, '0')}.webp`;
}

function isReady(image: HTMLImageElement | undefined) {
  return Boolean(image?.complete && image.naturalWidth > 0);
}

function drawCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;

  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > canvasRatio) {
    sourceWidth = image.naturalHeight * canvasRatio;
    sourceX = (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = image.naturalWidth / canvasRatio;
    sourceY = (image.naturalHeight - sourceHeight) / 2;
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
  const frameCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingRef = useRef<Map<number, Promise<HTMLImageElement | null>>>(new Map());
  const desiredFrameRef = useRef(0);
  const renderedFrameRef = useRef(-1);
  const scrollRafRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);

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

    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    let cancelled = false;
    const prefetchAbort = new AbortController();

    frameCacheRef.current = new Map();
    loadingRef.current = new Map();
    renderedFrameRef.current = -1;
    lastScrollYRef.current = window.scrollY;

    const getPixelsPerFrame = () => (isMobile ? 60 : 72);

    const syncSectionHeight = () => {
      const travel = (FRAME_COUNT - 1) * getPixelsPerFrame();
      section.style.height = `${window.innerHeight + travel}px`;
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        renderedFrameRef.current = -1;
      }
    };

    const pruneDecodedFrames = (center: number) => {
      const cache = frameCacheRef.current;
      if (cache.size <= MAX_DECODED_FRAMES) return;

      const removable = [...cache.keys()]
        .filter((index) => index !== renderedFrameRef.current && index !== center)
        .sort((a, b) => Math.abs(b - center) - Math.abs(a - center));

      while (cache.size > MAX_DECODED_FRAMES && removable.length > 0) {
        const index = removable.shift();
        if (index === undefined) break;

        const image = cache.get(index);
        cache.delete(index);

        if (image) {
          image.onload = null;
          image.onerror = null;
          image.src = '';
        }
      }
    };

    const drawFrame = (index: number) => {
      const image = frameCacheRef.current.get(index);
      if (!image || !isReady(image)) return false;
      if (renderedFrameRef.current === index) return true;

      drawCover(context, image, canvas.width, canvas.height);
      renderedFrameRef.current = index;
      return true;
    };

    const scheduleRender = () => {
      if (scrollRafRef.current !== null) return;

      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null;
        drawFrame(desiredFrameRef.current);
      });
    };

    const loadFrame = (index: number): Promise<HTMLImageElement | null> => {
      if (index < 0 || index >= FRAME_COUNT || cancelled) {
        return Promise.resolve(null);
      }

      const cached = frameCacheRef.current.get(index);
      if (cached && isReady(cached)) {
        return Promise.resolve(cached);
      }

      const pending = loadingRef.current.get(index);
      if (pending) return pending;

      const promise = new Promise<HTMLImageElement | null>((resolve) => {
        const image = new Image();
        image.decoding = 'async';

        image.onload = async () => {
          try {
            await image.decode();
          } catch {
            // onload já garante um frame utilizável em navegadores sem decode().
          }

          loadingRef.current.delete(index);

          if (cancelled) {
            image.src = '';
            resolve(null);
            return;
          }

          frameCacheRef.current.set(index, image);
          pruneDecodedFrames(desiredFrameRef.current);

          if (index === desiredFrameRef.current) {
            scheduleRender();
          }

          resolve(image);
        };

        image.onerror = () => {
          loadingRef.current.delete(index);
          resolve(null);
        };

        image.src = frameUrl(isMobile, index);
      });

      loadingRef.current.set(index, promise);
      return promise;
    };

    const warmDecodeWindow = (center: number, direction: number) => {
      void loadFrame(center);

      for (let distance = 1; distance <= DECODE_RADIUS; distance += 1) {
        const preferred = center + distance * direction;
        const opposite = center - distance * direction;
        void loadFrame(preferred);
        void loadFrame(opposite);
      }
    };

    const syncFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const exactFrame = progress * (FRAME_COUNT - 1);
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(exactFrame)),
      );

      const currentScrollY = window.scrollY;
      const direction = currentScrollY >= lastScrollYRef.current ? 1 : -1;
      lastScrollYRef.current = currentScrollY;

      desiredFrameRef.current = frameIndex;
      warmDecodeWindow(frameIndex, direction);

      if (!drawFrame(frameIndex)) {
        // Se o quadro exato ainda está decodificando, mantém o quadro anterior
        // na tela. Quando o arquivo terminar de decodificar, scheduleRender()
        // coloca exatamente o frame solicitado, sem pular para um vizinho.
        scheduleRender();
      }
    };

    const handleScroll = () => {
      if (scrollRafRef.current !== null) return;

      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null;
        syncFromScroll();
      });
    };

    const handleResize = () => {
      syncSectionHeight();
      resizeCanvas();
      syncFromScroll();
    };

    // Pré-carrega os bytes comprimidos dos 240 quadros com concorrência limitada.
    // Isso aquece o cache HTTP sem manter 240 imagens gigantes decodificadas na RAM.
    let prefetchCursor = 0;
    const prefetchWorker = async () => {
      while (!cancelled && prefetchCursor < FRAME_COUNT) {
        const index = prefetchCursor;
        prefetchCursor += 1;

        try {
          const response = await fetch(frameUrl(isMobile, index), {
            cache: 'force-cache',
            signal: prefetchAbort.signal,
          });

          if (response.ok) {
            await response.arrayBuffer();
          }
        } catch {
          if (prefetchAbort.signal.aborted) return;
        }
      }
    };

    syncSectionHeight();
    resizeCanvas();

    // Primeiro quadro é prioridade absoluta.
    void loadFrame(0).then(() => {
      if (!cancelled) {
        syncFromScroll();
      }
    });

    // Deixa uma janela inicial pronta antes do usuário chegar à seção.
    for (let index = 1; index <= DECODE_RADIUS * 2; index += 1) {
      void loadFrame(index);
    }

    for (let worker = 0; worker < PREFETCH_WORKERS; worker += 1) {
      void prefetchWorker();
    }

    syncFromScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      cancelled = true;
      prefetchAbort.abort();

      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }

      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      frameCacheRef.current.forEach((image) => {
        image.onload = null;
        image.onerror = null;
        image.src = '';
      });

      frameCacheRef.current.clear();
      loadingRef.current.clear();
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
