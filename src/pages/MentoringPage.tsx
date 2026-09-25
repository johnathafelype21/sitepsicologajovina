import CTASection from '../components/CTASection';
import SectionHeading from '../components/SectionHeading';
import { useReveal } from '../hooks/useReveal';

export interface MentoringPageProps {
  readonly className?: string;
}

export default function MentoringPage({ className = '' }: Readonly<MentoringPageProps>) {
  useReveal();
  const pillars = [
    ['Identidade', 'Reconhecer quem você é para além de papéis, expectativas e ciclos antigos.'],
    ['Clareza', 'Organizar pensamentos, prioridades e decisões com mais consciência.'],
    ['Direção', 'Transformar percepção em escolhas concretas para o momento atual.'],
    ['Novos ciclos', 'Construir caminhos mais coerentes com a vida que você deseja sustentar.'],
  ];

  return (
    <main className={className}>
      <section className="bg-canvas-soft py-20 dark:bg-dark-canvas">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="reveal max-w-3xl">
            <SectionHeading overline="DESENVOLVIMENTO & NOVOS CICLOS" title="Mentoria para Mulheres" text="Um processo direcionado para mulheres que desejam ganhar clareza, fortalecer a identidade e construir novos caminhos." />
          </div>
        </div>
      </section>

      <section className="bg-canvas py-20 dark:bg-dark-canvas">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {pillars.map(([title, text]) => (
              <article key={title} className="reveal rounded-xl border border-line bg-surface p-7 shadow-soft dark:border-white/10 dark:bg-dark-surface">
                <h3 className="font-display text-2xl text-olive dark:text-dark-text">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-umber/70 dark:text-dark-muted">{text}</p>
              </article>
            ))}
          </div>
          <div className="reveal mt-12 rounded-xl bg-olive p-8 text-canvas dark:bg-dark-surface md:p-10">
            <h2 className="font-display text-3xl">Mentoria e terapia não são a mesma coisa.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-canvas/75">A mentoria é mais direcionada a clareza, identidade, escolhas e desenvolvimento. A terapia é um espaço de elaboração emocional e compreensão de padrões, relações e experiências. O formato mais adequado pode ser conversado no primeiro contato.</p>
          </div>
        </div>
      </section>

      <CTASection title="Quer entender se a mentoria faz sentido para você?" text="Converse diretamente pelo WhatsApp e explique brevemente o momento que você está vivendo." />
    </main>
  );
}
