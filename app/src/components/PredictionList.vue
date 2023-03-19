<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="prediction in predictions.data"
      :key="prediction.id"
      class="bg-white rounded-lg shadow-md p-4"
    >
      <h3 class="text-lg font-semibold mb-2">{{ prediction.title }}</h3>
      <p class="text-gray-600">{{ prediction.description }}</p>
      <div class="mt-4 flex justify-between items-center">
        <div>
          <span class="text-sm text-gray-500">By:</span>
          <span class="text-sm font-medium">{{ prediction.attributes }}</span>
        </div>
        <div class="flex space-x-4">
          <button
            class="text-blue-600"
            @click="loggedIn ? supportPrediction(prediction) : showModal = true"
          >
            <thumb-up-icon class="h-6 w-6" />
          </button>
          <button
            class="text-red-600"
            @click="loggedIn ? renouncePrediction(prediction) : showModal = true"
          >
            <thumb-down-icon class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
    <!-- Add your modal content here -->
  </div>
</template>


<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { usePredictionsStore } from '../stores/predictionsStore'

const predictionsStore = usePredictionsStore()
const predictions = computed(() => predictionsStore.predictions)
const loading = computed(() => predictionsStore.loading)
const error = computed(() => predictionsStore.error)
const showModal = ref(false)

const supportPrediction = (prediction) => {
    // Add logic to support a prediction
}

const renouncePrediction = (prediction) => {
    // Add logic to renounce a prediction
}

onMounted(async () => {
  predictionsStore.fetchPredictions()
  console.log(predictions.value)
})

</script>
