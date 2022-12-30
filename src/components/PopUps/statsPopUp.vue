<template>
  <div v-show="statsOpen.value">
    <div class="popUpBackground">
      <div class="popUpWindow">
        <button class="closeButton" @click="closeStats()">x</button>
        <div class="statsHeadline">Your stats:</div>
        <p></p>
        <div class = "gridContainer">
          <div class="grid">
            <div v-for = "item in gameState.allTries" :key="item">
              <div v-if="item.state === 'fresh'" class="gridItemFresh">{{ item.char }}</div>
              <div v-else-if="item.state === 'not-included'" class="gridItemNotIncluded">{{ item.char }}</div>
              <div v-else-if="item.state === 'wrong-pos'" class="gridItemWrongPos">{{ item.char }}</div>
              <div v-else-if="item.state === 'correct'" class="gridItemCorrect">{{ item.char }}</div>
            </div>
        </div>
          <button class="shareButton" @click="copyToClipboard()">{{ clipBoardButtonText.value }}</button>
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

gameState.allTries[1].state


</script>


<style>

.grid {
  @apply grid-cols-5 grid-rows-6 justify-center landscape:w-2/4 portrait:w-3/4 mt-20;
}

.gridContainer {
  /* center the item */
  @apply flex flex-col justify-center items-center w-full h-full;

}

.gridItemFresh {
  @apply m-1 w-auto h-12 font-bold text-white flex flex-col justify-center items-center bg-gray-500 rounded-lg;
}
.gridItemNotIncluded {
  @apply  m-1 w-auto h-12 font-bold text-white flex flex-col justify-center items-center bg-gray-500 rounded-lg;
}
.gridItemWrongPos {
  @apply  m-1 w-auto h-12 font-bold text-white flex flex-col justify-center items-center bg-yellow-500 rounded-lg;
}
.gridItemCorrect {
  @apply m-1 w-auto h-12 font-bold text-white flex flex-col justify-center items-center bg-green-500 rounded-lg;
}


.popUpWindow {
  @apply absolute flex top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 landscape:w-1/4 portrait:w-3/4 h-auto bg-white rounded-lg drop-shadow-lg;
}

.winStateText {
  @apply flex flex-col m-10 text-black font-bold justify-center items-center w-full h-full text-4xl text-center;
}

.statsHeadline {
  @apply absolute min-w-full text-black font-bold text-xl p-8;
}

.closeButton {
  @apply absolute text-center select-none duration-200 top-0 m-2 right-0 w-8 h-8 text-xl bg-gray-400 text-white font-bold cursor-pointer rounded;
}

.closeButton:hover {
  @apply bg-red-500;
}

.closeButton:active {
  @apply absolute bg-red-600;
}

.statsContainer {
  @apply pl-8 pr-8 pb-8 ;
}

.statsText {
  @apply text-black font-bold text-xl m-1;
}

.shareButton {
  @apply absolute duration-300 text-center duration-200 bottom-0 right-0 w-full h-10 text-2xl bg-gray-400 text-white font-bold cursor-pointer;
}

.shareButton:hover {
  @apply bg-blue-500;
}

.shareButton:active {
  @apply absolute bg-blue-600 w-full h-9;
}
</style>
