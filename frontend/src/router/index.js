import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../Login.vue";
import HomePage from "../Home.vue";
import SignUpPage from "../SignUp.vue";
import BrowsePage from "../Browse.vue";
import singleMovie from "../singleMovie.vue";

const routes = [
  { path: "/", component: HomePage, meta: { requiresAuth: true }
},
  { path: "/login", component: LoginPage },
  {path: "/signup", component: SignUpPage},
  {path: "/browse", component: BrowsePage},
  {path: "/item/:id", component: singleMovie}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

//router.beforeEach((to, from, next) => {
router.beforeEach((to, from) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    return "/login";
    //return next-->("/login");
  }
  //next();
});

export default router;

