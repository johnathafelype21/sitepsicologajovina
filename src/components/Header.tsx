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
    <header className={`sticky top-0 z-50 border-b border-line/80 bg-canvas/95 backdrop-blur-xl dark:border-white/10 dark:bg-dark-canvas/95 ${className}`}>
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {siteData.navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-[13px] font-medium transition ${isActive ? 'text-caramel dark:text-bronze' : 'text-umber/80 hover:text-olive dark:text-dark-muted dark:hover:text-dark-text'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={buildUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-olive px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-canvas transition hover:bg-olive-deep dark:bg-canvas dark:text-olive dark:hover:bg-surface"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Agendar atendimento
          </a>
        </div>
        <button
          type="button"
          onClick={menu.toggle}
          aria-label={menu.open ? 'Fechar menu' : 'Abrir menu'}
          className="grid h-11 w-11 place-items-center rounded-md border border-line text-olive dark:border-white/10 dark:text-dark-text lg:hidden"
        >
          {menu.open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menu.open && (
        <div className="border-t border-line bg-canvas px-5 py-5 dark:border-white/10 dark:bg-dark-canvas lg:hidden">
          <nav className="mx-auto flex max-w-[1240px] flex-col gap-1" aria-label="Menu mobile">
            {siteData.navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={menu.close}
                className="rounded-md px-3 py-3 text-sm font-medium text-umber hover:bg-surface dark:text-dark-text dark:hover:bg-dark-surface"
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href={buildUrl()}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-md bg-olive px-4 py-3 text-sm font-semibold text-canvas dark:bg-canvas dark:text-olive"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Agendar pelo WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
