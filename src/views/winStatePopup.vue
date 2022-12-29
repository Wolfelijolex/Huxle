<template>
  <div class="popUpBackground">
    <div class="popUpWindow">
      <div v-show="showStats">
        <div class="stats">
          <statsPopUp></statsPopUp>
        </div>
      </div>
      <div v-show="showStats === false" class="winStateEmoji">
        <div class="winStateText">{{ getWinText() }}
          <div class="Emoji">{{ getWinEmoji() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import statsPopUp from "./statsPopUp.vue";
import { useGameStore } from "@/stores/game-store";

const gameState = useGameStore();

const props = defineProps<{
  won: boolean;
}>();

const won = ref(props.won);
var showStats = false;

function getWinText() {
  if (won.value) {
    return "CONGRATS! You won!";
  } else {
    var randomNumber = Math.floor(Math.random() * 10);
    switch (randomNumber) {
    case 0:
      return "You are stupid.";
    case 1:
      return "You lost.";
    case 2:
      return "You are a loser.";
    case 3:
      return "You are a failure.";
    case 4:
      return "You are a disgrace.";
    case 5:
      return "You are really bad at this.";
    case 6:
      return "This u? 💩"
    case 7:
      return "🤮🤮🤮🤮🤮🤮"
    case 8:
      return "why are you even trying"
    case 9:
      return "this was a waste of my time"
    default: "CRINGE! You lost."
    }
  }
}

function getWinEmoji() {
  if (won.value) {
    var numberOfTries = gameState.allTries.length / 5;
    switch (true) {
    case numberOfTries === 6:
      return "🤨";
    case numberOfTries === 5:
      return "🫠";
    case numberOfTries === 4:
      return "🙂";
    case numberOfTries === 3:
      return "😎";
    case numberOfTries === 2:
      return "🥰";
    case numberOfTries === 1:
      return "🤩";
    default:
      return "😡";
    }
  } else {
    return "🤮";
  }
}

// after 3 seconds, close the popup
setTimeout(() => {
  showStats = true;
  if (won.value === true) {
    won.value = false;
  } else {
    won.value = true;
  }
  console.log("showing stats");
  console.log(showStats);

}, 2000);
</script>

<style lang="scss">
.popUpBackground {
  @apply absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm bg-scroll;
}

.popUpWindow {
  @apply absolute flex top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto bg-white rounded-lg drop-shadow-lg;
}

.winStateText {
  @apply text-black text-center font-bold text-4xl m-16;
}

.Emoji {
  @apply text-8xl m-4 duration-300 select-none;
  animation: shakeHead 2s linear infinite;

}

.Emoji:hover {
  @apply text-9xl;
}

.Emoji:active {
  @apply text-7xl;
}

.stats {
  @apply m-16;
}



@keyframes shakeHead {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(10deg);
  }

  50% {
    transform: rotate(0deg);
  }

  75% {
    transform: rotate(-10deg);
  }

  100% {
    transform: rotate(0deg);
  }


}
</style>
