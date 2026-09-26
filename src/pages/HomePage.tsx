import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import CinematicScroll from '../components/CinematicScroll';
import EditorialArt from '../components/EditorialArt';
import HomePathways from '../components/HomePathways';
import LivingMarquee from '../components/LivingMarquee';
import PsychologistPortrait from '../components/PsychologistPortrait';
import SectionHeading from '../components/SectionHeading';
import { siteData } from '../data/mockData';

export interface HomePageProps {
  readonly className?: string;
}

const methodImages = [
  '/images/jovina/metodo-compreender-historia.webp',
  '/images/jovina/metodo-reconstruir-identidade.webp',
  '/images/jovina/metodo-escolher-direcao.webp',
] as const;

export default function HomePage({ className = '' }: Readonly<HomePageProps>) {
  return (
    <main className={`overflow-x-clip ${className}`}>
      {/* 1. CINEMATIC SCROLL DE FRAMES — 240 frames desktop e mobile */}
      <CinematicScroll />

      {/* 2. MARQUEE DINÂMICO */}
      <LivingMarquee />

      {/* 3. VOLTAR PARA SI */}
      <section className="motion-stage bg-canvas py-14 sm:py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 sm:gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:gap-16 lg:px-8">
          <div className="motion-left">
            <p className="eyebrow">VOLTAR PARA SI</p>
            <h2 className="mt-3.5 sm:mt-5 font-display text-[clamp(2rem,5vw,4.8rem)] leading-[1.02] sm:leading-[.98] tracking-[-0.04em] text-olive">
              Sua história explica muito.
              <span className="block italic text-caramel">Mas não precisa decidir tudo.</span>
            </h2>
            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base leading-relaxed sm:leading-8 text-umber/70 md:text-lg">
              Um espaço de escuta e reflexão para reconhecer padrões, fortalecer a identidade e construir escolhas mais conscientes — sem fórmulas prontas e sem a exigência de ser forte o tempo inteiro.
            </p>
            <Link to="/sobre" className="text-link mt-6 sm:mt-8">Conhecer a abordagem <ArrowRight size={14} /></Link>
          </div>
          <div className="motion-right">
            <EditorialArt
              variant="about"
              src="/images/jovina/terapia-acolhimento-presenca.webp"
              alt="Composição acolhedora de escuta, reflexão e presença"
              badgeTitle="Escuta & Método"
              badgeSubtitle="Compreender · Reconstruir · Escolher"
              loading="lazy"
              className="max-w-[480px]"
            />
          </div>
        </div>
      </section>

      {/* 4. TRÊS CAMINHOS */}
      <section className="bg-surface/60 py-14 sm:py-24 md:py-32">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="motion-rise max-w-3xl">
            <SectionHeading overline="TRÊS CAMINHOS" title="Nem toda fase pede a mesma forma de cuidado." text="Cada experiência foi pensada para um momento diferente da jornada." />
          </div>

          <div className="mt-8 sm:mt-14">
            <HomePathways items={siteData.home.services} />
          </div>
        </div>
      </section>

      {/* 5. MÉTODO IDENTIDADE SCROLL SEQUENCE — 100% responsivo sem cortes */}
      <section className="sticky-story py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="sticky-story-grid">
            <div className="sticky-story-copy">
              <p className="eyebrow !text-caramel">MÉTODO IDENTIDADE</p>
              <h2 className="mt-3.5 sm:mt-5 max-w-md font-display text-[clamp(2.1rem,5vw,4.6rem)] leading-[1.02] sm:leading-[.96] tracking-[-0.04em] text-canvas">
                Três movimentos para voltar ao próprio centro.
              </h2>
              <p className="mt-4 sm:mt-6 max-w-md text-xs sm:text-sm leading-relaxed sm:leading-7 text-canvas/70">
                Uma narrativa visual que acompanha sua jornada com clareza, acolhimento e direção.
              </p>
              <Link to="/sobre" className="mt-5 sm:mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.1em] text-caramel hover:text-canvas transition-colors">
                Conhecer o método <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-8 space-y-8 lg:mt-0 lg:space-y-12 divide-y divide-white/10 lg:divide-y-0">
              {siteData.method.steps.map((step, index) => (
                <article className="sticky-story-card motion-fade pt-8 first:pt-0 lg:pt-0" key={step.number}>
                  <div className="sticky-story-card-inner">
                    <span className="sticky-story-number">{step.number}</span>
                    <div className="w-full">
                      <p className="eyebrow !text-caramel">{['ORIGEM', 'RECONSTRUÇÃO', 'MOVIMENTO'][index]}</p>
                      <h3 className="mt-2.5 sm:mt-4 font-display text-xl sm:text-3xl lg:text-4xl text-canvas tracking-tight">{step.title}</h3>
                      <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-canvas/70">{step.text}</p>
                      <div className="mt-5 sm:mt-7 w-full max-w-xl">
                        <EditorialArt
                          variant="identity"
                          src={methodImages[index]}
                          alt={`Arte conceitual do Método Identidade: ${step.title}`}
                          objectPosition="center"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOTO 1 DE JOVINA — Seção Sobre Jovina na Home */}
      <section className="motion-stage bg-surface/50 py-14 sm:py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 sm:gap-12 px-4 sm:px-6 lg:grid-cols-[.95fr_1.05fr] lg:gap-16 lg:px-8">
          <div className="motion-left">
            <PsychologistPortrait
              photo="office"
              alt="Jovina Diniz — Terapeuta Integrativa e Mentora em seu consultório"
              caption="Jovina Diniz"
              loading="lazy"
            />
          </div>
          <div className="motion-right">
            <p className="eyebrow">SOBRE JOVINA</p>
            <h2 className="mt-3.5 sm:mt-5 font-display text-[clamp(2rem,4.5vw,4.5rem)] leading-[1.02] tracking-[-0.04em] text-olive">
              Escuta sensível,
              <span className="block italic text-caramel">presença e direção.</span>
            </h2>
            <p className="mt-4 sm:mt-6 max-w-xl text-xs sm:text-base leading-relaxed sm:leading-8 text-umber/70">{siteData.about.body[0]}</p>
            <p className="mt-3 sm:mt-4 max-w-xl text-xs sm:text-base leading-relaxed sm:leading-8 text-umber/70">{siteData.about.body[1]}</p>
            <Link to="/sobre" className="text-link mt-6 sm:mt-8">Conhecer minha trajetória <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <CTASection title="Talvez seja hora de voltar para você." text="Se algo em você pede mais clareza, acolhimento ou direção, o primeiro passo pode ser uma conversa." />
    </main>
  );
}
