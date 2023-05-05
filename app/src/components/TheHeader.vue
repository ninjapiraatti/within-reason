<template>
	<header class="bg-gray-800 text-white">
		<nav class="container mx-auto px-4 py-2 flex items-center justify-between">
			<div>
				<router-link to="/" class="text-xl font-semibold">
					<img
						:src="logoUrl"
						alt="logo"
						class="h-10 w-auto"
						v-if="!loading && !error"
					/>
				</router-link>
			</div>
			<div class="hidden md:flex items-center space-x-4">
				<router-link to="/about" class="text-white hover:text-gray-300"
					>About</router-link
				>
				<div class="relative">
					<button @click.stop="toggleDropdown" class="focus:outline-none">
						<UserIcon class="h-6 w-6" />
					</button>
					<div
						v-if="dropdownOpen"
						class="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md py-2"
					>
						<router-link
							v-if="user"
							to="/profile"
							class="block px-4 py-2 hover:bg-gray-200"
							>{{ user.username }}</router-link
						>
						<a
							v-if="user"
							@click="logOut"
							class="block px-4 py-2 hover:bg-gray-200"
							>Log out</a
						>
						<router-link
							to="/login"
							v-else
							class="block px-4 py-2 hover:bg-gray-200"
							>Log in</router-link
						>
					</div>
				</div>
			</div>
			<button @click.stop="toggleMenu" class="md:hidden focus:outline-none">
				<template v-if="!menuOpen">
					<Bars3Icon class="h-6 w-6" />
				</template>
				<template v-else>
					<XMarkIcon class="h-6 w-6" />
				</template>
			</button>
		</nav>
		<div class="container mx-auto px-4" v-if="menuOpen">
			<div class="md:hidden flex flex-col space-y-2 mt-4">
				<router-link to="/profile" class="text-white hover:text-gray-300">{{
					user?.username
				}}</router-link>
				<router-link to="/about" class="text-white hover:text-gray-300"
					>About</router-link
				>
				<a @click="logOut" class="text-white hover:text-gray-300">Log out</a>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue"
import { useContentStore } from "@/stores/contentStore"
import { useUsersStore } from "@/stores/usersStore"
import { Bars3Icon, XMarkIcon, UserIcon } from "@heroicons/vue/24/outline"
import { useRouter } from "vue-router"

const contentStore = useContentStore()
const usersStore = useUsersStore()
const router = useRouter()
const loading = computed(() => contentStore.loading)
const logoUrl = computed(() => contentStore.logoUrl)
const error = computed(() => contentStore.error)
const user = computed(() => usersStore.user)

const menuOpen = ref(false)
const dropdownOpen = ref(false)

const logOut = () => {
	usersStore.logOut()
	closeMenus()
	router.push("/login")
}

const toggleDropdown = () => {
	dropdownOpen.value = !dropdownOpen.value
}

const toggleMenu = () => {
	menuOpen.value = !menuOpen.value
}

const closeMenus = () => {
	dropdownOpen.value = false
	menuOpen.value = false
}

const handleClickOutside = () => {
	closeMenus()
}

onMounted(async () => {
	await contentStore.fetchSettingsData()
	document.addEventListener("click", handleClickOutside)
})

onUnmounted(() => {
	document.removeEventListener("click", handleClickOutside)
})
</script>
