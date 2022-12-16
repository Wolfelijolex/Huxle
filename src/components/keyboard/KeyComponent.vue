<template>
  <div
    @click="emit('keyPressed', props.character)"
    :class="{
      fresh: props.state === 'fresh',
      notIncluded: props.state === 'not-included',
      wrongPos: props.state === 'wrong-pos',
      correct: props.state === 'correct',
      wider: !!$slots.viewer,
    }"
    class="rounded text-sm font-bold cursor-pointer text-center"
  >
    <slot name="viewer">
      {{ props.character.toUpperCase() }}
    </slot>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  character: string;
  state: "fresh" | "not-included" | "wrong-pos" | "correct";
};

const props = defineProps<Props>();

const emit = defineEmits(["keyPressed"]);
</script>

<style lang="scss" scoped>
div {
  width: 2rem;
  height: 2.5rem;
  line-height: 2.5rem;

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
}
</style>
