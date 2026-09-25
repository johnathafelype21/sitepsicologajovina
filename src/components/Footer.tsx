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
      <div className={`mx-auto max-w-[1240px] px-5 lg:px-8 ${compact ? 'py-10' : 'py-16'}`}>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_.7fr_.8fr]">
          <div>
            <Logo inverted />
            <p className="mt-7 max-w-md font-display text-2xl italic leading-relaxed text-canvas/82">“{siteData.brand.phrase}”</p>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-caramel">Navegação</p>
            <div className="mt-5 grid gap-2.5 text-sm text-canvas/62">
              {siteData.navigation.slice(0,5).map((item) => <Link key={item.to} to={item.to} className="w-fit transition hover:text-canvas">{item.label}</Link>)}
            </div>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-caramel">Contato</p>
            <div className="mt-5 space-y-4 text-sm text-canvas/62">
              <a href={siteData.brand.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-canvas"><Instagram size={15} /> {siteData.brand.instagram}</a>
              <a href={`https://wa.me/${siteData.brand.whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-canvas"><WhatsAppIcon className="h-[15px] w-[15px]" /> {siteData.brand.whatsappDisplay}</a>
              <p className="flex items-center gap-2"><MapPin size={15} /> {siteData.brand.location}</p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11px] text-canvas/42 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Jovina Diniz. Todos os direitos reservados.</span>
          <div className="flex gap-5"><Link to="/politica-de-privacidade" className="hover:text-canvas">Privacidade</Link><Link to="/termos-de-uso" className="hover:text-canvas">Termos</Link></div>
        </div>
      </div>
    </footer>
  );
}
