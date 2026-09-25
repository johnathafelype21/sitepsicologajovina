import { FormEvent, useState } from 'react';
import { useWhatsApp } from '../hooks/useWhatsApp';
import WhatsAppIcon from './WhatsAppIcon';

export interface ContactFormProps {
  readonly context?: 'contact' | 'company';
}

export default function ContactForm({ context = 'contact' }: Readonly<ContactFormProps>) {
  const { openWhatsApp } = useWhatsApp();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const entries = Array.from(data.entries())
      .filter(([, value]) => String(value).trim())
      .map(([key, value]) => `${key}: ${String(value).trim()}`)
      .join('\n');

    const subject = context === 'company'
      ? 'Olá, Jovina. Gostaria de solicitar uma proposta para empresa.'
      : 'Olá, Jovina. Gostaria de conversar sobre atendimento.';

    setSubmitted(true);
    openWhatsApp(`${subject}\n\n${entries}`);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-line bg-surface p-6 shadow-soft dark:border-white/10 dark:bg-dark-surface md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm text-umber dark:text-dark-text">
          Nome
          <input name="Nome" required className="mt-2 w-full rounded-md border border-line bg-canvas px-4 py-3 outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/15 dark:border-white/10 dark:bg-dark-canvas dark:text-dark-text" />
        </label>
        {context === 'company' ? (
          <label className="text-sm text-umber dark:text-dark-text">
            Empresa
            <input name="Empresa" required className="mt-2 w-full rounded-md border border-line bg-canvas px-4 py-3 outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/15 dark:border-white/10 dark:bg-dark-canvas dark:text-dark-text" />
          </label>
        ) : (
          <label className="text-sm text-umber dark:text-dark-text">
            WhatsApp
            <input name="WhatsApp" required inputMode="tel" className="mt-2 w-full rounded-md border border-line bg-canvas px-4 py-3 outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/15 dark:border-white/10 dark:bg-dark-canvas dark:text-dark-text" />
          </label>
        )}
        <label className="text-sm text-umber dark:text-dark-text">
          E-mail
          <input name="Email" type="email" required className="mt-2 w-full rounded-md border border-line bg-canvas px-4 py-3 outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/15 dark:border-white/10 dark:bg-dark-canvas dark:text-dark-text" />
        </label>
        {context === 'company' ? (
          <label className="text-sm text-umber dark:text-dark-text">
            Telefone
            <input name="Telefone" inputMode="tel" className="mt-2 w-full rounded-md border border-line bg-canvas px-4 py-3 outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/15 dark:border-white/10 dark:bg-dark-canvas dark:text-dark-text" />
          </label>
        ) : (
          <label className="text-sm text-umber dark:text-dark-text">
            Tipo de atendimento
            <select name="Tipo de atendimento" className="mt-2 w-full rounded-md border border-line bg-canvas px-4 py-3 outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/15 dark:border-white/10 dark:bg-dark-canvas dark:text-dark-text">
              <option>Terapia individual</option>
              <option>Mentoria</option>
              <option>Grupo</option>
              <option>Palestra / empresa</option>
            </select>
          </label>
        )}
      </div>

      <label className="mt-5 block text-sm text-umber dark:text-dark-text">
        Mensagem
        <textarea name="Mensagem" rows={5} required className="mt-2 w-full resize-y rounded-md border border-line bg-canvas px-4 py-3 outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/15 dark:border-white/10 dark:bg-dark-canvas dark:text-dark-text" />
      </label>

      <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-md bg-olive px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-canvas transition hover:bg-olive-deep dark:bg-canvas dark:text-olive">
        <WhatsAppIcon className="h-4 w-4" />
        {context === 'company' ? 'Solicitar proposta' : 'Enviar pelo WhatsApp'}
      </button>
      {submitted && <p className="mt-3 text-xs text-olive dark:text-bronze">Abrimos o WhatsApp com sua mensagem pronta para envio.</p>}
    </form>
  );
}
