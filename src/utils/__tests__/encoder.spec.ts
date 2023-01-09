import { describe, expect, test } from "vitest";
import { toEncodedUrl, encode, decode } from "@/utils/encoder.util";
import type { GameSettings } from "@/utils/encoder.util";

describe("Encoder helper", () => {
  const hash = "eyJkZSI6ImdhbWVyIiwiZW4iOiJnYW1lciJ9";
  const gamer: GameSettings = {
    de: "gamer",
    en: "gamer",
  };
  test("encode and decode", () => {
    const encoded = encode(gamer);
    expect(encoded).toEqual(hash);
    expect(decode(encoded)).toEqual(decode(hash));
    expect(decode(encoded)).toEqual(gamer);
  });

  test("toEncodedUrl", () => {
    const url = toEncodedUrl(gamer);
    expect(url).toEqual(`${window.location.origin}/${hash}`);
  });
});
