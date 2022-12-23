import { defineStore } from "pinia";
import { computed, ref } from "vue";

export type CharState = "fresh" | "not-included" | "wrong-pos" | "correct";

export type Key = {
  char: string;
  state: CharState;
};

export const useGameStore = defineStore("game-store", () => {
  const word = ref<string | null>(null);
  function setWord(newWord: string) {
    word.value = newWord;
  }

  const tries = ref<Key[][]>([]);
  function addTry(newTry: Key[]) {
    tries.value.push(newTry);
  }

  const allTries = computed(() => {
    return tries.value.reduce((acc, curr) => [...acc, ...curr], [] as Key[]);
  });

  return { word, setWord, tries, addTry, allTries };
});
