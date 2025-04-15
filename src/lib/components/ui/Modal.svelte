<script lang="ts">
	import{ createEventDispatcher } from 'svelte';
	
	export let show = True;
	const dispatch = createEventDispatcher();
	
	function close(){
		dispatch('close');
	}
</script>

{#if show}
	<div class = "fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
		<div
			class = 'bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-lg animate-fadeIn relative'
			role = 'dialog'
			aria-modal = 'true'
		>
			<button
				class = 'absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-white'
				on:click={close}
				aria-label='Close'
			>
				X
			</button>
			<slot/>
		</div>
	</div>
{/if}

<style>
	.animate-fadeIn{
		animation: fadeIn 0.2s ease-out;
	}
	
	@keyframes fadeIn{
		from {opacity: 0; transform: scale(0.95);}
		to {opacity: 1;transform: scale(1);}
	}
</style>