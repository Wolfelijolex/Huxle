<template>
  <div class="flex w-full justify-center">
    <div class="flex flex-col gap-3 w-2/4">
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

<script lang="ts">
export type LineInfo = {
  [key: string]: { state: "fresh" | "not-included" | "wrong-pos" | "correct" };
};
</script>

<script lang="ts" setup>
import WordLineComponentVue from "./WordLineComponent.vue";
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
type Props = {
  newChar: string;
  theWord: string;
};

const props = defineProps<Props>();
const emit = defineEmits(["resolveChar", "lineInfoUpdate", "gameEnd"]);
const stateArray = ref(["fresh", "fresh", "fresh", "fresh", "fresh"]);
const activeLine = ref(1);
const rows = [
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Y", "X", "C", "V", "B", "N", "M"],
];
const lineInfo: Ref<LineInfo> = ref({});

onMounted(() => {
  for (const row of rows) {
    for (const char of row) {
      lineInfo.value[char] = { state: "fresh" };
    }
  }
  emit("lineInfoUpdate", lineInfo.value);
});

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
      updateLineInfo(word[i].char, "correct");
    }
  }
  for (let i = 0; i < 5; i++) {
    if (stateArray.value[i] !== "correct") {
      if (splitWord.includes(word[i].char)) {
        stateArray.value[i] = "wrong-pos";
        splitWord[props.theWord.indexOf(word[i].char)] = "";
      } else {
        stateArray.value[i] = "not-included";
      }
      updateLineInfo(word[i].char, stateArray.value[i]);
    }
  }
  if (correctness === 5) {
    emit("gameEnd", true);
    return;
  }
  emit("lineInfoUpdate", lineInfo.value);
}

function updateLineInfo(char: string, state: string) {
  if (state === "correct" || state === "wrong-pos" || state === "not-included") {
    if (lineInfo.value[char].state === "fresh") {
      lineInfo.value[char].state = state;
      return;
    }
    if (lineInfo.value[char].state === "wrong-pos" && state === "correct") {
      lineInfo.value[char].state = state;
      return;
    }
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
