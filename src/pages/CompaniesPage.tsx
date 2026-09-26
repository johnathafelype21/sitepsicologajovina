import ContactForm from '../components/ContactForm';
import EditorialArt from '../components/EditorialArt';
import CompanyMosaic from '../components/CompanyMosaic';
import SectionHeading from '../components/SectionHeading';

export interface CompaniesPageProps { readonly className?: string; }

const topics = ['Identidade e presença', 'Autoestima e relações', 'Inteligência emocional', 'Desenvolvimento feminino', 'Comunicação', 'Fortalecimento de mulheres'];

export default function CompaniesPage({ className = '' }: Readonly<CompaniesPageProps>) {
  return (
    <main className={className}>
      <section className="page-hero-split bg-[#F4F1EA] py-12 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 sm:gap-14 px-4 sm:px-6 lg:grid-cols-[1.08fr_.72fr] lg:px-8">
          <div className="motion-left">
            <p className="eyebrow">PALESTRAS · EMPRESAS · GRUPOS</p>
            <h1 className="mt-4 sm:mt-5 max-w-5xl font-display text-[clamp(2.5rem,6.5vw,5.8rem)] leading-[.92] tracking-[-0.05em] text-olive">
              Conversas que fortalecem
              <span className="block italic text-caramel">pessoas e cultura.</span>
            </h1>
            <p className="mt-5 sm:mt-7 max-w-2xl text-base sm:text-lg leading-relaxed sm:leading-8 text-umber/68">
              Experiências para organizações que desejam criar espaços de reflexão, presença, desenvolvimento e fortalecimento de mulheres.
            </p>
          </div>
          <div className="motion-scale">
            <EditorialArt
              variant="companies"
              src="/images/jovina/empresas-cultura-presenca.webp"
              alt="Imagem editorial de conversa, cultura e presença em empresas"
              priority
              loading="eager"
              objectPosition="center 42%"
            />
          </div>
        </div>
      </section>

      <section className="bg-canvas py-16 sm:py-20 md:py-32">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <SectionHeading overline="TEMAS POSSÍVEIS" title="Conteúdo com profundidade e linguagem acessível." text="Cada encontro pode ser adaptado ao público, ao momento da organização e ao objetivo do evento." />
          <div className="mt-10 sm:mt-14">
            <CompanyMosaic topics={topics} />
          </div>
        </div>
      </section>

      <section className="bg-[#E7E1D8] py-16 sm:py-20 md:py-32">
        <div className="mx-auto grid max-w-[1180px] gap-8 sm:gap-14 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div className="motion-left">
            <SectionHeading overline="SOLICITAR PROPOSTA" title="Vamos construir o encontro certo para o seu contexto." text="Envie as informações principais e o WhatsApp será aberto com a mensagem organizada." />
            <div className="mt-6 sm:mt-8">
              <EditorialArt
                variant="companies"
                src="/images/jovina/empresas-cultura-presenca.webp"
                alt="Encontro profissional em conversa sobre cultura e presença"
                className="!min-h-[260px] sm:!min-h-[320px]"
                objectPosition="center 40%"
                loading="lazy"
              />
            </div>
          </div>
          <div className="motion-right"><ContactForm context="company" /></div>
        </div>
      </section>
    </main>
  );
}
