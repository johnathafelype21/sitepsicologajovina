import { Instagram, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/mockData';
import Logo from './Logo';
import WhatsAppIcon from './WhatsAppIcon';

export interface FooterProps {
  readonly compact?: boolean;
}

export default function Footer({ compact = false }: Readonly<FooterProps>) {
  return (
    <footer className="bg-umber text-canvas">
      <div className={`mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 ${compact ? 'py-8 sm:py-10' : 'py-12 sm:py-16'}`}>
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.3fr_.7fr_.8fr]">
          <div>
            <Logo inverted variant="horizontal" size="md" />
            <p className="mt-5 sm:mt-7 max-w-md font-display text-xl sm:text-2xl italic leading-relaxed text-canvas/80">
              “{siteData.brand.phrase}”
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-caramel">Navegação</p>
            <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-2 text-sm text-canvas/65 sm:grid-cols-1 sm:gap-2.5">
              {siteData.navigation.slice(0, 6).map((item) => (
                <Link key={item.to} to={item.to} className="w-fit py-1 transition hover:text-canvas">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-caramel">Contato</p>
            <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4 text-sm text-canvas/65">
              <a
                href={siteData.brand.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 py-1 transition hover:text-canvas"
              >
                <Instagram size={16} /> {siteData.brand.instagram}
              </a>
              <a
                href={`https://wa.me/${siteData.brand.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 py-1 transition hover:text-canvas"
              >
                <WhatsAppIcon className="h-4 w-4" /> {siteData.brand.whatsappDisplay}
              </a>
              <p className="flex items-center gap-2.5 py-1">
                <MapPin size={16} /> {siteData.brand.location}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] text-canvas/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Jovina Diniz. Todos os direitos reservados.</span>
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <Link to="/politica-de-privacidade" className="hover:text-canvas">
              Privacidade
            </Link>
            <Link to="/termos-de-uso" className="hover:text-canvas">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
