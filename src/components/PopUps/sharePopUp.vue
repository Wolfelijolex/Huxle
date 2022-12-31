<template>
  <div v-if="popUpOpen.value">
    <div class="popUpBackground">
      <div class="popUpWindow">
        <div class="closeButton" @click="closePopUp()">x</div>
        <div class="sharePopUpHeadline">
          link to share:
          <div class="buttonContainer">
            <div class="urlToShare">{{ linkToShare.valueOf }}</div>
            <button class="urlShareButton" @click="copyToClipboard()"
              title="copy link to clipboard">{{ clipboardEmoji.value }}</button>
          </div>
          <div class="message">{{ clipboardMessage.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import statsPopUp from "./statsPopUp.vue";
import errorPopUp from "./errorPopUp.vue";

const props = defineProps<{
  linkToShare: string;
}>();
var linkToShare = ref(props.linkToShare)

// linkToShare.value = "http://localhost:5173/eyJlbiI6ImZlbGl4IiwiZGUiOiJmZWxpeCJ9"; //todo get link

function copyToClipboard() {
  clipboardMessage.value = "copied to clipboard!";
  clipboardEmoji.value = "✓";
  navigator.clipboard.writeText(linkToShare.value);
  console.log("copied to clipboard");
}

function closePopUp() {
  popUpOpen.value = false;
  console.log("close popUp");
  
}

const popUpOpen = reactive({
  value: true,
});

const clipboardMessage = reactive({
  value: "",
});
const clipboardEmoji = reactive({
  value: "📋",
});

statsPopUp;
errorPopUp;
</script>

<style>

.message {
  @apply text-black font-normal text-base mt-2 select-none;
}

.buttonContainer {
  @apply mt-2;
}

.popUpBackground {
  @apply absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm;
}

.sharePopUpHeadline {
  @apply min-w-full text-black font-bold text-xl p-8;
}

.urlShareButton {
  @apply font-bold duration-200 text-white bg-slate-400 overflow-hidden  rounded-md w-28 text-center select-none;
}
.urlShareButton:hover {
  @apply bg-slate-500;
}
.urlShareButton:active {
  @apply bg-green-600;
}

.urlToShare {
  @apply text-black font-normal w-full bg-slate-200 overflow-hidden p-2 mr-2   text-base rounded-md overflow-ellipsis whitespace-nowrap select-all;
}

</style>
