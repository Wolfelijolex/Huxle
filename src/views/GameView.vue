<template>
  <template v-if="gameStore.endTimestamp != 0">
    <WinStatePopup v-if="!showStats" :won="gameWon" />
    <StatsPopup v-else />
  </template>
  <ErrorPopup v-if="showErrorPopUp" :errorType="errorType" />

  <div class="flex flex-col justify-between gap-4 h-full">
    <WordGridComponentVue :past-tries="gameStore.tries" :current-line="lineStore.tries" />
    <KeyboardComponent @key="keyPressed" />
  </div>
</template>

<script lang="ts" setup>
import KeyboardComponent from "@/components/keyboard/KeyboardComponent.vue";
import ErrorPopup, { type Error } from "@/components/PopUps/ErrorPopupComponent.vue";
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
const hash = useRoute().params.hash;
const { locale } = useI18n();

const gameWon = ref(false);
const errorType = ref<Error>("error");
const showErrorPopUp = ref(false);
const showStats = ref(false);

useKeyboard(keyPressed);
resetGame(locale.value);

watch(locale, () => {
  resetGame(locale.value);
});

function resetGame(language: string) {
  gameWon.value = false;
  showStats.value = false;
  lineStore.reset();
  gameStore.reset();
  try {
    if (Array.isArray(hash)) {
      throw new Error("Hash is an array!");
    }

    const gameSettings = decode(hash);

    if (isSupportedLocale(language)) {
      gameStore.setWord(gameSettings[language].toUpperCase());
    } else {
      gameStore.setWord(gameSettings.en.toUpperCase());
      errorType.value = "UnknownLanguage";
      showErrorPopUp.value = true;
    }
  } catch {
    errorType.value = "link";
    showErrorPopUp.value = true;
  }
}

function keyPressed(key: string) {
  if (gameStore.endTimestamp !== 0 || !gameStore.isValid) {
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
