import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import EditorialArt from '../components/EditorialArt';
import MentoringStack from '../components/MentoringStack';
import SectionHeading from '../components/SectionHeading';

export interface MentoringPageProps { readonly className?: string; }

const pillars: readonly (readonly [string, string])[] = [
  ['Identidade', 'Reconhecer quem você é para além de papéis, expectativas e ciclos antigos.'],
  ['Clareza', 'Organizar pensamentos, prioridades e decisões com mais consciência.'],
  ['Direção', 'Transformar percepção em escolhas concretas para o momento atual.'],
  ['Novos ciclos', 'Construir caminhos mais coerentes com a vida que você deseja sustentar.'],
];

export default function MentoringPage({ className = '' }: Readonly<MentoringPageProps>) {
  return (
    <main className={className}>
      <section className="page-hero-split bg-[#F3EADF] py-12 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 sm:gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_.82fr] lg:px-8">
          <div className="motion-left">
            <p className="eyebrow">MENTORIA PARA MULHERES</p>
            <h1 className="mt-4 sm:mt-5 max-w-4xl font-display text-[clamp(2.5rem,6.5vw,6rem)] leading-[.92] tracking-[-0.05em] text-olive">
              Clareza para atravessar
              <span className="block italic text-caramel">um novo ciclo.</span>
            </h1>
            <p className="mt-5 sm:mt-7 max-w-2xl text-base sm:text-lg leading-relaxed sm:leading-8 text-umber/68">
              Um processo mais direcionado para identidade, decisões, reposicionamento e construção de movimento.
            </p>
          </div>
          <div className="motion-scale">
            <EditorialArt
              variant="mentoring"
              src="/images/jovina/mentoria-novos-ciclos.webp"
              alt="Imagem editorial sobre clareza para atravessar novos ciclos"
              priority
              loading="eager"
              objectPosition="center 46%"
            />
          </div>
        </div>
      </section>

      <section className="bg-canvas py-16 sm:py-20 md:py-32">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <SectionHeading overline="QUATRO EIXOS" title="Profundidade com direção." text="A mentoria organiza o caminho em quatro focos complementares." />
          <div className="mt-10 sm:mt-14">
            <MentoringStack pillars={pillars} />
          </div>
        </div>
      </section>

      <section className="bg-olive py-16 text-canvas sm:py-20 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 sm:gap-14 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div className="motion-left">
            <EditorialArt
              variant="mentoring"
              src="/images/jovina/mentoria-clareza-direcao.webp"
              alt="Imagem editorial sobre reconhecer direção com clareza"
              objectPosition="center 46%"
              loading="lazy"
            />
          </div>
          <div className="motion-right">
            <SectionHeading overline="IMPORTANTE" title="Mentoria e terapia não são a mesma coisa." light />
            <p className="mt-5 sm:mt-7 text-sm sm:text-base leading-relaxed sm:leading-8 text-canvas/70">
              A mentoria é mais direcionada a clareza, identidade, escolhas e desenvolvimento. A terapia é um espaço de elaboração emocional e compreensão de padrões, relações e experiências.
            </p>
            <Link to="/contato" className="mt-7 sm:mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.1em] text-canvas">
              Entender qual caminho faz sentido <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection title="Quer entender se a mentoria faz sentido para você?" text="Converse diretamente pelo WhatsApp e conte brevemente o momento que você está vivendo." />
    </main>
  );
}
