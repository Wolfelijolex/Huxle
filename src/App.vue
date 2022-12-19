<template>
  <div>
    <div class="bg-blue-300 border-b border-black">
      <div class="container px-2 mx-auto">
        <p class="py-3">{{ $t("huxle") }}</p>
      </div>
    </div>

    <div class="container px-2 mx-auto">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
