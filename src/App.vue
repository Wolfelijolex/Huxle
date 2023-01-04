<template>
  <div class="h-screen flex flex-col">
    <div class="bg-blue-300 border-b border-black">
      <div class="container px-2 mx-auto">
        <div class="py-3 flex flex-row justify-between align-middle">
          <p>{{ $t("huxle") }}</p>
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
</style>
