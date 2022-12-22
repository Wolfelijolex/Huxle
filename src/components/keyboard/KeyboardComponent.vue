<template>
  <div class="flex flex-col gap-2" v-if="lineInfo['A']">
    <!-- v-if super mega wichtig -->
    <div class="flex gap-2 min-w-sm justify-between mx-auto">
      <KeyComponent
        v-for="key in rows[0]"
        :key="key"
        @key-pressed="keyPressed"
        :character="key"
        :state="lineInfo[key].state"
      />
    </div>
    <div class="flex gap-2 min-w-sm justify-around mx-auto px-4">
      <KeyComponent
        v-for="key in rows[1]"
        :key="key"
        @key-pressed="keyPressed"
        :character="key"
        :state="lineInfo[key].state"
      />
    </div>
    <div class="flex gap-2 min-w-sm justify-between mx-auto">
      <KeyComponent @key-pressed="keyPressed" character="Enter" state="fresh">
        <template #viewer>
          <font-awesome-icon icon="fa-solid fa-check" />
        </template>
      </KeyComponent>
      <KeyComponent
        v-for="key in rows[2]"
        :key="key"
        @key-pressed="keyPressed"
        :character="key"
        :state="lineInfo[key].state"
      />
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
import type { LineInfo } from "@/components/WordGrid/WordGridComponent.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
type Props = {
  lineInfo: LineInfo;
};
const props = defineProps<Props>();
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
