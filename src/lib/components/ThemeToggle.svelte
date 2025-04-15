<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { writable } from 'svelte/store';
	
	const themes = ['light', 'dark', 'night'] as const;
	type Theme  = typeof themes[number];
	
	const themeStore = writable<Theme>('light');
	
	onMount(() => {
		if(!browser) return;
		const saved = localStorage.getTtem('tusk-theme') as Theme;
		const initial = saved && themes.includes(saved) ? saved : 'light';
		themeStore.set(inital);
		updateDom(inital);
	});
	
	function cycleTheme(){
		themeStore.update((current) => {
			const index = themes.indexOf(current);
			const next = themes[(index + 1) % themes.length];
			updateDOM(next);
			localStorage.setItem('tusk-theme', next);
			return next;
		});
	}
	
	function updateDom(theme: Theme){
		if (!browser) return;
		document.documentElement.setAttribute('data-theme', theme);
	}
</script>

<button on:click = {cycleTheme} class = "text-xs px-3 py-1 rounded border border-gray-400 dark: border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:bg-gray-200 hover:shadow-sm">
	Toggle Theme
</button>