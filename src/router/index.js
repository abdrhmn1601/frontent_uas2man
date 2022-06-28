import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Fasilitas from "../views/Fasilitas.vue";
import Guru from "../views/Guru.vue";
import Murid from "../views/Murid.vue";
import Matapelajaran from "../views/Matapelajaran.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/Fasilitas",
      name: "Fasilitas",
      component: Fasilitas,
    },
    {
      path: "/Guru",
      name: "Guru",
      component: Guru,
    },
    {
      path: "/Murid",
      name: "Murid",
      component: Murid,
    },
    {
      path: "/Mapel",
      name: "Mapel",
      component: Matapelajaran,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
