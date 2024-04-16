import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import EmployeesView from '@/views/EmployeesView.vue'
import PayrollView from '@/views/PayrollView.vue'
import SettingsView from '@/views/SettingsView.vue'
import PermitView from '@/views/PermitView.vue'
import VacationsFormView from '@/views/forms/VacationsForm.vue'
import PermitFormView from '@/views/forms/PermitForm.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const auth = getAuth();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: '/dashboard',
      meta: { requiresAuth: true } // indicar que esta ruta requiere autenticación
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: EmployeesView,
      meta: { requiresAuth: true }
    },
    {
      path: '/employees',
      name: 'employees',
      component: EmployeesView,
      meta: { requiresAuth: true }
    },
    {
      path: '/payroll',
      name: 'payroll',
      component: PayrollView,
      meta: { requiresAuth: true }
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/permits',
      name: 'permits',
      component: PermitView,
      meta: { requiresAuth: true }
    },
    {
      path: '/permits/vacations',
      name: 'vacations',
      component: VacationsFormView,
      meta: { requiresAuth: true }
    },
    {
      path: '/permits/permit-request',
      name: 'permit-request',
      component: PermitFormView,
      meta: { requiresAuth: true }
    },
    {
      path: '/permits/urgent-request',
      name: 'urgent-request',
      component: PermitFormView,
      meta: { requiresAuth: true }
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  onAuthStateChanged(auth, user => {
    if (requiresAuth && !user) {
      next('/login'); // Redirigir a la página de inicio de sesión si no está autenticado
    } else {
      next(); // Continuar navegando
    }
  });
});

export default router
