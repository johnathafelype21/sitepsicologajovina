export interface ChapterRailProps {
  readonly items: readonly string[];
  readonly active?: number;
}

export default function ChapterRail({ items, active = 0 }: Readonly<ChapterRailProps>) {
  return (
    <ol className="chapter-rail" aria-label="Etapas">
      {items.map((item, index) => (
        <li key={item} className={index === active ? 'is-active' : ''}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <p>{item}</p>
        </li>
      ))}
    </ol>
  );
}
