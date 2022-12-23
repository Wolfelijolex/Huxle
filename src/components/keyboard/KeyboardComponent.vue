<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2 min-w-sm justify-between mx-auto">
      <KeyComponent v-for="key in rows[0]" :key="key" @key-pressed="keyPressed" :char="key" :state="getKeyState(key)" />
    </div>
    <div class="flex gap-2 min-w-sm justify-around mx-auto px-4">
      <KeyComponent v-for="key in rows[1]" :key="key" @key-pressed="keyPressed" :char="key" :state="getKeyState(key)" />
    </div>
    <div class="flex gap-2 min-w-sm justify-between mx-auto">
      <KeyComponent @key-pressed="keyPressed" char="Enter" state="fresh">
        <template #viewer>
          <font-awesome-icon icon="fa-solid fa-check" />
        </template>
      </KeyComponent>
      <KeyComponent v-for="key in rows[2]" :key="key" @key-pressed="keyPressed" :char="key" :state="getKeyState(key)" />
      <KeyComponent @key-pressed="keyPressed" char="Backspace" state="fresh">
        <template #viewer>
          <font-awesome-icon icon="fa-solid fa-delete-left" />
        </template>
      </KeyComponent>
    </div>
  </div>
</template>

<script lang="ts" setup>
import KeyComponent from "@/components/keyboard/KeyComponent.vue";
import { useGameStore, type CharState } from "@/stores/game-store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const emit = defineEmits(["key"]);
const gameState = useGameStore();

const rows = [
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Y", "X", "C", "V", "B", "N", "M"],
];

function keyPressed(key: string) {
  emit("key", key);
}

function getKeyState(key: string): CharState {
  // run through all tries in reverse order to find the last usage of each key
  for (let i = gameState.allTries.length - 1; i >= 0; i--) {
    const try_ = gameState.allTries[i];
    if (try_.char === key) {
      return try_.state;
    }
  }
  return "fresh";
}
</script>
