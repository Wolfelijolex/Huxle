<template>
  <div v-show="statsOpen">
    <div class="popUpWindow">
      <button class="closeButton" @click="closeStats()">x</button>
      <div>
        <div class="statsHeadline">Stats:<br>
        </div>
        <div class="statsText">Time: {{ }} </div> //todo get time from store
        <div class="statsText">Guesses: {{ gameState.allTries.length / 5 }}
        </div>
      </div>
      <button class="shareButton">share</button>
    </div>
  </div>



</template>


<script lang="ts" setup>
import { useGameStore } from "@/stores/game-store";

var statsOpen = true;

function closeStats() {
  statsOpen = false;
  console.log("closeStats");
}

const gameState = useGameStore();

</script>


<style>
.popUpBackground {
  @apply absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm bg-scroll;
}

.closeButton {
  @apply absolute text-center duration-200 top-0 m-4 right-0 w-10 h-10 text-2xl bg-gray-400 text-white font-bold cursor-pointer;
}

.closeButton:hover {
  @apply bg-red-500;
}

.closeButton:active {
  @apply absolute bg-red-600 w-9 h-9;
}

.popUpWindow {
  @apply absolute flex top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto bg-white rounded-lg drop-shadow-lg;
}

.statsHeadline {
  @apply text-black font-bold text-4xl m-3 mb-8;
}

.statsText {
  @apply text-black font-bold text-2xl m-24;
}

.shareButton {
  @apply absolute text-center duration-200 bottom-0 m-4 right-0 w-full h-10 text-2xl bg-gray-400 text-white font-bold cursor-pointer;
}
</style>
