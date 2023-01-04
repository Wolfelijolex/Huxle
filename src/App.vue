<template>
  <div class="h-screen flex flex-col">
    <div class="navBar">
      <div class="container px-2 mx-auto">
        <div class="py-3 flex flex-row justify-between align-middle">
          <p class="navBarLogo">{{ $t("huxle") }}</p>
          <LanguageSwitcher />
        </div>
      </div>
    </div>

    <div class="container px-2 mx-auto h-full p-5">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
</script>

<style scoped lang="scss">
div {
  padding-left: 0;
  padding-right: 0;
}

.navBar {
  @apply bg-gray-800 text-white text-lg font-bold pr-6 pl-6;
}

.navBarLogo {
  @apply text-white text-lg font-bold cursor-pointer duration-200;
}


</style>
