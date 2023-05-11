import { writable } from "svelte/store";

export const history = writable([]);
export const currentIndex = writable(0);
