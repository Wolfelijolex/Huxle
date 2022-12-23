import { defineStore } from "pinia";
import { ref } from "vue";
import type { Key } from "./game-store";

export const useCurrentLineStore = defineStore("current-line-store", () => {
  const tries = ref<Key[]>([]);
  function addTry(newTry: Key) {
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
