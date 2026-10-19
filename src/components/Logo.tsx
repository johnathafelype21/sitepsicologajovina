import { Link } from 'react-router-dom';

export interface LogoProps {
  readonly inverted?: boolean;
  readonly variant?: 'horizontal' | 'stacked';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly showDivider?: boolean;
  readonly className?: string;
}

/**
 * Fonte oficial única da marca. Mantemos os parâmetros existentes para que
 * Header, Footer e demais utilizações usem a mesma imagem, sem redesenhar a logo.
 */
export default function Logo({
  variant = 'horizontal',
  size = 'md',
  className = '',
}: Readonly<LogoProps>) {
  const widths = {
    sm: 'w-32 sm:w-36',
    md: variant === 'stacked' ? 'w-44 sm:w-56' : 'w-32 min-[360px]:w-40 sm:w-48',
    lg: 'w-48 sm:w-64',
  } as const;

  return (
    <Link
      to="/"
      aria-label="Jovina Diniz — Página inicial"
      className={`group inline-flex min-w-0 items-center justify-center transition-opacity hover:opacity-90 ${className}`}
    >
      <img
        src="/jovina%20logo.png"
        alt="Jovina Diniz — Terapia e Mentoria"
        className={`block h-auto max-h-16 object-contain object-left sm:max-h-20 ${widths[size]}`}
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}
