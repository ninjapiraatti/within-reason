<template>
	<header class="bg-gray-800 text-white">
		<nav class="mx-auto px-4 py-2 flex items-center justify-between">
			<div>
				<router-link to="/" class="block w-8">
					<svg
						width="100%"
						height="100%"
						viewBox="0 0 2560 2560"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						xml:space="preserve"
						xmlns:serif="http://www.serif.com/"
						style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2"
					>
						<path
							d="M1280,137.928C649.673,137.928 137.928,649.673 137.928,1280C137.928,1910.33 649.673,2422.07 1280,2422.07C1910.33,2422.07 2422.07,1910.33 2422.07,1280C2422.07,649.673 1910.33,137.928 1280,137.928ZM437.65,1617.94C452.432,1624.01 468.531,1627.33 485.242,1627.34C788.595,1627.66 1770.79,1628.54 2074.14,1628.81C2130.63,1628.86 2180.21,1591.19 2195.31,1536.76C2218.16,1455.07 2230.41,1368.96 2230.41,1280C2230.41,1089.12 2174.01,911.303 2077,762.334C2053.74,726.679 2014.01,705.226 1971.44,705.34C1857.25,705.643 1608.49,706.306 1348.59,707L1154.55,901.037C1222.12,966.396 1264.15,1057.99 1264.15,1159.32C1264.15,1357.66 1103.12,1518.69 904.781,1518.69C803.449,1518.69 711.856,1476.66 646.497,1409.09L437.65,1617.94ZM1076.81,707.725L585.495,709.036C542.929,709.149 503.316,730.809 480.25,766.583C384.918,914.699 329.594,1090.94 329.594,1280C329.594,1334.97 334.272,1388.86 343.249,1441.28L552.737,1231.79C547.937,1208.4 545.412,1184.15 545.412,1159.32C545.412,960.98 706.44,799.953 904.781,799.953C929.613,799.953 953.861,802.477 977.253,807.277L1076.81,707.725ZM1547.64,1159.32C1547.64,1066.76 1622.79,991.619 1715.35,991.619C1807.9,991.619 1883.05,1066.76 1883.05,1159.32C1883.05,1212.21 1925.99,1255.15 1978.88,1255.15C2031.77,1255.15 2074.71,1212.21 2074.71,1159.32C2074.71,960.98 1913.69,799.953 1715.35,799.953C1517,799.953 1355.98,960.98 1355.98,1159.32C1355.98,1212.21 1398.92,1255.15 1451.81,1255.15C1504.7,1255.15 1547.64,1212.21 1547.64,1159.32Z"
							style="fill: rgb(75, 255, 225)"
						/>
					</svg>
				</router-link>
			</div>
			<div class="hidden md:flex items-center space-x-4 z-10">
				<!-- <router-link to="/about" class="text-white hover:text-gray-300"
					>About</router-link
				> -->
				<div class="relative">
					<button disabled @click.stop="toggleDropdown" class="focus:outline-none">
						<UserIcon class="h-6 w-6" />
					</button>
					<div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md py-2">
						<router-link v-if="user" to="/profile" class="block px-4 py-2 hover:bg-gray-200">{{
							user.username
						}}</router-link>
						<a v-if="user" @click="logOut" class="block px-4 py-2 hover:bg-gray-200">Log out</a>
						<router-link to="/login" v-else class="block px-4 py-2 hover:bg-gray-200">Log in</router-link>
					</div>
				</div>
			</div>
			<button disabled @click.stop="toggleMenu" class="md:hidden focus:outline-none">
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
				<router-link to="/profile" class="text-white hover:text-gray-300">{{ user?.username }}</router-link>
				<router-link to="/about" class="text-white hover:text-gray-300">About</router-link>
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
