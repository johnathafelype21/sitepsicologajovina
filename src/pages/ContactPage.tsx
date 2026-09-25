import { Instagram, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import EditorialArt from '../components/EditorialArt';
import { siteData } from '../data/mockData';
import WhatsAppIcon from '../components/WhatsAppIcon';

export interface ContactPageProps { readonly className?: string; }

export default function ContactPage({ className = '' }: Readonly<ContactPageProps>) {
  return (
    <main className={`bg-[#F6F0E8] ${className}`}>
      <section className="page-hero-split py-16 md:py-20">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-5 lg:grid-cols-[.82fr_1.18fr] lg:px-8">
          <div className="motion-left">
            <p className="eyebrow">CONTATO & AGENDAMENTO</p>
            <h1 className="mt-5 font-display text-[clamp(3.6rem,7vw,6.3rem)] leading-[.91] tracking-[-0.055em] text-olive">
              Começar pode ser
              <span className="block italic text-caramel">só uma conversa.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-8 text-umber/65">Escolha o canal mais confortável. O WhatsApp é o caminho mais rápido para iniciar.</p>
            <div className="mt-9 space-y-4 text-sm text-umber/68">
              <a href={`https://wa.me/${siteData.brand.whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-olive"><WhatsAppIcon className="h-5 w-5" /> {siteData.brand.whatsappDisplay}</a>
              <a href={siteData.brand.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-olive"><Instagram size={19} /> {siteData.brand.instagram}</a>
              <p className="flex items-center gap-3"><MapPin size={19} /> {siteData.brand.location} · {siteData.brand.locationDetail}</p>
            </div>
            <div className="mt-10"><EditorialArt variant="about" label="Uma fotografia acolhedora pode entrar aqui" className="!min-h-[300px]" /></div>
          </div>
          <div className="motion-right rounded-[2rem] border border-line bg-canvas p-6 shadow-float md:p-10"><ContactForm /></div>
        </div>
      </section>
    </main>
  );
}
