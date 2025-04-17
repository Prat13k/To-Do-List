<script lang="ts">
	export let type: 'primary' | 'secondary' | 'danger' = 'primary';
	export let size: 'sm'|'md'|'lg' = 'md';
	export let disabled: boolean = false;
</script>

<button 
	class = " rounded font-medium transition px-4 py-1 "
	class:bg-blue-600 = {type === 'primary'}
	class:text-white = {type === 'primary' || type === "danger"}
	class:hover\:bg-blue-700 = {type === 'primary'}
	class:bg-gray-600 = {type === 'secondary'}
	class:text-gray-100 = {type === 'secondary'}
	class:hover\:bg-gray-300 = {type === 'secondary'}
	class:bg-red-500 = {type === 'danger'}
	class:hover\:bg-red-600 = {type === 'danger'}
	class:text-xs = {size === 'sm'}
	class:text-sm = {size === 'md'}
	class:text-base = {size === 'lg'}
	disabled = {disabled}
>
	<slot/>
</button>