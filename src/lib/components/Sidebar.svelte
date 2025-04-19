<script lang="ts">
	export let current = 'Home';
</script>

<aside class="w-6 h-full bg-white dark:bg-gray-900 p-6 border-r border-gray-200 dark:border-gray-700">
	<h2 class="text-2xl font-bold mb-6">
		Tusk
	</h2>
	<nav class="space y-4">
		<a class="block font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 {current == 'Home' ? 'text-blue-600 font-bold':''}" href = "/">
			Home
		</a>
		<a class="block font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 {current == 'Settings' ? 'text-blue-600 font-bold':''}" href = "/settings">
			Settings
		</a>
	</nav>
</aside>

	