<template>
	<section
		class="container mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
	>
		<div v-for="project in projects" :key="project.id">
			<h2>{{ project.name }}</h2>
			<img :src="project.thumbnail" :alt="project.name" class="w-full h-auto" />
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue"
const projects = ref([
	{ id: 1, name: "Project 1", thumbnail: "project1.jpg" },
	{ id: 2, name: "Project 2", thumbnail: "project2.jpg" },
	{ id: 3, name: "Project 3", thumbnail: "project3.jpg" },
	{ id: 4, name: "Project 4", thumbnail: "project4.jpg" },
	{ id: 5, name: "Project 5", thumbnail: "project5.jpg" },
	{ id: 6, name: "Project 6", thumbnail: "project6.jpg" },
	{ id: 7, name: "Project 7", thumbnail: "project7.jpg" },
	{ id: 8, name: "Project 8", thumbnail: "project8.jpg" },
	{ id: 9, name: "Project 9", thumbnail: "project9.jpg" },
	{ id: 10, name: "Project 10", thumbnail: "project10.jpg" },
])
</script>
