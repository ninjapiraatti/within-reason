<template>
	<TheHeader v-if="showHeader" />
	<RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import TheHeader from "./components/TheHeader.vue"
import { onMounted, computed } from "vue"
import { useUsersStore } from "./stores/usersStore"
import { useRoute } from "vue-router"

const usersStore = useUsersStore()
const route = useRoute()

const showHeader = computed(() => !route.meta.hideHeader)

onMounted(() => {
	usersStore.initializeAuth()
})
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@300;600&family=Roboto:ital,wght@0,100;0,300;0,400;0,700;1,100;1,300;1,400;1,700&display=swap");
</style>
