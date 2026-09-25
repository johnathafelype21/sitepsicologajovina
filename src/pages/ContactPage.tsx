import { Instagram, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { siteData } from '../data/mockData';
import WhatsAppIcon from '../components/WhatsAppIcon';

export interface ContactPageProps { readonly className?: string; }

export default function ContactPage({ className = '' }: Readonly<ContactPageProps>) {
  return (
    <main className={`hero-shell py-20 ${className}`}>
      <div className="mx-auto grid max-w-[1180px] gap-14 px-5 lg:grid-cols-[.78fr_1.22fr] lg:px-8">
        <div>
          <p className="eyebrow">CONTATO & AGENDAMENTO</p>
          <h1 className="mt-5 font-display text-[clamp(3.5rem,7vw,6rem)] leading-[.94] tracking-[-0.05em] text-olive">Vamos conversar?</h1>
          <p className="mt-6 max-w-md text-base leading-8 text-umber/65">Escolha o canal mais confortável. O WhatsApp é o caminho mais rápido para iniciar.</p>
          <div className="mt-10 space-y-4 text-sm text-umber/68">
            <a href={`https://wa.me/${siteData.brand.whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-olive"><WhatsAppIcon className="h-5 w-5" /> {siteData.brand.whatsappDisplay}</a>
            <a href={siteData.brand.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-olive"><Instagram size={19} /> {siteData.brand.instagram}</a>
            <p className="flex items-center gap-3"><MapPin size={19} /> {siteData.brand.location} · {siteData.brand.locationDetail}</p>
          </div>
        </div>
        <div className="reveal rounded-[1.75rem] border border-line bg-canvas p-6 shadow-soft md:p-9"><ContactForm /></div>
      </div>
    </main>
  );
}
