<template>
  <div class="bg-gray-800 text-white text-lg font-bold pr-6 pl-6">
    <div class="container px-2 mx-auto">
      <div class="py-3 flex flex-row justify-between align-middle">
        <RouterLink :to="{ name: 'create' }">
          <p class="text-white text-2xl font-bold cursor-pointer duration-200 p-2 hover:bg-gray-600 rounded-xl">
            {{ $t("huxle") }}
          </p>
        </RouterLink>
        <LanguageSwitcher />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LanguageSwitcher from "./LanguageSwitcher.vue";
</script>
