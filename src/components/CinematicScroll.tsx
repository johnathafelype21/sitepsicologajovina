import { useEffect, useRef, useState } from 'react';

export interface CinematicScrollProps {
  readonly className?: string;
}

const FRAME_COUNT = 240;
const NEIGHBOR_RADIUS = 16;

function frameUrl(isMobile: boolean, index: number) {
  const folder = isMobile ? 'mobile' : 'desktop';
  return `/frames/${folder}/frame-${String(index + 1).padStart(3, '0')}.webp`;
}

type CoverRect = {
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeight: number;
};

function getCoverRect(image: HTMLImageElement, width: number, height: number): CoverRect {
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

  return { sourceX, sourceY, sourceWidth, sourceHeight };
}

function drawImageCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  alpha = 1,
) {
  const rect = getCoverRect(image, width, height);

  context.save();
  context.globalAlpha = alpha;
  context.drawImage(
    image,
    rect.sourceX,
    rect.sourceY,
    rect.sourceWidth,
    rect.sourceHeight,
    0,
    0,
    width,
    height,
  );
  context.restore();
}

function isReady(image: HTMLImageElement | undefined) {
  return Boolean(image?.complete && image.naturalWidth > 0);
}

export default function CinematicScroll({ className = '' }: Readonly<CinematicScrollProps>) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const exactFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
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
    let backgroundPreloadTimer: number | null = null;

    imagesRef.current = Array.from({ length: FRAME_COUNT }, () => new Image());

    const loadFrame = (index: number) => {
      if (index < 0 || index >= FRAME_COUNT) return;
      const image = imagesRef.current[index];
      if (!image || image.src) return;

      image.decoding = 'async';
      image.onload = () => {
        if (cancelled) return;

        const current = exactFrameRef.current;
        if (Math.abs(index - current) <= 2) {
          if (rafRef.current === null) {
            rafRef.current = window.requestAnimationFrame(() => {
              rafRef.current = null;
              renderExactFrame();
            });
          }
        }
      };
      image.src = frameUrl(isMobile, index);
    };

    const loadNeighborhood = (frame: number) => {
      const center = Math.round(frame);

      // Prioriza exatamente o frame atual e seus vizinhos imediatos.
      loadFrame(center);
      loadFrame(center + 1);
      loadFrame(center - 1);

      for (let distance = 2; distance <= NEIGHBOR_RADIUS; distance += 1) {
        loadFrame(center + distance);
        loadFrame(center - distance);
      }
    };

    const renderExactFrame = () => {
      const exact = Math.min(FRAME_COUNT - 1, Math.max(0, exactFrameRef.current));
      const lowerIndex = Math.floor(exact);
      const upperIndex = Math.min(FRAME_COUNT - 1, lowerIndex + 1);
      const mix = exact - lowerIndex;

      loadNeighborhood(exact);

      const lower = imagesRef.current[lowerIndex];
      const upper = imagesRef.current[upperIndex];

      context.clearRect(0, 0, canvas.width, canvas.height);

      if (isReady(lower)) {
        drawImageCover(context, lower, canvas.width, canvas.height, 1);

        // Blend contínuo entre frames consecutivos. Isso evita "degraus"
        // mesmo quando o scroll para entre dois quadros.
        if (upperIndex !== lowerIndex && mix > 0 && isReady(upper)) {
          drawImageCover(context, upper, canvas.width, canvas.height, mix);
        }
        return;
      }

      if (isReady(upper)) {
        drawImageCover(context, upper, canvas.width, canvas.height, 1);
        return;
      }

      // Fallback: mantém o quadro carregado mais próximo em vez de piscar.
      for (let distance = 1; distance <= NEIGHBOR_RADIUS; distance += 1) {
        const before = imagesRef.current[lowerIndex - distance];
        const after = imagesRef.current[upperIndex + distance];

        if (isReady(before)) {
          drawImageCover(context, before, canvas.width, canvas.height, 1);
          return;
        }
        if (isReady(after)) {
          drawImageCover(context, after, canvas.width, canvas.height, 1);
          return;
        }
      }
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextWidth = Math.max(1, Math.round(rect.width * dpr));
      const nextHeight = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }

      renderExactFrame();
    };

    const updateFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));

      // 1:1 com a posição real do scroll: sem easing, sem inércia, sem atraso.
      exactFrameRef.current = progress * (FRAME_COUNT - 1);
      loadNeighborhood(exactFrameRef.current);

      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(() => {
          rafRef.current = null;
          renderExactFrame();
        });
      }
    };

    // Carrega rapidamente o início da sequência.
    for (let index = 0; index < 32; index += 1) {
      loadFrame(index);
    }

    // Faz cache progressivo de TODOS os 240 frames do dispositivo atual.
    let nextBackgroundFrame = 32;
    const preloadAllFrames = () => {
      if (cancelled) return;

      const batchEnd = Math.min(nextBackgroundFrame + 16, FRAME_COUNT);
      for (; nextBackgroundFrame < batchEnd; nextBackgroundFrame += 1) {
        loadFrame(nextBackgroundFrame);
      }

      if (nextBackgroundFrame < FRAME_COUNT) {
        backgroundPreloadTimer = window.setTimeout(preloadAllFrames, 60);
      }
    };

    backgroundPreloadTimer = window.setTimeout(preloadAllFrames, 80);

    resizeCanvas();
    updateFromScroll();

    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelled = true;
      if (backgroundPreloadTimer !== null) window.clearTimeout(backgroundPreloadTimer);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      window.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', resizeCanvas);
      imagesRef.current = [];
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
