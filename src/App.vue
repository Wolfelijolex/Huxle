<template>
  <div class="custom-fullheight flex flex-col">
    <Navbar />
    <div class="container px-2 mx-auto p-5 h-full">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "./components/NavbarComponent.vue";
import { useWindowEventListener } from "./composables/event";

/**
 * This is required because in mobile safari 100vh !== window.innerHeight because the
 * changing address bar height is not accounted for in the viewport height.
 */
function setScreenHeight() {
  document.documentElement.style.setProperty("--vh", window.innerHeight / 100 + "px");
}

setScreenHeight();
useWindowEventListener("resize", setScreenHeight);
</script>

<style lang="scss" scoped>
.custom-fullheight {
  height: calc(100 * var(--vh));
}
</style>
