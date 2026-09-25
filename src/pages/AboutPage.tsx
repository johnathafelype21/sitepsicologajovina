import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import EditorialArt from '../components/EditorialArt';
import SectionHeading from '../components/SectionHeading';
import { siteData } from '../data/mockData';

export interface AboutPageProps { readonly className?: string; }

export default function AboutPage({ className = '' }: Readonly<AboutPageProps>) {
  return (
    <main className={className}>
      <section className="page-hero-split hero-shell border-b border-line/70 py-16 md:py-20">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-5 lg:grid-cols-[1fr_.82fr] lg:px-8">
          <div className="motion-left">
            <p className="eyebrow">TRAJETÓRIA · PROPÓSITO · PRESENÇA</p>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(3.5rem,8vw,7rem)] leading-[.9] tracking-[-0.058em] text-olive">
              Uma escuta que nasce
              <span className="block italic text-caramel">da presença.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-umber/65">Jovina Diniz acompanha mulheres em processos de compreensão, reconstrução de identidade e escolha de novos caminhos.</p>
          </div>
          <div className="motion-scale">
            <EditorialArt variant="about" label="Aqui entra o retrato principal da Jovina" />
          </div>
        </div>
      </section>

      <section className="bg-canvas py-24 md:py-32">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
            <div className="motion-left">
              <p className="eyebrow">MINHA FORMA DE ESTAR</p>
              <h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] leading-[.98] tracking-[-0.045em] text-olive">Menos respostas prontas. Mais escuta para o que é seu.</h2>
            </div>
            <div className="editorial-columns motion-right">
              {siteData.about.body.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="motion-stage bg-surface/70 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-5 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div className="motion-left"><EditorialArt variant="identity" src="/images/jovina/metodo-linguagem-visual.webp" alt="Linguagem visual conceitual do Método Identidade" /></div>
          <div className="motion-right">
            <SectionHeading overline="MÉTODO IDENTIDADE" title="Compreender a história. Reconstruir a identidade. Escolher a direção." text={siteData.method.intro} />
            <div className="mt-9 space-y-5">
              {siteData.method.steps.map((step) => (
                <div key={step.number} className="grid grid-cols-[54px_1fr] gap-5 border-t border-line pt-5">
                  <span className="font-display text-2xl italic text-caramel">{step.number}</span>
                  <div><h3 className="font-display text-2xl text-olive">{step.title}</h3><p className="mt-2 text-sm leading-7 text-umber/62">{step.text}</p></div>
                </div>
              ))}
            </div>
            <Link to="/contato" className="text-link mt-8">Conversar comigo <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      <CTASection title="Você não precisa ter todas as respostas para começar." text="O primeiro contato pode ser apenas uma conversa para entender se esse espaço faz sentido para o seu momento." />
    </main>
  );
}
