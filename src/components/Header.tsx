import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { siteData } from '../data/mockData';
import { useMobileMenu } from '../hooks/useMobileMenu';
import { useWhatsApp } from '../hooks/useWhatsApp';
import Logo from './Logo';
import WhatsAppIcon from './WhatsAppIcon';

export interface HeaderProps {
  readonly className?: string;
}

export default function Header({ className = '' }: Readonly<HeaderProps>) {
  const menu = useMobileMenu();
  const { buildUrl } = useWhatsApp({ defaultMessage: 'Olá, Jovina. Gostaria de agendar um atendimento.' });

  return (
    <header className={`sticky top-0 z-50 border-b border-line/70 bg-canvas/90 backdrop-blur-2xl ${className}`}>
      <div className="mx-auto flex h-[82px] max-w-[1320px] items-center justify-between px-5 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
          {siteData.navigation.slice(0, 5).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative py-2 text-[12px] font-medium transition after:absolute after:bottom-0 after:left-0 after:h-px after:bg-caramel after:transition-all ${isActive ? 'text-olive after:w-full' : 'text-umber/65 after:w-0 hover:text-olive hover:after:w-full'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <a href={buildUrl()} target="_blank" rel="noreferrer" className="button-primary !px-4 !py-2.5 hidden lg:inline-flex">
          <WhatsAppIcon className="h-4 w-4" />
          Agendar
        </a>
        <button type="button" onClick={menu.toggle} aria-label={menu.open ? 'Fechar menu' : 'Abrir menu'} className="grid h-11 w-11 place-items-center rounded-full border border-line text-olive lg:hidden">
          {menu.open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menu.open && (
        <div className="border-t border-line bg-canvas px-5 py-5 lg:hidden">
          <nav className="mx-auto flex max-w-[1240px] flex-col gap-1" aria-label="Menu mobile">
            {siteData.navigation.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={menu.close} className="rounded-xl px-4 py-3 text-sm font-medium text-umber hover:bg-surface">
                {item.label}
              </NavLink>
            ))}
            <a href={buildUrl()} target="_blank" rel="noreferrer" className="button-primary mt-3 justify-center">
              <WhatsAppIcon className="h-4 w-4" /> Agendar pelo WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
