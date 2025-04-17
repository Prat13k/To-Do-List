/** @type {import('tailwindcss').Config} */

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./src/lib/**/*.{svelte,ts}',
		'./src/routes/**/*.{svelte,ts}',
	],
	theme: {
		extend: {
			colors: {
				bg: 'var(--bg)',
				text: 'var(--text)'
			}
		}
	},
	plugins: []
}
