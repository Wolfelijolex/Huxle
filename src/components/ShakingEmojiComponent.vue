<template>
  <div class="Emoji">
    {{ props.emoji }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  emoji: string;
}>();
</script>

<style lang="scss" scoped>
.Emoji {
  @apply text-7xl m-4 duration-300 select-none;
  animation: shakeHead 2s linear infinite;

  &:hover {
    @apply text-8xl;
  }

  &:active {
    @apply text-6xl;
  }
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
