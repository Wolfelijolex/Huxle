import { defineStore } from "pinia";
import { computed, ref } from "vue";

export type CharState = "fresh" | "not-included" | "wrong-pos" | "correct";

export type Try = {
  char: string;
  state: CharState;
};

export const useGameStore = defineStore("game-store", () => {
  const word = ref<string | null>(null);
  function setWord(newWord: string) {
    word.value = newWord;
  }

  const tries = ref<Try[][]>([]);
  function addTry(newTry: Try[]) {
    tries.value.push(newTry);
  }

  const allTries = computed(() => {
    return tries.value.reduce((acc, curr) => [...acc, ...curr], [] as Try[]);
  });

  return { word, setWord, tries, addTry, allTries };
});
