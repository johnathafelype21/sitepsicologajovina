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
      {overline && <p className={`eyebrow mb-4 ${light ? '!text-caramel' : ''}`}>{overline}</p>}
      <h2 className={`font-display text-[clamp(2.4rem,4.8vw,4.5rem)] leading-[1.02] tracking-[-0.04em] ${light ? 'text-canvas' : 'text-olive'}`}>
        {title}
      </h2>
      {text && <p className={`mt-5 max-w-2xl text-base leading-8 ${centered ? 'mx-auto' : ''} ${light ? 'text-canvas/65' : 'text-umber/65'}`}>{text}</p>}
    </div>
  );
}
