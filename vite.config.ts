import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import preprocess from 'svelte-preprocess';

export default defineConfig({
	plugins: [sveltekit({
		preprocess: preprocess()
	})],
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib'),
			$components: path.resolve('./src/lib/components'),
			$stores: path.resolve('./src/lib/stores'),
			$utils: path.resolve('./src/lib/utils'),
			$styles: path.resolve('./src/lib/styles'),
			$i18n: path.resolve('./src/i18n')
		}
	}
});
