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
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-surface p-5 sm:p-7 md:p-8 shadow-soft"
    >
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <label className="text-xs sm:text-sm font-medium text-umber">
          Nome completo
          <input
            name="Nome"
            required
            placeholder="Seu nome"
            className="mt-1.5 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-base sm:text-sm text-umber outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/15"
          />
        </label>

        {context === 'company' ? (
          <label className="text-xs sm:text-sm font-medium text-umber">
            Empresa / Organização
            <input
              name="Empresa"
              required
              placeholder="Nome da sua empresa"
              className="mt-1.5 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-base sm:text-sm text-umber outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/15"
            />
          </label>
        ) : (
          <label className="text-xs sm:text-sm font-medium text-umber">
            WhatsApp (com DDD)
            <input
              name="WhatsApp"
              required
              inputMode="tel"
              placeholder="(11) 99999-9999"
              className="mt-1.5 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-base sm:text-sm text-umber outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/15"
            />
          </label>
        )}

        <label className="text-xs sm:text-sm font-medium text-umber">
          E-mail
          <input
            name="Email"
            type="email"
            required
            placeholder="seu@email.com"
            className="mt-1.5 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-base sm:text-sm text-umber outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/15"
          />
        </label>

        {context === 'company' ? (
          <label className="text-xs sm:text-sm font-medium text-umber">
            Telefone para contato
            <input
              name="Telefone"
              inputMode="tel"
              placeholder="(11) 99999-9999"
              className="mt-1.5 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-base sm:text-sm text-umber outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/15"
            />
          </label>
        ) : (
          <label className="text-xs sm:text-sm font-medium text-umber">
            Tipo de atendimento
            <select
              name="Tipo de atendimento"
              className="mt-1.5 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-base sm:text-sm text-umber outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/15"
            >
              <option>Terapia individual</option>
              <option>Mentoria para novos ciclos</option>
              <option>Atendimento para empresas / grupos</option>
            </select>
          </label>
        )}
      </div>

      <label className="mt-4 sm:mt-5 block text-xs sm:text-sm font-medium text-umber">
        Como posso te apoiar hoje? (Breve mensagem)
        <textarea
          name="Mensagem"
          rows={4}
          required
          placeholder="Compartilhe brevemente o que você está buscando..."
          className="mt-1.5 w-full resize-y rounded-xl border border-line bg-canvas px-4 py-3 text-base sm:text-sm text-umber outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/15"
        />
      </label>

      <button
        type="submit"
        className="button-primary mt-6 w-full sm:w-auto justify-center !py-3.5 shadow-lg shadow-[#2D3B2D]/15 active:scale-98"
      >
        <WhatsAppIcon className="h-4 w-4" />
        {context === 'company' ? 'Solicitar proposta no WhatsApp' : 'Enviar pelo WhatsApp'}
      </button>

      {submitted && (
        <div className="mt-4 rounded-xl border border-[#C08A4E]/30 bg-[#FDF8F3] p-4 text-xs sm:text-sm font-medium text-[#7A4B1A]">
          ✓ Abrimos o WhatsApp com sua mensagem preenchida pronta para envio.
        </div>
      )}
    </form>
  );
}
