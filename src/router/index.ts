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
    }
  ]
})

export default router