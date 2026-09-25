import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface CinematicScrollProps {
  readonly className?: string;
}

function videoUrl(isMobile: boolean) {
  return isMobile
    ? '/videos/mobile/VIDEO%20MOBILE.mp4'
    : '/videos/desktop/VIDEO%20DESKTOP.mp4';
}

export default function CinematicScroll({ className = '' }: Readonly<CinematicScrollProps>) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    const video = videoRef.current;
    if (!section || !video) return;

    let duration = 0;
    let targetTime = 0;
    let rafId: number | null = null;
    let cancelled = false;

    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });

    const syncSectionHeight = () => {
      // Aproximadamente 5-6 telas de rolagem, suficiente para um scrub confortável
      // sem deixar cada trecho do vídeo "parado" por tempo demais.
      section.style.height = isMobile ? '500vh' : '560vh';
    };

    const applyTarget = () => {
      rafId = null;
      if (cancelled || !duration) return;

      const diff = targetTime - video.currentTime;

      if (Math.abs(diff) < 0.008) {
        if (Math.abs(diff) > 0.001) {
          video.currentTime = targetTime;
        }
        return;
      }

      // Suavização adaptativa: acompanha o scroll sem saltos bruscos,
      // mas converge rápido quando o usuário faz um flick maior.
      const step = diff * (isMobile ? 0.34 : 0.42);
      video.currentTime += step;

      rafId = window.requestAnimationFrame(applyTarget);
    };

    const scheduleApply = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(applyTarget);
    };

    const setupScroll = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      if (!duration) return;

      video.pause();

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: false,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetTime = self.progress * duration;
          scheduleApply();
        },
        onRefresh: (self) => {
          targetTime = self.progress * duration;
          scheduleApply();
        },
      });

      return trigger;
    };

    syncSectionHeight();

    let trigger: ScrollTrigger | undefined;

    const onMetadata = () => {
      trigger?.kill();
      trigger = setupScroll();
      ScrollTrigger.refresh();
    };

    video.addEventListener('loadedmetadata', onMetadata);
    video.load();

    if (video.readyState >= 1) {
      onMetadata();
    }

    const handleResize = () => {
      syncSectionHeight();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelled = true;
      trigger?.kill();
      video.removeEventListener('loadedmetadata', onMetadata);
      window.removeEventListener('resize', handleResize);

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      section.style.removeProperty('height');
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className={`cinematic-scroll cinematic-scroll-video-mode ${className}`}
      aria-label="Experiência visual controlada pela rolagem"
    >
      <div className="cinematic-scroll-sticky">
        <video
          ref={videoRef}
          className="cinematic-scroll-scrub-video"
          src={videoUrl(isMobile)}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
