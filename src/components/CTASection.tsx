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
    <section className="bg-[#FBE3D8] py-20 dark:bg-dark-surface">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <div className="mx-auto mb-5 h-px w-10 bg-caramel" />
        <h2 className="font-display text-4xl leading-tight text-olive dark:text-dark-text">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-umber/70 dark:text-dark-muted">{text}</p>
        <a
          href={buildUrl()}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-olive px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-canvas transition hover:bg-olive-deep dark:bg-canvas dark:text-olive"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Falar no WhatsApp
        </a>
      </div>
    </section>
  );
}
