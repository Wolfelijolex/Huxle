<template>
  <div class="popUpBackground">
    <div class="popUpWindow">
      <div class="winStateText">{{ getWinText() }}
        <div class="Emoji">{{ getWinEmoji() }}</div>
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

</script>

<style lang="scss">
.popUpBackground {
  @apply absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm bg-scroll;
}

.popUpWindow {
  @apply absolute  flex top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto bg-white rounded-lg drop-shadow-lg;
}

.winStateText {
  @apply text-black text-center font-bold text-4xl m-16;
}

.Emoji {
  @apply text-8xl m-4;
}
</style>
