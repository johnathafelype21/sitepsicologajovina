import { useEffect, useRef, useState } from 'react';

export interface CinematicScrollProps {
  readonly className?: string;
}

const FRAME_COUNT = 120;

function frameUrl(isMobile: boolean, index: number) {
  const folder = isMobile ? 'mobile' : 'desktop';
  return `/frames/${folder}/frame-${String(index + 1).padStart(3, '0')}.webp`;
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
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animationRef = useRef<number | null>(null);
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
    let preloadTimer: number | null = null;

    imagesRef.current = Array.from({ length: FRAME_COUNT }, () => new Image());

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextWidth = Math.max(1, Math.round(rect.width * dpr));
      const nextHeight = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }

      const currentImage = imagesRef.current[Math.round(currentFrameRef.current)];
      if (currentImage?.complete && currentImage.naturalWidth > 0) {
        drawCover(context, currentImage, canvas.width, canvas.height);
      }
    };

    const drawFrame = (index: number) => {
      const safeIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(index)));
      const image = imagesRef.current[safeIndex];

      if (image?.complete && image.naturalWidth > 0) {
        drawCover(context, image, canvas.width, canvas.height);
        currentFrameRef.current = safeIndex;
      }
    };

    const animate = () => {
      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      const delta = target - current;

      if (Math.abs(delta) < 0.08) {
        drawFrame(target);
        animationRef.current = null;
        return;
      }

      const eased = current + delta * 0.22;
      drawFrame(eased);
      currentFrameRef.current = eased;
      animationRef.current = window.requestAnimationFrame(animate);
    };

    const requestAnimation = () => {
      if (animationRef.current === null) {
        animationRef.current = window.requestAnimationFrame(animate);
      }
    };

    const updateFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));

      targetFrameRef.current = progress * (FRAME_COUNT - 1);
      requestAnimation();
    };

    const loadFrame = (index: number) => {
      const image = imagesRef.current[index];
      if (!image || image.src) return;

      image.decoding = 'async';
      image.src = frameUrl(isMobile, index);

      if (index === 0) {
        image.onload = () => {
          if (cancelled) return;
          resizeCanvas();
          drawFrame(0);
          updateFromScroll();
        };
      }
    };

    loadFrame(0);

    // Prioriza os primeiros quadros e depois preenche o restante sem travar a thread principal.
    for (let index = 1; index < Math.min(18, FRAME_COUNT); index += 1) {
      loadFrame(index);
    }

    let nextIndex = 18;
    const preloadBatch = () => {
      if (cancelled) return;

      const batchEnd = Math.min(nextIndex + 12, FRAME_COUNT);
      for (; nextIndex < batchEnd; nextIndex += 1) {
        loadFrame(nextIndex);
      }

      if (nextIndex < FRAME_COUNT) {
        preloadTimer = window.setTimeout(preloadBatch, 80);
      }
    };
    preloadTimer = window.setTimeout(preloadBatch, 120);

    resizeCanvas();
    updateFromScroll();

    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelled = true;
      if (preloadTimer !== null) window.clearTimeout(preloadTimer);
      if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
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
