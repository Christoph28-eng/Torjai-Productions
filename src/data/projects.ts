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
}

/** Un clip scurt self-hostat (MP4 servit din public/). */
export interface ProjectClip {
  /** Calea fișierului .mp4 (ex. '/projects/avanti/clip-01.mp4'). */
  src: string;
  /** Calea posterului afișat în grilă (ex. '/projects/avanti/clip-01-poster.webp'). */
  poster: string;
  alt?: string;
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
    title: 'BERLINALE',
    client: '',
    category: 'EDITORIALS & CULTURE',
    alt: 'Berlinale — Berlin International Film Festival, photography.',
    src: '/projects/berlinale-cover.webp',
    dots: ['bg-gray-300', 'bg-technical-amber'],
  },
  {
    slug: 'avanti',
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
    title: 'SPIKY CHERRY',
    client: '',
    category: 'EDITORIALS & CULTURE',
    alt: 'Spiky Cherry — editorial photography.',
    src: '/projects/spiky-cherry-cover.webp',
    dots: ['bg-gray-300', 'bg-gray-300'],
  },
  {
    slug: 'ywl',
    title: 'YWL',
    client: '',
    category: 'EDITORIALS & CULTURE',
    alt: 'YWL — film stills.',
    src: '/projects/ywl-cover.webp',
    dots: ['bg-technical-amber', 'bg-gray-800'],
    videos: [{ provider: 'youtube', id: 'dmyKqZgYtrY', alt: 'YWL — film' }],
  },
  // ── Campaigns & Commercial ───────────────────────────────────────
  {
    slug: 'ekstrategy',
    title: 'EKSTRATEGY & TEKIRDAĞ RAKI',
    client: '',
    category: 'CAMPAIGNS & COMMERCIAL',
    alt: 'Ekstrategy × Tekirdağ Rakı — commercial.',
    src: '/projects/ekstrategy-cover.webp',
    dots: ['bg-gray-800', 'bg-technical-amber'],
    clips: [
      { src: '/projects/ekstrategy/clip-01.mp4', poster: '/projects/ekstrategy/clip-01-poster.webp' },
    ],
    videos: [
      { provider: 'youtube', id: '6lLWeOm7UDo', alt: 'Ekstrategy — AWAI' },
      { provider: 'youtube', id: 'wyWpe3Ky3ws', alt: 'Ekstrategy — INTER' },
      { provider: 'youtube', id: 'GncaYgNBLyc', alt: 'Ekstrategy — VIBE' },
    ],
  },
  {
    slug: 'playground',
    title: 'PLAYGROUND BOXING BERLIN',
    client: '',
    category: 'CAMPAIGNS & COMMERCIAL',
    alt: 'Playground Boxing Berlin — photography.',
    src: '/projects/playground-cover.webp',
    dots: ['bg-gray-300', 'bg-gray-800'],
  },
  {
    slug: 'paris-bar',
    title: 'PARIS BAR',
    client: '',
    category: 'CAMPAIGNS & COMMERCIAL',
    alt: 'Paris Bar — short film.',
    src: '/projects/paris-bar-cover.webp',
    dots: ['bg-technical-amber', 'bg-gray-300'],
    videos: [
      { provider: 'youtube', id: '8UpcFhlVdyc', posterSrc: '/projects/paris-bar/clip-01-poster.webp', alt: 'Paris Bar — short film' },
    ],
  },
  // ── Narrative & Broadcast (University projects) ───────────────────
  {
    slug: 'first-day-at-work',
    title: 'FIRST DAY AT WORK',
    client: '',
    category: 'NARRATIVE & BROADCAST',
    alt: 'First Day at Work (Horror) — film stills.',
    src: '/projects/first-day-at-work-cover.webp',
    dots: ['bg-gray-800', 'bg-gray-800'],
    videos: [{ provider: 'youtube', id: '4cvxSFMQ79o', alt: 'First Day at Work' }],
  },
  {
    slug: 'schichtwechsel',
    title: 'SCHICHTWECHSEL',
    client: '',
    category: 'NARRATIVE & BROADCAST',
    alt: 'Schichtwechsel (Shift Change) — film stills.',
    src: '/projects/schichtwechsel-cover.webp',
    dots: ['bg-gray-300', 'bg-technical-amber'],
    videos: [{ provider: 'youtube', id: 'iCXxy0Bbyj8', alt: 'Schichtwechsel' }],
  },
  {
    slug: 'pointe-shoes',
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
  // Categorie nouă, încă fără proiecte. Adaugă aici intrări cu
  // category: 'PROFILES' (portrete / profile de persoane sau branduri).
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

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
