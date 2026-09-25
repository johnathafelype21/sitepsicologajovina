import FAQList from '../components/FAQList';
import SectionHeading from '../components/SectionHeading';
import { siteData } from '../data/mockData';

export interface FAQPageProps {
  readonly className?: string;
}

export default function FAQPage({ className = '' }: Readonly<FAQPageProps>) {
  return (
    <main className={`bg-canvas py-20 dark:bg-dark-canvas ${className}`}>
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeading overline="DÚVIDAS FREQUENTES" title="Perguntas antes de começar" text="Informações gerais para facilitar seu primeiro contato." centered />
        <div className="mt-10"><FAQList items={siteData.faq} /></div>
      </div>
    </main>
  );
}
