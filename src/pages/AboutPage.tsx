import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import PhotoPlaceholder from '../components/PhotoPlaceholder';
import SectionHeading from '../components/SectionHeading';
import { siteData } from '../data/mockData';
import { useReveal } from '../hooks/useReveal';

export interface AboutPageProps {
  readonly className?: string;
}

export default function AboutPage({ className = '' }: Readonly<AboutPageProps>) {
  useReveal();

  return (
    <main className={className}>
      <section className="hero-shell border-b border-line/70 py-20">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <p className="eyebrow">TRAJETÓRIA · PROPÓSITO · PRESENÇA</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(3.5rem,8vw,7rem)] leading-[.92] tracking-[-0.055em] text-olive">
            Sobre Jovina
            <span className="block italic text-caramel">e o caminho de volta para si.</span>
          </h1>
        </div>
      </section>

      <section className="bg-canvas py-24">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-5 lg:grid-cols-[.75fr_1.25fr] lg:px-8">
          <div className="reveal"><PhotoPlaceholder /></div>
          <div className="reveal">
            <SectionHeading overline="ACOLHIMENTO & ESCUTA" title={siteData.about.title} />
            <div className="mt-8 space-y-5">
              {siteData.about.body.map((p) => <p key={p} className="max-w-2xl text-base leading-8 text-umber/68">{p}</p>)}
            </div>
            <Link to="/contato" className="text-link mt-8">Conversar comigo <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      <section className="bg-surface/70 py-24">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <SectionHeading overline="MÉTODO IDENTIDADE" title="Compreender a história. Reconstruir a identidade. Escolher a direção." text={siteData.method.intro} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line md:grid-cols-3">
            {siteData.method.steps.map((step) => (
              <article key={step.number} className="reveal min-h-[300px] bg-canvas p-8">
                <span className="font-display text-4xl italic text-caramel/55">{step.number}</span>
                <h3 className="mt-10 font-display text-3xl text-olive">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-umber/62">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Você não precisa ter todas as respostas para começar." text="O primeiro contato pode ser apenas uma conversa para entender se esse espaço faz sentido para o seu momento." />
    </main>
  );
}
