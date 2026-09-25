import { Link } from 'react-router-dom';
import { siteData } from '../data/mockData';

export interface LogoProps {
  readonly inverted?: boolean;
}

export default function Logo({ inverted = false }: Readonly<LogoProps>) {
  return (
    <Link to="/" className="group inline-flex flex-col leading-none">
      <span className={`font-display text-[22px] tracking-[-0.02em] ${inverted ? 'text-canvas dark:text-dark-text' : 'text-olive dark:text-dark-text'}`}>
        {siteData.brand.name}
      </span>
      <span className={`mt-1 text-[8px] font-semibold uppercase tracking-[0.13em] ${inverted ? 'text-canvas/70 dark:text-dark-muted' : 'text-umber/65 dark:text-dark-muted'}`}>
        {siteData.brand.descriptor}
      </span>
    </Link>
  );
}
