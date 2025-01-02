import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      beforeEnter() {
        window.location.href = '/index.html'
      }
    },
    {
      path: '/de',
      name: 'GermanLanding',
      component: () => import('../components/german/GermanLanding.vue')
    },
    {
      path: '/de/validation',
      name: 'GermanValidation',
      component: () => import('../components/german/forms/SupplierForm.vue')
    },
    {
      path: '/de/validation-buyer',
      name: 'GermanValidationBuyer',
      component: () => import('../components/german/forms/BuyerForm.vue')
    },
    {
      path: '/validation',
      beforeEnter() {
        window.location.href = '/validation.html'
      }
    },
    {
      path: '/validation-buyer',
      beforeEnter() {
        window.location.href = '/validation-buyer.html'
      }
    },
    // Catch-all 404 route
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../components/NotFound.vue')
    }
  ]
})

// Debug-Logging
router.beforeEach((to, from, next) => {
  console.log('Navigation to:', to.path)
  next()
})

export default router