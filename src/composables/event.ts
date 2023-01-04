import { onMounted, onUnmounted } from "vue";

export function useWindowEventListener(event: string, callback: (event: Event) => void) {
  onMounted(() => window.addEventListener(event, callback));
  onUnmounted(() => window.removeEventListener(event, callback));
}
