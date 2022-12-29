<template>
  <div v-if="popUpOpen.value">
    <div class="popUpBackground">
      <div class="popUpWindow">
        <div v-if="closeButton.value" class="closeButton" @click="closePopUp()">x</div>
        <div class="winStateText">{{ errorText.value }}
          <div class="Emoji">😭</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import statsPopUp from "./statsPopUp.vue";
import GameView from "@/views/GameView.vue";


const props = defineProps<{
  errorType : string;
}>();


var errorType = ref(props.errorType);

function closePopUp() {
  popUpOpen.value = false;
  GameView.value.errorPopUpOpen = false;
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

if (errorType.value == "UnknownLanguage") {
  errorText.value = "Sorry, but game is not aviailable in your language yet.";
  closeButton.value = true;
} else if (errorType.value == "link") {
  errorText.value = "Sorry! The given link is invalid"
} else if (errorType.value == "switchLanguages") {
  errorText.value = "Do you really want to discard your progress and switch to "
} else {
  errorText.value = "Sorry, but an error occured. Please try again later. If the error persists, please contact us."
}


</script>

<style>
.errorText {
  @apply flex flex-col m-10 text-black font-bold justify-center items-center w-full h-full text-3xl text-center;
}
</style>
