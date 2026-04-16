import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../Login.vue";
import HomePage from "../Home.vue";
import SignUpPage from "../SignUp.vue";
import BrowsePage from "../Browse.vue";

const routes = [
  { path: "/", component: HomePage, meta: { requiresAuth: true }
},
  { path: "/login", component: LoginPage },
  {path: "/signup", component: SignUpPage}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }
  next();
});

export default router;

