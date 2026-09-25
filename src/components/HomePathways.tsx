import { ArrowUpRight, Building2, Compass, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ServiceItem } from '../data/mockData';

export interface HomePathwaysProps {
  readonly items: readonly ServiceItem[];
}

export default function HomePathways({ items }: Readonly<HomePathwaysProps>) {
  const therapy = items[0];
  const mentoring = items[1];
  const companies = items[2];

  return (
    <div className="pathways-v3">
      <Link to={therapy.to} className="pathway-card pathway-therapy motion-left">
        <div className="pathway-therapy-orbit" aria-hidden="true" />
        <div className="pathway-topline">
          <span>01</span>
          <HeartHandshake size={22} />
        </div>
        <div className="pathway-therapy-art" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="pathway-copy">
          <p>{therapy.overline}</p>
          <h3>{therapy.title}</h3>
          <small>{therapy.text}</small>
          <strong>Conhecer terapia <ArrowUpRight size={15} /></strong>
        </div>
      </Link>

      <Link to={mentoring.to} className="pathway-card pathway-mentoring motion-rise">
        <div className="pathway-topline">
          <span>02</span>
          <Compass size={22} />
        </div>
        <div className="pathway-mentoring-rings" aria-hidden="true">
          <i /><i /><i /><b />
        </div>
        <div className="pathway-copy">
          <p>{mentoring.overline}</p>
          <h3>{mentoring.title}</h3>
          <small>{mentoring.text}</small>
          <strong>Explorar mentoria <ArrowUpRight size={15} /></strong>
        </div>
      </Link>

      <Link to={companies.to} className="pathway-card pathway-companies motion-right">
        <div className="pathway-company-grid" aria-hidden="true" />
        <div className="pathway-topline">
          <span>03</span>
          <Building2 size={22} />
        </div>
        <div className="pathway-company-stamp">B2B</div>
        <div className="pathway-copy">
          <p>{companies.overline}</p>
          <h3>{companies.title}</h3>
          <small>{companies.text}</small>
          <strong>Ver palestras e empresas <ArrowUpRight size={15} /></strong>
        </div>
      </Link>
    </div>
  );
}
