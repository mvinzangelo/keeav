import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// here is where we define the routes that will be used in the project,
// the routes will likely only really be login, home, and maybe "Other Topics/Yesterday page"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tempory',
      name: 'tempory',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
      component: HomeView
    }
  ]
})

export default router
