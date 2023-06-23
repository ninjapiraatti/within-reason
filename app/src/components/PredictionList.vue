<template>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xxl:grid-cols-6">
		{{ props.title }}
		<div v-for="prediction in predictions" :key="prediction.title" class="bg-white rounded-lg shadow-md p-4">
			<h3 class="text-lg font-semibold mb-2">
				{{ prediction.title }}
			</h3>
			<div class="w-full mb-4">
				<span class="text-sm text-gray-500">By:</span>
				<span class="text-sm font-medium">{{ prediction.authorName }}</span>
			</div>
			<p class="text-gray-600">{{ prediction.description }}</p>
			<div v-if="loggedIn" class="mt-4 flex justify-center items-center">
				<div class="flex space-x-4">
					<button class="text-blue-600" @click="loggedIn ? createBet(prediction, true) : (showModal = true)">
						<hand-thumb-up-icon class="h-6 w-6" />
					</button>
					<button class="text-red-600" @click="loggedIn ? createBet(prediction, false) : (showModal = true)">
						<hand-thumb-down-icon class="h-6 w-6" />
					</button>
				</div>
			</div>
			<div v-else class="flex space-x-4">Register to start predicting!</div>
		</div>
		<div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">lol</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue"
import { usePredictionsStore } from "@/stores/predictionsStore"
import { useUsersStore } from "@/stores/usersStore"
import { useBetsStore } from "@/stores/betsStore"
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/vue/24/outline"
import { Status, type Bet, type Prediction } from "@/types"

const predictionsStore = usePredictionsStore()
const usersStore = useUsersStore()
const betsStore = useBetsStore()
const predictions = computed(() => predictionsStore.predictions)
const loggedIn = computed(() => !!usersStore.user)
const showModal = ref(false)

const props = defineProps({
	title: String,
})

const createBet = (prediction: Prediction, back: boolean) => {
	console.log("lol")
	if (usersStore.user?.id) {
		const newBet: Bet = {
			userID: `${usersStore.user?.id}`,
			amount: 1,
			odds: 1,
			back: back,
			statusBet: Status.Open,
			predictionID: "000",
		}
		betsStore.createBet(newBet)
	}
}

onMounted(async () => {
	predictionsStore.fetchPredictions()
	console.log(predictions.value)
})
</script>
