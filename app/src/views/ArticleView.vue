<template>
	<section class="relative w-full bg-gradient-to-r from-aqua-300 via-aqua-500 to-aqua-700 p-8">
		<h1 class="font-roboto font-thin text-4xl">{{ article.attributes?.title }}</h1>
		<p class="font-overpass font-thin">{{ article.attributes?.ingress }}</p>
	</section>
	<section>
		<div v-if="article.attributes?.body" class="p-8 prose" v-html="textBody(article.attributes?.body)">
		</div>
	</section>
	<!-- <section v-if="article.attributes?.links.length">
		{{ article.attributes?.links }}
	</section> -->
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue"
import { useArticlesStore } from "@/stores/articlesStore"
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()
const route = useRoute()
const articlesStore = useArticlesStore()
const article = computed(() => articlesStore.currentArticle)
const textBody = ((markdownText: string) => {
	return md.render(markdownText)
})


onMounted(() => {
	articlesStore.fetchArticle(route.params.id?.toString())
})
</script>