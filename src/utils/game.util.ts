import { useGameStore, type Key } from "@/stores/game-store";

export const keyRows = [
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Y", "X", "C", "V", "B", "N", "M"],
];

/**
 * Checks if a given character can be used in the game.
 * Only characters displayed on the on-screen keyboard are valid.
 * @param key The character to check
 */
export function isValidKey(key: string): boolean {
  return keyRows.some((row) => row.includes(key));
}

/**
 * Checks if a given word is valid in length and contains only valid characters.
 * @param word The word to check
 */
export function isValidWord(word: string): boolean {
  return word.length === 5 && word.toUpperCase().split("").every(isValidKey);
}

export function getCharStatesForLine(line: Key[]): Key[] {
  const gameStore = useGameStore();
  const remainingOccurances = getKeyOccurances(gameStore.word);

  let result = line.map((k, i) => mapCorrectChar(k, i, gameStore.word, remainingOccurances));
  result = result.map((k) => mapIncorretChar(k, remainingOccurances));

  return result;
}

/**
 * Gets the number of occurances of each character in a given word.
 * @param word The word to check
 */
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

/**
 * @param key The key to check
 * @param index The index of the key inside the given word
 * @param word The word to check against
 * @param remainingOccurances The number of remaining occurances of each character in the word, **this object will be modified**
 * @returns A **new** key object. If the key is in the correct position, the state is set to `correct`.
 */
function mapCorrectChar(key: Key, index: number, word: string, remainingOccurances: Record<string, number>): Key {
  if (key.char === word[index]) {
    remainingOccurances[key.char] -= 1;
    return { ...key, state: "correct" };
  }

  return { ...key };
}

/**
 * This function checks and sets the **incorrect** states of the keys in a word. The function {@link mapCorrectChar} should be called first.
 * @param key The key to check
 * @param remainingOccurances The number of remaining occurances of each character in the word, **this object will be modified**
 * @returns A **new** key object. The key state is set accordingly.
 */
function mapIncorretChar(key: Key, remainingOccurances: Record<string, number>): Key {
  if (key.state === "fresh") {
    if (remainingOccurances[key.char] > 0) {
      remainingOccurances[key.char] -= 1;
      return { ...key, state: "wrong-pos" };
    }

    return { ...key, state: "not-included" };
  }

  return { ...key };
}

/**
 * This function checks if a given array of keys matches a given word.
 * @param keys The array of keys to check
 * @param word The word to check against
 */
export function isCorrectWord(keys: Key[], word: string): boolean {
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].char !== word[i]) {
      return false;
    }
  }
  return true;
}
