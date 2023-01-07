<template>
  <div class="gridContainer">
    <div
      id="FinalGameGrid"
      class="grid grid-rows-6 grid-cols-5 grid-width portrait:justify landscape:ml-6 landscape:mr-6"
    >
      <div v-for="i in 30" :key="i">
        <div
          :class="{
            gridItem: true,
            'not-included': gameState.allTries[i - 1]?.state === 'not-included',
            'wrong-pos': gameState.allTries[i - 1]?.state === 'wrong-pos',
            correct: gameState.allTries[i - 1]?.state === 'correct',
          }"
        >
          <span v-if="props.showLetters">
            {{ gameState.allTries[i - 1]?.char ?? "" }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGameStore } from "@/stores/game-store";

const props = withDefaults(
  defineProps<{
    showLetters: boolean;
  }>(),
  {
    showLetters: true,
  }
);

const gameState = useGameStore();
</script>

<style lang="scss" scoped>
$gap-size: 5px;

.grid-width {
  max-width: calc(350px + 4 * $gap-size);
  width: calc(50vw + 4 * $gap-size);
  gap: $gap-size;
}

.gridContainer {
  @apply flex justify-center items-center rounded-lg;
}

.gridItem {
  @apply flex justify-center items-center rounded-lg font-bold portrait:text-sm bg-gray-100 select-none;
  width: 10vw;
  max-width: 70px;
  height: 10vw;
  max-height: 70px;
  font-size: 3vw;

  &.not-included {
    @apply bg-gray-500;
  }

  &.wrong-pos {
    @apply bg-yellow-500;
  }

  &.correct {
    @apply bg-green-500;
    &:hover {
      @apply animate-pulse;
    }
  }
}

@media screen and (orientation: landscape) {
  .gridItem {
    font-size: 2rem;
  }
}
</style>
