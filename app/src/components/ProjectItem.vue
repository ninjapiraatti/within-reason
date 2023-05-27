<template>
	<div class="max-w-sm rounded overflow-hidden shadow-lg mb-8 card bg-aqua-300" :style="{ height: getRandomHeight() + 'px' }">
		<div class="px-6 py-4">
			<div class="font-bold text-xl mb-2">{{ project.name }}</div>
		</div>
		<div v-if="project.video" class="video-container" @mouseover="playVideo" @mouseout="stopVideo">
			<video ref="bgVideo" autoplay muted loop id="myVideo">
				<source :src="project.video" type="video/mp4">
			</video>
		</div>
		<img v-else class="w-full" :src="project.image" :alt="project.name">
		<div class="px-6 pt-4 pb-6 info">
			<p class="text-gray-700 text-base">
				{{ project.description }}
			</p>
			<router-link :to="project.link" class="inline-block bg-purple-500 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded">
				View Project
			</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '@/types'

const props = defineProps({
	project: {
		type: Object as () => Project,
		default: () => ({
			name: "",
			description: "",
			image: "",
			video: "",
			link: "",
		}),
	},
})

const bgVideo = ref(null)

const playVideo = () => {
	if (bgVideo.value) {
		bgVideo.value.play()
	}
}

const stopVideo = () => {
	bgVideo.value.pause()
	bgVideo.value.currentTime = 0
}

function getRandomHeight() {
  return Math.floor(Math.random() * (500 - 100 + 1)) + 100;
}

</script>

<style scoped>
.card {
	position: relative;
}
.info {
	position: absolute;
	bottom: 0;
}
</style>
