# Poze pentru proiecte

Fiecare proiect are aici un folder cu numele = `slug`-ul lui din
`src/data/projects.ts`. Exemplu:

```
src/assets/projects/
  kinetic-01/        ← slug-ul proiectului
    01.jpg
    02.jpg
    03.jpg
  aperture/
    01.jpg
    ...
```

Reguli:

- **Numele fișierelor dau ordinea** în galerie: `01.jpg`, `02.jpg`, `03.jpg` ...
- Formate acceptate: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.
- Pozele sunt **optimizate automat** la build (redimensionate + WebP), deci poți
  pune fișiere mari direct de pe aparat. Ideal totuși: latura lungă ~2500 px.
- **Videourile NU se pun aici** — ele merg pe Vimeo/YouTube și se trec în
  `src/data/projects.ts`. Vezi `docs/GHID-CONTINUT.md`.

Dacă un proiect nu are încă niciun folder/poze aici, pagina lui afișează imagini
de tip placeholder, până adaugi media reală.
