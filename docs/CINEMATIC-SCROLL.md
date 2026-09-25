# Cinematic scroll

A Home usa uma sequência de imagens controlada pelo scroll, sem reprodução automática de vídeo e sem texto sobreposto.

## Fontes originais
- Desktop: `/videos/desktop/VIDEO DESKTOP.mp4` — 1920×1080, 24 fps, 10 s, 240 frames.
- Mobile: `/videos/mobile/VIDEO MOBILE.mp4` — 1080×1920, 24 fps, 10 s, 240 frames.

## Extração 1:1
Os frames são extraídos diretamente do fluxo de vídeo com `-fps_mode passthrough`, sem filtro de fps, sem duplicação e sem descarte. A validação do workflow exige exatamente:
- `/frames/desktop/frame-001.webp` a `frame-240.webp`
- `/frames/mobile/frame-001.webp` a `frame-240.webp`

A conversão usa WebP em alta qualidade (quality 95), preservando a resolução original.

## Reprodução por scroll
O componente `CinematicScroll`:
- mapeia a posição da rolagem diretamente para os 240 frames;
- para exatamente no frame correspondente quando a rolagem para;
- volta pelos mesmos frames quando a direção do scroll é invertida;
- mantém apenas uma janela de frames próximos decodificada em memória;
- pré-carrega os 240 arquivos comprimidos com concorrência limitada;
- não usa crossfade, autoplay ou easing residual.

Isso evita o descarte de frames por pressão de memória e reduz travamentos em desktop e mobile.
