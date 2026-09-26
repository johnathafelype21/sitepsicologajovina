import { useEffect, useRef } from 'react';

const words = [
  'Terapia',
  'Identidade',
  'Presença',
  'Clareza',
  'Direção',
  'Novos ciclos',
  'Autonomia',
  'Propósito',
  'Acolhimento',
  'Reconstrução',
];

export default function LivingMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const train = trainRef.current;
    if (!track || !train) return;

    let pos = 0;
    let lastTime = performance.now();
    let rafId: number | null = null;
    let isDisposed = false;

    // Movement speed in pixels per second: ~52px/s gives an elegant, continuous gliding train motion
    const speed = 52;

    const tick = (now: number) => {
      if (isDisposed) return;
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // The exact rendered width of one set of words
      const singleWidth = train.offsetWidth || 1400;

      pos += speed * delta;
      if (pos >= singleWidth) {
        pos %= singleWidth;
      }

      track.style.transform = `translate3d(${-pos.toFixed(2)}px, 0, 0)`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      isDisposed = true;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section className="living-marquee" aria-label="Temas do trabalho">
      <div className="living-marquee-fade living-marquee-fade-left" aria-hidden="true" />
      <div className="living-marquee-fade living-marquee-fade-right" aria-hidden="true" />

      <div className="living-marquee-perspective">
        <div ref={trackRef} className="living-marquee-track">
          {/* First Train Set */}
          <div ref={trainRef} className="living-marquee-train">
            {words.map((word, index) => (
              <span key={`first-${word}-${index}`} className="living-marquee-item">
                <em>{word}</em>
                <i aria-hidden="true">✦</i>
              </span>
            ))}
          </div>

          {/* Second Train Set (duplicate for seamless continuity) */}
          <div className="living-marquee-train" aria-hidden="true">
            {words.map((word, index) => (
              <span key={`second-${word}-${index}`} className="living-marquee-item">
                <em>{word}</em>
                <i aria-hidden="true">✦</i>
              </span>
            ))}
          </div>

          {/* Third Train Set (buffer to guarantee no gaps on ultra-wide screens) */}
          <div className="living-marquee-train" aria-hidden="true">
            {words.map((word, index) => (
              <span key={`third-${word}-${index}`} className="living-marquee-item">
                <em>{word}</em>
                <i aria-hidden="true">✦</i>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
