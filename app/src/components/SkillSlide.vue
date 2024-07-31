<template>
	<div
		class="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-green-600 text-white p-8"
	>
		<div ref="slideRef">
			<Transition name="fadeIn">
				<div v-show="isVisible">
					<h1 class="text-6xl font-bold mb-6 animate-fadeIn">
						{{ slideContent.title }}
					</h1>
					<p class="text-2xl mb-12 animate-fadeIn">Exploring the Power of Composition API</p>
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue"
import type { Company } from "@/types"

const props = defineProps<{
	company: Company
	slideKey: number
}>()

const slideRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const slideContent = computed(() => {
	if (props.company?.attributes?.companydata?.slides) {
		return props.company.attributes.companydata.slides[props.slideKey - 1] || "Default Slide Content" // Provide a fallback
	}
	return "Default Slide Content" // Provide a fallback if slides are not available
})

onMounted(() => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					isVisible.value = true
				} else {
					isVisible.value = false
				}
			})
		},
		{
			threshold: 0.5,
		}
	)

	if (slideRef.value) {
		observer.observe(slideRef.value)
	}
})
</script>

<style scoped>
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(100px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fadeIn {
	animation: fadeIn 0.8s ease-out forwards;
}
</style>
