import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import FAQList from '../components/FAQList';
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
      <section className="editorial-glow overflow-hidden bg-canvas-soft py-14 dark:bg-dark-canvas lg:py-20">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 lg:grid-cols-[1.08fr_.72fr] lg:px-8">
          <div className="reveal">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-caramel">{siteData.home.eyebrow}</p>
            <h1 className="max-w-3xl font-display text-[clamp(2.7rem,6vw,5rem)] leading-[1.02] tracking-[-0.04em] text-olive dark:text-dark-text">
              {siteData.home.titleStart}
              <em className="font-normal text-caramel">{siteData.home.titleEmphasis}</em>
              {siteData.home.titleEnd}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-umber/70 dark:text-dark-muted md:text-lg">{siteData.home.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={buildUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md bg-olive px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-canvas hover:bg-olive-deep dark:bg-canvas dark:text-olive">
                <WhatsAppIcon className="h-4 w-4" /> Agendar pelo WhatsApp
              </a>
              <Link to="/sobre" className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-surface px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-umber hover:border-caramel dark:border-white/10 dark:bg-dark-surface dark:text-dark-text">
                Conhecer meu trabalho <ArrowRight size={14} />
              </Link>
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs text-umber/55 dark:text-dark-muted"><MapPin size={14} /> Online e presencial em São Paulo.</p>
          </div>
          <div className="reveal lg:pl-8"><PhotoPlaceholder /></div>
        </div>
      </section>

      <section className="bg-canvas py-20 dark:bg-dark-canvas">
        <div className="reveal mx-auto max-w-3xl px-5 text-center lg:px-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-caramel">PRINCÍPIO FUNDAMENTAL</p>
          <h2 className="mt-4 font-display text-5xl text-olive dark:text-dark-text">Voltar para si.</h2>
          <p className="mt-4 font-display text-lg italic text-umber/65 dark:text-dark-muted">“{siteData.brand.phrase}”</p>
          <p className="mt-6 text-base leading-7 text-umber/70 dark:text-dark-muted">Um espaço de escuta e reflexão para mulheres que desejam compreender a própria história, fortalecer a identidade e construir escolhas mais conscientes.</p>
          <Link to="/sobre" className="mt-7 inline-flex items-center gap-2 border-b border-umber/30 pb-1 text-xs font-semibold uppercase tracking-[0.08em] text-umber hover:text-caramel dark:text-dark-text">
            Conheça a Jovina <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="bg-canvas py-20 dark:bg-dark-canvas">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="reveal">
            <SectionHeading overline="CAMINHOS DE ACOMPANHAMENTO" title="Serviços em Destaque" text="Formatos de acompanhamento pensados para diferentes momentos e necessidades." centered />
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {siteData.home.services.map((item) => <div className="reveal" key={item.to}><ServiceCard item={item} /></div>)}
          </div>
          <div className="mt-8 text-center">
            <a href={buildUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-olive px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-canvas dark:bg-canvas dark:text-olive">
              <WhatsAppIcon className="h-4 w-4" /> Agendar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="bg-canvas pb-20 dark:bg-dark-canvas">
        <div className="reveal mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="rounded-xl bg-olive p-8 shadow-soft dark:bg-dark-surface md:flex md:items-end md:justify-between md:gap-8 md:p-12">
            <SectionHeading overline="ABORDAGEM AUTORAL" title="Método Identidade" text="Uma proposta de acompanhamento para compreender história, vínculos, identidade e direção." light />
            <Link to="/sobre" className="mt-7 inline-flex shrink-0 items-center gap-2 rounded-md bg-[#F6D5BE] px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-umber md:mt-0">
              Conhecer o método <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />

      <section className="bg-canvas py-20 dark:bg-dark-canvas">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="reveal"><SectionHeading overline="TIRE SUAS DÚVIDAS" title="Perguntas Frequentes" centered /></div>
          <div className="reveal mt-8"><FAQList items={siteData.faq.slice(0, 4)} /></div>
          <div className="mt-8 text-center">
            <Link to="/faq" className="inline-flex items-center gap-2 border-b border-umber/30 pb-1 text-xs font-semibold uppercase tracking-[0.08em] text-umber dark:text-dark-text">
              Ver todas as perguntas <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
