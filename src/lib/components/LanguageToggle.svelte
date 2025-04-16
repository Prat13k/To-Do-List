<script lang="ts">
	/*import { locale, availableLocales, changeLocale } from '$i18n/i18n';*/
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	
	const toggleLanguage=() => {
		const newLang=globalThis.$locale==='en' ? 'es' : 'en';
		changeLocale(newLang);
		if (browser) localStorage.setItem('lang', newLang);
	};
	
	onMount(() => {
		if(!browser) return;
		const saved=localStorage.getItem('lang');
		
		if(saved && availableLocales.includes(saved)){
			changeLocale(saved);
		} 
	});
</script>

<button on:click={toggleLanguage} class='text-xs px-3py-1 rounded border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:shadow-sm'>
	🌐{globalThis.$locale.toUpperCase()}
</button>
