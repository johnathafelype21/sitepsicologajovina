import { Camera } from 'lucide-react';

export interface PhotoPlaceholderProps {
  readonly label?: string;
  readonly className?: string;
}

export default function PhotoPlaceholder({ label = 'FOTO PROFISSIONAL', className = '' }: Readonly<PhotoPlaceholderProps>) {
  return (
    <div className={`photo-frame relative aspect-[4/5] overflow-hidden bg-linen shadow-float ${className}`}>
      <div className="photo-frame-inner absolute inset-[10px] border border-caramel/25" />
      <div className="absolute inset-0 grid place-items-center p-8 text-center">
        <div>
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-caramel/35 bg-canvas/60 backdrop-blur">
            <Camera className="h-5 w-5 text-caramel" />
          </div>
          <p className="mt-5 font-display text-2xl italic text-olive">{label}</p>
          <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-umber/45">Espaço reservado para a foto oficial</p>
        </div>
      </div>
    </div>
  );
}
