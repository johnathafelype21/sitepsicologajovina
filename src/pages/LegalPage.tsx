import { legalCopy } from '../data/mockData';

export interface LegalPageProps {
  readonly type: 'privacy' | 'terms';
}

export default function LegalPage({ type }: Readonly<LegalPageProps>) {
  const isPrivacy = type === 'privacy';
  return (
    <main className="bg-canvas py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <p className="eyebrow">DOCUMENTO LEGAL</p>
        <h1 className="mt-5 font-display text-[clamp(3rem,6vw,5rem)] leading-tight tracking-[-0.04em] text-olive">{isPrivacy ? 'Política de Privacidade' : 'Termos de Uso'}</h1>
        <div className="mt-8 border-l border-caramel/40 pl-6">
          <p className="text-base leading-8 text-umber/68">{isPrivacy ? legalCopy.privacy : legalCopy.terms}</p>
        </div>
      </div>
    </main>
  );
}
