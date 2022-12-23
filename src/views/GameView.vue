<template>
  <div class="flex flex-col justify-between gap-4 h-full">
    <WordGridComponentVue :past-tries="gameStore.tries" :current-line="lineStore.tries" />
    <KeyboardComponent @key="keyPressed" />
  </div>
  <div>
    Game Settings:
    <pre>{{ gameStore.word ?? "invalid" }}</pre>
    <pre>Defaulting to "GAMER"</pre>
  </div>
</template>

<script lang="ts" setup>
import KeyboardComponent from "@/components/keyboard/KeyboardComponent.vue";
import WordGridComponentVue from "@/components/WordGrid/WordGridComponent.vue";
import { isSupportedLocale } from "@/i18n";
import { useCurrentLineStore } from "@/stores/current-line-store";
import { useGameStore } from "@/stores/game-store";
import { decode } from "@/utils/encoder.util";
import { getCharStatesForLine, isCorrectWord, isValidKey } from "@/utils/game.util";
import { onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const lineStore = useCurrentLineStore();
const gameStore = useGameStore();
const gameFinished = ref(false);
const hash = useRoute().params.hash;
const { locale } = useI18n();

const keyboardHandler = (event: KeyboardEvent) => {
  if (event.key.length === 1) {
    if (!isValidKey(event.key.toUpperCase())) {
      return;
    }

    keyPressed(event.key.toUpperCase());
  } else {
    keyPressed(event.key);
  }
};

onMounted(() => {
  window.addEventListener("keyup", keyboardHandler);
});

onUnmounted(() => {
  window.removeEventListener("keyup", keyboardHandler);
});

try {
  if (Array.isArray(hash)) {
    throw new Error("Hash is an array!");
  }

  const gameSettings = decode(hash);
  console.log("Game settings:", gameSettings);

  if (isSupportedLocale(locale.value)) {
    gameStore.setWord(gameSettings[locale.value].toUpperCase());
  } else {
    // TODO @FELIX RADER: Maybe show popup that language is not supported?
    gameStore.setWord(gameSettings.en.toUpperCase());
  }
} catch {
  onFaultyHash();
  gameStore.setWord("GAMER"); //TODO remove
}

function onFaultyHash() {
  console.error("Error! No valid game settings found!");
  console.info("A popup should appear now!");
}

function keyPressed(key: string) {
  if (gameFinished.value) {
    return;
  }

  if (key === "Backspace") {
    lineStore.removeLastTry();
    return;
  }

  if (key === "Enter" && lineStore.tries.length === 5) {
    const line = getCharStatesForLine(lineStore.tries);
    gameStore.addTry(line);
    lineStore.reset();

    if (isCorrectWord(line, gameStore.word ?? "")) {
      gameEnd(true);
    } else if (gameStore.tries.length >= 6) {
      gameEnd(false);
    }

    return;
  }

  if (lineStore.tries.length >= 5) {
    // dont react on keypresses if line is full
    return;
  }

  if (key.length === 1) {
    lineStore.addTry({ char: key, state: "fresh" });
    return;
  }
}

function gameEnd(win: boolean) {
  if (win) {
    console.log("You won!");
    //TODO
    //MAKE POPUP APPEAR HERE @FELIX RADER
  } else {
    console.log("You lost!");
    //TODO
    //MAKE POPUP APPEAR HERE @FELIX RADER
  }
  gameFinished.value = true;
}
</script>

<style lang="scss">
.notIncluded,
.correct,
.wrongPos {
  @apply text-white;
}

.notIncluded {
  @apply bg-gray-400 text-gray-300;
}

.wrongPos {
  @apply bg-yellow-500;
}

.correct {
  @apply bg-green-600;
}
</style>
