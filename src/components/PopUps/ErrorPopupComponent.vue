<template>
  <PopupComponent :show-close-button="showCloseButton" :show-popup="isOpen" @close-popup="isOpen = false">
    <div v-if="showButtons">
      <div class="errorText">
        {{ errorText }}
        <div v-if="showEmoji" class="Emoji">😢</div>
      </div>
    </div>
    <div v-else>
      <div class="TextWithButtonsContainer">
        <div class="errorText">
          {{ errorText }} {{ languageName }}
          <div v-if="showEmoji" class="Emoji">😭</div>
        </div>
        <div class="buttonContainer">
          <button class="button" @click="changeLanguage()">
            {{ $t("languageSwitch.language") }} {{ languageName }}
          </button>
          <button class="button" @click="isOpen = false">{{ $t("languageSwitch.cancel") }}</button>
        </div>
      </div>
    </div>
  </PopupComponent>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import PopupComponent from "./PopupComponent.vue";

const props = defineProps<{
  errorType: string;
}>();

const languageName = "german";

const isOpen = ref(true);
const showButtons = ref(true);
const showEmoji = ref(false);
const showCloseButton = ref(false);
const errorText = ref("error");

function changeLanguage() {
  console.log("change language");
  // todo change language
  // reload page
  isOpen.value = false;
}

if (props.errorType == "UnknownLanguage") {
  errorText.value = "Sorry, but game is not aviailable in your language yet.";
  showCloseButton.value = true;
  showEmoji.value = true;
} else if (props.errorType == "link") {
  showEmoji.value = true;
  errorText.value = "Sorry! The given link is invalid.";
} else if (props.errorType == "switchLanguages") {
  errorText.value = "Do you really want to discard your progress and switch to ";
  showButtons.value = false;
  showEmoji.value = false;
} else {
  errorText.value = "Sorry, but an error occured. Please try again later. If the error persists, please contact us.";
}
</script>

<style lang="scss" scoped>
.errorText {
  @apply min-w-full flex-col text-center text-black font-bold text-xl p-8;
}

.buttonContainer {
  @apply flex flex-row justify-center;
}

.button {
  @apply text-center duration-200 p-2 mb-8 ml-2 mr-2 w-auto h-auto  text-xl bg-gray-400 text-white font-bold cursor-pointer rounded;

  &:hover {
    @apply bg-gray-500;
  }

  &:active {
    @apply bg-blue-600;
  }
}
</style>
