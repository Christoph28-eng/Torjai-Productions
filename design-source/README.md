# Design source — Stitch & text

Aici pui materialele „brute", din care construim site-ul. Eu (Claude) le iau de
aici, le curăț și le transform în paginile reale din `src/pages/`.

## 1. Codul din Stitch → `stitch/`

Pentru fiecare pagină din Google Stitch:

1. Deschide ecranul în Stitch.
2. Apasă **„Copy code"** (sau iconița `</>`) — îți copiază HTML + Tailwind.
3. Salvează-l aici cu numele paginii, de ex:
   - `stitch/home.html`
   - `stitch/portfolio.html`
   - `stitch/services.html`
   - `stitch/about.html`
   - `stitch/contact.html`

(Sau pur și simplu lipește codul în chat și îl pun eu în fișier.)

## 2. Textul tău → `text/`

Pune textul pe care îl ai separat, organizat pe pagini. Format liber
(`.txt`, `.md`, `.docx`) — de ex:

- `text/home.md`
- `text/about.md`
- `text/services.md`

Spune clar ce text aparține cărei secțiuni/pagini.

## 3. Imaginile / video → `../public/`

Pozele și clipurile pentru galerie se pun în `public/` (le organizez eu pe foldere).
Pentru fișiere mari de video, ideal e un link (YouTube/Vimeo) — nu le ținem în repo.
