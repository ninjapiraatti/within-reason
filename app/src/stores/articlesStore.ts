import { defineStore } from "pinia"
import { fetchArticlesAPI, fetchArticleAPI } from "@/api/apiClient"
import type { Article } from "@/types"

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
				this.articles = await fetchArticlesAPI()
			} catch (error) {
				this.error = (error as Error).message
			} finally {
				this.loading = false
				console.log(this.articles)
			}
		},
		async fetchArticle(id: string) {
			try {
				this.currentArticle = await fetchArticleAPI(id)
			} catch (error) {
				this.error = (error as Error).message
			} finally {
				this.loading = false
			}
		}
	},
})
