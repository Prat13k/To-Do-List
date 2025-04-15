<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import type { Task, Priority } from '$stores/taskStore';
  import Button from '$components/ui/Button.svelte';
  import Modal from '$components/ui/Modal.svelte';

  export let show = false;
  export let editingTask: Task | null = null;

  const dispatch = createEventDispatcher();

  let title = '';
  let description = '';
  let priority: Priority = 'medium';

  onMount(() => {
    if (editingTask) {
      title = editingTask.title;
      description = editingTask.description ?? '';
      priority = editingTask.priority;  // Fixed the typo here
    }
  });

  const close = () => {
    // Dispatch a close event to the parent component to update the `show` state
    dispatch('close');
  };

  const save = () => {
    if (title.trim().length === 0) return;
    const payload = { title, description, priority };

    // Dispatch either 'create' or 'update' event depending on whether editingTask exists
    if (editingTask) {
      dispatch('update', { ...payload, id: editingTask.id });
    } else {
      dispatch('create', payload);
    }
    close();
  };
</script>

<Modal bind:show on:close={close}>
  <h2 class='text-xl font-semibold mb-4'>
    {editingTask ? 'Edit Task' : 'Add Task'}
  </h2>

  <input
    bind:value={title}
    placeholder='Title'
    class='w-full mb-3 p-2 border rounded'
  />

  <textarea>
    bind:value={description}
    placeholder="description"
    class="w-full mb-3 p-2 border rounded">
  </textarea>

  <label 
	for="priority-select"
	class="block mb-2 font-medium">
    Priority:
  </label>

  <select id = "priority-select "bind:value={priority} class="w-full p-2 border rounded mb-4">
    <option value="low">Low 🟢</option>
    <option value="medium">Medium 🟡</option>
    <option value="high">High 🔴</option>
  </select>

  <div class="flex justify-end gap-2">
    <Button type="secondary" on:click={close}>
      Cancel
    </Button>
    <Button type="primary" on:click={save}>
      {editingTask ? 'Update' : 'Add'}
    </Button>
  </div>
</Modal>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
	}
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>