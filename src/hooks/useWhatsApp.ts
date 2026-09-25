import { useCallback } from 'react';
import { siteData } from '../data/mockData';

export interface UseWhatsAppProps {
  readonly defaultMessage?: string;
}

export function useWhatsApp({ defaultMessage = 'Olá, Jovina. Gostaria de saber mais sobre o atendimento.' }: Readonly<UseWhatsAppProps> = {}) {
  const buildUrl = useCallback((message?: string) => {
    const text = encodeURIComponent(message || defaultMessage);
    return `https://wa.me/${siteData.brand.whatsappNumber}?text=${text}`;
  }, [defaultMessage]);

  const openWhatsApp = useCallback((message?: string) => {
    window.open(buildUrl(message), '_blank', 'noopener,noreferrer');
  }, [buildUrl]);

  return { buildUrl, openWhatsApp };
}
