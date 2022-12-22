import { defineStore } from "pinia";
import { ref } from "vue";

export const gameStore = defineStore("game-store", () => {
  const word = ref("abcde");
  function setWord(newWord: string) {
    word.value = newWord;
  }

  const triedLetters = ref<Set<string>>(new Set());
  function addTriedLetter(letter: string) {
    triedLetters.value.add(letter);
  }

  return { word, setWord, triedLetters, addTriedLetter };
});
