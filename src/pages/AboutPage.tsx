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
      <section className="bg-canvas-soft py-16 text-center dark:bg-dark-canvas">
        <div className="mx-auto max-w-4xl px-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-caramel">TRAJETÓRIA, PROPÓSITO & FILOSOFIA</p>
          <h1 className="mt-4 font-display text-5xl text-olive dark:text-dark-text">Sobre Jovina Diniz</h1>
          <p className="mt-4 font-display italic text-umber/60 dark:text-dark-muted">“{siteData.brand.phrase}”</p>
        </div>
      </section>

      <section className="bg-canvas py-20 dark:bg-dark-canvas">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
          <div className="reveal"><PhotoPlaceholder /></div>
          <div className="reveal">
            <SectionHeading overline="ACOLHIMENTO & PRESENÇA" title={siteData.about.title} />
            <div className="mt-6 space-y-5">
              {siteData.about.body.map((p) => <p key={p} className="text-base leading-7 text-umber/72 dark:text-dark-muted">{p}</p>)}
            </div>
            <div className="mt-8 rounded-lg border border-line bg-surface p-5 dark:border-white/10 dark:bg-dark-surface">
              <p className="text-sm leading-6 text-umber/72 dark:text-dark-muted">
                <strong className="text-olive dark:text-dark-text">Informações profissionais:</strong> espaço reservado para formações, certificações e demais credenciais que serão inseridas somente após confirmação da profissional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FBE3D8] py-20 dark:bg-dark-surface">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <SectionHeading overline="METODOLOGIA" title={siteData.method.title} text={siteData.method.intro} />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {siteData.method.steps.map((step) => (
              <article key={step.number} className="reveal rounded-xl border border-line bg-canvas p-7 shadow-soft dark:border-white/10 dark:bg-dark-canvas">
                <span className="font-display text-4xl text-caramel/35">{step.number}</span>
                <h3 className="mt-6 font-display text-2xl text-olive dark:text-dark-text">{step.title}</h3>
                <p className="mt-4 text-sm leading-6 text-umber/70 dark:text-dark-muted">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas py-20 dark:bg-dark-canvas">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <div className="reveal">
              <SectionHeading overline="A PRÁTICA NAS SESSÕES" title="Integração entre mente, corpo e emoções no dia a dia" text="Uma escuta que considera história, emoções, vínculos e os sinais do corpo sem reduzir a experiência a uma única dimensão." />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {['Regulação somática', 'Elaboração emocional', 'Clareza cognitiva', 'Integração prática'].map((item) => (
                  <div key={item} className="rounded-lg border border-line bg-surface p-5 dark:border-white/10 dark:bg-dark-surface">
                    <h3 className="font-display text-xl text-olive dark:text-dark-text">{item}</h3>
                    <p className="mt-2 text-sm leading-6 text-umber/65 dark:text-dark-muted">Parte de um processo de percepção, compreensão e construção de escolhas mais conscientes.</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="reveal rounded-xl bg-olive p-8 text-canvas shadow-soft dark:bg-dark-surface">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-caramel">RITMO & PRESENÇA</p>
              <blockquote className="mt-5 font-display text-3xl italic leading-tight">“Quando a mente compreende, o corpo encontra novas formas de responder.”</blockquote>
              <div className="mt-8 space-y-3 border-t border-white/15 pt-6 text-sm text-canvas/75">
                <p>Online e presencial</p>
                <p>Sessões online de aproximadamente 50 minutos</p>
                <p>Frequência combinada conforme o processo</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection title="Deseja iniciar sua jornada de retorno a si mesma?" text="Entre em contato para entender o formato de acompanhamento que melhor conversa com o seu momento atual." />
    </main>
  );
}
