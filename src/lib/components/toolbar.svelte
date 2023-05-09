<script lang="ts">
  import {
    IconEraser,
    IconBallpen,
    IconPencil,
    IconSquare,
    IconTriangle,
    IconCircle,
  } from "@tabler/icons-svelte";
  import colors from "$lib/constants/colors";
  import { canvasStore } from "$lib/stores/canvas";

  const ICONS = [
    IconPencil,
    IconBallpen,
    IconEraser,
    IconSquare,
    IconTriangle,
    IconCircle,
  ];

  const ICON_SIZE = 18;

  const changeColor = (color: string) => {
    canvasStore.set({
      ...$canvasStore,
      color,
    });
  };
</script>

<aside class="toolbar">
  <div class="toolbar-tools">
    {#each ICONS as icon}
      <button class="toolbar-tool">
        <svelte:component this={icon} size={ICON_SIZE} color="black" />
      </button>
    {/each}
  </div>

  <div class="toolbar-colors">
    {#each colors as color}
      <button
        style={`background-color: ${color};`}
        on:click={() => changeColor(color)}
      />
    {/each}
  </div>

  <div class="slider field-row">
    <label for="range25">Font thickness:</label>
    <input
      id="range26"
      type="range"
      min="1"
      max="15"
      bind:value={$canvasStore.lineThickness}
    />
  </div>

  <div class="toolbar-actions" />
</aside>

<style>
  .toolbar {
    background: #f0f0f0;
    border-right: 1px solid rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
  }

  .toolbar-tools {
    height: min-content;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.25rem;
  }

  .toolbar-tool {
    padding: 0.25rem;
  }

  .toolbar-colors {
    margin-top: 1rem;
    height: min-content;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 24px;
    gap: 0.25rem;
  }

  .toolbar-actions {
    margin-top: 1rem;
  }

  .slider {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>
