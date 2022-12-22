<template>
  <div class="flex gap-3 justify-center">
    <WordCellComponentVue v-for="cell in word" :key="cell.char" :character="cell.char" :state="cell.state" />
  </div>
</template>

<script lang="ts" setup>
import WordCellComponentVue from "./WordCellComponent.vue";
import { watch, ref } from "vue";

type Props = {
  newChar: string;
  newState: string[];
};

const props = defineProps<Props>();
const emit = defineEmits(["resolveWord", "resolveChar", "resolveState"]);
const activeCell = ref(0);
const word = ref([
  { char: "", state: props.newState[0] },
  { char: "", state: props.newState[1] },
  { char: "", state: props.newState[2] },
  { char: "", state: props.newState[3] },
  { char: "", state: props.newState[4] },
]);

watch(
  () => props.newChar,
  (newVal) => {
    if (newVal !== "Backspace" && newVal !== "Enter" && newVal !== "" && activeCell.value !== 5) {
      word.value[activeCell.value].char = newVal;
      if (activeCell.value !== 4) {
        activeCell.value++;
      }
    } else if (newVal === "Backspace") {
      if (word.value[activeCell.value].char === "" && activeCell.value !== 0) {
        activeCell.value--;
      }
      word.value[activeCell.value].char = "";
      if (activeCell.value !== 0) {
        activeCell.value--;
      }
    } else if (newVal === "Enter" && activeCell.value === 4) {
      emit("resolveWord", word.value);
    }
    emit("resolveChar");
  }
);
watch(
  () => props.newState,
  (newVal) => {
    if (
      newVal[0] !== "fresh" &&
      newVal[1] !== "fresh" &&
      newVal[2] !== "fresh" &&
      newVal[3] !== "fresh" &&
      newVal[4] !== "fresh"
    ) {
      word.value[0].state = newVal[0];
      word.value[1].state = newVal[1];
      word.value[2].state = newVal[2];
      word.value[3].state = newVal[3];
      word.value[4].state = newVal[4];
      emit("resolveState");
    }
  }
);
</script>
<style lang="scss"></style>
