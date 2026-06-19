# Poze pentru pagina BTS (Behind The Scenes)

Pune aici pozele „behind the scenes". Exemplu:

```
src/assets/bts/
  01.jpg
  02.jpg
  03.jpg
  ...
```

Reguli:

- **Numele fișierelor dau ordinea** în galerie: `01.jpg`, `02.jpg`, `03.jpg` ...
- Formate acceptate: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.
- Pozele sunt **optimizate automat** la build (redimensionate + WebP), deci poți
  pune fișiere mari direct de pe aparat. Ideal totuși: latura lungă ~2500 px.
- **Videourile NU se pun aici** — ele merg pe Vimeo/YouTube și se trec în
  `src/data/bts.ts`. Vezi `docs/GHID-CONTINUT.md`.

Cât timp nu există nicio poză/video aici, pagina BTS afișează imagini de tip
placeholder, până adaugi media reală.
