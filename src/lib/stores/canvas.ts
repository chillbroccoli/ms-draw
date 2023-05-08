import { writable } from "svelte/store";

type CanvasStore = {
  color: string;
  paths: { x: number; y: number }[][];
  imageData: ImageData | null;
  fontThickness: number;
};

export const canvasStore = writable<CanvasStore>({
  paths: [],
  color: "black",
  imageData: null,
  fontThickness: 2,
});
