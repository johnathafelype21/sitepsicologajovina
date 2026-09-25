import { ArrowRight } from 'lucide-react';
import { useWhatsApp } from '../hooks/useWhatsApp';
import WhatsAppIcon from './WhatsAppIcon';

export interface CTASectionProps {
  readonly title?: string;
  readonly text?: string;
}

export default function CTASection({
  title = 'Talvez seja hora de voltar para você.',
  text = 'Se você sente que precisa compreender melhor sua história e construir novos caminhos, podemos conversar.',
}: Readonly<CTASectionProps>) {
  const { buildUrl } = useWhatsApp({ defaultMessage: 'Olá, Jovina. Gostaria de conversar sobre um atendimento.' });

  return (
    <section className="relative overflow-hidden bg-[#EAD7C6] py-24">
      <div className="organic-orbit organic-orbit-a !border-umber/10" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1180px] items-end gap-10 px-5 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
        <div className="reveal">
          <p className="eyebrow !text-umber/55">PRÓXIMO PASSO</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(3rem,6vw,5.7rem)] leading-[.96] tracking-[-0.045em] text-olive">{title}</h2>
        </div>
        <div className="reveal lg:pb-2">
          <p className="max-w-xl text-base leading-8 text-umber/68">{text}</p>
          <a href={buildUrl()} target="_blank" rel="noreferrer" className="button-primary mt-7">
            <WhatsAppIcon className="h-4 w-4" /> Falar no WhatsApp <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
