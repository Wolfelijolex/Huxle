<template>
  <div v-if="popUpOpen.value">
    <div class="popUpBackground">
      <div v-if="noButtons.value" class="popUpWindow">
        <div v-if="closeButton.value" class="closeButton" @click="closePopUp()">x</div>
        <div class="errorText">
          {{ errorText.value }}
          <div v-if="showEmoji.value" class="Emoji">😢</div>
        </div>
      </div>
      <div v-else class="popUpWindow">
        <div v-if="closeButton.value" class="closeButton" @click="closePopUp()">x</div>
        <div class="TextWithButtonsContainer">
          <div class="errorText">
            {{ errorText.value }} {{ languageName }}
            <div v-if="showEmoji.value" class="Emoji">😭</div>
          </div>
          <div class="buttonContainer">
            <button class="button" @click="changeLanguage()">switch to {{ languageName }}</button>
            <button class="button" @click="closePopUp()">cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

const props = defineProps<{
  errorType: string;
}>();

const languageName = "german";

var errorType = ref(props.errorType);
const noButtons = reactive({
  value: true,
});

function closePopUp() {
  popUpOpen.value = false;
}
function changeLanguage() {
  console.log("change language");
  // todo change language
  // reload page
  closePopUp();
}

const popUpOpen = reactive({
  value: true,
});

const errorHeadline = reactive({
  value: "error",
});
const errorText = reactive({
  value: "error",
});

const closeButton = reactive({
  value: false,
});

const showEmoji = reactive({
  value: true,
});

if (errorType.value == "UnknownLanguage") {
  errorText.value = "Sorry, but game is not aviailable in your language yet.";
  closeButton.value = true;
  showEmoji.value = true;
} else if (errorType.value == "link") {
  showEmoji.value = true;
  errorText.value = "Sorry! The given link is invalid.";
} else if (errorType.value == "switchLanguages") {
  errorText.value = "Do you really want to discard your progress and switch to ";
  noButtons.value = false;
  showEmoji.value = false;
} else {
  errorText.value = "Sorry, but an error occured. Please try again later. If the error persists, please contact us.";
}
</script>

<style lang="scss">
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

.textWithButtonsContainer {
  @apply flex flex-col justify-center;
}
</style>
