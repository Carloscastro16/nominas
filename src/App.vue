<script setup lang="ts">
import NavbarComponent from '@/components/assets/NavbarComponent.vue';
import { computed, ref, type Ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'
import useDrawer from '@/stores/Logic';
import { useRouter } from 'vue-router';
import SidebarComponent from './components/assets/SidebarComponent.vue';
const router = useRouter()
const route = useRoute();
//Logica para el funcionamiento del Sidebar
const { drawer, rail, toggleRail } = useDrawer();

const sidebarData = [
  {
    title: 'Dashboard',
    icon: new URL('./assets/icons/permits.png', import.meta.url),
    link: '/dashboard'
  },
  {
    title: 'Empleados',
    icon: new URL('./assets/icons/permits.png', import.meta.url),
    link: '/Employees'
  },
  {
    title: 'Nomina',
    icon: new URL('./assets/icons/payroll.png', import.meta.url),
    link: '/payroll'
  },
  {
    title: 'Permisos',
    icon: new URL('./assets/icons/permits.png', import.meta.url),
    link: '/permits'
  },
  {
    title: 'Ajustes',
    icon: new URL('./assets/icons/permits.png', import.meta.url),
    link: '/settings'
  },
]

function getRoute() {
  const path = computed(() => route.path)
  let stringPath = path.value.toString()
  let pathValue: Ref<any> = ref()
  console.log('path original', path)
  console.log('path pasado a string', stringPath)
  switch (stringPath) {
    case '/Employees':
      pathValue.value = [{
        title: 'Empleados',
        disabled: false,
        href: '/Employees',
      },]
      break;
    case '/login':
      pathValue.value = [{
        title: 'Login',
        disabled: false,
        href: '/Login',
      },]
      break;
    case '/payroll':
      pathValue.value = [{
        title: 'Nominas',
        disabled: false,
        href: '/payroll',
      },]
      break;
    case '/settings':
      pathValue.value = [{
        title: 'Ajustes',
        disabled: false,
        href: '/Settings',
      },]
      break;
    case '/permits':
      pathValue.value = [{
        title: 'Permisos',
        disabled: false,
        href: '/permits',
      },]
      break;
    case '/permits/vacations':
      pathValue.value = [{
        title: 'Permisos',
        disabled: false,
        href: '/permits',
      },
      {
        title: 'Solicitud de Vacaciones',
        disabled: false,
        href: '/permits/vacations',
      }]
      break;
    case '/permits/permit-request':
      pathValue.value = [{
        title: 'Permisos',
        disabled: false,
        href: '/permits',
      },
      {
        title: 'Solicitud de Permiso',
        disabled: false,
        href: '/permits/permit-request',
      }]
      break;
    case '/permits/urgent-request':
      pathValue.value = [{
        title: 'Permisos',
        disabled: false,
        href: '/permits',
      },
      {
        title: 'Solicitud de Permiso urgente',
        disabled: false,
        href: '/permits/urgent-permit',
      }]
      break;
  }
  return pathValue
}

function redirectTo(query: string){
  router.push(query)
}
</script>

<template>
  <main class='ultra-container' >
    <SidebarComponent>

    </SidebarComponent>
    <div class="main-container">
      <NavbarComponent>
        <template #title>
          <v-breadcrumbs class="breadcrumbs" :items="getRoute().value"></v-breadcrumbs>
        </template>
      </NavbarComponent>
      <RouterView />
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  background-color: #F2F2F2;
  &.ultra-container{
    display: flex;
  }
  .breadcrumbs {
    color: var(--primary-color)
  }
  .main-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow-x: auto;
    .site-container {
      width: 10%
    }
  }
}
</style>
