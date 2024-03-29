import { describe, expect, test, vitest } from "vitest";
import LanguageSwitcher from "../LanguageSwitcher.vue";
import { mount } from "@vue/test-utils";
import { i18n } from "../../i18n";
import { createTestingPinia } from "@pinia/testing";

describe("LanguageSwitcher.vue", () => {
  test("should render available locales", () => {
    const wrapper = mount(LanguageSwitcher, {
      global: { plugins: [i18n, createTestingPinia({ createSpy: vitest.fn })] },
    });
    const texts = wrapper.findAll("li").map((li) => li.text());
    expect(texts).toContain("Deutsch");
    expect(texts).toContain("English");
  });

  test("should change locale", () => {
    const wrapper = mount(LanguageSwitcher, {
      global: { plugins: [i18n, createTestingPinia({ createSpy: vitest.fn })] },
    });
    const german = wrapper.findAll("button").find((li) => li.text() === "Deutsch");
    const english = wrapper.findAll("button").find((li) => li.text() === "English");
    expect(german).toBeDefined();
    expect(english).toBeDefined();

    expect(i18n.global.locale.value).toBe("en");

    german!.trigger("click");
    expect(i18n.global.locale.value).toBe("de");
    english!.trigger("click");
    expect(i18n.global.locale.value).toBe("en");
  });
});
