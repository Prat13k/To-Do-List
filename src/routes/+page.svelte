<script lang = "es">
	import {onMount} from 'svelte';
	import {taskStore, type Task} from '$stores/taskStore';
	import TaskCard from '$components/TaskCard.svelte';
	import AddTaskModal from '$components/AddTaskModal.svelte';
	import Button from '$components/ui/Button.svelte;
	
	let showModal = false;
	let editingTask: Task | null = null;
	
	let $tasks: Task[];
	const unsubscribe = taskStore.subscribe((v) => ($tasks = v));
	
	onMount(() => unsubscribe);
	
	function openAddModal(){
		editingTask = null;
		showModal = true;
	}
	
	function openEditModal(event: CustomEvent<{id: string}>)
	{
		const task = $tasks.find((t) => t.id === event.detail.id);
		if(task){
			editingTask = task;
			showModal = true;
		}
	}
	
	function handleDelete(event: CustomEvent<{id:string}>)
	{
		taskStore.deleteTask(event.detail.id);
	}

	function handleCreate(event: CustomEvent<Omit<Task, 'id' | 'createdAt'>>)
	{
		taskStore.addTask(event.detail);
	}

	function handleUpdate(event: CustomEvent<Partial<Task> & {id:String}>)
	{
		taskStore.editTask{event.detail.id, event.detail);
	}
</script>

<div class="bg-bg text-text p-4 rounded">
  Hello, Tusk 🌿
</div>

<main class = 'p-6 max-w-2xl mx-auto space-y-4'>
	<div class = "flex justify-between items-center mb-4">
		<h1 class = "text-2xl font-bold">
			Tusk
		</h1>
		 <div class="flex items-center gap-3">
			<a href="/settings" class="text-sm text-gray-500 hover:text-gray-700">
				⚙️ Settings
			</a>
			<Button on:click={openAddModal}>
				＋ Add Task
			</Button>
		</div>
	</div>
	
	{#if $tasks.length === 0}
		<p class = "text-gray-500">
			No Tasks Yet. Start by adding one!
		</p>
	{:else}
		<div class = 'space-y-3'>
			{#each $tasks as task (task.id)}
				<TaskCard
					{task}
					on:edit = {openEditModl}
					on:delete = {handleDelete}
				/>
			{/each}
		</div>
	{/if}
	<AddTaskModal
		bind:show = {showModal}
		{editingTask}
		on: create = {handleCreate}
		on: update = {handleUpdate}
		on: close = {() => (showModal = false)}
	/>
</main>