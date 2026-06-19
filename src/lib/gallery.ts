// Construiește lista de elemente pentru o galerie (poze optimizate + clipuri video).
// Folosită identic de pagina de proiect (src/pages/projects/[slug].astro) și de
// pagina BTS (src/pages/bts.astro). Partea de prezentare e în components/Gallery.astro.

import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { galleryPool, videoThumb, videoEmbed, type ProjectVideo } from '../data/projects';

/** Un element afișat în galerie: o poză sau un clip. */
export type DisplayItem = {
  type: 'photo' | 'video';
  thumb: string;
  full: string;
  embed: string;
  alt: string;
};

export interface BuildGalleryOptions {
  /** Pozele locale (din src/assets/...), extrase deja din import.meta.glob. */
  localPhotos: { name: string; image: ImageMetadata }[];
  /** Clipurile video ale galeriei (Vimeo/YouTube). */
  videos?: ProjectVideo[];
  /** Text alternativ pentru poze. */
  photoAlt: string;
  /** Text alternativ de bază pentru clipuri (folosit când clipul n-are `alt` propriu). */
  videoAlt: string;
  /** Text alternativ pentru imaginile placeholder (când nu există încă media reală). */
  fallbackAlt: string;
}

/**
 * Optimizează pozele (thumb mic pentru grilă + versiune mare pentru lightbox),
 * adaugă clipurile video și, dacă nu există media reală, întoarce placeholder-ele.
 */
export async function buildGallery({
  localPhotos,
  videos = [],
  photoAlt,
  videoAlt,
  fallbackAlt,
}: BuildGalleryOptions): Promise<DisplayItem[]> {
  // Ordine după numele fișierului (numeric: 01, 02, 10 ...).
  const photos = [...localPhotos].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true }),
  );
  const posterByName = new Map(photos.map((p) => [p.name, p.image]));

  const gallery: DisplayItem[] = [];

  // Poze locale (thumb mic pentru grilă + versiune mare pentru lightbox).
  for (const { image } of photos) {
    const thumb = await getImage({ src: image, width: 900, format: 'webp' });
    const full = await getImage({ src: image, width: 2200, format: 'webp' });
    gallery.push({ type: 'photo', thumb: thumb.src, full: full.src, embed: '', alt: photoAlt });
  }

  // Clipuri video.
  for (const v of videos) {
    let thumb = videoThumb(v);
    if (v.poster && posterByName.has(v.poster)) {
      const p = await getImage({ src: posterByName.get(v.poster)!, width: 900, format: 'webp' });
      thumb = p.src;
    }
    gallery.push({ type: 'video', thumb, full: thumb, embed: videoEmbed(v), alt: v.alt ?? videoAlt });
  }

  // Fallback placeholders (ca pagina să nu fie goală până se adaugă media reală).
  if (gallery.length === 0) {
    for (const g of galleryPool) {
      gallery.push({ type: g.type, thumb: g.src, full: g.src, embed: '', alt: fallbackAlt });
    }
  }

  return gallery;
}
