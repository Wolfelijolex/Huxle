import { defineStore } from "pinia";
import { ref } from "vue";
import type { Try } from "./game-store";

export const useCurrentLineStore = defineStore("current-line-store", () => {
  const tries = ref<Try[]>([]);
  function addTry(newTry: Try) {
    tries.value.push(newTry);
  }
  function removeLastTry() {
    tries.value.pop();
  }
  function reset() {
    tries.value = [];
  }

  return { tries, addTry, removeLastTry, reset };
});
