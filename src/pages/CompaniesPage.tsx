import ContactForm from '../components/ContactForm';
import SectionHeading from '../components/SectionHeading';
import { useReveal } from '../hooks/useReveal';

export interface CompaniesPageProps { readonly className?: string; }

export default function CompaniesPage({ className = '' }: Readonly<CompaniesPageProps>) {
  useReveal();
  const topics = ['Identidade e presença', 'Autoestima e relações', 'Inteligência emocional', 'Desenvolvimento feminino', 'Comunicação', 'Fortalecimento de mulheres'];

  return (
    <main className={className}>
      <section className="hero-shell border-b border-line/70 py-20">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <p className="eyebrow">PALESTRAS · EMPRESAS · GRUPOS</p>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.3rem,7.5vw,6.7rem)] leading-[.94] tracking-[-0.05em] text-olive">
            Conversas que fortalecem
            <span className="block italic text-caramel">mulheres dentro das organizações.</span>
          </h1>
        </div>
      </section>

      <section className="bg-canvas py-24">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <SectionHeading overline="TEMAS POSSÍVEIS" title="Encontros construídos para cada contexto." text="Palestras e experiências podem ser adaptadas ao perfil da empresa, do grupo e ao objetivo do evento." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, index) => <div key={topic} className="reveal min-h-[190px] bg-canvas p-7"><span className="font-display text-2xl italic text-caramel/50">0{index + 1}</span><h3 className="mt-7 font-display text-2xl text-olive">{topic}</h3></div>)}
          </div>
        </div>
      </section>

      <section className="bg-surface/70 py-24">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <SectionHeading overline="SOLICITAR PROPOSTA" title="Conte um pouco sobre o seu evento." text="Ao enviar, o WhatsApp será aberto com as informações organizadas para facilitar o primeiro contato." />
          <div className="reveal"><ContactForm context="company" /></div>
        </div>
      </section>
    </main>
  );
}
