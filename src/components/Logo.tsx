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
    sm: 'w-36 sm:w-44',
    md: variant === 'stacked' ? 'w-56 sm:w-72' : 'w-36 min-[360px]:w-44 sm:w-56',
    lg: 'w-64 sm:w-80',
  } as const;

  return (
    <Link
      to="/"
      aria-label="Jovina Diniz — Página inicial"
      className={`group inline-flex min-w-0 items-center justify-center transition-opacity hover:opacity-90 ${className}`}
    >
      <img
        src="/jovina-logo.png?v=9594a3b6"
        alt="Jovina Diniz — Terapia e Mentoria"
        className={`block h-auto max-w-full object-contain object-left ${widths[size]}`}
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}
