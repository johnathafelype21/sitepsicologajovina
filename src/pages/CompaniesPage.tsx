import ContactForm from '../components/ContactForm';
import SectionHeading from '../components/SectionHeading';
import { useReveal } from '../hooks/useReveal';

export interface CompaniesPageProps {
  readonly className?: string;
}

export default function CompaniesPage({ className = '' }: Readonly<CompaniesPageProps>) {
  useReveal();
  const topics = ['Identidade e presença', 'Autoestima e relações', 'Inteligência emocional', 'Desenvolvimento feminino', 'Comunicação', 'Fortalecimento de mulheres'];

  return (
    <main className={className}>
      <section className="bg-canvas-soft py-20 dark:bg-dark-canvas">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="reveal max-w-4xl">
            <SectionHeading overline="PALESTRAS & EMPRESAS" title="Experiências para mulheres dentro das organizações" text="Palestras, conversas e encontros pensados para contextos corporativos que desejam aprofundar desenvolvimento emocional, identidade e relações." />
          </div>
        </div>
      </section>

      <section className="bg-canvas py-20 dark:bg-dark-canvas">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <div key={topic} className="reveal rounded-xl border border-line bg-surface p-6 dark:border-white/10 dark:bg-dark-surface">
                <h3 className="font-display text-xl text-olive dark:text-dark-text">{topic}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FBE3D8] py-20 dark:bg-dark-surface">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div className="reveal">
            <SectionHeading overline="SOLICITAR PROPOSTA" title="Vamos conversar sobre o seu evento?" text="Envie as informações principais. Ao enviar, o WhatsApp será aberto com a mensagem organizada para facilitar o primeiro contato." />
          </div>
          <div className="reveal"><ContactForm context="company" /></div>
        </div>
      </section>
    </main>
  );
}
