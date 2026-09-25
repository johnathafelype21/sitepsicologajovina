import { Instagram, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import SectionHeading from '../components/SectionHeading';
import { siteData } from '../data/mockData';
import WhatsAppIcon from '../components/WhatsAppIcon';

export interface ContactPageProps {
  readonly className?: string;
}

export default function ContactPage({ className = '' }: Readonly<ContactPageProps>) {
  return (
    <main className={`bg-canvas py-20 dark:bg-dark-canvas ${className}`}>
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 lg:grid-cols-[.75fr_1.25fr] lg:px-8">
        <div>
          <SectionHeading overline="CONTATO & AGENDAMENTO" title="Vamos conversar?" text="Escolha o canal que for mais confortável. O WhatsApp é o caminho mais rápido para iniciar." />
          <div className="mt-8 space-y-4 text-sm text-umber/70 dark:text-dark-muted">
            <a href={`https://wa.me/${siteData.brand.whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-olive dark:hover:text-dark-text">
              <WhatsAppIcon className="h-5 w-5" /> {siteData.brand.whatsappDisplay}
            </a>
            <a href={siteData.brand.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-olive dark:hover:text-dark-text">
              <Instagram size={19} /> {siteData.brand.instagram}
            </a>
            <p className="flex items-center gap-3"><MapPin size={19} /> {siteData.brand.location} · {siteData.brand.locationDetail}</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
