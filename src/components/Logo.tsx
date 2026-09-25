import { Link } from 'react-router-dom';
import { siteData } from '../data/mockData';

export interface LogoProps {
  readonly inverted?: boolean;
}

export default function Logo({ inverted = false }: Readonly<LogoProps>) {
  return (
    <Link to="/" className="group inline-flex items-center gap-3" aria-label="Jovina Diniz — página inicial">
      <span className={`identity-mark ${inverted ? 'identity-mark-inverted' : ''}`} aria-hidden="true">
        <i />
        <b />
      </span>
      <span className="inline-flex flex-col leading-none">
        <span className={`font-display text-[23px] tracking-[-0.035em] ${inverted ? 'text-canvas' : 'text-olive'}`}>
          {siteData.brand.name}
        </span>
        <span className={`mt-1.5 text-[7px] font-semibold uppercase tracking-[0.18em] ${inverted ? 'text-canvas/60' : 'text-umber/50'}`}>
          Terapia · Identidade · Direção
        </span>
      </span>
    </Link>
  );
}
