<script lang="ts">
	import { onMount } from "svelte";
	import { history, currentIndex } from "$lib/stores/history";

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;

	const clearCanvas = () => {
		if (!context) return;

		context.fillStyle = "white";
		context.fillRect(0, 0, canvas.width, canvas.height);
	};

	function undo() {
		if (!context) return;

		if ($currentIndex > 0) {
			currentIndex.update((i) => (i = i - 1));
			let imageData = $history[$currentIndex];
			context.putImageData(imageData, 0, 0);
		}
	}

	function redo() {
		if (!context) return;

		if ($currentIndex < $history.length - 1) {
			currentIndex.update((i) => (i = i + 1));
			let imageData = $history[$currentIndex];
			context.putImageData(imageData, 0, 0);
		}
	}

	const exportToImage = () => {
		const canvas = document.getElementById("canvas-board") as HTMLCanvasElement;
		const dataURL = canvas.toDataURL();
		const link = document.createElement("a");
		link.href = dataURL;
		link.download = "drawing.png";
		link.click();
		link.remove();
	};

	function keydown(event: KeyboardEvent) {
		const isZKey = event.key === "z";
		const isRKey = event.key === "r";
		const metaKeyOrCtrlKey = event.metaKey || event.ctrlKey;
		const canUndo = $currentIndex > 0;
		const canRedo = $currentIndex < $history.length - 1;

		if (isZKey && metaKeyOrCtrlKey && canUndo) {
			undo();
		}

		if (isRKey && metaKeyOrCtrlKey && canRedo) {
			redo();
		}
	}

	$: console.log("HISTORY", $history);
	$: console.log("CURRENT INDEX", $currentIndex);

	$: if (canvas?.getContext) {
		context = canvas.getContext("2d");
	}

	onMount(() => {
		const canvasEl = document.getElementById("canvas-board") as HTMLCanvasElement;
		if (canvasEl) canvas = canvasEl;
	});
</script>

<svelte:window on:keydown={keydown} />

<header>
	<div class="title-bar title-bar-container">
		<div class="title-bar-text">untitled - Paint</div>
		<div class="title-bar-controls">
			<button aria-label="Minimize" />
			<button aria-label="Maximize" />
			<button aria-label="Close" />
		</div>
	</div>
	<div class="actions-buttons">
		<button on:click={clearCanvas}>Clear Drawing</button>
		<button on:click={exportToImage}>Export To Image</button>
		<button on:click={undo} disabled={!($currentIndex > 0)}>Undo</button>
		<button on:click={redo} disabled={!($currentIndex < $history.length - 1)}>Redo</button>
	</div>
</header>

<style>
	.title-bar-container {
		padding: 0.75rem;
	}

	.actions-buttons {
		display: flex;
		background-color: #c0c0c0;
	}

	.actions-buttons > button {
		border: none !important;
		outline: none !important;
		box-shadow: none !important;
	}
</style>
