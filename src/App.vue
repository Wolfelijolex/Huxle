<template>
  <div class="custom-fullheight flex flex-col">
    <div class="bg-gray-800 text-white text-lg font-bold pr-6 pl-6">
      <div class="container px-2 mx-auto">
        <div class="py-3 flex flex-row justify-between align-middle">
          <p class="text-white text-2xl font-bold cursor-pointer duration-200 p-2 hover:bg-gray-600 rounded-xl">
            {{ $t("huxle") }}
          </p>
          <LanguageSwitcher />
        </div>
      </div>
    </div>

    <div class="container px-2 mx-auto p-5 h-full">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { useWindowEventListener } from "./composables/event";

/**
 * This is required because in mobile safari 100vh !== window.innerHeight because the
 * changing address bar height is not accounted for in the viewport height.
 */
function setScreenHeight() {
  document.documentElement.style.setProperty("--vh", window.innerHeight / 100 + "px");
}

setScreenHeight();
useWindowEventListener("resize", setScreenHeight);
</script>

<style scoped lang="scss">
.custom-fullheight {
  height: calc(100 * var(--vh));
}
</style>
