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

const VITE_BUILD_ENV = import.meta.env.VITE_BUILD_ENV
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
		const distPath = VITE_BUILD_ENV == "local" ? "/dist" : ""
		const wasmPath = `${distPath}/projects/furious-purpose/furious-purpose.js`
		const wasmModule = await import(/* @vite-ignore */ wasmPath)
		wasmModule.default()
		const observer = new MutationObserver((mutations) => {
			for (let mutation of mutations) {
				if (mutation.type === "childList") {
					const canvasElement = document.querySelector("canvas")
					if (canvasElement && wasmContainer.value) {
						wasmContainer.value.appendChild(canvasElement)
						observer.disconnect()
						break
					}
				}
			}
		})

		observer.observe(document.body, { childList: true, subtree: true })
	}
})
</script>
