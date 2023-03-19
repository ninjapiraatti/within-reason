<template>
  <TheHeader />

  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue"
import { onMounted } from 'vue'
import { useUsersStore } from './stores/usersStore'

const usersStore = useUsersStore()

onMounted(() => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    usersStore.setJwt(jwt)
  }
})
</script>
