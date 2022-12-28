<template>
  <div class="popUpBackground">
    <div class="popUpWindow">
      <div v-show="showStats">
        <div class="stats">
          <div class="statsText">
            <div class="statsText">Stats:</div>
            <div class="statsText">Time: 25s</div>
            <div class="statsText">Words: 4</div>
            <div class="statsText">Accuracy: 3</div>
          </div>
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

const props = defineProps<{
  won: boolean;
}>();

const won = ref(props.won);
var showStats = false;

function getWinText() {
  if (won.value) {
    return "CONGRATS! You won!";
  } else {
    return "CRINGE! You lost.";
  }
}

function getWinEmoji() {
  if (won.value) {
    return "🤩";
  } else {
    return "🤮";
  }
}

// after 3 seconds, close the popup
setTimeout(() => {
  showStats = true;
  if(won.value === true){
    won.value = false;
  } else {
    won.value = true;
  }
  console.log("showing stats");
  console.log(showStats);

}, 3000);
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
.statsText {
  @apply text-black text-center font-bold text-2xl m-3;
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
