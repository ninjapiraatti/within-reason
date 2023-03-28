<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="prediction in predictions.data"
      :key="prediction.id"
      class="bg-white rounded-lg shadow-md p-4"
    >
      <h3 class="text-lg font-semibold mb-2">{{ prediction.attributes.title }}</h3>
      <p class="text-gray-600">{{ prediction.attributes.description }}</p>
      <div class="mt-4 flex justify-between items-center">
        <div>
          <span class="text-sm text-gray-500">By:</span>
          <span class="text-sm font-medium">{{ prediction.attributes.authorName }}</span>
        </div>
        <div v-if="loggedIn" class="flex space-x-4">
          <button
            class="text-blue-600"
            @click="loggedIn ? createBet(prediction, true) : showModal = true"
          >
            <hand-thumb-up-icon class="h-6 w-6" />
          </button>
          <button
            class="text-red-600"
            @click="loggedIn ? createBet(prediction, false) : showModal = true"
          >
            <hand-thumb-down-icon class="h-6 w-6" />
          </button>
        </div>
        <div v-else class="flex space-x-4">
          Register to start predicting!
        </div>
      </div>
    </div>
  </div>

  <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
    lol
  </div>
</template>


<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { usePredictionsStore } from '@/stores/predictionsStore'
import { useUsersStore } from '@/stores/usersStore'
import { useBetsStore } from '@/stores/betsStore'
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/vue/24/outline'
import { Status, type Bet } from '@/types';

const predictionsStore = usePredictionsStore()
const usersStore = useUsersStore()
const betsStore = useBetsStore()
const predictions = computed(() => predictionsStore.predictions)
const loading = computed(() => predictionsStore.loading)
const error = computed(() => predictionsStore.error)
const loggedIn = computed(() => !!usersStore.user)
const showModal = ref(false)

const createBet = (prediction, back) => {
  console.log("lol")
  if (usersStore.user?.id) {
    const newBet: Bet = {
      userID: `${usersStore.user?.id}`,
      amount: 1,
      odds: 1,
      back: back,
      statusBet: Status.Open,
      predictionID: prediction.id 
    }
    betsStore.createBet(newBet)
  }
}

onMounted(async () => {
  predictionsStore.fetchPredictions()
  console.log(predictions.value)
})

</script>
