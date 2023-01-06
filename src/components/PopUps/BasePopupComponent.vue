<template>
  <div v-if="props.showPopup">
    <div class="popUpBackground">
      <div class="popUpWindow">
        <div v-if="props.showCloseButton" class="closeButton" @click="closePopUp()">x</div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  showCloseButton?: boolean;
  showPopup: boolean;
}>();

const emit = defineEmits<{
  (event: "closePopup"): void;
}>();

function closePopUp() {
  emit("closePopup");
}
</script>

<style lang="scss" scoped>
.popUpBackground {
  @apply absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm;
}

.popUpWindow {
  @apply absolute flex top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 portrait:w-11/12 landscape:w-auto h-auto bg-white rounded-lg shadow-2xl;
}

.closeButton {
  @apply absolute z-40 text-center duration-200 top-0 m-2 right-0 w-8 h-8 text-xl bg-red-400 text-white font-bold cursor-pointer rounded select-none;

  &:hover {
    @apply bg-red-500;
  }

  &:active {
    @apply bg-red-600;
  }
}
</style>
