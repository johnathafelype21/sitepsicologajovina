import FAQList from '../components/FAQList';
import SectionHeading from '../components/SectionHeading';
import { siteData } from '../data/mockData';

export interface FAQPageProps { readonly className?: string; }

export default function FAQPage({ className = '' }: Readonly<FAQPageProps>) {
  return (
    <main className={className}>
      <section className="hero-shell border-b border-line/70 py-20">
        <div className="mx-auto max-w-[900px] px-5 text-center lg:px-8">
          <p className="eyebrow">DÚVIDAS FREQUENTES</p>
          <h1 className="mt-5 font-display text-[clamp(3.3rem,7vw,6rem)] leading-[.95] tracking-[-0.05em] text-olive">Antes de começar, talvez você queira saber.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-umber/62">Informações práticas sobre atendimento, modalidades e primeiros passos.</p>
        </div>
      </section>
      <section className="bg-canvas py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <SectionHeading overline="PERGUNTAS & RESPOSTAS" title="Tudo de forma simples e clara." />
          <div className="mt-10"><FAQList items={siteData.faq} /></div>
        </div>
      </section>
    </main>
  );
}
