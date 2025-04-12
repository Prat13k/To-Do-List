<script lang = "ts">
	import type {Task} from '$stores/taskStore';
	import {createEventDispatcher} from 'svelte';
	
	export let task: Task;
	const dispatch = createEventDispatcher();
	
	const handleEdit = () => dispatch('edit', {id: task.id});
	const handleDelete = () => dispatch('delete', {id: task.id});
</script>

<div class = "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm flex justify-between items-start transition-all hover:shadow-md">
	<div>
		<h3 class = "text-lg font-semihold text-gray-900 dark:text-white">
			{task.title}
		</h3>
	
		{#if task.description}
			<p class = 'text-sm text-gray-600 dark:text-gray-300 mt-1'>
				{task.description}
			</p>
		{/if}
		
		<div class = "mt-2 inline-block text-xs font-semihold px-3 py-1 rounded-full "
			class:bg-green-200 = {task.priority === 'low'}
			class:bg-yellow-200 = {task.priority === 'medium'} 
			class:bg-red-200 = {task.priority === 'high'}
		>
			{task.priority.toUpperCase()}
		</div>
	</div>
	
	<div class = 'flex flex-col gap-1 items-end ml-4'>
		<button on:click = {handleEdit} class = 'text-blue-600 hover:text-blue-800 text-sm'>✏️</button>
		<button on:click = {handleEdit} class = 'text-blue-600 hover:text-blue-800 text-sm'>🗑️</button>
	</div>
</div>