import { useWhatsApp } from '../hooks/useWhatsApp';
import WhatsAppIcon from './WhatsAppIcon';

export interface WhatsAppFloatingProps {
  readonly message?: string;
}

export default function WhatsAppFloating({ message }: Readonly<WhatsAppFloatingProps>) {
  const { buildUrl } = useWhatsApp({ defaultMessage: message });

  return (
    <a
      href={buildUrl(message)}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-[52px] items-center gap-2 rounded-full border border-bronze/30 bg-olive px-4 text-xs font-semibold text-canvas shadow-float transition hover:-translate-y-1 hover:bg-olive-deep dark:bg-canvas dark:text-olive"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
