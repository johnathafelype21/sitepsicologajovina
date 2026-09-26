import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import EditorialArt from '../components/EditorialArt';
import PsychologistPortrait from '../components/PsychologistPortrait';
import SectionHeading from '../components/SectionHeading';
import { siteData } from '../data/mockData';

export interface AboutPageProps { readonly className?: string; }

export default function AboutPage({ className = '' }: Readonly<AboutPageProps>) {
  return (
    <main className={className}>
      {/* Top Hero Section with Thematic Editorial Art */}
      <section className="page-hero-split hero-shell border-b border-line/70 py-12 sm:py-16 md:py-24">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 sm:gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:px-8">
          <div className="motion-left">
            <p className="eyebrow">TRAJETÓRIA · PROPÓSITO · PRESENÇA</p>
            <h1 className="mt-4 sm:mt-5 max-w-4xl font-display text-[clamp(2.5rem,6vw,5.8rem)] leading-[.94] tracking-[-0.05em] text-olive">
              Uma escuta que nasce
              <span className="block italic text-caramel">da presença.</span>
            </h1>
            <p className="mt-5 sm:mt-7 max-w-xl text-base sm:text-lg leading-relaxed sm:leading-8 text-umber/70">
              Jovina Diniz acompanha mulheres em processos de compreensão profunda, reconstrução de identidade e escolha de novos caminhos com serenidade e consciência.
            </p>
          </div>
          <div className="motion-scale">
            <EditorialArt
              variant="about"
              src="/images/jovina/metodo-linguagem-visual.webp"
              alt="Linguagem visual conceitual de presença e escuta"
              badgeTitle="Presença & Escuta"
              badgeSubtitle="Espaço Terapêutico e Mentoria"
              priority
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Seção Minha Forma de Estar */}
      <section className="bg-canvas py-16 sm:py-20 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 sm:gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-8">
          <div className="motion-left">
            <PsychologistPortrait
              photo="books"
              alt="Jovina Diniz em reflexão com livros de estudo e acompanhamento terapêutico"
              caption="Jovina Diniz"
              loading="lazy"
            />
          </div>
          <div className="motion-right">
            <p className="eyebrow">MINHA FORMA DE ESTAR</p>
            <h2 className="mt-4 sm:mt-5 font-display text-[clamp(2.2rem,4.5vw,4.2rem)] leading-[1.02] tracking-[-0.04em] text-olive">
              Menos respostas prontas.
              <span className="block italic text-caramel">Mais escuta para o que é seu.</span>
            </h2>
            <div className="mt-6 sm:mt-7 space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed sm:leading-8 text-umber/75">
              {siteData.about.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link to="/contato" className="text-link mt-7 sm:mt-8">
              Iniciar uma conversa <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Seção Método Identidade */}
      <section className="motion-stage bg-surface/70 py-16 sm:py-20 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 sm:gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div className="motion-left">
            <EditorialArt
              variant="identity"
              src="/images/jovina/metodo-compreender-historia.webp"
              alt="Linguagem visual conceitual do Método Identidade"
              loading="lazy"
            />
          </div>
          <div className="motion-right">
            <SectionHeading
              overline="MÉTODO IDENTIDADE"
              title="Compreender a história. Reconstruir a identidade. Escolher a direção."
              text={siteData.method.intro}
            />
            <div className="mt-8 sm:mt-9 space-y-4 sm:space-y-5">
              {siteData.method.steps.map((step) => (
                <div key={step.number} className="grid grid-cols-[44px_1fr] sm:grid-cols-[54px_1fr] gap-3 sm:gap-5 border-t border-line pt-4 sm:pt-5">
                  <span className="font-display text-xl sm:text-2xl italic text-caramel">{step.number}</span>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-olive">{step.title}</h3>
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed sm:leading-7 text-umber/65">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/contato" className="text-link mt-7 sm:mt-8">Conversar comigo <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Você não precisa ter todas as respostas para começar."
        text="O primeiro contato pode ser apenas uma conversa para entender se esse espaço faz sentido para o seu momento."
      />
    </main>
  );
}
