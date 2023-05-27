<template>
	<section class="gap-8 columns-4 p-12">
		<project-item v-for="project in projects" :key="project.name" :project="project" />
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { Project } from "@/types"
import tankkiMov from "@/assets/tankki.mp4"
import ProjectItem from "@/components/ProjectItem.vue"

const base64Image = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" // Replace with your base64 image data

const projects = ref<Project[]>([]);

const projectCount = 15; // Specify the desired number of projects

for (let i = 1; i <= projectCount; i++) {
	const project: Project = {
		name: `Project ${i}`,
		description: `Description ${i}`,
		image: base64Image,
		video: "",
		link: "#",
	}

	projects.value.push(project)
}

const tank: Project = {
	name: "Tank",
	description: "Tankki lorem ipsum",
	image: "",
	video: tankkiMov,
	link: "#",
}

projects.value.push(tank)
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
