<template>
  <PopupComponent :show-popup="true" :show-close-button="false">
    <div class="winStateWrapper">
      <span class="text-black font-bold">{{ $t(getTextKey()) }}</span>
      <ShakingEmojiComponent :emoji="getEmoji()" />
    </div>
  </PopupComponent>
</template>

<script lang="ts" setup>
import PopupComponent from "@/components/PopUps/BasePopupComponent.vue";
import { useGameStore } from "@/stores/game-store";
import ShakingEmojiComponent from "../ShakingEmojiComponent.vue";

const gameState = useGameStore();

const props = defineProps<{
  won: boolean;
}>();

function getTextKey() {
  if (props.won) {
    return "winState.winMessage";
  }

  const randomNumber = Math.floor(Math.random() * 10);
  return `winState.loseMessage${randomNumber}`;
}

function getEmoji() {
  if (!props.won) {
    return "🤮";
  }

  const numberOfTries = gameState.allTries.length / 5;
  switch (numberOfTries) {
    case 6:
      return "🤨";
    case 5:
      return "🫠";
    case 4:
      return "🙂";
    case 3:
      return "😎";
    case 2:
      return "🥰";
    case 1:
      return "🤩";
    default:
      return "😡";
  }
}
</script>

<style lang="scss" scoped>
.winStateWrapper {
  @apply flex flex-col m-10 justify-center items-center w-full h-full text-4xl text-center;
}
</style>
