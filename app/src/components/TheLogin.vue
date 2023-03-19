<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="doLogin">
      <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="email">
            Email
          </label>
          <input
            v-model="identifier"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="identifier"
            type="text"
            placeholder="Email">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 font-bold mb-2" for="password">
            Password
          </label>
          <input
            v-model="password"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password">
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
          Login
        </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { loginAPI } from '@/api/apiClient'
import { useUsersStore } from '@/stores/usersStore'

const identifier = ref('')
const password = ref('')
const usersStore = useUsersStore()

const doLogin = async () => {
  try {
    const response = await loginAPI({ identifier: identifier.value, password: password.value })
    // Handle successful login
    usersStore.setUser(response.user)
    usersStore.setJwt(response.jwt)
  } catch (error) {
    // Handle login error
    console.error((error as Error).message)
  }
}
</script>
