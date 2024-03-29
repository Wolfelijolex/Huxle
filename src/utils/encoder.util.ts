import { isValidWord } from "./game.util";

export type GameSettings = {
  de: string;
  en: string;
};

export function toEncodedUrl(settings: GameSettings): string {
  return `${window.location.origin}/${encode(settings)}`;
}

export function encode(data: GameSettings): string {
  if (!validateGameSettings(data)) {
    throw new Error("Invalid game settings");
  }

  return btoa(JSON.stringify(data));
}

export function decode(data: string): GameSettings {
  const settings = JSON.parse(atob(data));

  if (!validateGameSettingsObject(settings)) {
    throw new Error("Invalid settings object");
  }

  if (!validateGameSettings(settings)) {
    throw new Error("Invalid game settings");
  }

  return settings;
}

function validateGameSettingsObject(data: unknown): data is GameSettings {
  return typeof data === "object" && data !== null && "de" in data && "en" in data;
}

function validateGameSettings(settings: GameSettings): boolean {
  return isValidWord(settings.de) && isValidWord(settings.en);
}
