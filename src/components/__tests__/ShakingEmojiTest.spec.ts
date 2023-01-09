import { describe, expect, test } from "vitest";
import ShakingEmojiComponentVue from "@/components/ShakingEmojiComponent.vue";
import { mount } from "@vue/test-utils";

describe("ShakingEmojiComponent.vue", () => { 
  test("should render emoji", () => {
    const wrapper = mount(ShakingEmojiComponentVue, {
      propsData: {
        emoji: "🤓",
      },
    });
    const content = wrapper.find("div");
    expect(content.text()).toBe("🤓");
  });

});
