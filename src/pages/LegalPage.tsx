import { legalCopy } from '../data/mockData';

export interface LegalPageProps {
  readonly type: 'privacy' | 'terms';
}

export default function LegalPage({ type }: Readonly<LegalPageProps>) {
  const isPrivacy = type === 'privacy';
  return (
    <main className="bg-canvas py-20 dark:bg-dark-canvas">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-caramel">DOCUMENTO LEGAL</p>
        <h1 className="mt-4 font-display text-4xl text-olive dark:text-dark-text">{isPrivacy ? 'Política de Privacidade' : 'Termos de Uso'}</h1>
        <p className="mt-6 text-base leading-7 text-umber/70 dark:text-dark-muted">{isPrivacy ? legalCopy.privacy : legalCopy.terms}</p>
      </div>
    </main>
  );
}
