# Torjai Productions

Website pentru casa de producție photo & video **Torjai Productions**.

- **Stack:** [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com)
- **Limbă:** Engleză
- **Funcții:** galerie portofoliu, formular de contact, integrare social/Instagram

## Comenzi

| Comandă           | Ce face                                         |
| ----------------- | ----------------------------------------------- |
| `npm install`     | Instalează dependențele                         |
| `npm run dev`     | Pornește serverul local pe `http://localhost:4321` |
| `npm run build`   | Construiește site-ul în `dist/`                 |
| `npm run preview` | Previzualizează build-ul local                  |

## Structură

```
src/
  layouts/      Layout-ul de bază (head, header, footer)
  components/   Componente reutilizabile (Header, Footer, ...)
  pages/        O pagină = un fișier .astro (rutare automată)
  styles/       CSS global + design tokens
public/         Imagini, video, favicon — servite ca atare
design-source/  Materiale brute: cod Stitch + text (vezi README-ul din folder)
```

## Workflow

Vezi [`design-source/README.md`](design-source/README.md) pentru cum aduci
design-urile din Stitch și textul în proiect.
