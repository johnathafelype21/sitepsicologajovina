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
    <footer className="bg-umber text-canvas dark:bg-black/40 dark:text-dark-text">
      <div className={`mx-auto max-w-[1240px] px-5 lg:px-8 ${compact ? 'py-10' : 'py-14'}`}>
        <div className="grid gap-10 md:grid-cols-[1.1fr_.9fr_.9fr]">
          <div>
            <Logo inverted />
            <p className="mt-5 max-w-sm font-display text-lg italic leading-relaxed text-canvas/80 dark:text-dark-muted">
              “{siteData.brand.phrase}”
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-caramel">Navegação</p>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-canvas/75 dark:text-dark-muted">
              {siteData.navigation.map((item) => (
                <Link key={item.to} to={item.to} className="hover:text-canvas dark:hover:text-dark-text">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-caramel">Canais diretos</p>
            <div className="mt-4 space-y-3 text-sm text-canvas/75 dark:text-dark-muted">
              <a href={siteData.brand.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-canvas">
                <Instagram size={15} /> {siteData.brand.instagram}
              </a>
              <a href={`https://wa.me/${siteData.brand.whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-canvas">
                <WhatsAppIcon className="h-[15px] w-[15px]" /> {siteData.brand.whatsappDisplay}
              </a>
              <p className="flex items-center gap-2"><MapPin size={15} /> {siteData.brand.location}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-canvas/55 dark:text-dark-muted md:flex-row md:items-center md:justify-between">
          <span>© 2026 Jovina Diniz. Todos os direitos reservados.</span>
          <div className="flex gap-5">
            <Link to="/politica-de-privacidade" className="hover:text-canvas">Política de Privacidade</Link>
            <Link to="/termos-de-uso" className="hover:text-canvas">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
