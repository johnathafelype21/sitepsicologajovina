# Cinematic scroll

A Home usa uma seção sticky com parallax lateral e vídeo responsivo.

Arquivos:
- Desktop: `/videos/desktop/VIDEO%20DESKTOP.mp4`
- Mobile: `/videos/mobile/VIDEO%20MOBILE.mp4`

O componente escolhe somente um vídeo por viewport, aplica movimento lateral via requestAnimationFrame e reduz o movimento quando `prefers-reduced-motion` está ativo.
