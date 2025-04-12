<script lang = "ts">
	import {createEventDispatcher, onMount} from 'svelte';
	import type {Task, Priority} from '$stores/taskStore';
	
	export let show = false;
	export let editingTask: Task | null = null;
	
	const dispatch = createEventDispatcher();
	
	let title = '';
	let description = '';
	let priority: Priority = 'medium';
	
	onMount(() => {
		if(editingTask){
			title = editingTask.title;
			description = editingTask.description??;
			priority = editingTask.Priority;
		}
	});
	
	const close = () => dispatch('close');
	
	const save = () => {
		if(title.trim().length === 0) return;
		const payload  = {title, description, priority};
		
		if(editingTask){
			dispatch('update',{ ...payload, id: editingTask.id});
		}
		else{
			dispatch('create', payload)
		}
		close();
	};
</script>

{#if show}
	<div class = 'fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4'>
		<div class = 'bg-white dark:bg-gray-900 rounded-x1 p-6 w-full max-w-md shadow-lg animat-fadeIn'>
			<h2 class = 'text-xl font-semibold mb-4'>{editingTask ? 'Edit Task':'Add Task'}
			
			<input
				bind:value = {description}
				placeholder = 'Title'
				class = 'w-full mb-3 p-2 border rounded'
			/>
			
			<textarea
				bind:value = {description}
				placeholder = "Description"
				class = "w-full mb-3 p-2 border rounded"
			/>
			
			<label class = 'block mb-2 font-medium'>
				Priority:
			</label>
			
			<select bind:value = {priority} class = 'w-full p-2 border rounded mb-4'
				<option value = "low">Low 🟢</option>
				<option value = "medium">Medium 🟡</option>
				<option value = "high">High 🔴</option>
			</select>
			
			<div class = "flex justify-end gap-2">
				<button on: click = {close} class = 'bg-gray-200 hover:bg-gray-300 text-sm px-4 py-1 rounded'>
					Cancel
				</button>
				<button on: click = {save} class = 'bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded'>
					{editingTask ? 'Update' : 'Add'}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.animate-fadeIn{
		animat : fadeIn 0.2s ease-out;
	}
	
	@keyframes fadeIn {
		from{opacity : 0; transform : scale(0.95);}
		to{opacity:1; transform: scale(1);}
	}
</style>