<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="doLogin">
      <label for="identifier">Email or Username</label>
      <input type="text" id="identifier" v-model="identifier" required />

      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/api/apiClient'
import { useUsersStore } from '@/stores/usersStore'

const identifier = ref('')
const password = ref('')
const usersStore = useUsersStore()

const doLogin = async () => {
  try {
    const response = await login({ identifier: identifier.value, password: password.value })
    // Handle successful login
    usersStore.setUser(response.user)
    usersStore.setJwt(response.jwt)
  } catch (error) {
    // Handle login error
    console.error((error as Error).message)
  }
}
</script>
