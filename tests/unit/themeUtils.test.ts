import{ setTheme, getSavedTheme } from '$utils/theme';

describe('themeUtils', () => {
	it('sets theme in DOM and localStorage', () => {
		setTheme('dark');
		expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
		expect(localStorage.getItem('tusk-theme')).toBe('dark');
	});
	
	it('returns saved theme', () => {
		localStorage.setItem('tusk-theme', 'night');
		expect(getSavedTheme()).toBe('night');
	});
});