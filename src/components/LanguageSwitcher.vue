<template>
  <div>
      <ul class="LanguageSwitcher">
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
import { availableLocales } from "@/i18n";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
function changeLocale(newLocale: string) {
  console.log("locale", newLocale);
  locale.value = newLocale;
}
</script>

<style lang="scss" scoped>
.active {
  @apply text-blue-600 bg-gray-900 text-white font-bold;
}

.LanguageSwitcher {
  @apply flex gap-2 text-sm text-white text-base font-normal;
}

.LanguageSwitcher li {
  @apply flex gap-2 text-sm text-white text-base font-normal ;
}

.LanguageSwitcher li button {
  @apply flex gap-2 text-sm text-white text-base font-normal pt-1 pb-1 pl-3 pr-3 duration-200 hover:bg-slate-500 ;
}
</style>
