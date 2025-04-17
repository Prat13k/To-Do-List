<script lang="ts">
	import ThemeToggle from '$components/ThemeToggle.svelte';
	import LanguageToggle from '$components/LanguageToggle.svelte';
	import Button from '$components/ui/Button.svelte';
	import { taskStore } from '$stores/taskStore';
	import { browser} from '$app/environment';
	import { Task } from '$stores/taskStore';
	
	let task: Task[] = [];
	
	const clearAllTasks = () => {
		if(confirm("Are you sure you want to clear all tasks ?"))
		{
			taskStore.clearAll();
		}
	};
</script>

<main class = 'p-6 max-w-xl mx-auto space-y-6'>
	<h1 class = 'text-2xl font-bold'>
		Settings
	</h1>
	<div class = 'space-y-4'>
		<div class = "flex items-center justify-between">
			<span>
				Theme
			</span>
			<ThemeToggle/>
		</div>
		<div class = "flex items-center justify-between">
			<span>
				Language
			</span>
			<LanguageToggle/>
		</div>
		<div class = 'border-t border-gray-300 dark:border-gray-700 pt-4'>
			<Button type = 'danger' on:click = {clearAllTasks}>
				Clear All Tasks
			</Button>
		</div>
	</div>
</main>