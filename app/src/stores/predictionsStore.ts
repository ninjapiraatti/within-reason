import { defineStore } from 'pinia'
import { fetchPredictions } from '../api/apiClient'

export const usePredictionsStore = defineStore('predictions', {
  state: () => ({
    predictions: [],
    loading: true,
    error: ''
  }),
  actions: {
    async fetchPredictions() {
      try {
        this.predictions = await fetchPredictions()
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    }
  },
})
