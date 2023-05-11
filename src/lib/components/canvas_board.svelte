<script lang="ts">
	import { onMount } from "svelte";

	import { strokeStyle, lineWidth } from "$lib/stores/canvas";
	import { history, currentIndex } from "$lib/stores/history";

	let container: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let canvasContext: CanvasRenderingContext2D;
	let isDrawing = false;

	const prepareCanvas = () => {
		canvas.width = container.clientWidth;
		canvas.height = container.clientHeight;
		canvas.style.width = "100%";
		canvas.style.height = "100%";

		canvasContext = canvas.getContext("2d", { willReadFrequently: true });
		canvasContext.lineCap = "round";
		canvasContext.strokeStyle = $strokeStyle;
		canvasContext.lineWidth = $lineWidth;
		saveCanvasState();
	};

	const saveCanvasState = () => {
		if (!canvasContext) return;

		if ($currentIndex < $history.length - 1) {
			history.update((history) => {
				const newHistory = [...history];
				newHistory.splice(0, $currentIndex + 1);
				return newHistory;
			});
		}

		const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);

		history.set([...$history, imageData]);
		currentIndex.update((i) => (i = i + 1));
	};

	const startDrawing = (event: MouseEvent) => {
		const { offsetX, offsetY } = event;
		canvasContext.beginPath();
		canvasContext.moveTo(offsetX, offsetY);
		isDrawing = true;
	};

	const finishDrawing = () => {
		canvasContext.closePath();
		isDrawing = false;
		saveCanvasState();
	};

	const draw = (event: MouseEvent) => {
		if (!isDrawing) return;
		const { offsetX, offsetY } = event;
		canvasContext.lineTo(offsetX, offsetY);
		canvasContext.stroke();
	};

	onMount(() => {
		prepareCanvas();
	});

	$: {
		if (canvasContext) {
			canvasContext.strokeStyle = $strokeStyle;
			canvasContext.lineWidth = $lineWidth;
		}
	}
</script>

<div bind:this={container} class="canvas-container">
	<canvas
		id="canvas-board"
		bind:this={canvas}
		on:mousedown={startDrawing}
		on:mouseup={finishDrawing}
		on:mousemove={draw}
	/>
</div>

<style>
	.canvas-container {
		width: 100%;
		height: 100%;
	}
</style>
