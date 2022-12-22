<template>
  <div class="h-screen flex flex-col">
    <div class="bg-blue-300 border-b border-black ">
      <div class="container px-2 mx-auto">
        <p class="py-3">{{ $t("huxle") }}</p>
      </div>
    </div>

    <div class="container px-2 mx-auto h-full p-5">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
div{
  padding-left: 0;
  padding-right: 0;
}
</style>
