<template>
  <div class="flex flex-col items-center mt-8">
    <div class="bg-white rounded-lg shadow-md p-8 w-full md:w-96">
      <h2 class="text-lg font-medium mb-4">Login</h2>
      <TheLogin />
    </div>
    <div class="mt-4">
      <a class="text-blue-500 hover:underline cursor-pointer" @click="showSignUp = true">Register</a>
    </div>
    <div v-if="showSignUp" class="mt-8 bg-white rounded-lg shadow-md p-8 w-full md:w-96">
      <TheSignup />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import TheSignup from "@/components/TheSignup.vue";
import TheLogin from "@/components/TheLogin.vue";
const showSignUp = ref(false)
</script>