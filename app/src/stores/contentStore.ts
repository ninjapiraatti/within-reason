import { defineStore } from 'pinia';
import { fetchSettings } from '../api/apiClient';

export const useContentStore = defineStore('content', {
  state: () => ({
    logoUrl: '',
    logoAlt: 'Within Reason Logo',
    loading: true,
    error: '',
    imagesBaseUrl: 'http://localhost:1337'
  }),
  actions: {
    async fetchSettingsData() {
      try {
        const settings = await fetchSettings();
        this.logoUrl = this.imagesBaseUrl + settings.logo.data.attributes.url
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    },
  },
});