# Cinematic scroll

A Home usa uma sequência de imagens controlada pelo scroll, sem reprodução de vídeo e sem texto sobreposto.

## Fontes
- Desktop: `/videos/desktop/VIDEO DESKTOP.mp4`
- Mobile: `/videos/mobile/VIDEO MOBILE.mp4`

## Frames gerados
- Desktop: `/frames/desktop/frame-001.webp` até `frame-120.webp`
- Mobile: `/frames/mobile/frame-001.webp` até `frame-120.webp`

Os vídeos de origem têm 24 fps e 10 segundos. A sequência web usa 120 frames por viewport, extraídos a 12 fps em WebP de alta qualidade. O componente `CinematicScroll` desenha os frames em canvas e relaciona o índice ao progresso da rolagem, com interpolação para suavizar o movimento.

Status: implementação de frame sequence pronta para produção.
