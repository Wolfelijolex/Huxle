<template>
  <PopupComponentVue :show-close-button="showCloseButton" :show-popup="isOpen" @close-popup="isOpen = false">
    <div class="min-w-full flex-col text-center text-black font-bold text-xl p-8 mt-6">
      <span class="px-8"> {{ $t(errorText) }} </span>
      <ShakingEmojiComponent v-if="showEmoji" :emoji="errorType === 'error' ? '😢' : '😭'" />
    </div>
  </PopupComponentVue>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import PopupComponentVue from "@/components/PopUps/BasePopupComponent.vue";
import ShakingEmojiComponent from "../ShakingEmojiComponent.vue";

export type Error = "UnknownLanguage" | "link" | "error";
const props = defineProps<{
  errorType: Error;
}>();

const isOpen = ref(true);
const showEmoji = ref(true);
const showCloseButton = ref(false);
const errorText = ref("");

if (props.errorType == "UnknownLanguage") {
  errorText.value = "errors.unsupportedLangText";
  showCloseButton.value = true;
} else if (props.errorType == "link") {
  errorText.value = "errors.invalidLinkText";
} else {
  errorText.value = "errors.genericErrorText";
}
</script>

<style lang="scss" scoped></style>
