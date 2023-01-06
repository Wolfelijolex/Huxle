<template>
  <div class="flex w-full justify-center">
    <div class="flex flex-col gap-3 w-full">
      <WordLineComponentVue v-for="index in 6" :key="index" :tries="getTriesForRow(index)" />
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
import type { Key } from "@/stores/game-store";

type Props = {
  pastTries: Key[][];
  currentLine: Key[];
};

const props = defineProps<Props>();

function getTriesForRow(index: number) {
  if (index - 1 < props.pastTries.length) {
    return props.pastTries[index - 1];
  }

  if (index - 1 === props.pastTries.length) {
    return props.currentLine;
  }

  return new Array(5).fill({ char: "", state: "fresh" });
}
</script>
<style lang="scss"></style>
