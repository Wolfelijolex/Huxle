<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2 max-w-6xl justify-between mx-auto">
      <KeyComponent @key-pressed="key" character="Q" state="fresh" />
      <KeyComponent @key-pressed="key" character="W" state="fresh" />
      <KeyComponent @key-pressed="key" character="E" state="fresh" />
      <KeyComponent @key-pressed="key" character="R" state="fresh" />
      <KeyComponent @key-pressed="key" character="T" state="fresh" />
      <KeyComponent @key-pressed="key" character="Z" state="fresh" />
      <KeyComponent @key-pressed="key" character="U" state="fresh" />
      <KeyComponent @key-pressed="key" character="I" state="fresh" />
      <KeyComponent @key-pressed="key" character="O" state="fresh" />
      <KeyComponent @key-pressed="key" character="P" state="fresh" />
    </div>
    <div class="flex gap-2 max-w-6xl justify-around mx-auto px-4">
      <KeyComponent @key-pressed="key" character="A" state="fresh" />
      <KeyComponent @key-pressed="key" character="S" state="fresh" />
      <KeyComponent @key-pressed="key" character="D" state="fresh" />
      <KeyComponent @key-pressed="key" character="F" state="fresh" />
      <KeyComponent @key-pressed="key" character="G" state="fresh" />
      <KeyComponent @key-pressed="key" character="H" state="fresh" />
      <KeyComponent @key-pressed="key" character="J" state="fresh" />
      <KeyComponent @key-pressed="key" character="K" state="fresh" />
      <KeyComponent @key-pressed="key" character="L" state="fresh" />
    </div>
    <div class="flex gap-2 max-w-6xl justify-between mx-auto">
      <KeyComponent @key-pressed="key" character="Enter" state="fresh">
        <template #viewer>
          <font-awesome-icon icon="fa-solid fa-check" />
        </template>
      </KeyComponent>
      <KeyComponent @key-pressed="key" character="Y" state="fresh" />
      <KeyComponent @key-pressed="key" character="X" state="fresh" />
      <KeyComponent @key-pressed="key" character="C" state="fresh" />
      <KeyComponent @key-pressed="key" character="V" state="fresh" />
      <KeyComponent @key-pressed="key" character="B" state="fresh" />
      <KeyComponent @key-pressed="key" character="N" state="fresh" />
      <KeyComponent @key-pressed="key" character="M" state="fresh" />
      <KeyComponent @key-pressed="key" character="Backspace" state="fresh">
        <template #viewer>
          <font-awesome-icon icon="fa-solid fa-delete-left" />
        </template>
      </KeyComponent>
    </div>
  </div>
</template>

<script lang="ts" setup>
import KeyComponent from "@/components/keyboard/KeyComponent.vue";

function key(key: string) {
  console.log(`Key pressed: ${key}`);
}
</script>
