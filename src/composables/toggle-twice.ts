import type { Ref } from "vue";

export function useToggleTwice(value: Ref<boolean>, time = 2000) {
  value.value = !value.value;

  setTimeout(() => {
    value.value = !value.value;
  }, time);
}
