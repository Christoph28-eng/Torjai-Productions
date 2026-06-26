// Construiește lista de elemente pentru o galerie (poze optimizate + clipuri video).
// Folosită identic de pagina de proiect (src/pages/projects/[slug].astro) și de
// pagina BTS (src/pages/bts.astro). Partea de prezentare e în components/Gallery.astro.

import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { galleryPool, videoThumb, videoEmbed, instagramEmbed, type ProjectVideo, type ProjectClip, type ProjectInstagram, type GalleryItem } from '../data/projects';

/** Un element afișat în galerie: o poză sau un clip. */
export type DisplayItem = {
  type: 'photo' | 'video';
  thumb: string;
  full: string;
  /** URL de embed pentru clipuri Vimeo/YouTube (iframe). Gol pentru poze / video local. */
  embed: string;
  /** Calea unui fișier video local (MP4) servit din public/. Gol pentru poze / embed. */
  videoSrc?: string;
  /** Dacă `true`, clipul local pornește fără sunet (cu buton de volum în player). */
  muted?: boolean;
  /** Dacă e setat, elementul NU deschide lightbox-ul — e un link extern (tab nou).
   *  Folosit pentru reels Instagram care nu pot fi embeduite. */
  href?: string;
  alt: string;
};

export interface BuildGalleryOptions {
  /** Pozele locale (din src/assets/...), extrase deja din import.meta.glob. */
  localPhotos: { name: string; image: ImageMetadata }[];
  /** Clipurile video ale galeriei (Vimeo/YouTube). */
  videos?: ProjectVideo[];
  /** Clipuri scurte self-hostate (MP4 din public/). */
  clips?: ProjectClip[];
  /** Postări/reels Instagram embeduite. */
  instagram?: ProjectInstagram[];
  /** Text alternativ pentru poze. */
  photoAlt: string;
  /** Text alternativ de bază pentru clipuri (folosit când clipul n-are `alt` propriu). */
  videoAlt: string;
  /** Text alternativ pentru imaginile placeholder (când nu există încă media reală). */
  fallbackAlt: string;
  /** Dacă `false`, NU se mai adaugă placeholder-ele când proiectul n-are media reală
   *  (ex. proiecte care doar fac link extern — conținutul stă pe alt site). Implicit `true`. */
  fallback?: boolean;
}

/**
 * Optimizează pozele (thumb mic pentru grilă + versiune mare pentru lightbox),
 * adaugă clipurile video și, dacă nu există media reală, întoarce placeholder-ele.
 */
export async function buildGallery({
  localPhotos,
  videos = [],
  clips = [],
  instagram = [],
  photoAlt,
  videoAlt,
  fallbackAlt,
  fallback = true,
}: BuildGalleryOptions): Promise<DisplayItem[]> {
  // Ordine după numele fișierului (numeric: 01, 02, 10 ...).
  const photos = [...localPhotos].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true }),
  );
  const posterByName = new Map(photos.map((p) => [p.name, p.image]));

  // Construim întâi lista în ordinea „de bază" (poze → video → clipuri → Instagram),
  // fiecare element cu un `date` opțional. La final sortăm: elementele cu `date`
  // urcă în capul galeriei (cel mai recent primul), iar restul (fără dată — pozele
  // și media veche) rămân DUPĂ ele, în ordinea lor existentă. Așa, orice media nou
  // adăugat (cu `date` setat) apare automat primul în galeria proiectului, fără să
  // rearanjăm ce e deja aici. Vezi convenția din src/data/projects.ts.
  const entries: { date?: string; item: DisplayItem }[] = [];

  // Poze locale (thumb mic pentru grilă + versiune mare pentru lightbox).
  for (const { image } of photos) {
    const thumb = await getImage({ src: image, width: 900, format: 'webp' });
    const full = await getImage({ src: image, width: 2200, format: 'webp' });
    entries.push({ item: { type: 'photo', thumb: thumb.src, full: full.src, embed: '', alt: photoAlt } });
  }

  // Clipuri video (Vimeo/YouTube) — filmele proiectului, înaintea clipurilor scurte.
  for (const v of videos) {
    let thumb = videoThumb(v);
    if (v.posterSrc) {
      thumb = v.posterSrc; // poster direct din public/ (ex. coperta proiectului)
    } else if (v.poster && posterByName.has(v.poster)) {
      const p = await getImage({ src: posterByName.get(v.poster)!, width: 900, format: 'webp' });
      thumb = p.src;
    }
    entries.push({ date: v.date, item: { type: 'video', thumb, full: thumb, embed: videoEmbed(v), alt: v.alt ?? videoAlt } });
  }

  // Clipuri scurte self-hostate (MP4 din public/) — redate local în lightbox.
  for (const c of clips) {
    entries.push({
      date: c.date,
      item: { type: 'video', thumb: c.poster, full: c.poster, embed: '', videoSrc: c.src, alt: c.alt ?? videoAlt },
    });
  }

  // Postări/reels Instagram — poster în grilă, card oficial (cu caption) în lightbox.
  for (const ig of instagram) {
    // Link-out: reels pe care IG nu le embeduiește → la click se deschid pe Instagram.
    if (ig.external) {
      entries.push({
        date: ig.date,
        item: { type: 'video', thumb: ig.posterSrc, full: ig.posterSrc, embed: '', href: ig.url, alt: ig.alt ?? videoAlt },
      });
      continue;
    }
    const embed = instagramEmbed(ig);
    if (!embed) continue; // link nevalid → sărim peste
    entries.push({
      date: ig.date,
      item: { type: 'video', thumb: ig.posterSrc, full: ig.posterSrc, embed, alt: ig.alt ?? videoAlt },
    });
  }

  // Sortare stabilă: media cu `date` în față (cel mai recent primul); fără `date`
  // rămâne în ordinea de bază, după cele datate. (Array.sort e stabil în JS.)
  entries.sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });

  const gallery: DisplayItem[] = entries.map((e) => e.item);

  // Fallback placeholders (ca pagina să nu fie goală până se adaugă media reală).
  if (gallery.length === 0 && fallback) {
    for (const g of galleryPool) {
      gallery.push({ type: g.type, thumb: g.src, full: g.src, embed: '', alt: fallbackAlt });
    }
  }

  return gallery;
}

/**
 * Mapează o listă de `GalleryItem` (media reală din public/, ex. `btsGallery`)
 * la `DisplayItem` pentru componenta Gallery. Clipurile sunt fișiere MP4 locale
 * (`videoSrc`), cu posterul ca thumbnail în grilă. Nu se optimizează — fișierele
 * sunt deja în public/.
 */
export function galleryItemsToDisplay(
  items: GalleryItem[],
  { photoAlt, videoAlt, muteVideos = false }:
    { photoAlt: string; videoAlt: string; muteVideos?: boolean },
): DisplayItem[] {
  return items.map((it) =>
    it.type === 'video'
      ? {
          type: 'video',
          thumb: it.poster ?? it.src,
          full: it.poster ?? it.src,
          embed: '',
          videoSrc: it.src,
          muted: muteVideos && !it.sound,
          alt: videoAlt,
        }
      : { type: 'photo', thumb: it.src, full: it.src, embed: '', alt: photoAlt },
  );
}
