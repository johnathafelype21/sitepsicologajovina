import EditorialArt from '../components/EditorialArt';
import FAQList from '../components/FAQList';
import SectionHeading from '../components/SectionHeading';
import { siteData } from '../data/mockData';

export interface FAQPageProps { readonly className?: string; }

export default function FAQPage({ className = '' }: Readonly<FAQPageProps>) {
  return (
    <main className={className}>
      <section className="page-hero-split hero-shell border-b border-line/70 py-16 md:py-20">
        <div className="mx-auto grid max-w-[1080px] items-center gap-12 px-5 lg:grid-cols-[1fr_.7fr] lg:px-8">
          <div className="motion-left">
            <p className="eyebrow">DÚVIDAS FREQUENTES</p>
            <h1 className="mt-5 font-display text-[clamp(3.4rem,7vw,6rem)] leading-[.92] tracking-[-0.052em] text-olive">
              Antes de começar,
              <span className="block italic text-caramel">é natural querer entender.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-umber/62">Informações práticas sobre atendimento, modalidades e primeiros passos.</p>
          </div>
          <div className="motion-scale"><EditorialArt variant="identity" label="Clareza também faz parte do cuidado" className="!min-h-[360px]" /></div>
        </div>
      </section>
      <section className="bg-canvas py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <SectionHeading overline="PERGUNTAS & RESPOSTAS" title="Tudo de forma simples e clara." />
          <div className="mt-10 motion-rise"><FAQList items={siteData.faq} /></div>
        </div>
      </section>
    </main>
  );
}
