import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ServiceItem } from '../data/mockData';

export interface ServiceCardProps {
  readonly item: ServiceItem;
  readonly index?: number;
}

export default function ServiceCard({ item, index = 1 }: Readonly<ServiceCardProps>) {
  return (
    <article className="group h-full min-h-[340px] p-8 transition duration-300 hover:bg-surface md:p-9">
      <div className="flex items-start justify-between">
        <span className="font-display text-3xl italic text-caramel/55">{String(index).padStart(2, '0')}</span>
        <ArrowUpRight className="text-olive/30 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-caramel" size={20} />
      </div>
      <p className="mt-12 text-[9px] font-semibold uppercase tracking-[0.17em] text-terracotta">{item.overline}</p>
      <h3 className="mt-4 max-w-[250px] font-display text-3xl leading-tight text-olive">{item.title}</h3>
      <p className="mt-4 max-w-[300px] text-sm leading-7 text-umber/62">{item.text}</p>
      <Link to={item.to} className="text-link mt-7">
        Saiba mais <ArrowUpRight size={14} />
      </Link>
    </article>
  );
}
