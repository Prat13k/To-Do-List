import adapter from '@sveltejs/adapter-auto';
import {vitePreprocess} from '@sveltejs/kit/vite';

export default{
	kit : {
		adapter : adapter(),
		alias : {
			$lib :'./src/lib',
			$components :'./src/lib/components',
			$stores :'./src/lib/stores',
			$utils :'./src/lib/utils',
			$styles :'./src/lib/styles'
		}
	},
	preprocess: vitePreprocess()
};