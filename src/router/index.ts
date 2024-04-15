import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import EmployeesView from '@/views/EmployeesView.vue'
import PayrollView from '@/views/PayrollView.vue'
import SettingsView from '@/views/SettingsView.vue'
import PermitView from '@/views/PermitView.vue'
import VacationsFormView from '@/views/forms/VacationsForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/employees',
      name: 'employees',
      component: EmployeesView
    },
    {
      path: '/payroll',
      name: 'payroll',
      component: PayrollView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/permits',
      name: 'permits',
      component: PermitView
    },
    {
      path: '/permits/vacations',
      name: 'vacations',
      component: VacationsFormView
    },
  ]
})

export default router
