<template>
	<div
		class="slide-container relative overflow-hidden h-screen w-screen bg-gradient-to-br from-indigo-500 to-purple-600"
		ref="swipeTarget"
	>
		<Transition :name="transitionName">
			<component
				:is="slides[currentSlide]"
				:key="currentSlide"
				class="absolute top-0 left-0 w-full h-full"
				@wheel="handleWheel"
			></component>
		</Transition>
	</div>
	<div class="absolute top-10 right-10 z-10">
		<button @click="nextSlide">Next</button>
	</div>
	<div class="absolute top-10 left-10 z-10">
		<button @click="previousSlide">Previous</button>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useSwipe } from "@vueuse/core"
import SlideA from "@/components/SlideA.vue"
import SlideB from "@/components/SlideB.vue"
// Import other slides here

const slides = [SlideA, SlideB]
const currentSlide = ref(0)
const swipeTarget = ref<HTMLElement | null>(null)
const isMovingForward = ref(true)

const transitionName = computed(() => (isMovingForward.value ? "slide-right" : "slide-left"))

const nextSlide = () => {
	if (currentSlide.value < slides.length - 1) {
		isMovingForward.value = true
		currentSlide.value++
	}
}

const previousSlide = () => {
	if (currentSlide.value > 0) {
		isMovingForward.value = false
		currentSlide.value--
	}
}

const handleWheel = (event: WheelEvent) => {
	// Prevent the default scrolling behavior
	event.preventDefault()

	// Check if it's a horizontal scroll (shift + scroll or trackpad horizontal scroll)
	if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
		if (event.deltaX > 0) {
			nextSlide()
		} else {
			previousSlide()
		}
	}
}

onMounted(() => {
	if (!swipeTarget.value) {
		console.log("Swipe target not found")
		return
	}
	const { direction } = useSwipe(swipeTarget, {
		onSwipe(e) {
			if (direction.value === "left") {
				nextSlide()
			} else if (direction.value === "right") {
				previousSlide()
			}
		},
	})
})
</script>

<style scoped>
/* Vue transition classes */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
	transition: all 0.5s ease;
}

.slide-right-enter-from {
	transform: translateX(100%);
}

.slide-right-leave-to {
	transform: translateX(-100%);
}

.slide-left-enter-from {
	transform: translateX(-100%);
}

.slide-left-leave-to {
	transform: translateX(100%);
}

.slide-right-enter-to,
.slide-right-leave-from,
.slide-left-enter-to,
.slide-left-leave-from {
	transform: translateX(0);
}
</style>
