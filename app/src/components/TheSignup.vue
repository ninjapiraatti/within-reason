<template>
  <div class="signup">
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" required />

      <label for="username">Username</label>
      <input type="text" id="username" v-model="username" required />

      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { register } from '@/api/apiClient'

const email = ref('')
const username = ref('')
const password = ref('')

const signup = async () => {
  try {
    const response = await register({ email: email.value, username: username.value, password: password.value })
    // Handle successful registration
    console.log(response)
  } catch (error) {
    // Handle registration error
    console.error((error as Error).message)
  }
}
</script>
