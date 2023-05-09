import { writable } from "svelte/store";

type CanvasStore = {
  color: string;
  snapshots: ImageData[];
  lineThickness: number;
};

export const canvasStore = writable<CanvasStore>({
  color: "black",
  snapshots: [],
  lineThickness: 2,
});
