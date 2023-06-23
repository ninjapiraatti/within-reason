<template>
	<div class="max-w-sm rounded overflow-hidden shadow-lg mb-8 card bg-aqua-300">
		<div class="px-3 py-2">
			<div class="font-bold font-roboto text-xl mb-2">{{ project.attributes.title }}</div>
			<p class="text-gray-700 text-xs font-overpass">
				{{ project.attributes.ingress }}
			</p>
		</div>
		<div v-if="project.attributes.video.length" class="video-container" @mouseover="playVideo" @mouseout="stopVideo">
			<video ref="bgVideo" autoplay muted loop id="myVideo">
				<source :src="project.attributes.video" type="video/mp4" />
			</video>
		</div>
		<img v-else class="w-full" :src="project.imageUrl" :alt="project.attributes.title" />
		<div class="px-3 pb-4 info">
			<router-link
				:to="`projects/${project.id}`"
				class="inline-block bg-purple-500 hover:bg-purple-300 text-white font-bold py-2 px-3 rounded font-overpass"
			>
				View Project
			</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue"
import type { Article } from "@/types"

const props = defineProps({
	project: {
		type: Object as () => Article,
		default: () => ({
			title: "lol",
			ingress: "lol",
			body: "lol",
			image: "",
			video: "",
		}),
	},
})

let bgVideo: Ref<HTMLVideoElement | null> = ref(null)

const playVideo = () => {
	if (bgVideo.value) {
		bgVideo.value.play()
	}
}

const stopVideo = () => {
	if (bgVideo.value) {
		bgVideo.value.pause()
		bgVideo.value.currentTime = 0
	}
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
