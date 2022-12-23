import { useGameStore, type Key } from "@/stores/game-store";

export function getCharStatesForLine(line: Key[]): Key[] {
  const gameStore = useGameStore();

  const keyOccurances = getKeyOccurances(gameStore.word!);
  const remainingOccurances = { ...keyOccurances };

  let result = line.map((k, i) => mapCorrectChars(k, i, gameStore.word!, remainingOccurances));
  result = result.map((k) => getOtherChars(k, gameStore.word!, line, remainingOccurances));

  return result;
}

function getKeyOccurances(word: string): Record<string, number> {
  return word.split("").reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr]++;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {} as Record<string, number>);
}

function mapCorrectChars(key: Key, index: number, word: string, remainingOccurances: Record<string, number>): Key {
  if (key.char === word[index]) {
    remainingOccurances[key.char] -= 1;
    return { ...key, state: "correct" };
  }

  return { ...key };
}

function getOtherChars(key: Key, word: string, line: Key[], remainingOccurances: Record<string, number>): Key {
  const gameStore = useGameStore();

  if (key.state === "fresh") {
    if (remainingOccurances[key.char] > 0) {
      remainingOccurances[key.char] -= 1;
      return { ...key, state: "wrong-pos" };
    }

    if (!gameStore.word!.includes(key.char)) {
      return { ...key, state: "not-included" };
    }
  }

  return { ...key };
}

export function isCorrectWord(keys: Key[], word: string): boolean {
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].char !== word[i]) {
      return false;
    }
  }
  return true;
}
