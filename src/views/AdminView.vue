<template>
  <PopupComponent :show-close-button="true" :show-popup="showPopup" @close-popup="showPopup = false">
    <div class="min-w-full text-black font-bold text-xl p-8">
      {{ $t("admin.linkToShare") }}
      <div class="flex min-w-full mt-4 mb-4 landscape:w-2/4 portrait:w-3/4">
        <div
          class="flex-grow text-black font-normal bg-slate-200 overflow-hidden p-2 mr-2 text-base rounded-md overflow-ellipsis whitespace-nowrap select-all"
        >
          {{ url }}
        </div>
        <button class="urlShareButton" @click="copyToClipboard(url)" :title="$t('global.copyToClipboard')">
          {{ showTick ? "✅" : "📋" }}
        </button>
      </div>
    </div>
  </PopupComponent>

  <form @submit.prevent="createLink()" class="flex flex-col mx-2">
    <div class="font-bold my-4">{{ $t("admin.create") }}</div>
    <TextInput label="admin.englishWord" v-model="englishWord" :invalid="!isEnglishWordValid" />
    <TextInput label="admin.germanWord" v-model="germanWord" :invalid="!isGermanWordValid" />

    <button class="self-end my-4 px-4 py-2 bg-gray-500 text-slate-50 rounded curser-pointer font-bold hover-animation">
      {{ $t("admin.createLink") }}
    </button>
  </form>
</template>

<script lang="ts" setup>
import PopupComponent from "@/components/PopUps/BasePopupComponent.vue";
import TextInput from "@/components/TextInput.vue";
import { useToggleTwice } from "@/composables/toggle-twice";
import { toEncodedUrl, type GameSettings } from "@/utils/encoder.util";
import { isValidWord } from "@/utils/game.util";
import { computed, ref } from "vue";

const englishWord = ref("");
const germanWord = ref("");

const isEnglishWordValid = computed(() => isValidWord(englishWord.value));
const isGermanWordValid = computed(() => isValidWord(germanWord.value));

const url = ref("");
const showPopup = ref(false);
const showTick = ref(false);

function createLink() {
  const data: GameSettings = {
    en: englishWord.value,
    de: germanWord.value,
  };

  try {
    url.value = toEncodedUrl(data);
    showPopup.value = true;
  } catch (error) {
    console.error(error);
  }
}

function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value);
  useToggleTwice(showTick);
}
</script>

<style lang="scss" scoped>
.hover-animation {
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.08);
    @apply shadow-xl;
  }
}

.urlShareButton {
  @apply font-bold duration-200 text-white bg-slate-400 overflow-hidden rounded-md portrait:w-44 landscape:w-20 text-center select-none;

  &:hover {
    @apply bg-slate-500;
  }

  &:active {
    @apply bg-green-600;
  }
}
</style>
