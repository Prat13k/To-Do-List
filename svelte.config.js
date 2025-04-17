import adapter from '@sveltejs/adapter-auto';
//import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$lib: path.resolve('./src/lib'),
			$components: path.resolve('./src/lib/components'),
			$stores: path.resolve('./src/lib/stores'),
			$utils: path.resolve('./src/lib/utils'),
			$styles: path.resolve('./src/lib/styles'),
			$i18n: path.resolve('./src/i18n')
		}
	},
	preprocess: preprocess()
};

export default config;
