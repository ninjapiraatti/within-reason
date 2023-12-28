<template>
	<section class="gap-8 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 p-12">
		<project-item v-for="project in articles" :key="project.id" :project="project" />
	</section>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue"
import ProjectItem from "@/components/ProjectItem.vue"
import { useArticlesStore } from "@/stores/articlesStore"

const articlesStore = useArticlesStore()
const articles = computed(() => articlesStore.articles)

onMounted(async () => {
	articlesStore.fetchArticles()
})
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
