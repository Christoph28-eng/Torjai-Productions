# Ghid: cum adaugi proiecte, poze și videoclipuri

Acest ghid e pentru **Cristi**. Cel mai simplu mod de a face orice de mai jos:
deschide proiectul în **Claude Code** și spune-i în română ce vrei
(ex: *„adaugă pozele din folderul X la proiectul kinetic-01"*). Mai jos e și
explicația manuală, ca să înțelegi ce se întâmplă.

---

## Concepte de bază

- Un **proiect** = o intrare în fișierul `src/data/projects.ts`.
- **Pozele** stau în `src/assets/projects/<slug>/` (fișiere reale, în repo).
- **Videourile** NU stau în repo — se urcă pe **Vimeo** sau **YouTube** și se
  trec doar ca link/ID în `src/data/projects.ts`.
- După orice modificare: **commit & push** pe GitHub → site-ul se actualizează
  singur pe `torjaiproductions.com` în ~1 minut (Netlify).

`slug` = numele scurt, fără spații, al proiectului (ex. `kinetic-01`). Îl găsești
la fiecare proiect în `src/data/projects.ts`.

---

## 1. Adaugă POZE la un proiect

1. Intră în folderul `src/assets/projects/`.
2. Dacă proiectul n-are încă folder, creează unul cu numele = `slug`-ul lui
   (ex. `src/assets/projects/kinetic-01/`).
3. Copiază pozele acolo, **numite în ordine**: `01.jpg`, `02.jpg`, `03.jpg` ...
   (numele dă ordinea în galerie).

Gata. Pozele apar automat în galeria proiectului, optimizate. La click pe o poză
se deschide popup-ul cu săgeți (lightbox).

> Poți pune fișiere mari direct de pe aparat — se micșorează automat la build.

---

## 2. Adaugă un VIDEO la un proiect

1. Urcă clipul (de pe SSD) pe **Vimeo** sau **YouTube**. Poate fi „unlisted"
   (nelistat) dacă nu vrei să apară public pe platformă.
2. Copiază link-ul clipului.
3. În `src/data/projects.ts`, găsește proiectul și adaugă-i un câmp `videos`:

```ts
{
  slug: 'kinetic-01',
  title: 'KINETIC 01',
  // ... restul câmpurilor ...
  videos: [
    { provider: 'vimeo', id: '123456789' },          // din vimeo.com/123456789
    { provider: 'youtube', id: 'AbCdEfGhIjk' },        // din youtu.be/AbCdEfGhIjk
  ],
}
```

- `id`-ul e partea finală din link (vezi comentariile din fișier).
- Opțional: `alt: 'descriere scurtă'` și `poster: 'nume-fisier.jpg'` (un cadru
  pus în folderul de poze al proiectului, folosit ca imagine de copertă a clipului).

Clipul apare în galerie cu buton de play; la click se deschide player-ul în popup.

---

## 3. Adaugă un PROIECT NOU

În `src/data/projects.ts`, copiază o intrare existentă și schimbă:

```ts
{
  slug: 'nume-nou',            // unic, fără spații
  title: 'NUME NOU',
  client: 'NUME CLIENT',
  category: 'COMMERCIAL',      // sau NARRATIVE / MUSIC VIDEO / DOCUMENTARY ...
  alt: 'descriere scurtă a copertei',
  src: images.concrete,        // copertă (placeholder, până pui una reală)
  dots: ['bg-gray-300', 'bg-technical-amber'],
}
```

Apoi adaugă-i pozele (pasul 1) și/sau videourile (pasul 2).

---

## 4. Pagina BTS (Behind The Scenes)

Pagina **BTS** (din meniu) arată ca o pagină de proiect: titlul *Behind The
Scenes* și sub el o galerie cu poze și video, cu filtrele ALL / PHOTO / VIDEO.
Click pe o poză sau pe un clip → se deschide pe tot ecranul (lightbox), cu
clipurile redate direct în pagină.

Media BTS reală nu stă ca celelalte poze de proiect, ci direct în folderul
`public/bts/`:

- `public/bts/photos/` — pozele (WebP).
- `public/bts/videos/` — clipurile (MP4), găzduite chiar în site.
- `public/bts/posters/` — câte un cadru-poster (WebP) pentru fiecare clip.

Lista completă (ce poză / ce clip, în ce ordine) e în `src/data/btsGallery.ts`.
Acel fișier e **generat automat** din procesarea footage-ului — cel mai simplu
e să-l regenerezi cu unealta de procesare, nu să-l editezi de mână.

---

## 5. Publică modificările

După ce ai terminat, în Claude Code spune *„dă commit și push"* (sau manual):

```
git add -A
git commit -m "Adaug media la proiectul kinetic-01"
git push
```

Site-ul live se actualizează singur în ~1 minut. Dacă ceva e greșit, build-ul
pică și site-ul vechi rămâne neatins — nu poți strica varianta live din greșeală.
