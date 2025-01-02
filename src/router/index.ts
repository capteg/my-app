import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/validation',
      name: 'Validation',
      component: () => import('../components/ValidationForm.vue')
    },
    // Neue deutsche Route
    {
      path: '/de',
      name: 'GermanLanding',
      component: () => import('../components/german/GermanLanding.vue')
    }
  ]
})

export default router