<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2 min-w-sm justify-between mx-auto">
      <KeyComponent
        v-for="key in keyRows[0]"
        :key="key"
        @key-pressed="keyPressed"
        :char="key"
        :state="getKeyState(key)"
      />
    </div>
    <div class="flex gap-2 min-w-sm justify-around mx-auto px-4">
      <KeyComponent
        v-for="key in keyRows[1]"
        :key="key"
        @key-pressed="keyPressed"
        :char="key"
        :state="getKeyState(key)"
      />
    </div>
    <div class="flex gap-2 min-w-sm justify-between mx-auto">
      <KeyComponent @key-pressed="keyPressed" char="Enter" state="fresh">
        <template #viewer>
          <font-awesome-icon icon="fa-solid fa-check" />
        </template>
      </KeyComponent>
      <KeyComponent
        v-for="key in keyRows[2]"
        :key="key"
        @key-pressed="keyPressed"
        :char="key"
        :state="getKeyState(key)"
      />
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

const keyRows = [
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Y", "X", "C", "V", "B", "N", "M"],
];

function keyPressed(key: string) {
  emit("key", key);
}

function getKeyState(key: string): CharState {
  const appearences = gameState.allTries.filter((try_) => try_.char === key);

  let state: CharState = "fresh";
  for (const t of appearences) {
    if (t.state === "correct") {
      return "correct";
    }

    if (t.state === "wrong-pos") {
      state = "wrong-pos";
    }

    if (t.state === "not-included") {
      state = state === "wrong-pos" ? state : "not-included";
    }
  }

  return state;
}
</script>
