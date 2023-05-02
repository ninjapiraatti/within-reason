<template>
  <TheHeader />
  <div class="p-4">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import { onMounted } from "vue";
import { useUsersStore } from "./stores/usersStore";

const usersStore = useUsersStore();

onMounted(() => {
  usersStore.initializeAuth();
});
</script>
