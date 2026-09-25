export type EditorialArtVariant = 'identity' | 'therapy' | 'mentoring' | 'companies' | 'about';

export interface EditorialArtProps {
  readonly variant?: EditorialArtVariant;
  readonly className?: string;
  readonly label?: string;
}

const copy: Record<EditorialArtVariant, { eyebrow: string; title: string; note: string }> = {
  identity: { eyebrow: 'MÉTODO IDENTIDADE', title: 'História · identidade · direção', note: 'Composição conceitual autoral' },
  therapy: { eyebrow: 'TERAPIA', title: 'Presença para escutar o que pede cuidado', note: 'Imagem editorial de acolhimento' },
  mentoring: { eyebrow: 'MENTORIA', title: 'Clareza para atravessar novos ciclos', note: 'Imagem editorial de direção' },
  companies: { eyebrow: 'EMPRESAS', title: 'Conversas que movem cultura e presença', note: 'Imagem editorial institucional' },
  about: { eyebrow: 'SOBRE JOVINA', title: 'Escuta, percurso e propósito', note: 'Espaço para fotografia autoral' },
};

export default function EditorialArt({ variant = 'identity', className = '', label }: Readonly<EditorialArtProps>) {
  const item = copy[variant];
  return (
    <figure className={`editorial-art editorial-art-${variant} relative overflow-hidden ${className}`}>
      <div className="editorial-art-noise" />
      <div className="editorial-art-orbit editorial-art-orbit-a" />
      <div className="editorial-art-orbit editorial-art-orbit-b" />
      <div className="editorial-art-line editorial-art-line-a" />
      <div className="editorial-art-line editorial-art-line-b" />
      <div className="absolute inset-x-6 bottom-6 z-10 rounded-[1.25rem] border border-white/15 bg-black/10 p-5 text-white backdrop-blur-md md:inset-x-8 md:bottom-8 md:p-6">
        <p className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/65">{item.eyebrow}</p>
        <p className="mt-2 max-w-md font-display text-2xl italic leading-tight md:text-3xl">{label ?? item.title}</p>
        <p className="mt-3 text-[10px] uppercase tracking-[.12em] text-white/45">{item.note}</p>
      </div>
    </figure>
  );
}
