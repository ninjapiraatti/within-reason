<template>
	<section class="relative w-full bg-gradient-to-r from-aqua-300 via-aqua-500 to-aqua-700 p-8 text-center">
		<h1 class="font-roboto font-thin text-4xl">{{ article.attributes?.title }}</h1>
		<p class="font-overpass font-thin">{{ article.attributes?.ingress }}</p>
	</section>
	<section class="flex justify-center">
		<div v-if="article.attributes?.body" class="p-8 prose" v-html="textBody(article.attributes?.body)"></div>
	</section>
	<!-- <section v-if="article.attributes?.links.length">
		{{ article.attributes?.links }}
	</section> -->
	<section v-if="article.attributes?.wasm" class="w-full flex items-center justify-center">
		<div ref="wasmContainer"></div>
	</section>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, type Ref } from "vue"
import { useArticlesStore } from "@/stores/articlesStore"
import { useRoute } from "vue-router"
import MarkdownIt from "markdown-it"

const md = new MarkdownIt()
const route = useRoute()
const articlesStore = useArticlesStore()
const article = computed(() => articlesStore.currentArticle)
const textBody = (markdownText: string) => {
	return md.render(markdownText)
}
const wasmContainer: Ref<HTMLElement | null> = ref(null)

onMounted(async () => {
	await articlesStore.fetchArticle(route.params.id?.toString())
	if (article.value.attributes?.wasm) {
			const wasmPath = '/projects/furious-purpose/furious-purpose.js'
			const wasmModule = await import(/* @vite-ignore */ wasmPath)
			// Initialize or run the wasm module
			console.log("wasm:", wasmModule)
			//wasmModule.init(wasmContainer.value)
			wasmModule.default()
		// Wait for a short delay to ensure canvas is attached to the DOM. 
		// This is a hacky solution; ideally, you'd have a better way to determine when the canvas is ready.
		setTimeout(() => {
				const canvasElement = document.querySelector('canvas')  // assuming there's only one canvas, adjust if necessary

				if (canvasElement && wasmContainer.value) {
						wasmContainer.value.appendChild(canvasElement)
				}
		}, 500)  // adjust delay if necessary
	}
})
</script>
