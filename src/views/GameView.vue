<template>
  <KeyboardComponent />

  Game Settings:
  <pre>{{ gameSettings ?? "invalid" }}</pre>
</template>

<script lang="ts" setup>
import KeyboardComponent from "@/components/keyboard/KeyboardComponent.vue";
import { decode, type GameSettings } from "@/utils/encoder.util";
import { ref } from "vue";
import { useRoute } from "vue-router";

const hash = useRoute().params.hash;
const gameSettings = ref<GameSettings | null>(null);

try {
  if (Array.isArray(hash)) {
    onFaultyHash();
    throw new Error("Hash is an array!");
  }

  gameSettings.value = decode(hash);
  console.log("Game settings:", gameSettings.value);
  console.log("Go to the following link to play the game:");
} catch {
  onFaultyHash();
}

function onFaultyHash() {
  console.error("Error! No valid game settings found!");
  console.info("A popup should appear now!");
}
</script>

<style lang="scss" scoped></style>
