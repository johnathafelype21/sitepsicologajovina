import { Camera } from 'lucide-react';

export interface PhotoPlaceholderProps {
  readonly label?: string;
  readonly className?: string;
}

export default function PhotoPlaceholder({ label = 'FOTO PROFISSIONAL', className = '' }: Readonly<PhotoPlaceholderProps>) {
  return (
    <div className={`editorial-glow relative aspect-[4/5] overflow-hidden rounded-[2rem_0.5rem_2rem_0.5rem] border border-bronze/30 bg-linen shadow-soft dark:border-white/10 dark:bg-dark-surface ${className}`}>
      <div className="absolute inset-4 rounded-[1.5rem_0.4rem_1.5rem_0.4rem] border border-bronze/20" />
      <div className="absolute inset-0 grid place-items-center p-8 text-center">
        <div>
          <Camera className="mx-auto h-7 w-7 text-bronze" />
          <p className="mt-4 font-display text-xl italic text-olive dark:text-dark-text">{label}</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-umber/50 dark:text-dark-muted">Espaço preparado para a foto real</p>
        </div>
      </div>
    </div>
  );
}
