<template>
  <div
    @click="emit('keyPressed', props.character)"
    :class="props.state"
    class="p-2 px-3 rounded text-sm font-bold cursor-pointer"
  >
    {{ props.character.toUpperCase() }}
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
.fresh {
  @apply bg-gray-300;
}

.not-included {
  @apply bg-gray-600;
}

.wrong-pos {
  @apply bg-yellow-500;
}

.correct {
  @apply bg-green-600;
}
</style>
