<template>
  <div v-if="user">
    <h2>{{ user.username }}</h2>
    <p>{{ user.email }}</p>
  </div>
  <div v-else>
    <p>Please log in to view your profile</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUsersStore } from '@/stores/usersStore'

const usersStore = useUsersStore();
const user = computed(() => usersStore.user)
</script>
