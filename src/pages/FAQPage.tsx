import FAQList from '../components/FAQList';
import EditorialArt from '../components/EditorialArt';
import SectionHeading from '../components/SectionHeading';
import { siteData } from '../data/mockData';

export interface FAQPageProps { readonly className?: string; }

export default function FAQPage({ className = '' }: Readonly<FAQPageProps>) {
  return (
    <main className={className}>
      <section className="page-hero-split hero-shell border-b border-line/70 py-12 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-[1080px] items-center gap-8 sm:gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div className="motion-left">
            <p className="eyebrow">DÚVIDAS FREQUENTES</p>
            <h1 className="mt-4 sm:mt-5 font-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[.92] tracking-[-0.05em] text-olive">
              Antes de começar,
              <span className="block italic text-caramel">é natural querer entender.</span>
            </h1>
            <p className="mt-5 sm:mt-6 max-w-xl text-base leading-relaxed sm:leading-8 text-umber/68">
              Informações práticas sobre atendimento, modalidades e primeiros passos.
            </p>
          </div>
          <div className="motion-scale max-w-[420px]">
            <EditorialArt
              variant="identity"
              src="/images/jovina/metodo-escolher-direcao.webp"
              alt="Clareza, acolhimento e direção"
              badgeTitle="Clareza & Cuidado"
              badgeSubtitle="Perguntas Frequentes"
              priority
            />
          </div>
        </div>
      </section>
      <section className="bg-canvas py-16 sm:py-20 md:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading overline="PERGUNTAS & RESPOSTAS" title="Tudo de forma simples e clara." />
          <div className="mt-8 sm:mt-10 motion-rise"><FAQList items={siteData.faq} /></div>
        </div>
      </section>
    </main>
  );
}
