import ContactForm from '../components/ContactForm';
import EditorialArt from '../components/EditorialArt';
import SectionHeading from '../components/SectionHeading';

export interface CompaniesPageProps { readonly className?: string; }

const topics = ['Identidade e presença', 'Autoestima e relações', 'Inteligência emocional', 'Desenvolvimento feminino', 'Comunicação', 'Fortalecimento de mulheres'];

export default function CompaniesPage({ className = '' }: Readonly<CompaniesPageProps>) {
  return (
    <main className={className}>
      <section className="page-hero-split bg-[#F4F1EA] py-16 md:py-20">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-5 lg:grid-cols-[1.08fr_.72fr] lg:px-8">
          <div className="motion-left">
            <p className="eyebrow">PALESTRAS · EMPRESAS · GRUPOS</p>
            <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.4rem,7.5vw,6.7rem)] leading-[.91] tracking-[-0.055em] text-olive">
              Conversas que fortalecem
              <span className="block italic text-caramel">pessoas e cultura.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-umber/65">Experiências para organizações que desejam criar espaços de reflexão, presença, desenvolvimento e fortalecimento de mulheres.</p>
          </div>
          <div className="motion-scale"><EditorialArt variant="companies" /></div>
        </div>
      </section>

      <section className="bg-canvas py-24 md:py-32">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <SectionHeading overline="TEMAS POSSÍVEIS" title="Conteúdo com profundidade e linguagem acessível." text="Cada encontro pode ser adaptado ao público, ao momento da organização e ao objetivo do evento." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[1.8rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, index) => (
              <div key={topic} className="motion-rise min-h-[220px] bg-canvas p-7 md:p-8">
                <span className="font-display text-3xl italic text-caramel/45">0{index + 1}</span>
                <h3 className="mt-8 font-display text-2xl text-olive">{topic}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#E7E1D8] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] gap-14 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div className="motion-left">
            <SectionHeading overline="SOLICITAR PROPOSTA" title="Vamos construir o encontro certo para o seu contexto." text="Envie as informações principais e o WhatsApp será aberto com a mensagem organizada." />
            <div className="mt-8"><EditorialArt variant="companies" label="Visual institucional com a identidade da Jovina" className="!min-h-[320px]" /></div>
          </div>
          <div className="motion-right"><ContactForm context="company" /></div>
        </div>
      </section>
    </main>
  );
}
