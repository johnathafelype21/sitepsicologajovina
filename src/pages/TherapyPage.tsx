import { ArrowRight } from 'lucide-react';
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
      <section className="hero-shell border-b border-line/70 py-20">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-5 lg:grid-cols-[1.05fr_.75fr] lg:px-8">
          <div className="reveal">
            <p className="eyebrow">TERAPIA PARA MULHERES</p>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(3.4rem,7.5vw,6.7rem)] leading-[.92] tracking-[-0.055em] text-olive">
              Um espaço para
              <span className="block italic text-caramel">não precisar dar conta de tudo.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-umber/65">{siteData.therapy.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={buildUrl()} target="_blank" rel="noreferrer" className="button-primary">
                <WhatsAppIcon className="h-4 w-4" /> Agendar pelo WhatsApp
              </a>
              <Link to="/faq" className="button-secondary">Tirar dúvidas <ArrowRight size={14} /></Link>
            </div>
          </div>
          <div className="reveal"><PhotoPlaceholder /></div>
        </div>
      </section>

      <section className="bg-canvas py-24">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <SectionHeading overline="DEMANDAS TRABALHADAS" title="O que você sente não precisa ser carregado em silêncio." text="Alguns temas que podem aparecer ao longo do processo de acompanhamento." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {siteData.therapyTopics.map((topic, index) => (
              <article key={topic} className="reveal min-h-[230px] bg-canvas p-7">
                <span className="font-display text-2xl italic text-caramel/50">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-7 font-display text-2xl leading-tight text-olive">{topic}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface/70 py-24">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <SectionHeading overline="COMO FUNCIONA" title="Um processo claro, acolhedor e ajustado ao seu momento." centered />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {siteData.therapy.process.map((item) => (
              <article key={item.title} className="reveal rounded-[1.4rem] border border-line bg-canvas p-7">
                <h3 className="font-display text-2xl text-olive">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-umber/62">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="identity-section relative overflow-hidden bg-olive py-24 text-canvas">
        <div className="identity-grid" aria-hidden="true" />
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div className="reveal">
            <SectionHeading overline="ABORDAGEM INTEGRATIVA" title="Você não é apenas a sua mente. O processo considera o todo." text="Emoções, história, vínculos e sinais do corpo entram na escuta, sempre respeitando os limites e a singularidade de cada mulher." light />
          </div>
          <div className="reveal">
            <p className="eyebrow !text-caramel">TRÍADE DO PROCESSO</p>
            <div className="mt-7 space-y-4">
              {['Percepção', 'Sentido', 'Escolha'].map((label, index) => (
                <div key={label} className="flex items-center gap-5 border-b border-white/12 pb-4">
                  <span className="font-display text-2xl italic text-caramel/80">0{index + 1}</span>
                  <span className="font-display text-2xl text-canvas">{label}</span>
                </div>
              ))}
            </div>
            <p className="mt-7 text-sm leading-7 text-canvas/65">A proposta é ampliar a percepção sobre o que você vive para construir respostas mais conscientes e coerentes com quem você deseja ser.</p>
          </div>
        </div>
      </section>

      <section className="bg-canvas py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <SectionHeading overline="DÚVIDAS FREQUENTES" title="Perguntas comuns antes de começar." centered />
          <div className="mt-10"><FAQList items={siteData.faq.slice(0, 4)} /></div>
        </div>
      </section>

      <CTASection title="Você merece um lugar onde não precisa ser forte o tempo inteiro." text="Agende seu primeiro contato ou converse diretamente pelo WhatsApp para entender a modalidade de atendimento." />
    </main>
  );
}
