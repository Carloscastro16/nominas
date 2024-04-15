<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { getCities, setCities } from '@/services/FirestoreFunctions'
import NavbarComponent from '@/components/assets/NavbarComponent.vue';
getCities();
</script>

<template>
  <div class="container">
    <TheWelcome />
  </div>
</template>
<style lang="scss">
    
</style>