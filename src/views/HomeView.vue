<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { getAllPermits } from '@/services/FirestoreFunctions'

getAllPermits()

</script>

<template>
  <div class="container">
    <TheWelcome />
  </div>
</template>
<style lang="scss">
    
</style>