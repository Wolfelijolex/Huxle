<template>
  <div v-show="statsOpen.value">
    <div class="popUpBackground">
      <div class="popUpWindow">
        <button class="closeButton" @click="closeStats()">x</button>
        <div>
          <div class="statsHeadline">Stats:<br></div>
          <div class="grid">
            <!-- <div class="gridItem">{{ gameState.allTries[0].char }}</div> -->
            <div class="gridItem" v-for="cell in gameState.allTries" :key="cell.char">{{ cell.char }}</div>
          </div>
          <div class="statsContainer">
            <div class="statsText">Time: {{ }} </div>
            <div class="statsText">Guesses: {{ gameState.allTries.length / 5 }}</div>
          </div>
        </div>
        <!-- <button class="shareButton" @click="copyToClipboard()">{{ clipBoardButtonText.value }}</button> -->
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
  @apply grid-cols-5 grid-rows-6 bg-center overflow-hidden;
}
.gridItem {
  @apply p-2 m-1 flex  text-white justify-center bg-gray-500 rounded-lg ;
}

.popUpWindow {
  @apply absolute flex top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 landscape:w-1/4 portrait:w-3/4 h-auto bg-white rounded-lg drop-shadow-lg;
}

.winStateText {
  @apply flex flex-col m-10 text-black font-bold justify-center items-center w-full h-full text-4xl text-center;
}

.statsHeadline {
  @apply min-w-full text-black font-bold text-xl p-8;
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
