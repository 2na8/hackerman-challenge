import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../pages/LoginView.vue"; // Usando caminho relativo
import SearchView from "../pages/SearchView.vue";
import ResultView from "../pages/ResultView.vue";

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/busca',
    name: 'search',
    component: SearchView,
  },
  {
    path: '/resultado',
    name: 'result',
    component: ResultView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;