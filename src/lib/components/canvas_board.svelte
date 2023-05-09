<script lang="ts">
  import { onMount } from "svelte";

  import { canvasStore } from "$lib/stores/canvas";

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
    canvasContext.strokeStyle = $canvasStore.color;
    canvasContext.lineWidth = $canvasStore.lineThickness;
  };

  const startDrawing = (event: MouseEvent) => {
    const newSnapshot = canvasContext.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    canvasStore.set({
      ...$canvasStore,
      snapshots: [...$canvasStore.snapshots, newSnapshot],
    });
    const { offsetX, offsetY } = event;
    canvasContext.beginPath();
    canvasContext.moveTo(offsetX, offsetY);
    isDrawing = true;
  };

  const finishDrawing = () => {
    canvasContext.closePath();
    isDrawing = false;
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
      canvasContext.strokeStyle = $canvasStore.color;
    }
  }

  $: {
    if (canvasContext) {
      canvasContext.lineWidth = $canvasStore.lineThickness;
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
