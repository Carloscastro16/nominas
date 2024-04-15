<script setup lang="ts">

import useDrawer from '../stores/Logic';
const { drawer, rail, toggleRail } = useDrawer();
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" class="bg-pink-lighten-2">
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider" nav>
          <template v-slot:append>
            <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-icon icon="$vuetify"></v-icon>
          <v-icon color="green-darken-2" icon="mdi-domain" size="large"></v-icon>

          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>

      </v-main>
    </v-layout>
  </v-card>
</template>

<style></style>
