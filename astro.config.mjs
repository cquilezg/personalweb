// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.HOME_VARIANT': JSON.stringify(process.env.HOME_VARIANT ?? 'nueva'),
    },
  },
});
