import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import EditorialArt from '../components/EditorialArt';
import SectionHeading from '../components/SectionHeading';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { siteData } from '../data/mockData';
import { useWhatsApp } from '../hooks/useWhatsApp';

export interface HomePageProps {
  readonly className?: string;
}

const marqueeItems = ['Terapia', 'Identidade', 'Presença', 'Clareza', 'Direção', 'Novos ciclos'];

export default function HomePage({ className = '' }: Readonly<HomePageProps>) {
  const { buildUrl } = useWhatsApp({ defaultMessage: 'Olá, Jovina. Gostaria de agendar um atendimento.' });

  return (
    <main className={className}>
      <section className="hero-v2 motion-stage border-b border-line/70">
        <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-5 py-16 lg:grid-cols-[1.05fr_.8fr] lg:px-10 lg:py-20">
          <div className="hero-v2-copy">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-caramel/30 bg-white/55 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-caramel backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-caramel" />
              {siteData.home.eyebrow}
            </div>

            <h1 className="max-w-[800px] font-display text-[clamp(3.6rem,7.8vw,7.5rem)] leading-[.88] tracking-[-0.062em] text-olive">
              <span className="hero-v2-word">Voltar</span>
              <span className="hero-v2-word">para</span>
              <span className="hero-v2-word">si</span>
              <span className="block font-normal italic text-caramel">muda a direção.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-[17px] leading-8 text-umber/68 md:text-[19px]">
              Terapia e mentoria para mulheres que desejam compreender a própria história, fortalecer a identidade e construir escolhas com mais consciência.
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

          <div className="hero-v2-artwrap motion-scale">
            <EditorialArt variant="about" label="Espaço reservado para a fotografia principal da Jovina" />
            <div className="hero-v2-badge">
              <p className="text-[9px] font-semibold uppercase tracking-[.16em] text-caramel">Essência do trabalho</p>
              <p className="mt-2 font-display text-xl leading-snug text-olive">Compreender. Reconstruir. Escolher.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="sideways-band" aria-hidden="true">
        <div className="sideways-track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
        </div>
      </div>

      <section className="motion-stage bg-canvas py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-start gap-14 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div className="motion-left">
            <p className="eyebrow">VOLTAR PARA SI</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,6vw,5.8rem)] leading-[.94] tracking-[-0.05em] text-olive">
              Sua história explica muito.
              <span className="block italic text-caramel">Mas não precisa decidir tudo.</span>
            </h2>
          </div>
          <div className="motion-right lg:pt-20">
            <p className="max-w-xl text-base leading-8 text-umber/68 md:text-lg">
              Um espaço de escuta e reflexão para reconhecer padrões, fortalecer a identidade e construir escolhas mais conscientes — sem fórmulas prontas e sem a exigência de ser forte o tempo inteiro.
            </p>
            <Link to="/sobre" className="text-link mt-7">Conhecer a abordagem <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      <section className="bg-surface/60 py-24 md:py-32">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="motion-rise max-w-3xl">
            <SectionHeading overline="TRÊS CAMINHOS" title="Nem toda fase pede a mesma forma de cuidado." text="Cada experiência foi pensada para um momento diferente da jornada." />
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {siteData.home.services.map((item, index) => (
              <article key={item.to} className={`offset-card motion-${index === 0 ? 'left' : index === 1 ? 'rise' : 'right'} rounded-[1.7rem] border border-line bg-canvas p-7 shadow-soft md:p-8`}>
                <span className="font-display text-4xl italic text-caramel/45">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-10 text-[9px] font-semibold uppercase tracking-[.17em] text-terracotta">{item.overline}</p>
                <h3 className="mt-4 font-display text-3xl leading-tight text-olive">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-umber/62">{item.text}</p>
                <Link to={item.to} className="text-link mt-7">Explorar <ArrowRight size={14} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sticky-story">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="sticky-story-grid">
            <div className="sticky-story-copy">
              <p className="eyebrow !text-caramel">MÉTODO IDENTIDADE</p>
              <h2 className="mt-5 max-w-md font-display text-[clamp(3rem,6vw,5.6rem)] leading-[.94] tracking-[-0.05em] text-canvas">
                Três movimentos para voltar ao próprio centro.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-canvas/58">
                Uma narrativa visual que acompanha o scroll no desktop e se transforma em sequência vertical no mobile.
              </p>
              <Link to="/sobre" className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.1em] text-canvas">
                Conhecer o método <ArrowRight size={14} />
              </Link>
            </div>

            <div>
              {siteData.method.steps.map((step, index) => (
                <article className="sticky-story-card motion-fade" key={step.number}>
                  <div className="sticky-story-card-inner">
                    <span className="sticky-story-number">{step.number}</span>
                    <div>
                      <p className="eyebrow !text-caramel">{['ORIGEM', 'RECONSTRUÇÃO', 'MOVIMENTO'][index]}</p>
                      <h3 className="mt-4">{step.title}</h3>
                      <p>{step.text}</p>
                      <div className="mt-8 max-w-xl">
                        <EditorialArt variant="identity" label={step.title} className="!min-h-[360px]" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="motion-stage bg-canvas py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-5 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div className="motion-left">
            <EditorialArt variant="about" label="Aqui entra uma segunda fotografia autoral da Jovina" />
          </div>
          <div className="motion-right">
            <p className="eyebrow">SOBRE JOVINA</p>
            <h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] leading-[.98] tracking-[-0.045em] text-olive">
              Escuta sensível,
              <span className="block italic text-caramel">presença e direção.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-umber/68">{siteData.about.body[0]}</p>
            <Link to="/sobre" className="text-link mt-7">Conhecer minha trajetória <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      <CTASection title="Talvez seja hora de voltar para você." text="Se algo em você pede mais clareza, acolhimento ou direção, o primeiro passo pode ser uma conversa." />
    </main>
  );
}
