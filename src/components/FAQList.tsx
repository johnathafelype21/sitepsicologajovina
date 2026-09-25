import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '../data/mockData';

export interface FAQListProps {
  readonly items: readonly FaqItem[];
}

export default function FAQList({ items }: Readonly<FAQListProps>) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.question} className="group rounded-md border border-line bg-surface open:shadow-soft dark:border-white/10 dark:bg-dark-surface">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-lg text-umber dark:text-dark-text">
            {item.question}
            <ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" />
          </summary>
          <p className="px-5 pb-5 text-sm leading-6 text-umber/70 dark:text-dark-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
