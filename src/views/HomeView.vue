<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { getCities, setCities } from '@/services/FirestoreFunctions'

getCities();
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
