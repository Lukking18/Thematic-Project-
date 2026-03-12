import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../Login.vue";
import HomePage from "../Home.vue";

const routes = [
  { path: "/", component: HomePage, meta: { requiresAuth: true } },
  { path: "/login", component: LoginPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

