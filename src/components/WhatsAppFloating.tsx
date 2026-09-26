import { useWhatsApp } from '../hooks/useWhatsApp';
import WhatsAppIcon from './WhatsAppIcon';

export interface WhatsAppFloatingProps {
  readonly message?: string;
}

export default function WhatsAppFloating({ message }: Readonly<WhatsAppFloatingProps>) {
  const { buildUrl } = useWhatsApp({ defaultMessage: message });

  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-5 right-4 z-50 sm:bottom-7 sm:right-7 pointer-events-auto"
    >
      <a
        href={buildUrl(message)}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir conversa no WhatsApp"
        className="group relative flex h-[50px] w-[50px] sm:h-[56px] sm:w-[56px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[#20bd5a] hover:shadow-[0_8px_24px_rgba(37,211,102,0.45)] active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        {/* Soft subtle glow */}
        <span
          className="pointer-events-none absolute -inset-1 -z-10 animate-ping rounded-full bg-[#25D366] opacity-20 duration-1000"
          aria-hidden="true"
        />
        <WhatsAppIcon className="h-[27px] w-[27px] sm:h-[30px] sm:w-[30px] fill-white transition-transform duration-300 group-hover:scale-105" />
      </a>
    </aside>
  );
}
