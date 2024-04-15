<script setup lang="ts">
  import NavbarComponent from '@/components/assets/NavbarComponent.vue';
import { computed, ref, type Ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'
const route = useRoute();


function getRoute(){
  const path = computed(() => route.path)
  let stringPath = path.value.toString()
  let pathValue: Ref<any> = ref()
  console.log('path original', path)
  console.log('path pasado a string', stringPath)
  switch(stringPath){
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
</script>

<template>
  <main>
    <NavbarComponent>
      <template #title>
        <v-breadcrumbs class="breadcrumbs" :items="getRoute().value"></v-breadcrumbs>
      </template>
    </NavbarComponent>
    <div class="main-container">
      
      <RouterView />
    </div>
  </main>
</template>

<style scoped lang="scss">
main{
  background-color: #F2F2F2;
  .breadcrumbs{
    color: var(--primary-color)
  }
  .main-container{
    display: flex;
    .side{
      width: 250px;
    }
    .site-container{
      width: 10%
    }
  }
}
</style>
