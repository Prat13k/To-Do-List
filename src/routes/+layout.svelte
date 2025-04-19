<script lang="ts">
	import Sidebar from '$components/Sidebar.svelte'
	import Topbar from '$components/Topbar.svelte'
	export const data:any = {};
</script>

<div class = "flex h-screen">
	<Sidebar />
	<div class = "flex flex-col flex-1 overflow-hidden">
		<Topbar />
		<main class = "flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900">
			<slot />
		</main>
	</div>
</div>