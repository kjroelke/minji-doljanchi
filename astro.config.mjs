import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	site: 'https://kjroelke.github.io',
	base: 'minji-doljanchi',
	build: {
		assets: 'dist',
	},
});
