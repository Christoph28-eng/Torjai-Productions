// Conținut pentru pagina Behind The Scenes (BTS).
//
// - POZELE nu se trec aici — se pun ca fișiere în `src/assets/bts/`
//   (numite 01.jpg, 02.jpg, 03.jpg ... — numele dă ordinea). Sunt preluate automat.
// - VIDEOURILE se urcă pe Vimeo/YouTube și se adaugă mai jos ca { provider, id }.
//
// Vezi `docs/GHID-CONTINUT.md`, secțiunea „Pagina BTS".

import type { ProjectVideo } from './projects';

export const btsVideos: ProjectVideo[] = [
  // { provider: 'vimeo', id: '123456789' },     // din vimeo.com/123456789
  // { provider: 'youtube', id: 'AbCdEfGhIjk' },  // din youtu.be/AbCdEfGhIjk
];
