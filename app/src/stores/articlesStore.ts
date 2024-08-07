import { defineStore } from "pinia"
import { fetchArticlesAPI, fetchArticleAPI } from "@/api/apiClient"
import type { Article } from "@/types"

const baseURL =
	import.meta.env.VITE_BUILD_ENV === "production"
		? import.meta.env.VITE_STRAPI_BASE_URL_PROD
		: import.meta.env.VITE_STRAPI_BASE_URL_LOCAL

export const useArticlesStore = defineStore("articles", {
	state: () => ({
		articles: [] as Article[],
		currentArticle: {} as Article,
		loading: true,
		error: "",
	}),
	actions: {
		async fetchArticles() {
			try {
				const articles = await fetchArticlesAPI()
				this.articles = articles.map((article: Article) => ({
					...article,
					imageUrl: getImageUrl(article),
				}))
			} catch (error) {
				this.error = (error as Error).message
			} finally {
				this.loading = false
				console.log(this.articles)
			}
		},
		async fetchArticle(id: string) {
			try {
				const article = await fetchArticleAPI(id)
				this.currentArticle = {
					...article,
					imageUrl: getImageUrl(article),
				}
			} catch (error) {
				this.error = (error as Error).message
			} finally {
				this.loading = false
			}
		},
	},
})

function getImageUrl(project: Article) {
	// @ts-ignore
	const relativeUrl = project.attributes.image.data[0].attributes.formats["medium"].url
	return `${baseURL}${relativeUrl}`
}
