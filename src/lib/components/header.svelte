<script lang="ts">
  import { canvasStore } from "$lib/stores/canvas";

  const clearCanvas = () => {
    const canvas = document.getElementById("canvas-board") as HTMLCanvasElement;
    if (canvas.getContext) {
      const context = canvas.getContext("2d");
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const exportToImage = () => {
    const canvas = document.getElementById("canvas-board") as HTMLCanvasElement;
    const dataURL = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "drawing.png";
    link.click();
    link.remove();
  };

  const undo = () => {
    const canvas = document.getElementById("canvas-board") as HTMLCanvasElement;
    if (canvas.getContext) {
      const context = canvas.getContext("2d");
      const lastSnapshotIndex = $canvasStore.snapshots.length - 1;
      const lastSnapshot = $canvasStore.snapshots[lastSnapshotIndex];
      context.putImageData(lastSnapshot, 0, 0);

      const newSnapshots = [...$canvasStore.snapshots];
      newSnapshots.pop();

      canvasStore.set({
        ...$canvasStore,
        snapshots: [...newSnapshots],
      });
    }
  };

  function keydown(event: KeyboardEvent) {
    const isZKey = event.key === "z";
    const isRKey = event.key === "r";
    const metaKeyOrCtrlKey = event.metaKey || event.ctrlKey;
    const hasSnapshots = $canvasStore.snapshots.length;

    if (isZKey && metaKeyOrCtrlKey && hasSnapshots) {
      undo();
    }

    if (isRKey && metaKeyOrCtrlKey) {
      // todo: add redo functionality
    }
  }
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
    <button on:click={undo} disabled={!$canvasStore.snapshots.length}
      >Undo</button
    >
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
