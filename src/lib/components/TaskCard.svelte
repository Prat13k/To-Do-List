<script lang="ts">
	import type { Task } from '$stores/taskStore';
	import { createEventDispatcher } from 'svelte';
	import PriorityTag from '$components/PriorityTag.svelte';
	
	export let task: Task;
	const dispatch = createEventDispatcher();
	
	const handleEdit = () => dispatch('edit', {id: task.id});
	const handleDelete = () => dispatch('delete', {id: task.id});
</script>

<div class = "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm flex justify-between items-start transition-all hover:shadow-md">
	<div>
		<h3 class = "text-lg font-semibold text-gray-900 dark:text-white">
			{task.title}
		</h3>
	
		{#if task.description}
			 <p class="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
		{/if}
		<div class="mt-2 inline-block px-3 py-1 text-xs font-medium rounded-full"
			class:!bg-red-100={task.priority === 'high'}
			class:!bg-yellow-100={task.priority === 'medium'}
			class:!bg-green-100={task.priority === 'low'}
		>
			Priority: {task.priority}
		</div>
	</div>

  <div class="flex flex-col gap-1 items-end ml-4">
    <button on:click={handleEdit} title="Edit" class="text-blue-600 hover:text-blue-800 text-sm">✏️</button>
    <button on:click={handleDelete} title="Delete" class="text-red-500 hover:text-red-700 text-sm">🗑️</button>
  </div>
</div>