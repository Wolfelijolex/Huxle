<template>
  <template v-if="gameFinished">
    <WinStatePopup v-if="!showStats" :won="gameWon" />
    <StatsPopup v-else />
  </template>
  <ErrorPopup v-if="errorPopUp" :errorType="errorType" />

  <div class="flex flex-col justify-between gap-4 h-full">
    <WordGridComponentVue :past-tries="gameStore.tries" :current-line="lineStore.tries" />
    <KeyboardComponent @key="keyPressed" />
  </div>
</template>

<script lang="ts" setup>
import KeyboardComponent from "@/components/keyboard/KeyboardComponent.vue";
import ErrorPopup from "@/components/PopUps/ErrorPopupComponent.vue";
import WinStatePopup from "@/components/PopUps/WinStatePopupComponent.vue";
import StatsPopup from "@/components/PopUps/StatsPopupComponent.vue";
import WordGridComponentVue from "@/components/WordGrid/WordGridComponent.vue";
import { useKeyboard } from "@/composables/keyboard";
import { isSupportedLocale } from "@/i18n";
import { useCurrentLineStore } from "@/stores/current-line-store";
import { useGameStore } from "@/stores/game-store";
import { decode } from "@/utils/encoder.util";
import { getCharStatesForLine, isCorrectWord } from "@/utils/game.util";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const lineStore = useCurrentLineStore();
const gameStore = useGameStore();
const gameFinished = ref(false);
const gameWon = ref(false);
const hash = useRoute().params.hash;
const { locale } = useI18n();

const errorType = ref("language");
const errorPopUp = ref(false);
const showStats = ref(false);

useKeyboard(keyPressed);
resetGame(locale.value);

watch(locale, () => {
  // TODO @FELIX RADER: Show popup asking for confirmation
  resetGame(locale.value);
});

function resetGame(language: string) {
  if (gameFinished.value) {
    return;
  }

  lineStore.reset();
  try {
    if (Array.isArray(hash)) {
      throw new Error("Hash is an array!");
    }

    const gameSettings = decode(hash);
    console.log("Game settings:", gameSettings);

    if (isSupportedLocale(language)) {
      gameStore.setWord(gameSettings[language].toUpperCase());
    } else {
      // TODO @FELIX RADER: Maybe show popup that language is not supported?
      gameStore.setWord(gameSettings.en.toUpperCase());
      errorType.value = "UnknownLanguage";
      errorPopUp.value = true;
    }
  } catch {
    onFaultyHash();
    gameStore.setWord("GAMER"); //TODO remove
  }
}

function onFaultyHash() {
  console.error("Error! No valid game settings found!");
  console.info("A popup should appear now!");
  errorType.value = "link";
  errorPopUp.value = true;
}

function keyPressed(key: string) {
  if (gameFinished.value || !gameStore.isValid) {
    return;
  }

  if (gameStore.startTimestamp === 0) {
    gameStore.setStartTimestamp(Date.now());
  }

  if (key === "Backspace") {
    lineStore.removeLastTry();
    return;
  }

  if (key === "Enter" && lineStore.tries.length === 5) {
    const line = getCharStatesForLine(lineStore.tries);
    gameStore.addTry(line);
    lineStore.reset();

    if (isCorrectWord(line, gameStore.word)) {
      endGame(true);
    } else if (gameStore.tries.length >= 6) {
      endGame(false);
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

function endGame(hasWon: boolean) {
  gameWon.value = hasWon;
  gameStore.setEndTimestamp(Date.now());
  gameFinished.value = true;

  // After 2 seconds, show stats
  setTimeout(() => {
    showStats.value = true;
  }, 2000);
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
