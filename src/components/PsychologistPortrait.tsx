import { usePsychologistPhotos } from '../hooks/usePsychologistPhotos';

export interface PsychologistPortraitProps {
  readonly photo?: 'office' | 'books';
  readonly alt?: string;
  readonly caption?: string;
  readonly priority?: boolean;
  readonly loading?: 'lazy' | 'eager';
  readonly className?: string;
  readonly showBadge?: boolean;
}

const photoConfig = {
  office: {
    serverSrc: '/images/jovina/jovina-principal-escritorio.webp',
    fallbackSrc: '/images/jovina/jovina-principal-escritorio.jpg',
    defaultAlt: 'Retrato oficial de Jovina Diniz — Terapeuta Integrativa e Mentora em seu consultório',
    badgeTitle: 'Jovina Diniz',
    badgeSubtitle: 'Terapeuta Integrativa & Mentora',
  },
  books: {
    serverSrc: '/images/jovina/jovina-metodo-livros.webp',
    fallbackSrc: '/images/jovina/jovina-metodo-livros.jpg',
    defaultAlt: 'Retrato de Jovina Diniz com livros de escuta e acompanhamento terapêutico',
    badgeTitle: 'Escuta & Método',
    badgeSubtitle: 'Compreender · Reconstruir · Escolher',
  },
} as const;

export default function PsychologistPortrait({
  photo = 'office',
  alt,
  caption,
  priority = false,
  loading,
  className = '',
  showBadge = true,
}: Readonly<PsychologistPortraitProps>) {
  const { officePhoto, booksPhoto } = usePsychologistPhotos();

  const config = photoConfig[photo];
  const customPhoto = photo === 'office' ? officePhoto : booksPhoto;
  const currentImageSrc = customPhoto || config.serverSrc;
  const effectiveLoading = loading ?? (priority ? 'eager' : 'lazy');

  return (
    <figure
      className={`group relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[1.6rem] sm:rounded-[2.2rem] border border-[#E2DACD] bg-[#FAF7F2] p-1.5 sm:p-2 shadow-xl shadow-[#2D3B2D]/8 transition-all duration-500 hover:shadow-2xl hover:shadow-[#2D3B2D]/14 lg:max-w-none ${className}`}
    >
      {/* 3:4 Proportional container ensuring zero cropping */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.3rem] sm:rounded-[1.8rem] bg-[#EDE2D5]/40">
        <img
          src={currentImageSrc}
          alt={alt ?? config.defaultAlt}
          width={600}
          height={800}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
          loading={effectiveLoading}
          {...(priority ? { fetchpriority: 'high' } : {})}
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        />

        {/* Delicate inner hairline frame */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.3rem] sm:rounded-[1.8rem] border border-white/30"
          aria-hidden="true"
        />

        {/* Fundo 100% branco sólido com altíssima legibilidade e contraste */}
        {showBadge && (
          <div className="absolute inset-x-3 bottom-3 z-10 rounded-xl sm:rounded-2xl border border-[#DCD3C7] bg-white px-4 py-3 shadow-xl shadow-black/15 sm:inset-x-5 sm:bottom-5 sm:px-6 sm:py-4.5">
            <div className="flex flex-col">
              <p className="font-display text-base font-bold tracking-tight text-[#162216] sm:text-xl">
                {caption ?? config.badgeTitle}
              </p>
              <p className="mt-0.5 sm:mt-1 text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[#7A4B1A] sm:text-[12px]">
                {config.badgeSubtitle}
              </p>
            </div>
          </div>
        )}
      </div>
    </figure>
  );
}
