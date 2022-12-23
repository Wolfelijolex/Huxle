import { createI18n } from "vue-i18n";
import en from "./en.json";
import de from "./de.json";

export const availableLocales = ["de", "en"] as const;

export const i18n = createI18n({
  messages: {
    en,
    de,
  },
  availableLocales,
  fallbackLocale: "en",
  locale: "en",
  legacy: false,
});

export const isSupportedLocale = (locale: string): locale is typeof availableLocales[number] => {
  return availableLocales.includes(locale as any);
};
