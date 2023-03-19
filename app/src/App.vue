<template>
  <TheHeader />

  <RouterView />
</template>

<script setup lang="ts">
import { RouterView, useRouter } from "vue-router"
import TheHeader from "./components/TheHeader.vue"
import { onMounted } from 'vue'
import { useUsersStore } from './stores/usersStore'

const router = useRouter()
const usersStore = useUsersStore()

onMounted(() => {
  usersStore.initializeAuth()
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!usersStore.jwt
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
</script>
