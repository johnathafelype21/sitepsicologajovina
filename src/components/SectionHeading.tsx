export interface SectionHeadingProps {
  readonly overline?: string;
  readonly title: string;
  readonly text?: string;
  readonly centered?: boolean;
  readonly light?: boolean;
}

export default function SectionHeading({ overline, title, text, centered = false, light = false }: Readonly<SectionHeadingProps>) {
  const align = centered ? 'mx-auto text-center' : '';
  return (
    <div className={`max-w-3xl ${align}`}>
      {overline && (
        <p className={`mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] ${light ? 'text-caramel' : 'text-caramel dark:text-bronze'}`}>
          {overline}
        </p>
      )}
      <h2 className={`font-display text-3xl leading-tight tracking-[-0.02em] md:text-4xl ${light ? 'text-canvas' : 'text-olive dark:text-dark-text'}`}>
        {title}
      </h2>
      {text && <p className={`mt-4 text-base leading-7 ${light ? 'text-canvas/72' : 'text-umber/72 dark:text-dark-muted'}`}>{text}</p>}
    </div>
  );
}
