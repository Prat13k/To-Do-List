type Theme = 'light' | 'dark' | 'night';

export function setTheme(theme: Theme)
{
	document.documentElement.setAttribute('data-Theme',theme);
	localStorage.setItem('tusk-theme',theme);
}

export function getSavedTheme(): Theme
{
	const saved = localStorage.getItem('tusk-theme')as Theme;
	return saved || 'light';
}