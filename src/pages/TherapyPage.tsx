import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import EditorialArt from '../components/EditorialArt';
import FAQList from '../components/FAQList';
import ImmersiveCard from '../components/ImmersiveCard';
import SectionHeading from '../components/SectionHeading';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { siteData } from '../data/mockData';
import { useWhatsApp } from '../hooks/useWhatsApp';

export interface TherapyPageProps { readonly className?: string; }

export default function TherapyPage({ className = '' }: Readonly<TherapyPageProps>) {
  const { buildUrl } = useWhatsApp({ defaultMessage: 'Olá, Jovina. Gostaria de saber mais sobre terapia para mulheres.' });

  return (
    <main className={className}>
      <section className="page-hero-split hero-shell border-b border-line/70 py-16 md:py-20">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-5 lg:grid-cols-[1.05fr_.75fr] lg:px-8">
          <div className="motion-left">
            <p className="eyebrow">TERAPIA PARA MULHERES</p>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(3.5rem,7.5vw,6.8rem)] leading-[.9] tracking-[-0.058em] text-olive">
              Um lugar para
              <span className="block italic text-caramel">não precisar sustentar tudo.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-umber/65">{siteData.therapy.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={buildUrl()} target="_blank" rel="noreferrer" className="button-primary"><WhatsAppIcon className="h-4 w-4" /> Agendar atendimento</a>
              <Link to="/faq" className="button-secondary">Tirar dúvidas <ArrowRight size={14} /></Link>
            </div>
          </div>
          <div className="motion-scale"><EditorialArt variant="therapy" /></div>
        </div>
      </section>

      <section className="bg-canvas py-24 md:py-32">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <SectionHeading overline="O QUE PODE CHEGAR À SESSÃO" title="Nem toda dor tem nome logo no começo." text="O processo ajuda a perceber o que se repete, o que pesa e o que precisa de espaço para ser compreendido." />
          <div className="immersive-card-grid immersive-card-grid-topics mt-14">
            {siteData.therapyTopics.map((topic, index) => (
              <ImmersiveCard
                key={topic}
                index={index + 1}
                title={topic}
                variant="therapy"
                motion={index % 3 === 0 ? 'left' : index % 3 === 1 ? 'rise' : 'right'}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ECE2D7] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div className="motion-left">
            <EditorialArt variant="therapy" label="Acolhimento, silêncio e presença" />
          </div>
          <div className="motion-right">
            <SectionHeading overline="COMO FUNCIONA" title="Um processo claro, sem perder delicadeza." />
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {siteData.therapy.process.map((item) => (
                <article key={item.title} className="rounded-[1.3rem] border border-umber/10 bg-canvas/70 p-6 backdrop-blur">
                  <h3 className="font-display text-2xl text-olive">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-umber/62">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-olive py-24 text-canvas md:py-32">
        <div className="mx-auto grid max-w-[1180px] gap-14 px-5 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div className="motion-left">
            <SectionHeading overline="ABORDAGEM INTEGRATIVA" title="Mente, corpo, história e vínculos entram na mesma conversa." text="O acompanhamento considera a experiência como um todo, sempre respeitando limites, ritmo e singularidade." light />
          </div>
          <div className="motion-right">
            {['Percepção', 'Sentido', 'Escolha'].map((label, index) => (
              <div key={label} className="grid grid-cols-[60px_1fr] gap-5 border-b border-white/12 py-5">
                <span className="font-display text-3xl italic text-caramel">0{index + 1}</span>
                <span className="font-display text-3xl text-canvas">{label}</span>
              </div>
            ))}
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
