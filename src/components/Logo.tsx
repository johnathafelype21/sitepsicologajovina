import { useId } from 'react';
import { Link } from 'react-router-dom';

export interface LogoProps {
  readonly inverted?: boolean;
  readonly variant?: 'horizontal' | 'stacked';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly showDivider?: boolean;
  readonly className?: string;
}

export default function Logo({
  inverted = false,
  variant = 'horizontal',
  size = 'md',
  showDivider = true,
  className = '',
}: Readonly<LogoProps>) {
  const rawId = useId();
  const id = rawId.replace(/:/g, '');

  // Emblem sizing with responsive mobile scale
  const emblemSizeClasses = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: variant === 'stacked' ? 'w-14 h-14 sm:w-20 sm:h-20' : 'w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12',
    lg: 'w-16 h-16 sm:w-24 sm:h-24',
  }[size];

  // Font sizing with responsive mobile scale
  const scriptSizeClasses = {
    sm: 'text-[22px] sm:text-[26px]',
    md: variant === 'stacked' ? 'text-[36px] sm:text-[52px]' : 'text-[24px] sm:text-[30px] md:text-[34px]',
    lg: 'text-[40px] sm:text-[56px]',
  }[size];

  const serifSizeClasses = {
    sm: 'text-[15px] sm:text-[18px]',
    md: variant === 'stacked' ? 'text-[22px] sm:text-[34px]' : 'text-[17px] sm:text-[21px] md:text-[24px]',
    lg: 'text-[26px] sm:text-[38px]',
  }[size];

  const subtitleSizeClasses = {
    sm: 'text-[6.5px] sm:text-[7.5px]',
    md: variant === 'stacked' ? 'text-[8.5px] sm:text-[11px]' : 'text-[7px] sm:text-[8.5px] md:text-[9.5px]',
    lg: 'text-[9.5px] sm:text-[11px]',
  }[size];

  // Perfectly symmetrical, high-precision SVG Botanical & Celestial Emblem
  const emblemSvg = (
    <svg
      viewBox="0 0 100 100"
      className={`${emblemSizeClasses} shrink-0 transition-transform duration-300 group-hover:scale-105`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Warm metallic gold gradient */}
        <linearGradient id={`goldGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={inverted ? '#F7E6C4' : '#E2C288'} />
          <stop offset="50%" stopColor={inverted ? '#ECC88A' : '#C4974E'} />
          <stop offset="100%" stopColor={inverted ? '#CFA055' : '#9E7432'} />
        </linearGradient>

        {/* Soft champagne botanical petal fill (left) */}
        <linearGradient id={`petalLeft-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={inverted ? '#FBF7F0' : '#F5EFE7'} stopOpacity="0.95" />
          <stop offset="60%" stopColor={inverted ? '#F1E6D8' : '#E8D9CB'} stopOpacity="0.9" />
          <stop offset="100%" stopColor={inverted ? '#DECAAF' : '#CCAFA0'} stopOpacity="0.85" />
        </linearGradient>

        {/* Mirrored champagne petal fill (right) */}
        <linearGradient id={`petalRight-${id}`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={inverted ? '#FBF7F0' : '#F5EFE7'} stopOpacity="0.95" />
          <stop offset="60%" stopColor={inverted ? '#F1E6D8' : '#E8D9CB'} stopOpacity="0.9" />
          <stop offset="100%" stopColor={inverted ? '#DECAAF' : '#CCAFA0'} stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* Symmetrical open golden circular halo: center (50, 50), r=36, opening at bottom */}
      <path
        d="M 26,70 A 36,36 0 1 1 74,70"
        stroke={`url(#goldGrad-${id})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Top celestial light points: strictly on x = 50 */}
      <circle cx="50" cy="12" r="1.2" fill={`url(#goldGrad-${id})`} />
      <circle cx="50" cy="18" r="1.8" fill={`url(#goldGrad-${id})`} />

      {/* Radiant Sun Sphere: centered at (50, 27) */}
      <circle cx="50" cy="27" r="5" fill={`url(#goldGrad-${id})`} />

      {/* Left botanical petal: perfectly balanced curvature */}
      <path
        d="M 50,68 C 39,57 32,45 36,35 C 44,38 48,51 50,68 Z"
        fill={`url(#petalLeft-${id})`}
        stroke={`url(#goldGrad-${id})`}
        strokeWidth="0.9"
        strokeLinejoin="round"
      />

      {/* Right botanical petal: exact mathematical mirror of left petal */}
      <path
        d="M 50,68 C 61,57 68,45 64,35 C 56,38 52,51 50,68 Z"
        fill={`url(#petalRight-${id})`}
        stroke={`url(#goldGrad-${id})`}
        strokeWidth="0.9"
        strokeLinejoin="round"
      />

      {/* Central vein stem: vertical axis on x = 50 */}
      <line
        x1="50"
        y1="34"
        x2="50"
        y2="68"
        stroke={`url(#goldGrad-${id})`}
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Symmetric bottom anchor flourish curves */}
      <path
        d="M 32,72 Q 50,78 68,72"
        stroke={`url(#goldGrad-${id})`}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M 39,76 Q 50,80 61,76"
        stroke={`url(#goldGrad-${id})`}
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <Link
      to="/"
      className={`group inline-flex min-w-0 transition-opacity hover:opacity-95 ${
        variant === 'stacked'
          ? 'flex-col items-center text-center'
          : 'flex-row items-center gap-2 sm:gap-3 md:gap-3.5'
      } ${className}`}
      aria-label="Jovina Diniz — Terapia & Mentoria — Página Inicial"
    >
      {/* Botanical & Celestial Emblem */}
      {emblemSvg}

      {/* Elegant vertical hairline divider in horizontal mode */}
      {variant === 'horizontal' && showDivider && (
        <span
          className={`hidden h-8 w-px sm:block ${
            inverted ? 'bg-white/15' : 'bg-[#D8CEBE]/80'
          }`}
          aria-hidden="true"
        />
      )}

      {/* Typography Lockup Block */}
      <div
        className={`flex flex-col min-w-0 ${
          variant === 'stacked' ? 'mt-2.5 items-center' : 'justify-center'
        }`}
      >
        {/* Line 1: Jovina (Cursive Calligraphy) + Diniz (Classic Editorial Serif) */}
        <div
          className={`flex items-baseline leading-none ${
            variant === 'stacked' ? 'justify-center' : 'justify-start'
          }`}
        >
          <span
            className={`font-['Pinyon_Script',cursive] ${scriptSizeClasses} tracking-normal select-none transition-colors ${
              inverted
                ? 'text-[#ECC88A] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
                : 'text-[#B88746]'
            }`}
            style={{ fontWeight: 400 }}
          >
            Jovina
          </span>
          <span
            className={`font-display ${serifSizeClasses} ml-1.5 sm:ml-2 font-medium tracking-tight select-none transition-colors ${
              inverted
                ? 'text-[#FAF7F2] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
                : 'text-[#2D3B2D]'
            }`}
          >
            Diniz
          </span>
        </div>

        {/* Line 2: TERAPIA & MENTORIA — MATHEMATICALLY CENTERED AND ALIGNED WITH HORIZONTAL ACCENTS */}
        <div
          className={`mt-1 flex w-full items-center justify-between gap-1 select-none ${
            variant === 'stacked' ? 'max-w-[220px]' : ''
          }`}
        >
          <span
            className={`h-[0.5px] flex-1 ${
              inverted ? 'bg-[#ECC88A]/50' : 'bg-[#C79A52]/60'
            }`}
            aria-hidden="true"
          />
          <span
            className={`${subtitleSizeClasses} px-0.5 sm:px-1 font-semibold uppercase tracking-[0.18em] sm:tracking-[0.26em] whitespace-nowrap leading-none transition-colors ${
              inverted ? 'text-[#FAF7F2]/85' : 'text-[#504436]'
            }`}
          >
            Terapia &amp; Mentoria
          </span>
          <span
            className={`h-[0.5px] flex-1 ${
              inverted ? 'bg-[#ECC88A]/50' : 'bg-[#C79A52]/60'
            }`}
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
