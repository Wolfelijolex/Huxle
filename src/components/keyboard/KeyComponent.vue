<template>
  <div
    @click="emit('keyPressed', props.char)"
    :class="{
      fresh: props.state === 'fresh',
      notIncluded: props.state === 'not-included',
      wrongPos: props.state === 'wrong-pos',
      correct: props.state === 'correct',
      wider: !!$slots.viewer,
    }"
    class="text-sm font-bold cursor-pointer text-center bg-gray-800 hover:bg-gray-500 portrait:rounded-md landscape:rounded-xl"
  >
    <slot name="viewer">
      {{ props.char.toUpperCase() }}
    </slot>
  </div>
</template>

<script lang="ts" setup>
import type { CharState } from "@/stores/game-store";

type Props = {
  char: string;
  state: CharState;
};

const props = defineProps<Props>();

const emit = defineEmits(["keyPressed"]);
</script>

<style lang="scss" scoped>
$width: 1.75rem;
$height: 2.5rem;
$lineHeight: 2.5rem;
$widers: 3.25rem;

div {
  width: $width * 0.8;
  height: $height * 0.8;
  line-height: $lineHeight * 0.8;
  &.wider {
    width: $widers * 0.8;
  }
  box-sizing: border-box;
  transition: 0.08s;
  user-select: none;

  @media screen and (min-width: 380px) {
    width: $width;
    height: $height;
    line-height: $lineHeight;
    &.wider {
      width: $widers;
    }
  }
  @media screen and (min-width: 768px) {
    width: $width * 1.75;
    height: $height * 1.75;
    line-height: $lineHeight * 1.75;
    &.wider {
      width: $widers * 1.75;
    }
  }
  @media screen and (min-width: 1200px) {
    @apply text-4xl;
    width: $width * 2;
    height: $height * 2;
    line-height: $lineHeight * 2;
    &.wider {
      width: $widers * 2;
    }
  }

  &:active {
    @apply bg-gray-500;
    transform: scale(1.11);
  }
}
</style>
