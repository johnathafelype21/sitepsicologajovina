import { useState, type FormEvent } from 'react';
import { ArrowUpRight, LockKeyhole, MessageCircleHeart } from 'lucide-react';
import { useWhatsApp } from '../hooks/useWhatsApp';

const inputClass = 'mt-2 w-full min-h-12 rounded-xl border border-olive/15 bg-white px-4 py-3 text-base text-umber outline-none transition-colors placeholder:text-umber/35 focus:border-caramel focus:ring-2 focus:ring-caramel/15';
const labelClass = 'block text-sm font-semibold text-olive';

export default function InitialCareForm() {
  const { buildUrl } = useWhatsApp();
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [occupation, setOccupation] = useState('');
  const [reason, setReason] = useState('');
  const [period, setPeriod] = useState('');
  const [consent, setConsent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) return;

    const message = [
      'Olá, Jovina! Gostaria de saber os valores e horários disponíveis para terapia.',
      '',
      '*Informações para o primeiro contato:*',
      '1. Idade: ' + age.trim(),
      'Cidade: ' + city.trim(),
      '2. Ocupação: ' + occupation.trim(),
      '3. O que me fez procurar terapia agora: ' + (reason.trim() || 'Prefiro conversar diretamente.'),
      '4. Período de preferência: ' + period,
      '',
      'Aguardo informações sobre valores e disponibilidade. Obrigada!'
    ].join('\n');

    // Não há backend ou armazenamento: os dados são enviados somente quando
    // a visitante confirma a abertura do WhatsApp.
    window.location.href = buildUrl(message);
  }

  return (
    <section id="pre-atendimento" aria-labelledby="pre-atendimento-title" className="relative overflow-hidden bg-[#FCFAF7] py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -left-36 top-12 h-80 w-80 rounded-full border border-caramel/20" />
      <div className="relative mx-auto grid max-w-[1180px] items-start gap-10 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div className="motion-left lg:sticky lg:top-28">
          <p className="eyebrow">PRIMEIRO CONTATO</p>
          <h2 id="pre-atendimento-title" className="mt-5 font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.04] tracking-[-0.04em] text-olive">
            Antes de começarmos, <span className="italic text-caramel">quero conhecer um pouquinho de você.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-8 text-umber/75">
            Responda algumas perguntas rápidas para que eu possa orientar você sobre os horários e valores disponíveis no momento.
          </p>
          <div className="mt-9 flex items-start gap-3 border-l-2 border-caramel/55 pl-5">
            <LockKeyhole aria-hidden="true" size={18} className="mt-1 shrink-0 text-caramel" />
            <p className="text-sm leading-7 text-umber/70">
              Suas respostas não ficam salvas neste site. Ao continuar, você será direcionada ao WhatsApp, onde poderá revisar a mensagem antes de enviá-la.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="motion-right rounded-[1.6rem] border border-olive/10 bg-[#F5EFE7] p-5 shadow-lg shadow-olive/5 sm:p-9">
          <div className="flex items-center justify-between gap-3 border-b border-olive/10 pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-caramel">Pré-atendimento</p>
              <h3 className="mt-2 font-display text-2xl text-olive sm:text-3xl">Vamos conversar?</h3>
            </div>
            <MessageCircleHeart aria-hidden="true" size={32} className="shrink-0 text-olive/65" />
          </div>

          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="care-age" className={labelClass}>01. Qual é a sua idade?</label>
              <input id="care-age" name="age" type="number" min="18" max="120" required value={age} onChange={(e) => setAge(e.target.value)} placeholder="Ex.: 32" className={inputClass} />
            </div>
            <div>
              <label htmlFor="care-city" className={labelClass}>Em qual cidade você mora?</label>
              <input id="care-city" name="city" type="text" required maxLength={100} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ex.: São Paulo – SP" className={inputClass} />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="care-occupation" className={labelClass}>02. Com o que você trabalha ou qual é sua ocupação atualmente?</label>
            <input id="care-occupation" name="occupation" type="text" required maxLength={180} value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="Sua profissão ou ocupação" className={inputClass} />
          </div>

          <div className="mt-6">
            <label htmlFor="care-reason" className={labelClass}>03. O que fez você procurar terapia neste momento?</label>
            <textarea id="care-reason" name="reason" rows={4} maxLength={1200} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Compartilhe apenas o que se sentir confortável em contar..." className={inputClass + ' resize-y'} />
            <p className="mt-2 text-xs leading-5 text-umber/60">Opcional. Se preferir, você pode conversar sobre isso diretamente com a Jovina.</p>
          </div>

          <fieldset className="mt-6">
            <legend className={labelClass}>04. Qual período é melhor para você?</legend>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {['Manhã', 'Tarde', 'Noite', 'A combinar'].map((option) => (
                <label key={option} className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-2 py-3 text-center text-sm font-medium transition-colors ${period === option ? 'border-olive bg-olive text-white' : 'border-olive/15 bg-white text-olive hover:border-caramel/60'}`}>
                  <input type="radio" name="period" value={option} required checked={period === option} onChange={() => setPeriod(option)} className="sr-only" />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="mt-7 flex cursor-pointer items-start gap-3 text-sm leading-6 text-umber/75">
            <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#2D3B2D]" />
            <span>Concordo em encaminhar essas informações por WhatsApp para solicitar orientações sobre atendimento, valores e disponibilidade.</span>
          </label>
          <button type="submit" className="button-primary mt-7 w-full min-h-14 text-center">
            Continuar pelo WhatsApp <ArrowUpRight aria-hidden="true" size={17} />
          </button>
          <p className="mt-4 text-center text-xs leading-5 text-umber/60">O formulário não confirma uma reserva. Horários e valores são informados diretamente pela profissional.</p>
        </form>
      </div>
    </section>
  );
}
