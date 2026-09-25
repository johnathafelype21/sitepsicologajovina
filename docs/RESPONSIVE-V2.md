# Checklist Responsivo — V2

## Breakpoints de referência
- 375px: celular compacto
- 390px: celular padrão
- 430px: celular grande
- 768px: tablet
- 1024px: notebook/tablet landscape
- 1440px+: desktop

## Regras implementadas
- Storytelling sticky do Método Identidade vira fluxo vertical abaixo de 1024px.
- Hero passa de duas colunas para uma coluna sem depender de altura fixa.
- Imagens editoriais reduzem altura e raio no mobile.
- Badges flutuantes deixam de ser absolutos em telas pequenas.
- Offset cards perdem deslocamento vertical no mobile.
- Scroll progress é ocultado para usuários com reduced motion.
- Reveals/parallax são desativados em reduced motion.
- Conteúdo permanece no DOM e legível mesmo sem animação.

## Verificação antes de produção
- Checar overflow horizontal.
- Conferir tamanho mínimo de toque em botões.
- Testar menu mobile.
- Testar WhatsApp em todas as páginas.
- Verificar sticky em Safari/iOS.
- Verificar Page Down/teclado e prefers-reduced-motion.
