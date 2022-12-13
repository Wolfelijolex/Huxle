<template>
  <div class="text-red-700">
    <h1 class="bg-green-500">{{ msg }}</h1>
    <h3>
      {{ $t("createdSuccessfully") }}
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<style scoped></style>
