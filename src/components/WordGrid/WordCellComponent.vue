<template >
  <div
    :class="{
      fresh: props.state === 'fresh',
      notIncluded: props.state === 'not-included',
      wrongPos: props.state === 'wrong-pos',
      correct: props.state === 'correct',
      wider: !!$slots.viewer,
    }"
    class="text-sm font-bold cursor-pointer text-center border hover:border-gray-500"
  >
    <slot name="viewer">
      {{ props.character.toUpperCase() }}
    </slot>
  </div>
</template>
<script lang="ts" setup>
type Props = {
  character: string;
  state: string;
};
const props = defineProps<Props>();

</script>

<style lang="scss" scoped>
div {
  width: 2rem;
  height: 2.5rem;
  line-height: 2.5rem;
  box-sizing: border-box;
  transition: 0.08s;
  user-select: none;

  &.wider {
    width: 3.25rem;
  }

  .fresh {
    @apply bg-gray-300;
  }

  .notIncluded {
    @apply bg-gray-600;
  }

  .wrongPos {
    @apply bg-yellow-500;
  }

  .correct {
    @apply bg-green-600;
  }

  &:active {
    transform: scale(1.11);
  }
}
</style>
