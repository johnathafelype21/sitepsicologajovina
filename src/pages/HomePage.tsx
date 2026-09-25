import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import PhotoPlaceholder from '../components/PhotoPlaceholder';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { siteData } from '../data/mockData';
import { useReveal } from '../hooks/useReveal';
import { useWhatsApp } from '../hooks/useWhatsApp';

export interface HomePageProps {
  readonly className?: string;
}

export default function HomePage({ className = '' }: Readonly<HomePageProps>) {
  useReveal();
  const { buildUrl } = useWhatsApp({ defaultMessage: 'Olá, Jovina. Gostaria de agendar um atendimento.' });

  return (
    <main className={className}>
      <section className="hero-shell relative overflow-hidden border-b border-line/70 bg-canvas-soft">
        <div className="organic-orbit organic-orbit-a" aria-hidden="true" />
        <div className="organic-orbit organic-orbit-b" aria-hidden="true" />

        <div className="mx-auto grid min-h-[720px] max-w-[1320px] items-center gap-14 px-5 py-16 lg:grid-cols-[1.08fr_.78fr] lg:px-10 lg:py-20">
          <div className="reveal relative z-10 max-w-[760px]">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-caramel/30 bg-canvas/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-caramel backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-caramel" />
              {siteData.home.eyebrow}
            </div>

            <h1 className="font-display text-[clamp(3.25rem,7vw,6.8rem)] leading-[.92] tracking-[-0.055em] text-olive">
              Um caminho de volta
              <span className="block font-normal italic text-caramel">para quem você é.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-[17px] leading-8 text-umber/70 md:text-[19px]">
              {siteData.home.intro}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={buildUrl()} target="_blank" rel="noreferrer" className="button-primary">
                <WhatsAppIcon className="h-4 w-4" /> Agendar atendimento
              </a>
              <Link to="/sobre" className="button-secondary">
                Conhecer Jovina <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line/80 pt-6 text-xs text-umber/55">
              <span className="inline-flex items-center gap-2"><MapPin size={14} /> Online e presencial em São Paulo</span>
              <span className="inline-flex items-center gap-2"><Sparkles size={14} /> Método Identidade</span>
            </div>
          </div>

          <div className="reveal relative mx-auto w-full max-w-[470px] lg:justify-self-end">
            <div className="absolute -left-10 top-14 hidden h-28 w-28 rounded-full border border-caramel/25 lg:block" />
            <div className="absolute -bottom-8 -right-8 hidden h-40 w-40 rounded-full bg-terracotta/10 blur-2xl lg:block" />
            <PhotoPlaceholder className="relative z-10" />
            <div className="absolute -bottom-7 -left-5 z-20 max-w-[230px] rounded-[1.4rem] border border-line bg-canvas/95 p-5 shadow-float backdrop-blur">
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-caramel">Essência do trabalho</p>
              <p className="mt-2 font-display text-xl leading-snug text-olive">Compreender. Reconstruir. Escolher.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-canvas py-24">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <div className="reveal grid items-end gap-10 md:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow">VOLTAR PARA SI</p>
              <h2 className="mt-4 font-display text-[clamp(2.6rem,5vw,4.7rem)] leading-[.98] tracking-[-0.04em] text-olive">
                Sua história explica muito.
                <span className="block italic text-caramel">Mas não precisa decidir tudo.</span>
              </h2>
            </div>
            <div className="md:pb-2">
              <p className="max-w-xl text-base leading-8 text-umber/68">
                Um espaço de escuta e reflexão para reconhecer padrões, fortalecer a identidade e construir escolhas mais conscientes — sem pressa, fórmulas prontas ou exigência de ser forte o tempo inteiro.
              </p>
              <Link to="/sobre" className="text-link mt-6">
                Conheça a abordagem <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line/70 bg-surface/60 py-24">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="reveal max-w-2xl">
            <SectionHeading overline="CAMINHOS DE ACOMPANHAMENTO" title="Um cuidado para diferentes momentos da sua vida." text="Escolha o caminho que mais conversa com o que você está vivendo agora." />
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line md:grid-cols-3">
            {siteData.home.services.map((item, index) => (
              <div className="reveal bg-canvas" key={item.to}>
                <ServiceCard item={item} index={index + 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="identity-section relative overflow-hidden bg-olive py-24 text-canvas">
        <div className="identity-grid" aria-hidden="true" />
        <div className="mx-auto grid max-w-[1240px] gap-14 px-5 lg:grid-cols-[.82fr_1.18fr] lg:px-8">
          <div className="reveal">
            <p className="eyebrow !text-caramel">MÉTODO IDENTIDADE</p>
            <h2 className="mt-5 max-w-md font-display text-[clamp(2.8rem,5vw,5rem)] leading-[.98] tracking-[-0.04em] text-canvas">
              Três movimentos para voltar ao próprio centro.
            </h2>
          </div>
          <div className="reveal space-y-3">
            {siteData.method.steps.map((step) => (
              <article key={step.number} className="group grid gap-5 border-b border-white/12 py-6 sm:grid-cols-[70px_1fr]">
                <span className="font-display text-3xl italic text-caramel/90">{step.number}</span>
                <div>
                  <h3 className="font-display text-2xl text-canvas">{step.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-canvas/65">{step.text}</p>
                </div>
              </article>
            ))}
            <Link to="/sobre" className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-canvas">
              Conhecer o Método Identidade <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-canvas py-24">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div className="reveal max-w-md">
            <p className="eyebrow">SOBRE JOVINA</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-olive md:text-5xl">Escuta sensível, presença e direção.</h2>
            <p className="mt-6 text-base leading-8 text-umber/68">{siteData.about.body[0]}</p>
            <Link to="/sobre" className="text-link mt-7">
              Minha trajetória <ArrowRight size={14} />
            </Link>
          </div>
          <div className="reveal relative">
            <div className="quote-panel">
              <span className="font-display text-7xl leading-none text-caramel/35">“</span>
              <blockquote className="mt-1 font-display text-3xl italic leading-snug text-olive md:text-4xl">
                {siteData.brand.phrase}
              </blockquote>
              <div className="mt-8 h-px w-16 bg-caramel" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-umber/55">Jovina Diniz</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
