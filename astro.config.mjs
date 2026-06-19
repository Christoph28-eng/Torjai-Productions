import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: schimbă cu domeniul final când îl avem
  site: 'https://torjaiproductions.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
