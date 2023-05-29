<template>
	<section class="gap-8 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 p-12">
		<project-item
			v-for="project in projects"
			:key="project.name"
			:project="project"
		/>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { Project } from "@/types"
import hulaImg from "@/assets/hula.jpg"
import furiousPurposeImg from "@/assets/crab.jpg"
import tankkiMov from "@/assets/tankki.mp4"
import ProjectItem from "@/components/ProjectItem.vue"

const base64Image =
	"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" // Replace with your base64 image data

const projects = ref<Project[]>([])

const hula: Project = {
	name: "Hula",
	description: "Hula",
	image: hulaImg,
	video: "",
	link: "",
	externalLink: "https://www.hive.fi/en/article/leap-from-a-student-to-fulltime-coder-%E2%80%93-hive-internship-at-codeo/",
}

const tank: Project = {
	name: "MQTT Tank",
	description: "Tankki lorem ipsum",
	image: "",
	video: tankkiMov,
	link: "",
	externalLink: "https://github.com/ninjapiraatti/arduino_experiments/tree/master/tank",
}

const furiousPurpose: Project = {
	name: "Tron clone made with Bevy",
	description: "Tankki lorem ipsum",
	image: furiousPurposeImg,
	video: "",
	link: "",
	externalLink: "https://github.com/ninjapiraatti/furious-purpose",
}

projects.value.push(hula, tank, furiousPurpose)

</script>

<style scoped>
.container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	grid-auto-rows: auto;
}

.grid-item {
	margin: 0;
	padding: 0;
}
</style>
