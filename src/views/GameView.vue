<template>
  <div class="flex flex-col gap-4">
    <WordGridComponentVue :new-char="theKey" @resolve-char="keyResolved" @game-end="gameEnd" :theWord="theWord" />
    <KeyboardComponent @key="keyPressed" />
  </div>
  Game Settings:
  <pre>{{ gameSettings ?? "invalid" }}</pre>
  <pre>Defaulting to "GAMER"</pre>
</template>

<script lang="ts" setup>
import KeyboardComponent from "@/components/keyboard/KeyboardComponent.vue";
import WordGridComponentVue from "@/components/WordGrid/WordGridComponent.vue";
import { decode, type GameSettings } from "@/utils/encoder.util";
import { ref } from "vue";
import { useRoute } from "vue-router";

const hash = useRoute().params.hash;
const gameSettings = ref<GameSettings | null>(null);
const theWord = ref("GAMER");

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

const theKey = ref("");
function keyPressed(key: string) {
  theKey.value = key;
}
function keyResolved() {
  theKey.value = "";
}

function gameEnd(win: boolean) {
  if (win) {
    console.log("You won!");
    //TODO
    //MAKE POPUP APPEAR HERE @FELIX RADER
  }
  else{
    console.log("You lost!");
    //TODO
    //MAKE POPUP APPEAR HERE @FELIX RADER
  }
}
</script>

<style lang="scss" scoped></style>
