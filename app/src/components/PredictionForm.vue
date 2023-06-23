<template>
	<div class="max-w-3xl mx-auto mt-10">
		<h1 class="text-3xl font-bold mb-4">Post a Prediction</h1>
		<p>Author: {{ author?.username }}</p>

		<form @submit.prevent="handleSubmit">
			<div class="mb-4">
				<label for="title" class="block font-medium mb-1">Title</label>
				<input
					type="text"
					id="title"
					v-model="title"
					class="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				/>
			</div>

			<div class="mb-4">
				<label for="description" class="block font-medium mb-1">Description</label>
				<textarea
					id="description"
					v-model="description"
					rows="4"
					class="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				></textarea>
			</div>

			<div class="mb-4">
				<label for="deadline" class="block font-medium mb-1">Deadline</label>
				<input
					type="date"
					id="deadline"
					v-model="deadline"
					class="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				/>
			</div>

			<button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">
				Submit Prediction
			</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { usePredictionsStore } from "@/stores/predictionsStore"
import { useUsersStore } from "@/stores/usersStore"
import { Status, type Prediction } from "@/types"

const title = ref("")
const description = ref("")
const deadline = ref("")

const predictionsStore = usePredictionsStore()
const usersStore = useUsersStore()

const author = computed(() => usersStore.user)

const handleSubmit = async () => {
	if (author.value) {
		const newPrediction: Prediction = {
			title: title.value,
			description: description.value,
			deadline: new Date(deadline.value),
			criteria: "lol",
			authorName: author.value.username,
			authorID: `${author.value.id}`,
			statusPrediction: Status.Open,
			referees: [],
			bets: [],
		}
		try {
			await predictionsStore.createPrediction(newPrediction)
			title.value = ""
			description.value = ""
			deadline.value = ""
		} catch (error) {
			console.error((error as Error).message)
		}
	}
}
</script>
