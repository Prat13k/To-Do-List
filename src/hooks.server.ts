// src/hooks.seerver.ts
import type {Handle} from 'sveltejs/kit';
import type {redirect} from 'sveltejs/kit';

export const handle: Handle = async ({event.resolve}) => {
	const lang = event.url.searchParams.get('lang') || 'en';
	const theme = event.cookies.get('theme') || 'light';
	
	event.local.lang = lang; 
	event.local.theme = theme;
	
	return resolve(event, {
		transformPageChunk : ({html}) => html.replace(%lang%, lang).replace(%theme, theme)
	});
};