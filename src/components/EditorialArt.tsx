export type EditorialArtVariant = 'identity' | 'therapy' | 'mentoring' | 'companies' | 'about';

export interface EditorialArtProps {
  readonly variant?: EditorialArtVariant;
  readonly className?: string;
  readonly label?: string;
  readonly src?: string;
  readonly alt?: string;
  readonly objectPosition?: string;
  readonly priority?: boolean;
  readonly loading?: 'lazy' | 'eager';
  readonly showCaption?: boolean;
  readonly badgeTitle?: string;
  readonly badgeSubtitle?: string;
}

const copy: Record<EditorialArtVariant, { eyebrow: string; title: string; note: string }> = {
  identity: { eyebrow: 'MÉTODO IDENTIDADE', title: 'História · Identidade · Direção', note: 'Composição conceitual' },
  therapy: { eyebrow: 'TERAPIA & ACOLHIMENTO', title: 'Presença e escuta sensível', note: 'Espaço de acolhimento' },
  mentoring: { eyebrow: 'MENTORIA', title: 'Clareza para novos ciclos', note: 'Direção e posicionamento' },
  companies: { eyebrow: 'EMPRESAS', title: 'Cultura, presença e escuta', note: 'Encontros corporativos' },
  about: { eyebrow: 'ESPAÇO TERAPÊUTICO', title: 'Presença, escuta e cuidado', note: 'Cuidado integrativo' },
};

export default function EditorialArt({
  variant = 'identity',
  className = '',
  label,
  src,
  alt = '',
  objectPosition = 'center',
  priority = false,
  loading,
  showCaption = false,
  badgeTitle,
  badgeSubtitle,
}: Readonly<EditorialArtProps>) {
  const item = copy[variant];
  const effectiveLoading = loading ?? (priority ? 'eager' : 'lazy');

  return (
    <figure
      className={`group relative mx-auto w-full overflow-hidden rounded-[1.6rem] sm:rounded-[2.2rem] border border-[#E2DACD] bg-[#FAF7F2] p-1.5 sm:p-2 shadow-lg sm:shadow-xl shadow-[#2D3B2D]/8 transition-all duration-500 hover:shadow-2xl hover:shadow-[#2D3B2D]/14 ${className}`}
    >
      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-[1.3rem] sm:rounded-[1.8rem] bg-[#EDE2D5]/40">
        {src ? (
          <img
            src={src}
            alt={alt}
            width={800}
            height={600}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            style={{ objectPosition }}
            loading={effectiveLoading}
            {...(priority ? { fetchpriority: 'high' } : {})}
            decoding="async"
          />
        ) : (
          <div className="relative h-full w-full bg-gradient-to-br from-[#ECE3D5] via-[#E2D6C3] to-[#D5C4AC]">
            <div className="editorial-art-orbit editorial-art-orbit-a" />
            <div className="editorial-art-orbit editorial-art-orbit-b" />
          </div>
        )}

        {/* Delicate inner hairline frame */}
        <div className="pointer-events-none absolute inset-0 rounded-[1.3rem] sm:rounded-[1.8rem] border border-white/30" aria-hidden="true" />

        {/* Refined subtle overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

        {(badgeTitle || showCaption) && (
          <div className="absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-5 z-10 rounded-xl sm:rounded-2xl border border-[#DCD3C7] bg-white/95 px-3.5 py-2.5 sm:px-5 sm:py-3.5 shadow-lg shadow-black/10 backdrop-blur-sm">
            <p className="font-display text-sm font-bold tracking-tight text-[#162216] sm:text-lg">
              {badgeTitle ?? label ?? item.title}
            </p>
            {(badgeSubtitle ?? item.eyebrow) && (
              <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[#7A4B1A] sm:text-[11px]">
                {badgeSubtitle ?? item.eyebrow}
              </p>
            )}
          </div>
        )}
      </div>
    </figure>
  );
}
