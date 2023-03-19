<template>
  <header class="bg-gray-800 text-white">
    <nav class="container mx-auto px-4 py-2 flex items-center justify-between">
      <div>
        <router-link to="/" class="text-xl font-semibold">
          <img :src="logoUrl" :alt="logoAlt" class="h-10 w-auto" v-if="!loading && !error" />
        </router-link>
      </div>
      <div class="hidden md:flex items-center space-x-4">
        <!-- Add your menu items here -->
        <router-link to="/predictions" class="text-white hover:text-gray-300">Predictions</router-link>
      </div>
      <button @click="menuOpen = !menuOpen" class="md:hidden focus:outline-none">
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
        <!-- Add your menu items here -->
        <router-link to="/profile" class="text-white hover:text-gray-300">{{ user.username }}</router-link>
        <router-link to="/predictions" class="text-white hover:text-gray-300">Predictions</router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useContentStore } from '@/stores/contentStore'
import { useUsersStore } from '@/stores/usersStore'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const contentStore = useContentStore()
const usersStore = useUsersStore()
const loading = computed(() => contentStore.loading)
const logoUrl = computed(() => contentStore.logoUrl)
const error = computed(() => contentStore.error)
const user = computed(() => usersStore.user)

const menuOpen = ref(false)

onMounted(async () => {
  await contentStore.fetchSettingsData()
})
</script>
