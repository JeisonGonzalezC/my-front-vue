import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: HomeView,
    },
    {
      path: '/stocks',
      name: 'home',
      component: () => import('../views/StocksView.vue'),
    },
    {
      path: '/stock/detail/:ticker',
      name: 'detail',
      component: () => import('../views/StockDetailView.vue'),
      props: true,
    },
  ],
})

export default router
