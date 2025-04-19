<script lang="ts">
	import { locale, availableLocales, changeLocale } from '$stores/i18n';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { get } from 'svelte/store';
	
	let currentLocale = 'en'
	
	const toggleLanguage = () => {
		const newLang=globalThis.$locale==='en' ? 'es' : 'en';
		changeLocale(newLang);
		if (browser) localStorage.setItem('lang', newLang);
	};
	
	onMount(() => {
		if(!browser) return;
		const saved=localStorage.getItem('lang');
		
		if(saved && availableLocales.includes(saved)){
			changeLocale(saved);
			currentLocale = saved;
		} 
		else{
			currentLocale = get(locale);
		}
	});
	
	locale.subscribe((val) => {
		currentLocale = val;
	});
</script>

<button on:click={toggleLanguage} class='text-xs px-3 py-1 rounded border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:shadow-sm'>
	🌐{currentLocale.toUpperCase()}
</button>
