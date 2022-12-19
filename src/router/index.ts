import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/create",
      name: "create",
      component: () => import("@/views/AdminView.vue"),
    },
    {
      path: "/:hash",
      name: "game",
      component: () => import("@/views/GameView.vue"),
    },
  ],
});

export default router;
