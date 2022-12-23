<template>
  <form @submit.prevent="createLink" class="flex flex-col">
    <div class="font-bold my-4">{{ $t("admin.create") }}</div>
    <TextInput label="admin.englishWord" v-model="englishWord" />
    <TextInput label="admin.germanWord" v-model="germanWord" />
    <button class="self-end my-4 px-4 py-2 bg-gray-500 text-slate-50 rounded curser-pointer font-bold hover-animation">
      {{ $t("admin.createLink") }}
    </button>
  </form>

  <!-- Temporary -->
  <a :href="url" v-if="url" class="mt-4 hover:text-blue-500">
    {{ url }}
  </a>
</template>

<script lang="ts" setup>
import TextInput from "@/components/TextInput.vue";
import { toEncodedUrl, type GameSettings } from "@/utils/encoder.util";
import { ref } from "vue";

const englishWord = ref("");
const germanWord = ref("");

const url = ref("");

function createLink() {
  const data: GameSettings = {
    en: englishWord.value,
    de: germanWord.value,
  };

  try {
    url.value = toEncodedUrl(data);
    console.log("Visit the following page to play:", url.value);
  } catch (error) {
    console.error(error);
  }
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
</style>
