import { useGameStore, type Try } from "@/stores/game-store";

export function getCharState(key: Try, index: number): Try {
  const gameStore = useGameStore();

  if (key.char === gameStore.word![index]) {
    return { ...key, state: "correct" };
  } else if (gameStore.word!.includes(key.char)) {
    return { ...key, state: "wrong-pos" };
  } else {
    return { ...key, state: "not-included" };
  }
}
