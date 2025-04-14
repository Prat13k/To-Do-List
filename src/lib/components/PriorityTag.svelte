<script lang="ts">
	export let priority: 'low' | 'medium' | 'high';

	const classes = {
		low: 'bg-green-100 text-green-800',
		medium: 'bg-yellow-100 text-yellow-800',
		high: 'bg-red-100 text-red-800'
	};
</script>

<span class={`text-xs font-medium px-3 py-1 rounded-full ${classes[priority]}`}>
	{priority.toUpperCase()}
</span>
