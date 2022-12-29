<template>
  <div class="popUpBackground">
    <div class="popUpWindow">
      <div class="closeButton" @click="closePopUp()">x</div>
      <div class="statsHeadline">
        link to share:
        <div class="urlToShare">{{ linkToShare }}</div>
        <button class="shareButton" @click="copyToClipboard()">📋</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import winStatePopup from "./winStatePopup.vue";
import statsPopUp from "./statsPopUp.vue";
import errorPopUp from "./errorPopUp.vue";

const props = defineProps<{
  linkToShare: string;
}>();

const linkToShare = ref(props.linkToShare);
function copyToClipboard() {
  navigator.clipboard.writeText(linkToShare.value);
  console.log("copied to clipboard");
}

function closePopUp() {
  popUpOpen.value = false;
}

const popUpOpen = reactive({
  value: true,
});
statsPopUp;
errorPopUp;
</script>

<style>
.popUpBackground {
  @apply absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm;
}

.popUpWindow {
  @apply absolute flex top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 landscape:w-1/4 portrait:w-3/4 h-auto bg-white rounded-lg drop-shadow-lg;
}

.shareLinkHeadline {
  @apply text-center text-black font-bold text-xl m-8;
}

.statsHeadline {
  @apply text-black font-bold text-4xl m-8;
}

.urlToShare {
  @apply text-black font-bold bg-slate-200 overflow-hidden w-1/2 text-xl;
}

/* share button next to url to share gray background  square rounded of edges*/
.shareButton {
  @apply absolute text-center duration-200 w-10 h-10 text-2xl bg-gray-400 text-white font-bold cursor-pointer;
}
.shareButton:hover {
  @apply bg-blue-500;
}
.shareButton:active {
  @apply absolute bg-blue-600 w-9 h-9;
}

/* .closeButton {
  @apply absolute text-center duration-200 top-0 m-2 right-0 w-10 h-10 text-2xl bg-gray-400 text-white font-bold cursor-pointer;
} */

.closeButton:hover {
  @apply bg-red-500;
}

.closeButton:active {
  @apply absolute bg-red-600 w-9 h-9;
}

.statsContainer {
  @apply mb-32 m-8 w-96;
}

.statsText {
  @apply text-black font-bold text-2xl;
}
</style>
