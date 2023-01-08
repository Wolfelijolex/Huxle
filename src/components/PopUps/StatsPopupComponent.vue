<template>
  <PopupComponent :show-close-button="true" :show-popup="statsOpen" @close-popup="statsOpen = false">
    <div class="popUpWindowGrid">
      <div class="py-8">
        <div class="statsHeadline">
          {{ $t("stats.headline") }}
        </div>
        <div class="statsText">{{ $t("stats.time", { time: gameStore.totalTime }) }}</div>
        <div class="statsText">{{ $t("stats.tries", { value: gameStore.tries.length }) }}</div>
      </div>
      <div class="w-full h-full mb-6">
        <SimpleWordGrid :showLetters="showLetters" />
        <div class="flex flex-row gap-2 mt-4">
          <button class="button" @click="showLetters = !showLetters">
            {{ $t(`stats.${showLetters ? "hideLetters" : "showLetters"}`) }}
          </button>
          <button class="button flex-grow" :disabled="finalGameGridBlob == null" @click="copyToClipboard()">
            {{ finalGameGridBlob == null ? $t("errors.clipboard") : $t(clipBoardButtonText) }}
          </button>
        </div>
      </div>
    </div>
  </PopupComponent>
</template>

<script lang="ts" setup>
import { useGameStore } from "@/stores/game-store";
import { onMounted, ref } from "vue";
import PopupComponent from "@/components/PopUps/BasePopupComponent.vue";
import html2canvas from "html2canvas";
import SimpleWordGrid from "../WordGrid/SimpleWordGridComponent.vue";

const gameStore = useGameStore();

const showLetters = ref(false);
const clipBoardButtonText = ref("stats.share");
const statsOpen = ref(true);
const finalGameGridBlob = ref<Blob | null>(null);

onMounted(() => {
  renderGrid().then((res) => {
    finalGameGridBlob.value = res;
  });
});

async function renderGrid() {
  const grid = document.getElementById("FinalGameGrid");
  if (!grid) {
    console.error("grid not found");
    return null;
  }

  try {
    const canvas = await html2canvas(grid);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve));
    if (!blob) {
      throw new Error("blob is null");
    }
    return blob;
  } catch (e) {
    console.error(e);
    return null;
  }
}

function copyToClipboard() {
  if (!finalGameGridBlob.value) {
    return;
  }
  navigator.clipboard
    .write([new ClipboardItem({ "image/png": finalGameGridBlob.value })])
    .then(() => {
      clipBoardButtonText.value = "stats.copied";
      setTimeout(() => {
        clipBoardButtonText.value = "stats.share";
      }, 2000);
    })
    .catch(() => {
      clipBoardButtonText.value = "errors.clipboard";
      finalGameGridBlob.value = null;
    });
}
</script>

<style lang="scss" scoped>
.popUpWindowGrid {
  @apply flex flex-col w-full h-full m-5;
}

.statsHeadline {
  @apply text-black font-bold portrait:text-2xl text-4xl;
}

.statsText {
  @apply text-black portrait:text-sm text-base;
}

.button {
  @apply font-bold portrait:text-base portrait:font-semibold text-lg duration-200 bg-slate-400 overflow-hidden rounded-xl h-auto mt-5 p-4 text-center select-none;

  &:hover {
    @apply bg-blue-500;
  }

  &:active {
    @apply bg-blue-600;
  }

  &:disabled {
    @apply bg-gray-300 cursor-default;
  }
}
</style>
