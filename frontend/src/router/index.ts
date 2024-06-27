import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import { useAuthStore } from '@/stores/auth'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

// Redirect to login page if not logged in and trying to access a restricted page
router.beforeEach(async (to) => {
  const publicRoutes = ['/login']
  const authRequired = !publicRoutes.includes(to.path)
  const auth = useAuthStore()

  if (authRequired && !auth.user.token) {
    auth.returnUrl = to.fullPath
    return { name: 'login' }
  }
})

export default router
