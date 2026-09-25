import type { CSSProperties, PointerEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ImmersiveCardProps {
  readonly index: number;
  readonly eyebrow?: string;
  readonly title: string;
  readonly text?: string;
  readonly to?: string;
  readonly variant?: 'service' | 'therapy' | 'mentoring' | 'company';
  readonly motion?: 'left' | 'right' | 'rise';
}

type CardStyle = CSSProperties & {
  '--mx'?: string;
  '--my'?: string;
  '--reveal-delay'?: string;
};

export default function ImmersiveCard({
  index,
  eyebrow,
  title,
  text,
  to,
  variant = 'service',
  motion = 'rise',
}: Readonly<ImmersiveCardProps>) {
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
    const ry = ((x - 50) / 50) * 4.5;
    const rx = ((50 - y) / 50) * 4.5;
    el.style.setProperty('--rx', `${rx}deg`);
    el.style.setProperty('--ry', `${ry}deg`);
  };

  const onPointerLeave = (event: PointerEvent<HTMLElement>) => {
    const el = event.currentTarget;
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  const style: CardStyle = {
    '--mx': '50%',
    '--my': '50%',
    '--reveal-delay': `${Math.min(index * 70, 350)}ms`,
  };

  const content = (
    <>
      <div className="immersive-card-beam" aria-hidden="true" />
      <div className="immersive-card-glow" aria-hidden="true" />
      <div className="immersive-card-orb" aria-hidden="true" />
      <div className="immersive-card-content">
        <div className="flex items-start justify-between gap-4">
          <span className="immersive-card-number">{String(index).padStart(2, '0')}</span>
          <span className="immersive-card-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
        </div>
        <div className="immersive-card-copy">
          {eyebrow && <p className="immersive-card-eyebrow">{eyebrow}</p>}
          <h3 className="immersive-card-title">{title}</h3>
          {text && <p className="immersive-card-text">{text}</p>}
          {to && <span className="immersive-card-link">Explorar <ArrowUpRight size={14} /></span>}
        </div>
      </div>
    </>
  );

  const classes = `immersive-card immersive-card-${variant} motion-${motion}`;

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        style={style}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {content}
      </Link>
    );
  }

  return (
    <article
      className={classes}
      style={style}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {content}
    </article>
  );
}
