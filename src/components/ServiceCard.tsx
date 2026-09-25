import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ServiceItem } from '../data/mockData';

export interface ServiceCardProps {
  readonly item: ServiceItem;
}

export default function ServiceCard({ item }: Readonly<ServiceCardProps>) {
  return (
    <article className="depth-card rounded-xl border border-line bg-surface p-7 shadow-soft dark:border-white/10 dark:bg-dark-surface">
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-terracotta dark:text-bronze">{item.overline}</p>
      <h3 className="mt-5 font-display text-2xl text-olive dark:text-dark-text">{item.title}</h3>
      <p className="mt-4 text-sm leading-6 text-umber/72 dark:text-dark-muted">{item.text}</p>
      <Link to={item.to} className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-umber hover:text-caramel dark:text-dark-text dark:hover:text-bronze">
        Saiba mais <ArrowUpRight size={14} />
      </Link>
    </article>
  );
}
