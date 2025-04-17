<script lang="ts">
	import { onMount } from 'svelte';
	import { taskStore, type Task } from '$stores/taskStore';
	import TaskCard from '$components/TaskCard.svelte';
	import AddTaskModal from '$components/AddTaskModal.svelte';
	import Button from '$components/ui/Button.svelte';
	import { browser} from '$app/environment';
	import { get } from 'svelte/store';

	let showModal = false;
	let editingTask: Task | null = null;
	let tasks: Task[] = [];

	onMount(() => {
		const unsubscribe = taskStore.subscribe((value) => {tasks = value;})
		return unsubscribe;
	});

	function openAddModal() {
		editingTask = null;
		showModal = true;
	}

	function openEditModal(event: CustomEvent<{ id: string }>) {	
		const id = event.detail.id;
		const allTasks = get(taskStore);
		const task = allTasks.find(t => t.id === id);
		
		if (task) {
			editingTask = task;
			showModal = true;
		}
	}

	function handleDelete(event: CustomEvent<{ id: string }>) {
		taskStore.deleteTask(event.detail.id);
	}

	function handleCreate(event: CustomEvent<Omit<Task, 'id' | 'createdAt'>>) {
		taskStore.addTask(event.detail);
	}

	function handleUpdate(event: CustomEvent<Partial<Task> & { id: string }>) {
		taskStore.editTask(event.detail.id, event.detail);
	}
</script>

<main class="p-6 max-w-2xl mx-auto space-y-4">
	<div class="flex justify-between items-center mb-4">
		<h1 class="text-2xl font-bold">📝 Tusk</h1>
		<Button on:click={openAddModal}>＋ Add Task</Button>
	</div>

	{#if $taskStore.length === 0}
		<p class="text-gray-500">No tasks yet. Start by adding one!</p>
	{:else}
		<div class="space-y-3">
			{#each $taskStore as task (task.id)}
				<TaskCard {task} on:edit={openEditModal} on:delete={handleDelete}/>
			{/each}
		</div>
	{/if}

	<AddTaskModal
		bind:show={showModal}
		{editingTask}
		on:create={handleCreate}
		on:update={handleUpdate}
		on:close={() => (showModal = false)}
	/>
</main>
