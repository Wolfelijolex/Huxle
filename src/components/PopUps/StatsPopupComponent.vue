<template>
  <PopupComponent :show-close-button="true" :show-popup="statsOpen" @close-popup="closeStats()">
    <div class="popUpWindowGrid">
      <div class="py-8">
        <div class="statsHeadline">
          {{ $t("stats.headline") }}
        </div>
        <div class="statsText">{{ $t("stats.time", { time: gameState.totalTime }) }}</div>
        <div class="statsText">{{ $t("stats.tries", { value: gameState.allTries.length / 5 }) }}</div>
      </div>
      <div class="w-full h-full mb-6">
        <div class=gridContainer>
          <div id="FinalGameGrid" class="grid grid-rows-6 grid-cols-5 grid-width portrait:justify landscape:ml-6 landscape:mr-6">
            <div v-for="i in 30" :key="i">
              <div
                :class="{
                  gridItem: true,
                  'not-included': gameState.allTries[i - 1]?.state === 'not-included',
                  'wrong-pos': gameState.allTries[i - 1]?.state === 'wrong-pos',
                  correct: gameState.allTries[i - 1]?.state === 'correct',
                }"
              >
                <span v-if="showLetters">
                  {{ gameState.allTries[i - 1]?.char ?? "" }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <button class="button" @click="showLetters = !showLetters">{{ $t("stats.toggleLetters") }}</button>
          <button class="button flex-grow" @click="copyToClipboard()">{{ $t(clipBoardButtonText) }}</button>
        </div>
      </div>
    </div>
  </PopupComponent>
</template>

<script lang="ts" setup>
import { useGameStore } from "@/stores/game-store";
import { ref } from "vue";
import PopupComponent from "@/components/PopUps/BasePopupComponent.vue";
import html2canvas from "html2canvas";

function closeStats() {
  statsOpen.value = false;
}

const showLetters = ref(true);
const clipBoardButtonText = ref("stats.share");
const statsOpen = ref(true);

function copyToClipboard() {
  const grid = document.getElementById("FinalGameGrid");
  if (!grid) {
    console.error("grid not found");
    return;
  }
  html2canvas(grid).then((canvas) =>
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error("blob not found");
        return;
      }
      navigator.clipboard
        .write([new ClipboardItem({ "image/png": blob })])
        .then(() => {
          clipBoardButtonText.value = "stats.copied";
          setTimeout(() => {
            clipBoardButtonText.value = "stats.share";
          }, 3000);
        })
        .catch((err) => {
          console.error(err);
        });
    })
  );
}

const gameState = useGameStore();
</script>

<style lang="scss" scoped>
.popUpWindowGrid {
  @apply flex flex-col w-full h-full m-5;
}

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

.statsHeadline {
  @apply text-black font-bold portrait:text-2xl text-4xl;
}

.statsText {
  @apply text-black portrait:text-sm text-base;
}

.button {
  @apply font-bold portrait:text-base portrait:font-semibold text-lg duration-200 bg-slate-400 overflow-hidden rounded-xl h-auto mt-5 p-4 text-center select-none;

  &:hover {
    @apply bg-blue-500;
  }

  &:active {
    @apply bg-blue-600;
  }
}
</style>
