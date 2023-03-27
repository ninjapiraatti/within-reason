import { defineStore } from 'pinia'
import { fetchBetsAPI, createBetAPI } from '@/api/apiClient'
import type { Bet } from '@/types'

export const useBetsStore = defineStore('bets', {
  state: () => ({
    bets: [] as Bet[],
    loading: true,
    error: ''
  }),
  actions: {
    async fetchBets() {
      try {
        this.bets = await fetchBetsAPI()
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    },
    async createBet(bet: Bet): Promise<void> {
      try {
        const createdBet = await createBetAPI(bet)
        this.bets.push(createdBet)
      } catch (error) {
        console.error(error)
        throw new Error('Failed to create bet')
      }
    }
  },
})