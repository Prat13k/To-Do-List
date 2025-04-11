/**@type {import{'tailwindcss'}.Config}**/

export default{
	content : [
		'./src/**/*.{html,js,svelte,ts}',
		'./src/lib/**/*.{html,js.svelt,ts}'
	],
	theme : {
		extend : {
			colors : {
				zen : '#f4f1ee',
				elegant : '#2b2d42',
				highlight : '#f77f00'
			},
			fontFamily : {
				sans : ['Inter', 'sans-serif'],
				serif : ['Playfair Display', 'serif']
			}
		}
	},
	plugins : []
};