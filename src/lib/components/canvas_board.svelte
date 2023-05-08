<script lang="ts">
  import { onMount } from "svelte";

  import { canvasStore } from "$lib/stores/canvas";

  let container: HTMLDivElement;
  let canvas: HTMLCanvasElement | null = null;
  let canvasContext: CanvasRenderingContext2D | null = null;
  let isDrawing = false;

  const prepareCanvas = () => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    canvas.style.width = `100%`;
    canvas.style.height = `100%`;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = $canvasStore.color;
    context.lineWidth = 1;
    canvasContext = context;
  };

  const startDrawing = (event: MouseEvent) => {
    canvasStore.set({
      ...$canvasStore,
      imageData: canvasContext.getImageData(0, 0, canvas.width, canvas.height),
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
      canvasContext.lineWidth = $canvasStore.fontThickness;
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
