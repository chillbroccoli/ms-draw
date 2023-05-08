<script lang="ts">
  import CanvasBoard from "$lib/components/canvas_board.svelte";
  import Toolbar from "$lib/components/toolbar.svelte";
</script>

<main class="main">
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
      <button>File</button>
    </div>
  </header>

  <div class="grid">
    <Toolbar />
    <div>
      <CanvasBoard />
    </div>
  </div>
</main>

<style>
  .main {
    height: 100vh;
    overflow: hidden;
  }

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

  .grid {
    height: 100%;
    display: grid;
    grid-template-columns: 2fr 14fr;
    grid-template-rows: 100%;
  }
</style>
