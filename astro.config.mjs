import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://kjroelke.github.io',
	base: 'minji-doljanchi',
	build: {
		assets: 'dist',
	},
});
