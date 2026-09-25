const tones = ['olive','cream','terracotta','charcoal'] as const;

export interface MentoringStackProps {
  readonly pillars: readonly (readonly [string, string])[];
}

export default function MentoringStack({ pillars }: Readonly<MentoringStackProps>) {
  return (
    <div className="mentoring-stack-v3">
      {pillars.map(([title, text], index) => (
        <article
          key={title}
          className={`mentoring-stack-card mentoring-stack-${tones[index]}`}
          style={{ '--stack-index': index } as React.CSSProperties}
        >
          <div className="mentoring-stack-meta">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <em>{['Reconhecer', 'Organizar', 'Escolher', 'Sustentar'][index]}</em>
          </div>
          <div className="mentoring-stack-body">
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
          <div className="mentoring-stack-mark" aria-hidden="true"><i /><b /></div>
        </article>
      ))}
    </div>
  );
}
