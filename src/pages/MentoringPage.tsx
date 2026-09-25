import { ArrowRight } from 'lucide-react';
import CTASection from '../components/CTASection';
import SectionHeading from '../components/SectionHeading';
import { useReveal } from '../hooks/useReveal';

export interface MentoringPageProps { readonly className?: string; }

export default function MentoringPage({ className = '' }: Readonly<MentoringPageProps>) {
  useReveal();
  const pillars = [
    ['Identidade', 'Reconhecer quem você é para além de papéis, expectativas e ciclos antigos.'],
    ['Clareza', 'Organizar pensamentos, prioridades e decisões com mais consciência.'],
    ['Direção', 'Transformar percepção em escolhas concretas para o momento atual.'],
    ['Novos ciclos', 'Construir caminhos mais coerentes com a vida que você deseja sustentar.'],
  ];

  return (
    <main className={className}>
      <section className="hero-shell border-b border-line/70 py-20">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <p className="eyebrow">MENTORIA PARA MULHERES</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(3.4rem,8vw,7rem)] leading-[.92] tracking-[-0.055em] text-olive">
            Clareza para reconhecer
            <span className="block italic text-caramel">quem você está se tornando.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-umber/65">Um processo direcionado para identidade, escolhas, reposicionamento e construção de novos ciclos.</p>
        </div>
      </section>

      <section className="bg-canvas py-24">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <SectionHeading overline="QUATRO EIXOS" title="Um processo com direção, sem perder profundidade." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line md:grid-cols-2">
            {pillars.map(([title, text], index) => (
              <article key={title} className="reveal min-h-[260px] bg-canvas p-8">
                <span className="font-display text-3xl italic text-caramel/50">0{index + 1}</span>
                <h3 className="mt-8 font-display text-3xl text-olive">{title}</h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-umber/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-olive py-24 text-canvas">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <SectionHeading overline="IMPORTANTE" title="Mentoria e terapia não são a mesma coisa." light />
          <div className="reveal">
            <p className="text-base leading-8 text-canvas/68">A mentoria é mais direcionada a clareza, identidade, escolhas e desenvolvimento. A terapia é um espaço de elaboração emocional e compreensão de padrões, relações e experiências.</p>
            <p className="mt-5 text-base leading-8 text-canvas/68">O formato mais adequado pode ser conversado no primeiro contato.</p>
            <a href="/contato" className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.1em] text-canvas">Entender qual caminho faz sentido <ArrowRight size={14} /></a>
          </div>
        </div>
      </section>

      <CTASection title="Quer entender se a mentoria faz sentido para você?" text="Converse diretamente pelo WhatsApp e conte brevemente o momento que você está vivendo." />
    </main>
  );
}
