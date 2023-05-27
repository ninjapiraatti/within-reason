<template>
	<TheHeader />
	<RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import TheHeader from "./components/TheHeader.vue"
import { onMounted } from "vue"
import { useUsersStore } from "./stores/usersStore"

const usersStore = useUsersStore()

onMounted(() => {
	usersStore.initializeAuth()
})
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@300;600&family=Roboto:ital,wght@0,100;0,400;0,700;1,100;1,400;1,700&display=swap");
</style>
