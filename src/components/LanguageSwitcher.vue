<template>
  <PopupComponent :show-popup="showPopup" @close-popup="showPopup = false">
    <div class="min-w-full flex-col text-center text-black font-bold text-xl p-8 mt-6;">
      <span class="px-8"> {{ $t("errors.switchLangText") }} </span>
      <div class="buttonContainer">
        <button type="button" class="button bg-red-500 hover:bg-red-600" @click="switchLocale()">
          {{ $t("errors.switchLang") }}
        </button>
        <button type="button" class="button bg-gray-400 hover:bg-gray-500" @click="showPopup = false">
          {{ $t("global.cancel") }}
        </button>
      </div>
    </div>
  </PopupComponent>

  <div>
    <ul class="flex gap-2 text-sm">
      <li v-for="availableLocale in availableLocales" :key="availableLocale">
        <button
          class="rounded-full secondary"
          :class="{ active: availableLocale === locale }"
          @click="changeLocale(availableLocale)"
        >
          {{ $t("languages." + availableLocale) }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { availableLocales, isSupportedLocale } from "@/i18n";
import { useGameStore } from "@/stores/game-store";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import PopupComponent from "./PopUps/BasePopupComponent.vue";

const { locale } = useI18n();
const gameStore = useGameStore();

const showPopup = ref(false);
const switchTo = ref<typeof availableLocales[number]>("en");

function changeLocale(newLocale: string) {
  if (newLocale === locale.value) {
    return;
  }

  if (isSupportedLocale(newLocale)) {
    switchTo.value = newLocale;
  } else {
    throw new Error("Unsupported locale: " + newLocale);
  }

  if (gameStore.startTimestamp !== 0) {
    showPopup.value = true;
  } else {
    switchLocale();
  }
}

function switchLocale() {
  locale.value = switchTo.value;
  showPopup.value = false;
}
</script>

<style lang="scss" scoped>
.active {
  @apply text-blue-600;
}

.buttonContainer {
  @apply flex flex-row justify-center mt-4;
}

.button {
  @apply text-center duration-200 p-2 ml-2 mr-2 text-xl text-white font-bold cursor-pointer rounded;
}
</style>
