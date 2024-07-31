<template>
	<div
		class="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-green-600 text-white p-8"
	>
		<div ref="slideRef">
			<Transition name="fadeIn">
				<div v-show="isVisible">
					<h1 class="text-6xl font-bold mb-6 animate-fadeIn">Slide {{ slideKey }}</h1>
					<p class="text-2xl mb-12 animate-fadeIn animation-delay-300">Exploring the Power of Composition API</p>
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue"
import type { Company } from "@/types"
defineProps({
	company: Object as () => Company,
	default: () => ({
		title: "lol",
		companydata: {},
	}),
	slideKey: Number,
})

const slideRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					isVisible.value = true // Set to true when in view
				} else {
					isVisible.value = false // Optionally set to false when out of view
					console.log("out of view")
				}
			})
		},
		{
			threshold: 0.5, // Adjust this threshold as needed
		}
	)

	if (slideRef.value) {
		observer.observe(slideRef.value) // Observe this slide
	}

	// Cleanup observer on unmount
	onBeforeUnmount(() => {
		if (slideRef.value) {
			observer.unobserve(slideRef.value)
		}
	})
})
</script>

<style scoped>
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fadeIn {
	animation: fadeIn 0.8s ease-out forwards;
}

.animation-delay-300 {
	animation-delay: 300ms;
}

.animation-delay-600 {
	animation-delay: 600ms;
}
</style>
