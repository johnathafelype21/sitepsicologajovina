import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import FAQList from '../components/FAQList';
import PhotoPlaceholder from '../components/PhotoPlaceholder';
import SectionHeading from '../components/SectionHeading';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { siteData } from '../data/mockData';
import { useReveal } from '../hooks/useReveal';
import { useWhatsApp } from '../hooks/useWhatsApp';

export interface TherapyPageProps {
  readonly className?: string;
}

export default function TherapyPage({ className = '' }: Readonly<TherapyPageProps>) {
  useReveal();
  const { buildUrl } = useWhatsApp({ defaultMessage: 'Olá, Jovina. Gostaria de saber mais sobre terapia para mulheres.' });

  return (
    <main className={className}>
      <section className="editorial-glow bg-canvas-soft py-16 dark:bg-dark-canvas">
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 lg:grid-cols-[1.05fr_.7fr] lg:px-8">
          <div className="reveal">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-caramel">CUIDADO CLÍNICO & ACOLHIMENTO FOCADO</p>
            <h1 className="mt-4 font-display text-5xl tracking-[-0.03em] text-olive dark:text-dark-text md:text-6xl">Terapia para Mulheres</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-umber/70 dark:text-dark-muted">{siteData.therapy.intro}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={buildUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md bg-olive px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-canvas dark:bg-canvas dark:text-olive">
                <WhatsAppIcon className="h-4 w-4" /> Agendar pelo WhatsApp
              </a>
              <Link to="/faq" className="inline-flex items-center justify-center rounded-md border border-line bg-canvas px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-umber dark:border-white/10 dark:bg-dark-surface dark:text-dark-text">
                Tirar dúvidas
              </Link>
            </div>
          </div>
          <div className="reveal"><PhotoPlaceholder /></div>
        </div>
      </section>

      <section className="bg-canvas py-20 dark:bg-dark-canvas">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <SectionHeading overline="DEMANDAS TRABALHADAS" title="O que você sente não precisa ser carregado em silêncio" text="Alguns temas que podem aparecer ao longo do processo de acompanhamento." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {siteData.therapyTopics.map((topic, index) => (
              <article key={topic} className="reveal depth-card rounded-xl border border-line bg-surface p-6 dark:border-white/10 dark:bg-dark-surface">
                <span className="text-[10px] font-semibold text-caramel">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-display text-xl text-olive dark:text-dark-text">{topic}</h3>
                <p className="mt-3 text-sm leading-6 text-umber/65 dark:text-dark-muted">Um tema que pode ser observado com profundidade, acolhimento e respeito ao seu tempo.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FBE3D8] py-20 dark:bg-dark-surface">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <SectionHeading overline="ESTRUTURA & METODOLOGIA" title="Como funciona o atendimento" text="Um processo pensado para ser claro, acolhedor e adaptado ao seu momento." centered />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {siteData.therapy.process.map((item) => (
              <article key={item.title} className="reveal rounded-xl border border-line bg-canvas p-6 dark:border-white/10 dark:bg-dark-canvas">
                <h3 className="font-display text-xl text-olive dark:text-dark-text">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-umber/65 dark:text-dark-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-olive py-20 text-canvas dark:bg-dark-surface">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
          <div className="reveal">
            <SectionHeading overline="DIFERENCIAL INTEGRATIVO" title="Você não é apenas a sua mente. Cuidamos do todo." text="O acompanhamento considera emoções, história, vínculos e sinais do corpo, sempre respeitando os limites e a singularidade de cada mulher." light />
            <ul className="mt-8 space-y-4 text-sm text-canvas/75">
              <li>• Sensações corporais e sistema nervoso</li>
              <li>• Crenças e narrativas internas</li>
              <li>• Escolhas práticas e posicionamento</li>
            </ul>
          </div>
          <div className="reveal rounded-xl border border-white/10 bg-white/5 p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-caramel">TRÍADE DO PROCESSO</p>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs">
              {['Percepção', 'Sentido', 'Escolha'].map((label) => (
                <div key={label} className="grid aspect-square place-items-center rounded-full border border-caramel/45 text-canvas">{label}</div>
              ))}
            </div>
            <p className="mt-8 text-sm leading-6 text-canvas/70">A proposta é ampliar a percepção sobre o que você vive para construir respostas mais conscientes.</p>
          </div>
        </div>
      </section>

      <section className="bg-canvas py-20 dark:bg-dark-canvas">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <SectionHeading overline="DÚVIDAS FREQUENTES" title="Perguntas comuns antes de começar" centered />
          <div className="mt-8"><FAQList items={siteData.faq.slice(0, 4)} /></div>
        </div>
      </section>

      <CTASection title="Você merece um lugar onde não precisa ser forte o tempo inteiro." text="Agende seu primeiro contato ou converse diretamente pelo WhatsApp para entender a modalidade de atendimento." />
    </main>
  );
}
