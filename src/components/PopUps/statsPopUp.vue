<template>
  <div v-show="statsOpen.value">
    <div class="popUpBackground">
      <div class="popUpWindow">
        <button class="closeButton" @click="closeStats()">x</button>
        <div class="popUpWindowGrid">
          <div class="statsContainer">
            <div class="statsHeadline">
              Your stats:
              <div class="statsText">Time: 23 seconds Placeholder</div>
              <!-- todo get time from store -->
              <div class="statsText">Tries: {{ gameState.allTries.length / 5 }}</div>
            </div>
          </div>
          <div class="gridContainer">
            <div class="grid">
              <div v-for="item in gameState.allTries" :key="item">
                <div v-if="item.state === 'fresh'" class="gridItemFresh">{{ item.char }}</div>
                <div v-else-if="item.state === 'not-included'" class="gridItemNotIncluded">{{ item.char }}</div>
                <div v-else-if="item.state === 'wrong-pos'" class="gridItemWrongPos">{{ item.char }}</div>
                <div v-else-if="item.state === 'correct'" class="gridItemCorrect">{{ item.char }}</div>
              </div>
              <div v-for="i in (gameState.allTries.length - 30) * -1" :key="i">
                <div class="gridItemFresh"></div>
              </div>
            </div>
            <div class="shareButtonContainer">
              <button class="shareButton" @click="copyToClipboard()">{{ clipBoardButtonText.value }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGameStore } from "@/stores/game-store";
import { reactive } from "vue";

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

<style>
.grid {
  @apply grid-cols-5 grid-rows-6 justify-center landscape:w-2/4 portrait:w-3/4;
}

.gridContainer {
  /* center the item */
  @apply flex flex-col justify-center items-center w-full h-full pb-6;
}
.popUpWindowGrid {
  @apply flex flex-col w-full h-full;
}
.gridItemFresh {
  @apply m-1 w-auto h-12 font-bold text-white flex flex-col justify-center items-center bg-gray-100 rounded-lg select-none;
}
.gridItemNotIncluded {
  @apply m-1 w-auto h-12 font-bold text-white flex flex-col justify-center items-center bg-gray-500 rounded-lg select-none;
}
.gridItemWrongPos {
  @apply m-1 w-auto h-12 font-bold text-white flex flex-col justify-center items-center bg-yellow-500 rounded-lg select-none;
}
.gridItemCorrect {
  @apply m-1 w-auto h-12 font-bold text-white flex flex-col justify-center items-center bg-green-500 rounded-lg duration-200 select-none;
}
.gridItemCorrect:hover {
  @apply animate-pulse;
}

.popUpWindow {
  @apply absolute flex top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 landscape:w-1/4 portrait:w-3/4 h-auto bg-white rounded-lg drop-shadow-lg;
}

.winStateText {
  @apply flex flex-col m-10 text-black font-bold justify-center items-center w-full h-full text-4xl text-center;
}

.statsHeadline {
  @apply text-black font-bold text-4xl;
}

.closeButton {
  @apply absolute z-40 text-center duration-200 top-0 m-2 right-0 w-8 h-8 text-xl bg-red-400 text-white font-bold cursor-pointer rounded;
}

.closeButton:hover {
  @apply bg-red-500;
}

.closeButton:active {
  @apply absolute bg-red-600;
}

.statsContainer {
  @apply p-8;
}

.statsText {
  @apply text-black text-base;
}

.shareButton {
  @apply font-bold text-lg duration-200 bg-slate-400 overflow-hidden rounded-xl w-full h-auto p-4 text-center select-none;
}
.shareButtonContainer {
  @apply flex flex-col mt-4 mb-4 justify-center items-center landscape:w-2/4 portrait:w-3/4;
}

.shareButton:hover {
  @apply bg-blue-500;
}

.shareButton:active {
  @apply bg-blue-600;
}
</style>
