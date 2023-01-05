import { defineStore } from "pinia";
import { computed, ref } from "vue";

export type CharState = "fresh" | "not-included" | "wrong-pos" | "correct";

export type Key = {
  char: string;
  state: CharState;
};

export const useGameStore = defineStore("game-store", () => {
  const isValid = ref<boolean>(false);
  const word = ref<string>("");
  function setWord(newWord: string) {
    word.value = newWord;
    tries.value = [];
    isValid.value = true;
  }

  const startTimestamp = ref<number>(0);
  function setStartTimestamp(newTimestamp: number) {
    startTimestamp.value = newTimestamp;
  }
  const endTimestamp = ref<number>(0);
  function setEndTimestamp(newEndTimestamp: number) {
    endTimestamp.value = newEndTimestamp;
  }

  const totalTime = computed(() => {
    const sec = (endTimestamp.value - startTimestamp.value) / 1000;
    return sec.toFixed(2);
  });

  const tries = ref<Key[][]>([]);
  function addTry(newTry: Key[]) {
    tries.value.push(newTry);
  }

  const allTries = computed(() => {
    return tries.value.reduce((acc, curr) => [...acc, ...curr], [] as Key[]);
  });

  return {
    isValid,
    word,
    setWord,
    startTimestamp,
    setStartTimestamp,
    endTimestamp,
    setEndTimestamp,
    totalTime,
    tries,
    addTry,
    allTries,
  };
});
