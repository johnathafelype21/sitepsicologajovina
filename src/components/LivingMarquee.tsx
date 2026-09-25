const words = ['Terapia', 'Identidade', 'Presença', 'Clareza', 'Direção', 'Novos ciclos'];

export default function LivingMarquee() {
  const sequence = [...words, ...words, ...words];
  return (
    <section className="living-marquee" aria-label="Temas do trabalho">
      <div className="living-marquee-fade living-marquee-fade-left" />
      <div className="living-marquee-fade living-marquee-fade-right" />
      <div className="living-marquee-perspective">
        <div className="living-marquee-track">
          {sequence.map((word, index) => (
            <span key={`${word}-${index}`} className="living-marquee-item">
              <em>{word}</em><i aria-hidden="true">✦</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
