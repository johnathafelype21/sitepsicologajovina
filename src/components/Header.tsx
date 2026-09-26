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
    <header className={`sticky top-0 z-40 border-b border-line/70 bg-canvas/95 backdrop-blur-2xl ${className}`}>
      <div className="mx-auto flex h-[64px] sm:h-[80px] max-w-[1320px] items-center justify-between px-3 sm:px-6 lg:px-10">
        <div className="min-w-0 shrink">
          <Logo variant="horizontal" size="md" />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
          {siteData.navigation.slice(0, 5).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative py-2 text-[12px] font-medium transition after:absolute after:bottom-0 after:left-0 after:h-px after:bg-caramel after:transition-all ${
                  isActive
                    ? 'text-olive after:w-full font-semibold'
                    : 'text-umber/65 after:w-0 hover:text-olive hover:after:w-full'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3 ml-2">
          {/* Direct WhatsApp CTA Button */}
          <a
            href={buildUrl()}
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir WhatsApp"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-[#25D366]/20 transition-all hover:bg-[#20bd5a] hover:scale-105 active:scale-95"
          >
            <WhatsAppIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-white" />
            <span className="hidden min-[360px]:inline">WhatsApp</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={menu.toggle}
            aria-label={menu.open ? 'Fechar menu' : 'Abrir menu'}
            className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-line text-olive transition-colors hover:bg-[#EFE8DD] active:scale-95 lg:hidden"
          >
            {menu.open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menu.open && (
        <div className="border-t border-line bg-canvas/98 px-4 py-5 shadow-2xl backdrop-blur-2xl lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="mx-auto flex max-w-md flex-col gap-1.5" aria-label="Menu mobile">
            {siteData.navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={menu.close}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition ${
                    isActive
                      ? 'bg-olive text-canvas font-semibold'
                      : 'text-umber hover:bg-surface active:bg-surface'
                  }`
                }
              >
                <span>{item.label}</span>
                <span className="text-xs opacity-50">→</span>
              </NavLink>
            ))}

            <a
              href={buildUrl()}
              target="_blank"
              rel="noreferrer"
              onClick={menu.close}
              className="button-primary mt-3 w-full justify-center !py-3.5 shadow-md shadow-[#2D3B2D]/15"
            >
              <WhatsAppIcon className="h-4 w-4 fill-white" /> Iniciar conversa no WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
