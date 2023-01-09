import { describe, expect, test } from "vitest";
import { ref } from "vue";
import { useToggleTwice } from "../toggle-twice";

describe("useToggleTwice", () => {
  test("should immediately toggle a boolean ref", () => {
    const bool = ref(false);
    expect(bool.value).toBe(false);
    useToggleTwice(bool);
    expect(bool.value).toBe(true);
  });

  test("should toggle the ref again after 2 sec", async () => {
    const bool = ref(false);
    expect(bool.value).toBe(false);
    useToggleTwice(bool);
    expect(bool.value).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 2100));
    expect(bool.value).toBe(false);
  });
});
