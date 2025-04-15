import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from 'svelte/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
	files: {
		appTemplate: 'src/app.html',
		routes: 'src/routes'
	}
    alias: {
      $lib: './src/lib',
      $components: './src/lib/components',
      $stores: './src/lib/stores',
      $utils: './src/lib/utils',
      $styles: './src/lib/styles'
    }
  }
};

export default config;