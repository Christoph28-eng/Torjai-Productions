// Sursa unică de adevăr pentru proiecte — folosită de lista /projects
// și de paginile individuale /projects/[slug].

export interface Project {
  slug: string;
  title: string;
  /** Numele firmei pentru care e făcut proiectul (apare ca logo pe pagina dedicată). */
  client: string;
  /** Calea către logo-ul REAL al clientului (ex. '/logos/nike-acg.svg'). Dacă lipsește, se afișează numele ca text. */
  clientLogo?: string;
  category: string;
  /** Data+ora (ISO) când s-a adăugat ultima oară conținut nou la acest proiect.
   *  Grila /projects e sortată DESC după acest câmp (cel mai recent = primul), atât
   *  în „ALL" cât și în fiecare categorie. ⚠️ CONVENȚIE OBLIGATORIE: de fiecare dată
   *  când adaugi conținut nou la un proiect (reel/clip/film/poză), pune aici
   *  data+ora curentă ca proiectul să urce automat pe locul 1. Proiect nou = cel mai
   *  recent `updatedAt` dintre toate. */
  updatedAt: string;
  /** Imaginea-copertă (din listă). */
  src: string;
  alt: string;
  dots: [string, string];
  size?: 'tall' | 'wide';
  /** Clipurile video ale proiectului (Vimeo/YouTube). Pozele NU se listează aici —
   *  se pun ca fișiere în src/assets/projects/<slug>/ și sunt preluate automat. */
  videos?: ProjectVideo[];
  /** Clipuri scurte self-hostate (MP4 în public/projects/<slug>/). Pentru clipuri
   *  scurte care încap sub 100 MB; filmele mari merg pe Vimeo/YouTube via `videos`. */
  clips?: ProjectClip[];
  /** Postări/reels Instagram embeduite (apar în galeria proiectului, deschise în lightbox). */
  instagram?: ProjectInstagram[];
  /** Handle-ul contului Instagram (fără @), ex. 'playground_boxing_'. Dacă e setat,
   *  pe pagina proiectului apare un buton „View on Instagram" către profil. */
  instagramProfile?: string;
  /** Buton extern în hero-ul proiectului (ex. site-ul clientului): duce la `url`
   *  și afișează `label`. Poziționat ca butonul „View on Instagram". */
  website?: { url: string; label: string };
}

/** Un clip scurt self-hostat (MP4 servit din public/). */
export interface ProjectClip {
  /** Calea fișierului .mp4 (ex. '/projects/avanti/clip-01.mp4'). */
  src: string;
  /** Calea posterului afișat în grilă (ex. '/projects/avanti/clip-01-poster.webp'). */
  poster: string;
  alt?: string;
}

/** O postare sau un reel Instagram embeduit. Spre deosebire de YouTube/Vimeo,
 *  Instagram NU oferă thumbnail automat, deci `posterSrc` (coperta din grilă) e
 *  obligatoriu. La click se deschide cardul oficial (cu caption) în lightbox. */
export interface ProjectInstagram {
  /** Link-ul public Instagram — post (.../p/COD/) sau reel (.../reel/COD/). */
  url: string;
  /** Calea posterului afișat în grilă (ex. '/projects/<slug>/ig-01.webp'). OBLIGATORIU. */
  posterSrc: string;
  /** Text alternativ scurt (accesibilitate). Opțional. */
  alt?: string;
  /** Dacă `true`, NU se embeduiește în lightbox — la click se deschide `url` pe
   *  Instagram (tab nou). Pentru reels pe care IG refuză să le embeduiască (ex. audio
   *  licențiat → embed-ul ar afișa „content unavailable"). */
  external?: boolean;
}

/** Un clip găzduit pe Vimeo sau YouTube. `id` = identificatorul din link
 *  (Vimeo: vimeo.com/123456789 → id '123456789';
 *   YouTube: youtu.be/AbCdEfGhIjk → id 'AbCdEfGhIjk'). */
export interface ProjectVideo {
  provider: 'vimeo' | 'youtube';
  id: string;
  /** Text alternativ scurt (accesibilitate). Opțional. */
  alt?: string;
  /** Opțional: numele unui fișier-poster din folderul proiectului (ex. 'poster.jpg').
   *  Dacă lipsește, se folosește thumbnail-ul automat de la Vimeo/YouTube. */
  poster?: string;
  /** Opțional: cale directă către un poster servit din public/ (ex. '/projects/x-cover.webp').
   *  Are prioritate față de `poster` și de thumbnail-ul automat. Nu apare ca poză separată. */
  posterSrc?: string;
}

// URL-uri placeholder (Stitch) — de înlocuit cu media reală Torjai.
const images = {
  concrete:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC_SmOx_Hz1FY4zstRA5AItUrTUxcpmOyROWNRLMCFdMGqPt7aM5x1W7ymjBUXiCwJvllKRW0_T4yYbF0vWmgyOtfjGc1NcRJZxhi9hr7ClhGMcyus4VLAf28nYWsKk_29GeMvxoVDDJt-DFq7mMtfzaZS3QTdN0FNIFZDAcLzqkTo62NaGWAgoodkL1VNvvzPV2EX83gPSlUGe_9uJXWoL4fkc4mYKWqL6Ky1HamOijW1-LazOZxcuVcnvK0Hu3u42e0QXO7zgYYI',
  camera:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBjFGvS4EvyPHCSda4BOmAatNN5LMERaT_-60fE6Kcmhg4FPq5VFRAcrEx5co9boewfsBuO65MhXPQOfgOm1t5rsxQPnysuOmJiWhVOBPj9rndwWgG_zjjmI1_aeOeGVfzEIZBjn0kReaUehOT5aLBeIim0u8LPKG3pRLxi3LpQ4FFbk-VHnOfLdc1Bz2k8OX_sQp2UmOBLwIbVbhKlPKEvk0lKbZH4uiMt_faO_wkrIGHmbpmx07NA7aTx7x0EovbM-8VcvrEqRLg',
  artist:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBhbLnOoiWkiUeXX2D21S84XEjfaQl87XVGZ_rpu3Dj--09QxdwdJ9wu_macrj9EntLZ_GYs_GepPo24J98rJiO2ji16zrWCj3R-ZarvvWGLemMqdkHVZ0KrAdU1PEuI5T1t4LFTjNjCSA4C8LCA7k08jNa9CDFqyuvsC08PYAu0wY6b_b0UYMLlC9cm8HAOcyrM8yyR1jDBFbx5SwkK7Oxppnsa58jsictq-Q0n2DLfokO2dUZuPb9eLaL-yD554gt5ofp-kRGtjo',
  facade:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD5w0FeRLfLSS1yODNVxRa-In1_BLC7lHN7vFzqfvJv1sESgI3PFfjN5h8NoBwiUMfXaou30yaSPZF9uFnpZpJt4kiE7zSG5QIfxRJmPJEEF2o5LBHoVqOxePvDOYtKBPhYyteMo5wmETqY6Cu7OgqspLsFrbSF8rnvQ5u8536N6MPYznxIc-3_AmMms7L-R8-MbZ_tW8etGgnmUQEtHi_dWyMYRkk7nmdB6surT-H1E9SZujAa23Y5X0JkkGl61_9ZW1S6qmKYgBk',
  concert:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCgj1qr40mLyQd9PNiU-wd31PoQTqE02wYvRyJ_uvEklTlHBnWDy6VVOzz6jvePmE3RRAYnjaUgvHUbUo4vXX1vVstl4cuwyIterZ99-VfMbRArkYf4TMaYs85ojyZula4VYq7MC7az9DJr5HitwIFtu2mxEVd7cogQZUeXrC64AvPSPqw7lVxdcmau-a10eTgxr_4XGluy6yMUXteezGpCQ3WRKotyOhTlzu5lX_0KDbvwuBVw7ek6y6C1B56Ax12fqiY6z1nireo',
  circuit:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBbn26f4IM4e23KXXqmDRQPDfpQDXhmaoae9PtyLfXLcKFcAe6dad-Ar1q0FvnRNczasu2LXVA-o-fwcMIIeXbuOzR32FWDOBRI633xx6atJLr3vHUV2sm2PXXfsYl9jh-ZrbIAM1s8FtmIh85heLSiv_jJ6uA7vAKmFea8Ogv_EoMgU4urKAhVuuD8Q9HsKEHsFUKxahe1BG069YXU_Jb4e6vKWi5iL3R1aleSjqrjH8ZTbc1G8GYWhd864SXBU7MzaJdx9AgeViI',
  highway:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCseQADmcaG5ranmSLa_FnO2oMPqmNL0ilEu0p3yc3ZHpjUUW7EpES770q7I07EpTPtzhG5bn7AN4qwcMF9JJG8asjOCYbjNyVZLO9tlbwDvyUBTpk5mZkRnrCej1ADX0fC1eapewFC6B_Md-QXhjQEIUsDgMR-oUxAdCyT49b9fx1DyrSCatwfgErAVkIZZs8rU6apFIKy3BWD_SmWTxeckxs0fH8qHGsaXaKkkVSBXjG05e2itI5X_5uI5QE8Y7oqVGWqkybJ8qY',
  crew:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCCr9cnEq6yclllR1dzKX5GNrtC0nA_l6wIdu9CXJiFUekrsyEIfAEKI5taJindtbrarND4w9yhcUwboGOpcKUEurG5ckPfxS_SHJBPAU2hQ9LRJrsuOTg35yKBRP98j-SxYvKN79J8IFOOULdQ5RvX3Lwe4-7zUdH6H-TuBM5qqvWEI2SmBy7MLSqtMEXTLRJqM___CrfGti4NvHOC5QbxaLXBlJuTcXO1i1Z-xpGq4wmP5-PMgt1h9UY5J6RSpTZ8wNHphW8M3Yg',
};

// Proiecte reale Torjai. Pozele stau în src/assets/projects/<slug>/ (preluate
// automat). Clipurile scurte = `clips` (MP4 în public/). Filmele mari se adaugă
// pe Vimeo/YouTube în `videos` (ex. videos: [{ provider:'youtube', id:'...' }]).
export const projects: Project[] = [
  // ── Editorials & Culture ─────────────────────────────────────────
  {
    slug: 'berlinale',
    updatedAt: '2026-06-20T11:00:00',
    title: 'BERLINALE',
    client: '',
    category: 'EDITORIALS & CULTURE',
    alt: 'Berlinale — Berlin International Film Festival, photography.',
    src: '/projects/berlinale-cover.webp',
    dots: ['bg-gray-300', 'bg-technical-amber'],
  },
  {
    slug: 'avanti',
    updatedAt: '2026-06-20T10:55:00',
    title: 'AVANTI',
    client: '',
    category: 'EDITORIALS & CULTURE',
    alt: 'Avanti — editorial photography and short clips.',
    src: '/projects/avanti-cover.webp',
    dots: ['bg-gray-800', 'bg-technical-amber'],
    videos: [
      { provider: 'youtube', id: 'v8f2-ZMJBdY', posterSrc: '/projects/avanti/clip-01-poster.webp', alt: 'AVANTI — clip 1' },
      { provider: 'youtube', id: 'eOQ_cyvZvQQ', posterSrc: '/projects/avanti/clip-02-poster.webp', alt: 'AVANTI — clip 2' },
      { provider: 'youtube', id: 'wBfLFq1Ejds', posterSrc: '/projects/avanti/clip-03-poster.webp', alt: 'AVANTI — clip 3' },
    ],
  },
  {
    slug: 'spiky-cherry',
    updatedAt: '2026-06-20T10:50:00',
    title: 'SPIKY CHERRY',
    client: '',
    category: 'EDITORIALS & CULTURE',
    alt: 'Spiky Cherry — editorial photography.',
    src: '/projects/spiky-cherry-cover.webp',
    dots: ['bg-gray-300', 'bg-gray-300'],
  },
  {
    slug: 'ywl',
    updatedAt: '2026-06-20T10:45:00',
    title: 'YWL',
    client: '',
    category: 'EDITORIALS & CULTURE',
    alt: 'YWL — film stills.',
    src: '/projects/ywl-cover.webp',
    dots: ['bg-technical-amber', 'bg-gray-800'],
    videos: [
      {
        provider: 'youtube',
        id: 'dmyKqZgYtrY',
        alt: 'YWL — film',
        posterSrc: '/projects/ywl-cover.webp',
      },
    ],
  },
  // ── Campaigns & Commercial ───────────────────────────────────────
  {
    slug: 'ekstrategy',
    updatedAt: '2026-06-20T10:40:00',
    title: 'EKSTRATEGY & TEKIRDAĞ RAKI',
    client: '',
    category: 'CAMPAIGNS & COMMERCIAL',
    alt: 'Ekstrategy × Tekirdağ Rakı — commercial.',
    src: '/projects/ekstrategy-cover.webp',
    dots: ['bg-gray-800', 'bg-technical-amber'],
    website: { url: 'https://ekstrategy.com', label: 'Explore Ekstrategy' },
    clips: [
      { src: '/projects/ekstrategy/clip-01.mp4', poster: '/projects/ekstrategy/clip-01-poster.webp' },
    ],
    videos: [
      { provider: 'youtube', id: '6lLWeOm7UDo', alt: 'Ekstrategy — AWAI', posterSrc: '/projects/ekstrategy/poster-02.webp' },
      { provider: 'youtube', id: 'wyWpe3Ky3ws', alt: 'Ekstrategy — INTER', posterSrc: '/projects/ekstrategy/poster-03.webp' },
      { provider: 'youtube', id: 'GncaYgNBLyc', alt: 'Ekstrategy — VIBE', posterSrc: '/projects/ekstrategy-cover.webp' },
    ],
  },
  {
    slug: 'playground',
    updatedAt: '2026-06-20T10:35:00',
    title: 'PLAYGROUND BOXING BERLIN',
    client: '',
    category: 'CAMPAIGNS & COMMERCIAL',
    alt: 'Playground Boxing Berlin — photography.',
    src: '/projects/playground-cover.webp',
    dots: ['bg-gray-300', 'bg-gray-800'],
    instagramProfile: 'playground_boxing_',
    instagram: [
      { url: 'https://www.instagram.com/p/DZVEMAnCM1Z/', posterSrc: '/projects/playground/ig-01.webp', alt: 'Playground Boxing — Instagram post' },
      { url: 'https://www.instagram.com/reel/DZX0XCwoXDx/', posterSrc: '/projects/playground/ig-02.webp', alt: 'Playground Boxing — reel' },
      { url: 'https://www.instagram.com/reel/DZsRYamIniP/', posterSrc: '/projects/playground/ig-03.webp', alt: 'Playground Boxing — reel' },
      { url: 'https://www.instagram.com/reel/DZ5EIpEI4Ze/', posterSrc: '/projects/playground/ig-04.webp', alt: 'Playground Boxing — reel' },
    ],
  },
  {
    slug: 'paris-bar',
    updatedAt: '2026-06-20T10:30:00',
    title: 'PARIS BAR',
    client: '',
    category: 'CAMPAIGNS & COMMERCIAL',
    alt: 'Paris Bar — short film.',
    src: '/projects/paris-bar-cover.webp',
    dots: ['bg-technical-amber', 'bg-gray-300'],
    videos: [
      { provider: 'youtube', id: '8UpcFhlVdyc', posterSrc: '/projects/paris-bar-cover.webp', alt: 'Paris Bar — short film' },
    ],
  },
  {
    slug: 'samsung-qfroost',
    updatedAt: '2026-06-26T15:00:00',
    title: 'Samsung x Qfroost',
    client: '',
    category: 'CAMPAIGNS & COMMERCIAL',
    alt: 'Samsung × Qfroost — campaign reels.',
    src: '/projects/samsung-qfroost-cover.webp',
    dots: ['bg-technical-amber', 'bg-gray-800'],
    size: 'wide', // coperta e 16:10 (landscape) → placă lată indiferent de poziție

    instagramProfile: 'qfroost',
    // Ordine: cel mai recent → cel mai vechi (după data postării pe Instagram).
    instagram: [
      { url: 'https://www.instagram.com/reel/DWgYpBtjVW_/', posterSrc: '/projects/samsung-qfroost/ig-01.webp', alt: 'Samsung × Qfroost — reel' }, // 2026-03-30
      { url: 'https://www.instagram.com/reel/DONoAh2jEYf/', posterSrc: '/projects/samsung-qfroost/ig-02.webp', alt: 'Samsung × Qfroost — reel' }, // 2025-09-05
    ],
  },
  // ── Narrative & Broadcast (University projects) ───────────────────
  {
    slug: 'tv',
    updatedAt: '2026-06-26T12:00:00',
    title: 'TV',
    client: 'ALEX Berlin',
    category: 'NARRATIVE & BROADCAST',
    alt: 'TV — Vierfalt der Talk, NextFrame pe ALEX Berlin.',
    src: '/projects/tv-cover.webp',
    dots: ['bg-gray-800', 'bg-gray-300'],
    website: { url: 'https://www.alex-berlin.de/videos/2090026-vierfalt-der-talk-nextframe', label: 'Watch on ALEX Berlin' },
  },
  {
    slug: 'first-day-at-work',
    updatedAt: '2026-06-20T10:25:00',
    title: 'FIRST DAY AT WORK',
    client: '',
    category: 'NARRATIVE & BROADCAST',
    alt: 'First Day at Work (Horror) — film stills.',
    src: '/projects/first-day-at-work-cover.webp',
    dots: ['bg-gray-800', 'bg-gray-800'],
    videos: [
      {
        provider: 'youtube',
        id: '4cvxSFMQ79o',
        alt: 'First Day at Work',
        posterSrc: '/projects/first-day-at-work-cover.webp',
      },
    ],
  },
  {
    slug: 'schichtwechsel',
    updatedAt: '2026-06-20T10:20:00',
    title: 'SCHICHTWECHSEL',
    client: '',
    category: 'NARRATIVE & BROADCAST',
    alt: 'Schichtwechsel (Shift Change) — film stills.',
    src: '/projects/schichtwechsel-cover.webp',
    dots: ['bg-gray-300', 'bg-technical-amber'],
    size: 'wide', // thumbnail 16:9 → placă lată în grilă (ca titlul să se vadă întreg)
    videos: [
      {
        provider: 'youtube',
        id: 'iCXxy0Bbyj8',
        alt: 'Schichtwechsel',
        posterSrc: '/projects/schichtwechsel-cover.webp',
      },
    ],
  },
  {
    slug: 'pointe-shoes',
    updatedAt: '2026-06-20T10:15:00',
    title: 'POINTE SHOES',
    client: '',
    category: 'NARRATIVE & BROADCAST',
    alt: 'Pointe Shoes — documentary with Aurora Dickie.',
    src: '/projects/pointe-shoes-cover.webp',
    dots: ['bg-gray-800', 'bg-technical-amber'],
    videos: [
      { provider: 'youtube', id: 'qAw6g8bOxx0', alt: 'Pointe Shoes' },
      { provider: 'youtube', id: '0Ak0S2-BK9c', posterSrc: '/projects/pointe-shoes/clip-01-poster.webp', alt: 'Pointe Shoes — clip' },
    ],
  },
  {
    slug: 'demonstration',
    updatedAt: '2026-06-20T10:10:00',
    title: 'DEMONSTRATION',
    client: '',
    category: 'NARRATIVE & BROADCAST',
    alt: 'Demonstration — reportage film stills.',
    src: '/projects/demonstration-cover.webp',
    dots: ['bg-technical-amber', 'bg-gray-300'],
    videos: [
      {
        provider: 'youtube',
        id: 'p7ZSzrwZUyc',
        alt: 'Demonstration',
        posterSrc: '/projects/demonstration-cover.webp',
      },
    ],
  },
  // ── Profiles ─────────────────────────────────────────────────────
  {
    slug: 'qfroost',
    updatedAt: '2026-06-25T18:00:00',
    title: 'Quyen Van (qfroost)',
    client: '',
    category: 'PROFILES',
    alt: 'Quyen Van (qfroost) — Instagram reels & profile.',
    src: '/projects/qfroost-cover.webp',
    dots: ['bg-technical-amber', 'bg-gray-800'],
    instagramProfile: 'qfroost',
    // Ordine: cel mai recent → cel mai vechi (după data postării pe Instagram).
    instagram: [
      { url: 'https://www.instagram.com/p/DTfKyIXjdio/', posterSrc: '/projects/qfroost/ig-08.webp', alt: 'Quyen Van (qfroost) — Kendama Postcards' }, // 2026-01-14
      { url: 'https://www.instagram.com/reel/DSj8MtYDS9q/', posterSrc: '/projects/qfroost/ig-04.webp', alt: 'Quyen Van (qfroost) — reel' }, // 2025-12-22
      // Reel DNAfxKcIZkm — IG refuză embedding-ul (EmbedBrokenMedia, probabil audio
      // licențiat), deci e link-out: la click se deschide reel-ul pe Instagram (tab nou).
      { url: 'https://www.instagram.com/reel/DNAfxKcIZkm/', posterSrc: '/projects/qfroost/ig-03.webp', alt: 'Quyen Van (qfroost) — reel (opens on Instagram)', external: true }, // ~2025 (mediu)
      { url: 'https://www.instagram.com/reel/DKZIJmFoWSF/', posterSrc: '/projects/qfroost/ig-02.webp', alt: 'Quyen Van (qfroost) — reel' }, // 2025-06-02
      { url: 'https://www.instagram.com/reel/C6imOYVKl47/', posterSrc: '/projects/qfroost/ig-01.webp', alt: 'Quyen Van (qfroost) — reel' }, // 2024-05-04
      { url: 'https://www.instagram.com/p/CxPpAaQqVv7/', posterSrc: '/projects/qfroost/ig-07.webp', alt: 'Quyen Van (qfroost) — post' }, // 2023-09-16
      { url: 'https://www.instagram.com/reel/CxNHpGdqsNK/', posterSrc: '/projects/qfroost/ig-06.webp', alt: 'Quyen Van (qfroost) — reel' }, // 2023-09-15
      { url: 'https://www.instagram.com/reel/CwCH4lnqCfo/', posterSrc: '/projects/qfroost/ig-05.webp', alt: 'Quyen Van (qfroost) — reel' }, // 2023-08-17
    ],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

/** Proiectele sortate „cel mai recent actualizat → cel mai vechi" (după `updatedAt`).
 *  Folosit de grila /projects: ordinea ALL e recency-first, iar filtrarea pe categorie
 *  (client-side) păstrează ordinea DOM, deci și fiecare categorie iese recency-first.
 *  Astfel, când adaugi conținut nou la un proiect și-i bumpezi `updatedAt`, sare pe locul 1. */
export const projectsByRecency = (): Project[] =>
  [...projects].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

// Galerie placeholder pentru paginile individuale (de înlocuit cu media reală per proiect).
// `type` controlează filtrele PHOTO/VIDEO de pe pagina proiectului.
export interface GalleryItem {
  /** Pentru `photo`: calea imaginii. Pentru `video`: calea fișierului .mp4. */
  src: string;
  type: 'photo' | 'video';
  /** Imagine-poster (thumbnail) afișată pentru un video înainte de redare. */
  poster?: string;
  /** Pentru video BTS: dacă `true`, clipul are sunet + controale normale
   *  (excepție de la mut-ul global al galeriei BTS). */
  sound?: boolean;
}

export const galleryPool: GalleryItem[] = [
  { src: images.concrete, type: 'photo' },
  { src: images.camera, type: 'photo' },
  { src: images.artist, type: 'video' },
  { src: images.facade, type: 'photo' },
  { src: images.concert, type: 'video' },
  { src: images.circuit, type: 'photo' },
  { src: images.highway, type: 'video' },
  { src: images.crew, type: 'photo' },
];

// ================================================================
//  HELPERE VIDEO (Vimeo / YouTube)
// ================================================================

/** URL-ul imaginii-thumbnail pentru un clip (afișată în grilă). */
export function videoThumb(v: ProjectVideo): string {
  if (v.provider === 'youtube') return `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
  return `https://vumbnail.com/${v.id}.jpg`; // thumbnail Vimeo (serviciu public gratuit)
}

/** URL-ul de embed pentru player (deschis în lightbox la click). */
export function videoEmbed(v: ProjectVideo): string {
  if (v.provider === 'youtube')
    return `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`;
  return `https://player.vimeo.com/video/${v.id}?autoplay=1`;
}

/** URL-ul de embed Instagram (cardul oficial cu caption). Acceptă linkuri de
 *  post (/p/COD/), reel (/reel/COD/) sau IGTV (/tv/COD/) și le normalizează la
 *  endpoint-ul de embed, care randează cardul fără scriptul embed.js. */
export function instagramEmbed(ig: ProjectInstagram): string {
  const m = ig.url.match(/instagram\.com\/(?:p|reel|tv)\/([\w-]+)/);
  if (!m) return '';
  return `https://www.instagram.com/p/${m[1]}/embed/captioned/`;
}

/** Extrage provider + id dintr-un link Vimeo/YouTube. Utilitar pentru când adaugi
 *  clipuri: dă-i link-ul și obții obiectul gata de pus în `videos`. */
export function parseVideoUrl(url: string): ProjectVideo | null {
  const yt = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/,
  );
  if (yt) return { provider: 'youtube', id: yt[1] };
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { provider: 'vimeo', id: vm[1] };
  return null;
}
