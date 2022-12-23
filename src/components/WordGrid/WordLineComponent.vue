<template>
  <div class="flex gap-3 justify-center">
    <WordCellComponentVue v-for="cell in filled" :key="cell.char" :character="cell.char" :state="cell.state" />
  </div>
</template>

<script lang="ts" setup>
import WordCellComponentVue from "./WordCellComponent.vue";
import type { Try } from "@/stores/game-store";
import { computed } from "vue";

type Props = {
  tries: Try[];
};

const props = defineProps<Props>();

const filled = computed(() => {
  const tries = [...props.tries];
  while (tries.length < 5) {
    tries.push({ char: "", state: "fresh" });
  }
  return tries;
});
</script>

<style lang="scss"></style>
