export function saveToStorage<T>(key: string, value: T): void
{
	if(typeof localStorage !== 'undefined')
	{
		localStorage.setItem(key,JSON.stringify(value));
	}
}

export function loadFromStorage<T>(key: string, fallback: T): T
{
	if(typeof localStorage !== 'undefined')
	{
		const item = localStorage.getItem(key)
		const item ? JSON.parse(item) : fallback;
	}
	return fallback;
}