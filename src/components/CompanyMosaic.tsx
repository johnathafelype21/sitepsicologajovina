import { ArrowUpRight } from 'lucide-react';

export interface CompanyMosaicProps {
  readonly topics: readonly string[];
}

export default function CompanyMosaic({ topics }: Readonly<CompanyMosaicProps>) {
  return (
    <div className="company-mosaic-v3">
      {topics.map((topic, index) => (
        <article key={topic} className={`company-tile company-tile-${index + 1} motion-${index % 2 ? 'right' : 'left'}`}>
          <span className="company-tile-index">{String(index + 1).padStart(2, '0')}</span>
          <div className="company-tile-line" aria-hidden="true" />
          <h3>{topic}</h3>
          <span className="company-tile-arrow" aria-hidden="true"><ArrowUpRight size={18}/></span>
        </article>
      ))}
    </div>
  );
}
