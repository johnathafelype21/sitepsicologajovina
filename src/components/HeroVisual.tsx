import { Compass, HeartHandshake, MapPin, Sparkles } from 'lucide-react';

export interface HeroVisualProps {
  readonly className?: string;
}

export default function HeroVisual({ className = '' }: Readonly<HeroVisualProps>) {
  return (
    <div className={`relative mx-auto w-full max-w-[540px] ${className}`}>
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -inset-3 sm:-inset-4 rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-tr from-[#C5A880]/20 via-[#3D4A3D]/10 to-transparent blur-2xl"
        aria-hidden="true"
      />

      {/* Main Luxury Frame */}
      <div className="group relative overflow-hidden rounded-[1.8rem] sm:rounded-[2.4rem] border border-[#DDD3C4] bg-[#FAF6F0] p-2 sm:p-3 shadow-xl sm:shadow-2xl shadow-[#2D3B2D]/12 transition-all duration-500 hover:shadow-3xl hover:shadow-[#2D3B2D]/18">
        {/* Visual Container */}
        <div className="relative aspect-[4/3.2] w-full overflow-hidden rounded-[1.4rem] sm:rounded-[1.9rem] bg-[#E8DDD0]">
          <img
            src="/images/jovina/espaco-acolhimento-sereno.jpg"
            alt="Ambiente sereno, acolhedor e iluminado por luz natural para atendimento terapêutico"
            width={800}
            height={660}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
          />

          {/* Artistic warm lighting & gradient overlays */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/15"
            aria-hidden="true"
          />

          {/* Top floating pill */}
          <div className="absolute left-3 top-3 sm:left-4 sm:top-4 z-10 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/30 bg-white/90 px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-[11px] font-semibold tracking-wide text-[#2D3B2D] shadow-md backdrop-blur-md">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#9E6229] animate-pulse" />
            Presença & Escuta Sensível
          </div>

          {/* Bottom Card Content */}
          <div className="absolute inset-x-2.5 bottom-2.5 sm:inset-x-4 sm:bottom-4 z-10 rounded-[1.2rem] sm:rounded-[1.4rem] border border-white/20 bg-white/95 p-3.5 sm:p-5 shadow-xl shadow-black/15 backdrop-blur-md">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#8C5824]">
                <Sparkles size={11} className="text-[#9E6229]" />
                Método Identidade
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-stone-500">
                <MapPin size={11} className="text-[#3D4A3D]" /> SP & Online
              </span>
            </div>

            <h3 className="mt-1.5 font-display text-base sm:text-xl font-bold tracking-tight text-[#162216]">
              Espaço de Acolhimento & Reconstrução
            </h3>

            <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-[#4A453E] line-clamp-2">
              Um lugar seguro para pausar a exigência de ser forte e reencontrar o seu próprio ritmo.
            </p>

            {/* 3 Pillars Row */}
            <div className="mt-2.5 sm:mt-3.5 grid grid-cols-3 gap-1.5 sm:gap-2 border-t border-[#E8E0D4] pt-2 sm:pt-3 text-center">
              <div className="rounded-lg sm:rounded-xl bg-[#F7F2EA] px-1 py-1 sm:px-2 sm:py-1.5 transition hover:bg-[#EFE8DC]">
                <p className="text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#8C5824]">01. Origem</p>
                <p className="text-[9.5px] sm:text-[11px] font-medium text-[#2D3B2D] truncate">Compreender</p>
              </div>
              <div className="rounded-lg sm:rounded-xl bg-[#F7F2EA] px-1 py-1 sm:px-2 sm:py-1.5 transition hover:bg-[#EFE8DC]">
                <p className="text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#8C5824]">02. Centro</p>
                <p className="text-[9.5px] sm:text-[11px] font-medium text-[#2D3B2D] truncate">Reconstruir</p>
              </div>
              <div className="rounded-lg sm:rounded-xl bg-[#F7F2EA] px-1 py-1 sm:px-2 sm:py-1.5 transition hover:bg-[#EFE8DC]">
                <p className="text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#8C5824]">03. Caminho</p>
                <p className="text-[9.5px] sm:text-[11px] font-medium text-[#2D3B2D] truncate">Escolher</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Side Trust Badge */}
      <div className="absolute -bottom-4 -left-3 hidden items-center gap-2.5 rounded-2xl border border-[#DDD3C4] bg-white px-3.5 py-2.5 shadow-xl shadow-black/10 sm:flex">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#F3ECE1] text-[#3D4A3D]">
          <HeartHandshake size={18} className="text-[#9E6229]" />
        </div>
        <div>
          <p className="text-xs font-bold text-[#162216]">Atendimento Exclusivo</p>
          <p className="text-[10px] text-[#635D55]">Vagas limitadas por mês</p>
        </div>
      </div>
    </div>
  );
}
