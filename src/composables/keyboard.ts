import { isValidKey } from "@/utils/game.util";
import { useWindowEventListener } from "./event";

export function useKeyboard(callback: (key: string) => void) {
  useWindowEventListener("keyup", (event: Event) => {
    const pressed = (event as KeyboardEvent).key;
    if (pressed.length === 1) {
      if (!isValidKey(pressed.toUpperCase())) {
        return;
      }

      callback(pressed.toUpperCase());
    } else {
      callback(pressed);
    }
  });
}
