<template>
  <PopupComponent :show-close-button="true" :show-pop-up="statsOpen.value" @close-pop-up="closeStats()">
    <div class="popUpWindowGrid">
      <div class="p-8">
        <div class="statsHeadline">
          {{ $t("stats.headline") }}
          <div class="statsText">{{ $t("stats.time") }} 23 {{ $t("stats.seconds")}} Placeholder</div>
          <!-- todo get time from store -->
          <div class="statsText">{{ $t("stats.share") }} {{ gameState.allTries.length / 5 }}</div>
        </div>
      </div>
      <div class="gridContainer">
        <div class="grid">
          <div v-for="i in 30" :key="i">
            <div :class="'gridItem ' + gameState.allTries[i - 1]?.state ?? ''">
              {{ gameState.allTries[i - 1]?.char ?? "" }}
            </div>
          </div>
        </div>
        <div class="shareButtonContainer">
          <button class="shareButton" @click="copyToClipboard()">{{ $t("stats.share") }}</button>
        </div>
      </div>
    </div>
  </PopupComponent>
</template>

<script lang="ts" setup>
import { useGameStore } from "@/stores/game-store";
import { reactive } from "vue";
import PopupComponent from "./PopupComponent.vue";

function closeStats() {
  statsOpen.value = false;
}

const clipBoardButtonText = reactive({
  value: "share",
});

const statsOpen = reactive({
  value: true,
});

function copyToClipboard() {
  clipBoardButtonText.value = "copied to clipboard!";
  // todo get link from store
  navigator.clipboard.writeText("link");
}

const gameState = useGameStore();
</script>

<style lang="scss">
.grid {
  @apply grid-cols-5 grid-rows-6 justify-center w-auto;
}

.gridContainer {
  @apply flex flex-col justify-center items-center w-full h-full mb-6;
}
.popUpWindowGrid {
  @apply flex flex-col w-full h-full;
}

.gridItem {
  @apply m-1 w-10 h-10 font-bold text-white flex flex-col justify-center items-center bg-gray-100 rounded-lg select-none;

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

.winStateText {
  @apply flex flex-col m-10 text-black font-bold justify-center items-center w-full h-full text-4xl text-center;
}

.statsHeadline {
  @apply text-black font-bold text-4xl;
}

.statsText {
  @apply text-black text-base;
}

.shareButton {
  @apply font-bold text-lg duration-200 bg-slate-400 overflow-hidden rounded-xl w-full h-auto mt-5 p-4 text-center select-none;

  &:hover {
    @apply bg-blue-500;
  }

  &:active {
    @apply bg-blue-600;
  }
}
</style>
