<script setup lang="ts">
  import NavbarComponent from '@/components/assets/NavbarComponent.vue';
import { computed, ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'
const route = useRoute();


function getRoute(){
  const path = computed(() => route.path)
  let stringPath = path.value.toString()
  let pathValue = ref('')
  console.log('path original', path)
  console.log('path pasado a string', stringPath)
  switch(stringPath){
    case '/Employees':
      pathValue.value = 'Empleados'
      break;
    case '/login':
      pathValue.value = 'Login'
      break;
    case '/payroll':
      pathValue.value = 'Nominas'
      break;
    case '/settings':
      pathValue.value = 'Ajustes'
      break;
    case '/permits':
      pathValue.value = 'Permisos'
      break;
  }
  return pathValue
}
</script>

<template>
  <main>
    <NavbarComponent>
      <template #title>
        <h1>{{ getRoute().value }}</h1>
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
