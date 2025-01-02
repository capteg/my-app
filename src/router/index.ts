import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Bestehende Routes bleiben
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
    }
  ]
})

export default router