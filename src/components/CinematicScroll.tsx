import { useEffect, useRef, useState } from 'react';

export interface CinematicScrollProps {
  readonly className?: string;
}

export default function CinematicScroll({ className = '' }: Readonly<CinematicScrollProps>) {
  const sectionRef = useRef<HTMLElement>(null);
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
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;

      if (reducedMotion.matches) {
        section.style.setProperty('--cinematic-video-x', '0px');
        section.style.setProperty('--cinematic-text-a-x', '0px');
        section.style.setProperty('--cinematic-text-b-x', '0px');
        section.style.setProperty('--cinematic-progress', '0.5');
        return;
      }

      const rect = section.getBoundingClientRect();
      const travel = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const width = window.innerWidth;

      const videoTravel = width * (isMobile ? 0.035 : 0.065);
      const textTravel = width * (isMobile ? 0.11 : 0.34);

      const videoX = (0.5 - progress) * videoTravel;
      const textAX = (progress - 0.5) * textTravel;
      const textBX = (0.5 - progress) * textTravel * 0.82;

      section.style.setProperty('--cinematic-progress', progress.toFixed(4));
      section.style.setProperty('--cinematic-video-x', `${videoX.toFixed(2)}px`);
      section.style.setProperty('--cinematic-text-a-x', `${textAX.toFixed(2)}px`);
      section.style.setProperty('--cinematic-text-b-x', `${textBX.toFixed(2)}px`);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reducedMotion.addEventListener('change', requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reducedMotion.removeEventListener('change', requestUpdate);
    };
  }, [isMobile]);

  const videoSrc = isMobile
    ? '/videos/mobile/VIDEO%20MOBILE.mp4'
    : '/videos/desktop/VIDEO%20DESKTOP.mp4';

  return (
    <section
      ref={sectionRef}
      className={`cinematic-scroll ${className}`}
      aria-label="Volte para si"
    >
      <div className="cinematic-scroll-sticky">
        <div className="cinematic-scroll-media" aria-hidden="true">
          <video
            key={videoSrc}
            className="cinematic-scroll-video"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="cinematic-scroll-veil" />
          <div className="cinematic-scroll-grain" />
        </div>

        <div className="cinematic-scroll-copy">
          <p className="cinematic-scroll-kicker">Presença · identidade · direção</p>
          <h2 className="cinematic-scroll-title" aria-label="Volte para si">
            <span className="cinematic-scroll-line cinematic-scroll-line-a">Volte</span>
            <span className="cinematic-scroll-line cinematic-scroll-line-b">para si</span>
          </h2>
          <p className="cinematic-scroll-note">
            Um movimento de volta ao que é essencial.
          </p>
        </div>

        <div className="cinematic-scroll-index" aria-hidden="true">
          <span>01</span>
          <i />
          <span>03</span>
        </div>
      </div>
    </section>
  );
}
