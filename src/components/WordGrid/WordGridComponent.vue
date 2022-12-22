<template>
  <div class="flex w-full justify-center">
    <div class="flex flex-col gap-3 w-96">
      <WordLineComponentVue
        v-for="index in 6"
        :key="index"
        :new-char="checkLine(index) ? props.newChar : ''"
        :new-state="
          checkLine(index)
            ? [stateArray[0], stateArray[1], stateArray[2], stateArray[3], stateArray[4]]
            : ['fresh', 'fresh', 'fresh', 'fresh', 'fresh']
        "
        @resolve-char="resolveChar"
        @resolve-word="resolveWord"
        @resolve-state="resolveState"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import WordLineComponentVue from "./WordLineComponent.vue";
import { ref } from "vue";
type Props = {
  newChar: string;
  theWord: string;
};

const props = defineProps<Props>();
const emit = defineEmits(["resolveChar", "gameEnd"]);
const stateArray = ref(["fresh", "fresh", "fresh", "fresh", "fresh"]);
const activeLine = ref(1);

function checkLine(index: number) {
  if (index === activeLine.value) {
    return true;
  }
  return false;
}

function resolveWord(word: [{ char: string; state: string }]) {
  let splitWord = props.theWord.split("");
  let correctness = 0;
  for (let i = 0; i < 5; i++) {
    if (word[i].char === splitWord[i]) {
      correctness++;
      stateArray.value[i] = "correct";
      splitWord[i] = "";
    }
  }
  for (let i = 0; i < 5; i++) {
    if (stateArray.value[i] !== "correct") {
      if (splitWord.includes(word[i].char)) {
        stateArray.value[i] = "wrong-pos";
      } else {
        stateArray.value[i] = "not-included";
      }
    }
  }
  if (correctness === 5) {
    emit("gameEnd", true);
  }
}

function resolveChar() {
  emit("resolveChar");
}

function resolveState() {
  activeLine.value++;
  if (activeLine.value === 7) {
    emit("gameEnd", false);
  }
  stateArray.value = ["fresh", "fresh", "fresh", "fresh", "fresh"];
}
</script>
<style lang="scss"></style>
