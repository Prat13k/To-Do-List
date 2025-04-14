<script lang="ts">
	import { onMount } from 'svelte';
	import { taskStore, type Task } from '$stores/taskStore';
	import TaskCard from '$components/TaskCard.svelte';
	import AddTaskModal from '$components/AddTaskModal.svelte';
	import Button from '$components/ui/Button.svelte';

	let showModal = false;
	let editingTask: Task | null = null;

	let tasks: Task[] = [];
	const unsubscribe = taskStore.subscribe((v) => (tasks = v));

	onMount(() => {
		return () => unsubscribe(); // clean up
	});

	function openAddModal() {
		editingTask = null;
		showModal = true;
	}

	function openEditModal(event: CustomEvent<{ id: string }>) {
		const task = tasks.find((t) => t.id === event.detail.id);
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
