import { describe, expect, test } from "vitest";
import PopupComponentVue from "@/components/PopUps/BasePopupComponent.vue";
import { mount } from "@vue/test-utils";

describe("BasePopUpComponent.vue", () => {
  test("should not render when false", () => {
    const wrapper = mount(PopupComponentVue, {
      propsData: {
        showCloseButton: false,
        showPopup: false,
      },
    });
    const nocontent = wrapper.findAll("div");
    expect(nocontent).toStrictEqual([]);
  });
  test("should render when true", () => {
    const wrapper = mount(PopupComponentVue, {
      propsData: {
        showCloseButton: false,
        showPopup: true,
      },
    });
    const content = wrapper.findAll("div");
    expect(content).not.toStrictEqual([]);
  });
  test("should render close button and emit event", () => {
    const wrapper = mount(PopupComponentVue, {
      propsData: {
        showCloseButton: true,
        showPopup: true,
      },
    });
    const close = wrapper.findAll("div").find((div) => div.text() === "x");
    expect(close).toBeDefined();
    expect(close?.text()).toBe("x");
    close?.trigger("click");
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted()).toHaveProperty("click");
    });
  });
});
