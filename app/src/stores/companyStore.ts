import { defineStore } from "pinia"
import { fetchCompanyAPI } from "@/api/apiClient"
import type { Company } from "@/types"

export const useCompanyStore = defineStore("company", {
	state: () => ({
		company: {} as Company,
		loading: true,
		error: "",
	}),
	actions: {
		async fetchCompany(id: string) {
			try {
				this.company = await fetchCompanyAPI(id)
			} catch (error) {
				this.error = (error as Error).message
			} finally {
				this.loading = false
			}
		},
	},
})
