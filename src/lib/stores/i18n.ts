import { writable } from 'svelte/store';

export const availableLocales = ['en', 'es'];
export const locale = writable('en');

export const changeLocale = (lang: string) => {
	if (availableLocales.includes(lang)) {
		locale.set(lang);
	}
};