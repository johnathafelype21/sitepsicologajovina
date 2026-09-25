export interface TherapyBentoProps {
  readonly topics: readonly string[];
}

const accent = ['soft','outline','warm','tall','wide','dark','soft','outline'];

export default function TherapyBento({ topics }: Readonly<TherapyBentoProps>) {
  return (
    <div className="therapy-bento-v3">
      {topics.map((topic, index) => (
        <article
          key={topic}
          className={`therapy-bento-item therapy-bento-${index + 1} therapy-bento-${accent[index]} motion-${index % 3 === 0 ? 'left' : index % 3 === 1 ? 'rise' : 'right'}`}
        >
          <span className="therapy-bento-number">{String(index + 1).padStart(2, '0')}</span>
          <div className="therapy-bento-symbol" aria-hidden="true">
            <i /><b />
          </div>
          <h3>{topic}</h3>
          {index === 0 && <p>Quando a mente não encontra descanso, o corpo e as relações também sentem.</p>}
          {index === 4 && <p>Dar sentido ao que aconteceu pode abrir espaço para viver de outro modo.</p>}
          {index === 7 && <p>Autoconhecimento não é um fim: é uma forma mais consciente de escolher.</p>}
        </article>
      ))}
    </div>
  );
}
