import ContactForm from '../components/ContactForm';
import EditorialArt from '../components/EditorialArt';
import SectionHeading from '../components/SectionHeading';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { siteData } from '../data/mockData';
import { useWhatsApp } from '../hooks/useWhatsApp';

export interface ContactPageProps { readonly className?: string; }

export default function ContactPage({ className = '' }: Readonly<ContactPageProps>) {
  const { buildUrl } = useWhatsApp({ defaultMessage: 'Olá, Jovina. Gostaria de conversar sobre atendimento.' });

  return (
    <main className={className}>
      <section className="page-hero-split hero-shell border-b border-line/70 py-12 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 sm:gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div className="motion-left">
            <p className="eyebrow">PRIMEIRO CONTATO</p>
            <h1 className="mt-4 sm:mt-5 max-w-4xl font-display text-[clamp(2.5rem,6.5vw,5.8rem)] leading-[.92] tracking-[-0.05em] text-olive">
              Iniciar uma conversa
              <span className="block italic text-caramel">é o primeiro movimento.</span>
            </h1>
            <p className="mt-5 sm:mt-7 max-w-xl text-base sm:text-lg leading-relaxed sm:leading-8 text-umber/68">{siteData.contact.intro}</p>
            <div className="mt-6 sm:mt-8">
              <a href={buildUrl()} target="_blank" rel="noreferrer" className="button-primary"><WhatsAppIcon className="h-4 w-4" /> Conversar agora pelo WhatsApp</a>
            </div>
          </div>
          <div className="motion-scale">
            <EditorialArt
              variant="about"
              src="/images/jovina/terapia-acolhimento-presenca.webp"
              alt="Ambiente acolhedor e seguro de escuta e presença"
              badgeTitle="Presença & Escuta"
              badgeSubtitle="Espaço Terapêutico"
              priority
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="bg-canvas py-16 sm:py-20 md:py-32">
        <div className="mx-auto grid max-w-[1180px] gap-8 sm:gap-14 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div className="motion-left">
            <SectionHeading overline="FORMULÁRIO DIRETO" title="Se preferir, preencha aqui." text="Os dados serão organizados e abertos diretamente no seu WhatsApp para envio." />
          </div>
          <div className="motion-right"><ContactForm /></div>
        </div>
      </section>
    </main>
  );
}
