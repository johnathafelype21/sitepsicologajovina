import { ArrowRight, ArrowUpRight, ChevronDown, Heart, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import CinematicScroll from '../components/CinematicScroll';
import EditorialArt from '../components/EditorialArt';
import HomePathways from '../components/HomePathways';
import InitialCareForm from '../components/InitialCareForm';
import LivingMarquee from '../components/LivingMarquee';
import PsychologistPortrait from '../components/PsychologistPortrait';
import SectionHeading from '../components/SectionHeading';
import { siteData } from '../data/mockData';

export interface HomePageProps {
  readonly className?: string;
}

const emotionalQuestions = [
  'Você cuida de todo mundo, mas sente que ninguém cuida de você?',
  'Tem dificuldade de dizer não sem se sentir culpada?',
  'Percebe que vive histórias diferentes, mas repete os mesmos padrões?',
] as const;

const emotionalTopics = [
  { number: '01', title: 'Ansiedade e sobrecarga', text: 'Quando os pensamentos não desaceleram e parece que tudo depende de você.', detail: 'Um espaço para compreender as pressões do cotidiano e a sua maneira de lidar com elas.' },
  { number: '02', title: 'Autoestima e identidade', text: 'Quando você já não sabe onde termina a expectativa dos outros e começa a sua vontade.', detail: 'Olhar com cuidado para sua história, suas necessidades e para a forma como você se enxerga.' },
  { number: '03', title: 'Relacionamentos e limites', text: 'Quando dizer não é difícil e estar em uma relação parece significar deixar você de lado.', detail: 'Refletir sobre vínculos, limites e a possibilidade de construir relações mais conscientes.' },
  { number: '04', title: 'Dependência emocional', text: 'Quando o medo de perder alguém ocupa mais espaço do que o desejo de permanecer sendo você.', detail: 'Reconhecer padrões de vínculo e explorar formas de fortalecer a própria autonomia.' },
  { number: '05', title: 'Vivências e traumas', text: 'Quando certas experiências ainda ecoam no presente, mesmo depois de tanto tempo.', detail: 'Acolher o que foi vivido e compreender como essas experiências atravessam sua história.' },
  { number: '06', title: 'Mudanças e recomeços', text: 'Quando uma fase terminou, mas você ainda não sabe qual caminho deseja construir.', detail: 'Dar lugar às dúvidas e descobrir possibilidades que respeitem seu tempo e sua singularidade.' },
] as const;

const firstSteps = [
  { number: '01', title: 'Entre em contato', text: 'Envie uma mensagem pelo WhatsApp contando, no seu tempo, o que te trouxe até aqui.' },
  { number: '02', title: 'Entenda as possibilidades', text: 'Receba orientações sobre o formato, a modalidade e a disponibilidade do acompanhamento.' },
  { number: '03', title: 'Comece no seu ritmo', text: 'Se fizer sentido para você, combine o primeiro encontro e dê início a esse espaço de escuta.' },
] as const;

const methodImages = [
  '/images/jovina/metodo-compreender-historia.webp',
  '/images/jovina/metodo-reconstruir-identidade.webp',
  '/images/jovina/metodo-escolher-direcao.webp',
] as const;

export default function HomePage({ className = '' }: Readonly<HomePageProps>) {
  return (
    <main className={`overflow-x-clip ${className}`}>
      {/* 1. CINEMATIC SCROLL DE FRAMES — 240 frames desktop e mobile */}
      <CinematicScroll />

      {/* 2. MARQUEE DINÂMICO */}
      <LivingMarquee />

      {/* IDENTIFICAÇÃO EMOCIONAL — perguntas em primeiro plano */}
      <section aria-labelledby="identificacao-title" className="relative overflow-hidden bg-[#F4EDE4] py-20 sm:py-28 md:py-36">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-0 h-72 w-72 rounded-full border border-olive/10 sm:h-[30rem] sm:w-[30rem]" />
        <div className="relative mx-auto max-w-[1080px] px-5 sm:px-8">
          <p className="eyebrow motion-rise">UM CONVITE À ESCUTA</p>
          <h2 id="identificacao-title" className="motion-rise mt-5 max-w-4xl font-display text-[clamp(2.5rem,6vw,5.8rem)] leading-[1.04] tracking-[-0.045em] text-olive">
            Você aprendeu a ser forte por tanto tempo...
            <span className="mt-2 block italic text-caramel">Mas quem cuida de você?</span>
          </h2>
          <p className="motion-rise mt-7 max-w-2xl text-base leading-8 text-umber/75 sm:text-lg">
            Nem sempre é fácil reconhecer o que sentimos. Talvez algumas destas perguntas façam parte da sua história.
          </p>
          <div className="mt-12 grid gap-3 sm:mt-16 md:grid-cols-3 md:gap-5">
            {emotionalQuestions.map((question, index) => (
              <div key={question} className="motion-rise group flex min-h-[210px] flex-col justify-between rounded-[1.4rem] border border-olive/10 bg-white/65 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-caramel/40 hover:shadow-xl hover:shadow-olive/5 sm:p-8">
                <span className="font-display text-2xl italic text-caramel/80">0{index + 1}</span>
                <h3 className="font-display text-[clamp(1.3rem,2vw,1.7rem)] leading-snug tracking-tight text-olive">{question}</h3>
              </div>
            ))}
          </div>
          <div className="motion-rise mt-10 flex flex-col gap-5 border-l-2 border-caramel/55 pl-5 sm:flex-row sm:items-center sm:justify-between sm:pl-7">
            <p className="max-w-xl text-sm leading-7 text-umber/75 sm:text-base">Você não precisa ter todas as respostas para começar a olhar para si com mais acolhimento.</p>
            <Link to="/terapia" className="text-link shrink-0">Conheça a terapia <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* 3. VOLTAR PARA SI */}
      <section className="motion-stage bg-canvas py-14 sm:py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 sm:gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:gap-16 lg:px-8">
          <div className="motion-left">
            <p className="eyebrow">VOLTAR PARA SI</p>
            <h2 className="mt-3.5 sm:mt-5 font-display text-[clamp(2rem,5vw,4.8rem)] leading-[1.02] sm:leading-[.98] tracking-[-0.04em] text-olive">
              Sua história explica muito.
              <span className="block italic text-caramel">Mas não precisa decidir tudo.</span>
            </h2>
            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base leading-relaxed sm:leading-8 text-umber/70 md:text-lg">
              Um espaço de escuta e reflexão para reconhecer padrões, fortalecer a identidade e construir escolhas mais conscientes — sem fórmulas prontas e sem a exigência de ser forte o tempo inteiro.
            </p>
            <Link to="/sobre" className="text-link mt-6 sm:mt-8">Conhecer a abordagem <ArrowRight size={14} /></Link>
          </div>
          <div className="motion-right">
            <EditorialArt
              variant="about"
              src="/images/jovina/terapia-acolhimento-presenca.webp"
              alt="Composição acolhedora de escuta, reflexão e presença"
              badgeTitle="Escuta & Método"
              badgeSubtitle="Compreender · Reconstruir · Escolher"
              loading="lazy"
              className="max-w-[480px]"
            />
          </div>
        </div>
      </section>

      {/* TEMAS DE ACOLHIMENTO — cards interativos */}
      <section aria-labelledby="temas-title" className="bg-[#F8F5EF] py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="motion-rise max-w-3xl">
            <p className="eyebrow">O QUE PODEMOS TRABALHAR JUNTAS</p>
            <h2 id="temas-title" className="mt-4 font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.05] tracking-[-0.04em] text-olive">Cada história tem suas próprias <span className="italic text-caramel">camadas.</span></h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-umber/70">Algumas vivências pedem escuta, compreensão e um espaço onde seja possível existir sem cobranças. Explore os temas abaixo.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {emotionalTopics.map((topic) => (
              <details key={topic.number} className="motion-rise group min-w-0 rounded-[1.3rem] border border-olive/10 bg-white p-6 shadow-sm transition-colors duration-300 open:border-caramel/45 sm:p-8">
                <summary className="flex cursor-pointer list-none flex-col gap-8 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between text-xs tracking-[.2em] text-caramel"><span>{topic.number} / ACOLHIMENTO</span><ChevronDown size={19} className="text-olive transition-transform duration-300 group-open:rotate-180" /></span>
                  <span className="block">
                    <span className="block font-display text-2xl leading-tight tracking-tight text-olive sm:text-[1.75rem]">{topic.title}</span>
                    <span className="mt-3 block text-sm leading-7 text-umber/70">{topic.text}</span>
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[.13em] text-olive/65 group-open:hidden">Toque para saber mais</span>
                </summary>
                <div className="mt-5 border-t border-olive/10 pt-5">
                  <p className="text-sm leading-7 text-umber/80">{topic.detail}</p>
                  <Link to="/terapia" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.1em] text-olive hover:text-caramel">Explorar acompanhamento <ArrowRight size={14} /></Link>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRÊS CAMINHOS */}
      <section className="bg-surface/60 py-14 sm:py-24 md:py-32">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="motion-rise max-w-3xl">
            <SectionHeading overline="TRÊS CAMINHOS" title="Nem toda fase pede a mesma forma de cuidado." text="Cada experiência foi pensada para um momento diferente da jornada." />
          </div>

          <div className="mt-8 sm:mt-14">
            <HomePathways items={siteData.home.services} />
          </div>
        </div>
      </section>

      {/* 5. MÉTODO IDENTIDADE SCROLL SEQUENCE — 100% responsivo sem cortes */}
      <section className="sticky-story py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="sticky-story-grid">
            <div className="sticky-story-copy">
              <p className="eyebrow !text-caramel">MÉTODO IDENTIDADE</p>
              <h2 className="mt-3.5 sm:mt-5 max-w-md font-display text-[clamp(2.1rem,5vw,4.6rem)] leading-[1.02] sm:leading-[.96] tracking-[-0.04em] text-canvas">
                Três movimentos para voltar ao próprio centro.
              </h2>
              <p className="mt-4 sm:mt-6 max-w-md text-xs sm:text-sm leading-relaxed sm:leading-7 text-canvas/70">
                Uma narrativa visual que acompanha sua jornada com clareza, acolhimento e direção.
              </p>
              <Link to="/sobre" className="mt-5 sm:mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.1em] text-caramel hover:text-canvas transition-colors">
                Conhecer o método <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-8 space-y-8 lg:mt-0 lg:space-y-12 divide-y divide-white/10 lg:divide-y-0">
              {siteData.method.steps.map((step, index) => (
                <article className="sticky-story-card motion-fade pt-8 first:pt-0 lg:pt-0" key={step.number}>
                  <div className="sticky-story-card-inner">
                    <span className="sticky-story-number">{step.number}</span>
                    <div className="w-full">
                      <p className="eyebrow !text-caramel">{['ORIGEM', 'RECONSTRUÇÃO', 'MOVIMENTO'][index]}</p>
                      <h3 className="mt-2.5 sm:mt-4 font-display text-xl sm:text-3xl lg:text-4xl text-canvas tracking-tight">{step.title}</h3>
                      <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-canvas/70">{step.text}</p>
                      <div className="mt-5 sm:mt-7 w-full max-w-xl">
                        <EditorialArt
                          variant="identity"
                          src={methodImages[index]}
                          alt={`Arte conceitual do Método Identidade: ${step.title}`}
                          objectPosition="center"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PAUSA EDITORIAL */}
      <section aria-labelledby="reflexao-title" className="relative overflow-hidden bg-olive py-24 sm:py-32">
        <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full border border-white/15 sm:h-[34rem] sm:w-[34rem]" aria-hidden="true" />
        <div className="mx-auto max-w-[980px] px-5 text-center sm:px-8">
          <Sparkles aria-hidden="true" size={24} className="mx-auto text-caramel" />
          <p className="eyebrow mt-7 !text-[#D9B18B]">UMA PAUSA PARA REFLETIR</p>
          <h2 id="reflexao-title" className="motion-rise mt-6 font-display text-[clamp(2.5rem,6vw,5.9rem)] leading-[1.08] tracking-[-0.045em] text-[#F5EEE7]">
            Você não precisa continuar sendo <span className="italic text-[#D9B18B]">quem precisou ser para sobreviver.</span>
          </h2>
          <p className="motion-rise mx-auto mt-8 max-w-xl text-base leading-8 text-[#F5EEE7]/75">Às vezes, voltar para si começa com a possibilidade de se ouvir.</p>
          <div className="mx-auto mt-10 h-px w-24 bg-[#D9B18B]/60" />
        </div>
      </section>

      {/* 6. FOTO 1 DE JOVINA — Seção Sobre Jovina na Home */}
      <section className="motion-stage bg-surface/50 py-14 sm:py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 sm:gap-12 px-4 sm:px-6 lg:grid-cols-[.95fr_1.05fr] lg:gap-16 lg:px-8">
          <div className="motion-left">
            <PsychologistPortrait
              photo="office"
              alt="Jovina Diniz — Terapeuta Integrativa e Mentora em seu consultório"
              caption="Jovina Diniz"
              loading="lazy"
            />
          </div>
          <div className="motion-right">
            <p className="eyebrow">SOBRE JOVINA</p>
            <h2 className="mt-3.5 sm:mt-5 font-display text-[clamp(2rem,4.5vw,4.5rem)] leading-[1.02] tracking-[-0.04em] text-olive">
              Escuta sensível,
              <span className="block italic text-caramel">presença e direção.</span>
            </h2>
            <p className="mt-4 sm:mt-6 max-w-xl text-xs sm:text-base leading-relaxed sm:leading-8 text-umber/70">{siteData.about.body[0]}</p>
            <p className="mt-3 sm:mt-4 max-w-xl text-xs sm:text-base leading-relaxed sm:leading-8 text-umber/70">{siteData.about.body[1]}</p>
            <Link to="/sobre" className="text-link mt-6 sm:mt-8">Conhecer minha trajetória <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* COMO COMEÇAR — percurso acessível */}
      <section aria-labelledby="passos-title" className="bg-[#F3EBE1] py-20 sm:py-28">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
            <div className="motion-left">
              <p className="eyebrow">COMO FUNCIONA</p>
              <h2 id="passos-title" className="mt-5 font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.04] tracking-[-0.04em] text-olive">O primeiro passo <span className="italic text-caramel">não precisa ser difícil.</span></h2>
              <p className="mt-6 max-w-md text-base leading-8 text-umber/75">Você pode chegar com dúvidas, inseguranças ou sem saber exatamente o que dizer. O importante é encontrar um caminho que faça sentido para você.</p>
              <Link to="/faq" className="text-link mt-8">Ver perguntas frequentes <ArrowRight size={15} /></Link>
            </div>
            <div className="space-y-4">
              {firstSteps.map((step) => (
                <article key={step.number} className="motion-right flex gap-5 rounded-[1.2rem] border border-olive/10 bg-white/70 p-6 sm:gap-7 sm:p-8">
                  <span className="shrink-0 font-display text-3xl italic text-caramel">{step.number}</span>
                  <div><h3 className="font-display text-2xl text-olive">{step.title}</h3><p className="mt-3 text-sm leading-7 text-umber/75 sm:text-base">{step.text}</p></div>
                </article>
              ))}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-3 pt-4 text-xs font-medium uppercase tracking-[.1em] text-olive/70">
                <span className="inline-flex items-center gap-2"><MessageCircle size={15} /> Atendimento online e presencial</span>
                <span className="inline-flex items-center gap-2"><Heart size={15} /> Escuta acolhedora</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRÉ-ATENDIMENTO — mensagem pronta para WhatsApp */}
      <InitialCareForm />

      {/* 7. CTA SECTION */}
      <CTASection title="Seu tempo de se escutar pode começar aqui." text="Se você deseja compreender suas emoções e descobrir caminhos possíveis para a sua história, podemos conversar. Entre em contato para conhecer o acompanhamento." />
    </main>
  );
}
