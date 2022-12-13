import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: HelloWorld,
    },
    {
      path: "/game",
      name: "game",
      component: import("@/views/GameView.vue"),
    },
  ],
});

export default router;
