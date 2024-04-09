<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <header class="flex w-max">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <v-btn>
      Button
    </v-btn>
    <div class="container mx-auto">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>


</style>
