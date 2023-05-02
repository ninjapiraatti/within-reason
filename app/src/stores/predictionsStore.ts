import { defineStore } from "pinia";
import { fetchPredictionsAPI, createPredictionAPI } from "@/api/apiClient";
import type { Prediction } from "@/types";

export const usePredictionsStore = defineStore("predictions", {
  state: () => ({
    predictions: [] as Prediction[],
    loading: true,
    error: "",
  }),
  actions: {
    async fetchPredictions() {
      try {
        this.predictions = await fetchPredictionsAPI();
      } catch (error) {
        this.error = (error as Error).message;
      } finally {
        this.loading = false;
      }
    },
    async createPrediction(prediction: Prediction): Promise<void> {
      try {
        const createdPrediction = await createPredictionAPI(prediction);
        this.predictions.push(createdPrediction);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create prediction");
      }
    },
  },
});
