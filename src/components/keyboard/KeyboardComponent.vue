<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2 max-w-6xl justify-between mx-auto">
      <KeyComponent v-for="key in rows[0]" :key="key" @key-pressed="keyPressed" :character="key" state="fresh" />
    </div>
    <div class="flex gap-2 max-w-6xl justify-around mx-auto px-4">
      <KeyComponent v-for="key in rows[1]" :key="key" @key-pressed="keyPressed" :character="key" state="fresh" />
    </div>
    <div class="flex gap-2 max-w-6xl justify-between mx-auto">
      <KeyComponent @key-pressed="keyPressed" character="Enter" state="fresh">
        <template #viewer>
          <font-awesome-icon icon="fa-solid fa-check" />
        </template>
      </KeyComponent>
      <KeyComponent v-for="key in rows[2]" :key="key" @key-pressed="keyPressed" :character="key" state="fresh" />
      <KeyComponent @key-pressed="keyPressed" character="Backspace" state="fresh">
        <template #viewer>
          <font-awesome-icon icon="fa-solid fa-delete-left" />
        </template>
      </KeyComponent>
    </div>
  </div>
</template>

<script lang="ts" setup>
import KeyComponent from "@/components/keyboard/KeyComponent.vue";
const emit = defineEmits(["key"]);
const rows = [
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Y", "X", "C", "V", "B", "N", "M"],
];

function keyPressed(key: string) {
  //console.log(`Key pressed: ${key}`);
  emit("key", key);
}
</script>
