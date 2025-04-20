<div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-md flex justify-between items-start transition-all hover:shadow-lg">
	<div>
		<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">
			{task.title}
		</h3>

		{#if task.description}
			<p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{task.description}</p>
		{/if}

		<PriorityTag priority={task.priority} />
	</div>

	<div class="flex flex-col items-end gap-2 ml-4">
		<button
			on:click={handleEdit}
			title="Edit"
			aria-label="Edit Task"
			class="text-blue-600 hover:text-blue-800 text-lg transition-colors"
		>
			✏
		</button>
		<button
			on:click={handleDelete}
			title="Delete"
			aria-label="Delete Task"
			class="text-red-500 hover:text-red-700 text-lg transition-colors"
		>
			🗑
		</button>
	</div>
</div>