<script lang="ts">
	import CanvasBoard from "$lib/components/canvas_board.svelte";
	import Header from "$lib/components/header.svelte";
	import Toolbar from "$lib/components/toolbar.svelte";
</script>

<main class="main">
	<Header />
	<div class="grid">
		<Toolbar />
		<CanvasBoard />
	</div>
</main>

<style>
	.main {
		height: 100vh;
		overflow: hidden;
	}
	.grid {
		height: 100%;
		display: grid;
		grid-template-columns: 2fr 14fr;
		grid-template-rows: 100%;
	}
</style>
