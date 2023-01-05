<template>
  <div v-if="showStats.value">
    <statsPopUp />
  </div>
  <div v-else>
    <div class="popUpBackground">
      <div class="popUpWindow">
        <div class="winStateText">
          {{ getWinText() }}
          <div class="Emoji">{{ getWinEmoji() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import statsPopUp from "./StatsPopupComponent.vue";
import { useGameStore } from "@/stores/game-store";

const gameState = useGameStore();

const props = defineProps<{
  won: boolean;
}>();

const won = ref(props.won);

const showStats = reactive({
  value: false,
});

function getWinText() {
  if (won.value) {
    return "CONGRATS!\n You won!";
  } else {
    var randomNumber = Math.floor(Math.random() * 10);
    switch (randomNumber) {
      case 0:
        return "You are stupid.";
      case 1:
        return "You lost. cringe";
      case 2:
        return "You are a loser.";
      case 3:
        return "You are a failure.";
      case 4:
        return "You are a disgrace.";
      case 5:
        return "You are really bad at this.";
      case 6:
        return "This u? 💩";
      case 7:
        return "🤮L🤮O🤮S🤮E🤮R🤮";
      case 8:
        return "Why are you even trying?";
      case 9:
        return "this was a waste of my time";
      default:
        "CRINGE! You lost.";
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

// after 2 seconds, close the popup
setTimeout(() => {
  console.log("showing stats");
  console.log(showStats);
  showStats.value = true;
}, 2000);
</script>

<style lang="scss">
.popUpBackground {
  @apply absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm bg-scroll;
}

.popUpWindow {
  @apply absolute duration-200 flex top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 landscape:w-1/4 portrait:w-3/4 h-auto bg-white rounded-lg drop-shadow-lg;
}

.winStateText {
  @apply flex flex-col m-10 text-black font-bold justify-center items-center w-full h-full text-4xl text-center;
}

.Emoji {
  @apply text-7xl m-4 duration-300 select-none;
  animation: shakeHead 2s linear infinite;
}

.Emoji:hover {
  @apply text-8xl;
}

.Emoji:active {
  @apply text-6xl;
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
