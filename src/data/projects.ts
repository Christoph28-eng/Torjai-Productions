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

export const projects: Project[] = [
  {
    slug: 'kinetic-01',
    title: 'KINETIC 01',
    client: 'NIKE ACG',
    category: 'COMMERCIAL',
    alt: 'Brutalist concrete interior with dramatic shadows and a distant amber-lit hallway.',
    src: images.concrete,
    dots: ['bg-gray-300', 'bg-technical-amber'],
  },
  {
    slug: 'aperture',
    title: 'APERTURE',
    client: 'PORSCHE',
    category: 'PRODUCT',
    alt: 'Macro shot of machined camera parts with an amber LED indicator on a black background.',
    src: images.camera,
    dots: ['bg-gray-300', 'bg-gray-800'],
  },
  {
    slug: 'echoes',
    title: 'ECHOES',
    client: 'BELSTAFF',
    category: 'DOCUMENTARY',
    alt: 'Moody low-key portrait of an artist in a warehouse studio, lit by a single harsh light.',
    src: images.artist,
    dots: ['bg-gray-300', 'bg-gray-300'],
  },
  {
    slug: 'gridlock',
    title: 'GRIDLOCK',
    client: 'ADIDAS',
    category: 'NARRATIVE',
    alt: 'Brutalist building facade at twilight with amber-lit windows forming a geometric grid.',
    src: images.facade,
    dots: ['bg-technical-amber', 'bg-technical-amber'],
  },
  {
    slug: 'the-void-sessions',
    title: 'THE VOID SESSIONS',
    client: 'WILLIAMS F1',
    category: 'LIVE EVENT // MULTICAM',
    alt: 'Concert stage from behind the performer, silhouetted against amber light and heavy smoke.',
    src: images.concert,
    dots: ['bg-gray-800', 'bg-technical-amber'],
    size: 'tall',
  },
  {
    slug: 'synapse',
    title: 'SYNAPSE',
    client: "REV'IT!",
    category: 'TECH BRANDING',
    alt: 'Extreme macro of circuit board pathways reflecting stark white light on a matte black PCB.',
    src: images.circuit,
    dots: ['bg-gray-300', 'bg-gray-800'],
  },
  {
    slug: 'outland',
    title: 'OUTLAND',
    client: 'ASUS ROG',
    category: 'SHORT FILM',
    alt: 'Desolate desert highway at night lit only by unseen headlights, deep charcoal sky.',
    src: images.highway,
    dots: ['bg-technical-amber', 'bg-gray-300'],
  },
  {
    slug: 'behind-the-lens',
    title: 'BEHIND THE LENS',
    client: 'AETHER',
    category: 'STUDIO PROFILE',
    alt: 'Wide frame of a film crew on set in a dim warehouse, camera rig against a warm amber light.',
    src: images.crew,
    dots: ['bg-gray-800', 'bg-gray-800'],
    size: 'wide',
  },
  {
    slug: 'northbound',
    title: 'NORTHBOUND',
    client: 'SAMSUNG',
    category: 'COMMERCIAL',
    alt: 'Brutalist building facade at twilight with amber-lit windows.',
    src: images.facade,
    dots: ['bg-gray-300', 'bg-technical-amber'],
  },
  {
    slug: 'afterglow',
    title: 'AFTERGLOW',
    client: 'RAY-BAN',
    category: 'MUSIC VIDEO',
    alt: 'Moody low-key portrait of an artist in a warehouse studio.',
    src: images.artist,
    dots: ['bg-gray-800', 'bg-gray-300'],
  },
  {
    slug: 'field-notes',
    title: 'FIELD NOTES',
    client: 'RED BULL',
    category: 'DOCUMENTARY',
    alt: 'Extreme macro of circuit board pathways under stark white light.',
    src: images.circuit,
    dots: ['bg-technical-amber', 'bg-gray-300'],
  },
  {
    slug: 'halcyon',
    title: 'HALCYON',
    client: 'BMW',
    category: 'BRAND FILM',
    alt: 'Macro shot of machined camera parts with an amber LED indicator.',
    src: images.camera,
    dots: ['bg-gray-300', 'bg-gray-800'],
  },
  {
    slug: 'the-long-room',
    title: 'THE LONG ROOM',
    client: 'A24',
    category: 'SHORT FILM',
    alt: 'Film crew on set in a dimly lit industrial warehouse.',
    src: images.crew,
    dots: ['bg-gray-800', 'bg-technical-amber'],
    size: 'wide',
  },
  {
    slug: 'driftwood',
    title: 'DRIFTWOOD',
    client: 'STYRKR',
    category: 'CAMPAIGN',
    alt: 'Desolate desert highway at night lit only by unseen headlights.',
    src: images.highway,
    dots: ['bg-technical-amber', 'bg-technical-amber'],
  },
  {
    slug: 'static',
    title: 'STATIC',
    client: 'BOILER ROOM',
    category: 'MUSIC VIDEO',
    alt: 'Brutalist concrete interior with dramatic shadows.',
    src: images.concrete,
    dots: ['bg-gray-300', 'bg-gray-300'],
  },
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
