export type ServiceItem = Readonly<{
  overline: string;
  title: string;
  text: string;
  to: string;
}>;

export type FaqItem = Readonly<{
  question: string;
  answer: string;
}>;

export const siteData = {
  brand: {
    name: 'Jovina Diniz',
    descriptor: 'Terapeuta Integrativa & Mentora de Mulheres',
    phrase: 'Compreender sua história. Reconstruir sua identidade. Escolher sua direção.',
    instagram: '@terapeutadiniz',
    instagramUrl: 'https://www.instagram.com/terapeutadiniz',
    whatsappDisplay: '+55 11 98045-8993',
    whatsappNumber: '5511980458993',
    location: 'São Paulo – SP',
    locationDetail: 'Região de Ponte Rasa',
  },
  navigation: [
    { label: 'Início', to: '/' },
    { label: 'Sobre', to: '/sobre' },
    { label: 'Terapia', to: '/terapia' },
    { label: 'Mentoria', to: '/mentoria' },
    { label: 'Empresas', to: '/empresas' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Contato', to: '/contato' },
  ],
  home: {
    eyebrow: 'TERAPIA INTEGRATIVA & MENTORIA',
    titleStart: 'Um espaço para ',
    titleEmphasis: 'compreender sua história,',
    titleEnd: ' reconstruir sua identidade e viver com mais verdade.',
    intro: 'Terapia e mentoria para mulheres que desejam compreender suas emoções, fortalecer sua identidade e encontrar novos caminhos com mais consciência e direção.',
    services: [
      {
        overline: 'ACOLHIMENTO INDIVIDUAL',
        title: 'Terapia para Mulheres',
        text: 'Um espaço de escuta para compreender sua história, emoções, relações e identidade com mais clareza.',
        to: '/terapia',
      },
      {
        overline: 'DESENVOLVIMENTO & CICLOS',
        title: 'Mentoria para Mulheres',
        text: 'Um processo direcionado para identidade, clareza, novos ciclos e construção de caminhos possíveis.',
        to: '/mentoria',
      },
      {
        overline: 'COLETIVO & LIDERANÇA',
        title: 'Palestras & Empresas',
        text: 'Conversas e experiências para organizações que desejam fortalecer mulheres, relações e desenvolvimento emocional.',
        to: '/empresas',
      },
    ] satisfies ServiceItem[],
  },
  therapyTopics: [
    'Ansiedade e sobrecarga mental',
    'Autoestima e autovalorização',
    'Relacionamentos e conflitos',
    'Dependência emocional e limites',
    'Traumas e experiências dolorosas',
    'Crises e transições de fase',
    'Padrões repetitivos',
    'Autoconhecimento e direção',
  ],
  faq: [
    { question: 'O atendimento é online ou presencial?', answer: 'Há atendimento online e também presencial em São Paulo. A modalidade mais adequada pode ser combinada no primeiro contato.' },
    { question: 'Quanto tempo dura uma sessão?', answer: 'A sessão online tem duração aproximada de 50 minutos.' },
    { question: 'Como funciona o primeiro atendimento?', answer: 'O primeiro contato serve para entender sua necessidade, explicar o formato do acompanhamento e combinar o melhor caminho para começar.' },
    { question: 'A terapia é voltada somente para mulheres?', answer: 'O posicionamento principal do trabalho é voltado para mulheres. Para situações específicas, confirme diretamente pelo WhatsApp.' },
    { question: 'Como funciona a mentoria?', answer: 'A mentoria é um processo mais direcionado para clareza, identidade, novos ciclos e tomada de decisões. O formato é explicado conforme a necessidade de cada pessoa.' },
    { question: 'Jovina realiza palestras para empresas?', answer: 'Sim. É possível solicitar uma conversa para palestras, encontros e experiências voltadas ao desenvolvimento de mulheres dentro das organizações.' },
    { question: 'Como faço para agendar?', answer: 'O agendamento pode ser iniciado pelo WhatsApp. Basta clicar em qualquer botão “Agendar atendimento” ou “Falar no WhatsApp”.' },
  ] satisfies FaqItem[],
  about: {
    title: 'Uma escuta sensível para mulheres que desejam reencontrar seu próprio centro.',
    body: [
      'Meu trabalho nasce do compromisso de criar um espaço de escuta, reflexão e acolhimento para mulheres que desejam compreender melhor sua história e seus padrões emocionais.',
      'Ao longo do processo, buscamos reconhecer vínculos, expectativas, dores e escolhas que influenciam a forma como você se relaciona consigo mesma e com o mundo.',
      'A proposta é construir mais consciência e direção, respeitando o seu tempo e a singularidade da sua trajetória.',
    ],
  },
  method: {
    title: 'Método Identidade',
    intro: 'Uma proposta de acompanhamento organizada em três movimentos complementares.',
    steps: [
      { number: '01', title: 'Compreender a História', text: 'Observar padrões, experiências, vínculos e narrativas que ainda influenciam o presente.' },
      { number: '02', title: 'Reconstruir a Identidade', text: 'Fortalecer a percepção de si, rever expectativas externas e construir escolhas mais coerentes.' },
      { number: '03', title: 'Escolher a Direção', text: 'Transformar consciência em decisões práticas e caminhos possíveis para a vida atual.' },
    ],
  },
  therapy: {
    intro: 'Um espaço seguro e confidencial para acolher suas dores, reconhecer seus padrões e construir sua força interna com delicadeza e precisão terapêutica.',
    process: [
      { title: 'Duração da Sessão', text: 'Encontro de aproximadamente 50 minutos.' },
      { title: 'Modalidade Online', text: 'Atendimento online para mulheres em diferentes localidades.' },
      { title: 'Presencial Acolhedor', text: 'Atendimento presencial em São Paulo – SP, região de Ponte Rasa.' },
      { title: 'Frequência Adequada', text: 'A frequência é combinada de acordo com o momento e a necessidade.' },
    ],
  },
};

export const legalCopy = {
  privacy: 'Esta página é um espaço reservado para a Política de Privacidade definitiva do site. Antes da publicação oficial, recomenda-se revisar o texto jurídico e adequar o tratamento de dados ao formulário de contato.',
  terms: 'Esta página é um espaço reservado para os Termos de Uso definitivos do site. O conteúdo final deve refletir os serviços oferecidos, canais de contato e condições aplicáveis ao atendimento.',
};
