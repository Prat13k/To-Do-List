<script lang = "ts">
	export let type: 'primary' | 'secondary' | 'danger' = 'primary';
	export let size: 'sm'|'md'|'lg' = 'mc'
	export let disabled: boolean = false;
</script>

<button 
	class = {`rounded font-medium transition px-4 py-1
		${type === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700'}
		${type === 'secondary' && 'bg-gray-600 text-gray-700 hover:bg-gray-300'}
		${type === 'danger' && 'bg-red-600 text-white hover:bg-blue-700'}
		${size === 'sm' && 'text-xs'}
		${size === 'md' && 'text-sm'}
		${size === 'lg' && 'text-base'}
	}
	disabled = {disabled}
>
	<slot/>
</button>