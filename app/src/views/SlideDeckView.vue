<template>
	<div class="slide-container relative overflow-hidden h-screen w-screen" ref="swipeTarget">
		<Transition name="slide-fade">
			<component
				:is="slides[currentSlide]"
				@next="nextSlide"
				:key="currentSlide"
				class="absolute top-0 left-0 w-full h-full"
				@wheel="handleWheel"
			></component>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useSwipe } from "@vueuse/core"
import SlideA from "@/components/SlideA.vue"
import SlideB from "@/components/SlideB.vue"
// Import other slides here

const slides = [SlideA, SlideB]
const currentSlide = ref(0)
const swipeTarget = ref<HTMLElement | null>(null)

const nextSlide = () => {
	if (currentSlide.value < slides.length - 1) {
		currentSlide.value++
	}
}

const previousSlide = () => {
	if (currentSlide.value > 0) {
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
	const { isSwiping, direction } = useSwipe(swipeTarget, {
		onSwipe(e) {
			console.log("event")
			if (direction.value === "left") {
				console.log("left")
				nextSlide()
			} else if (direction.value === "right") {
				console.log("right")
				previousSlide()
			}
		},
	})
})
</script>

<style scoped>
.slide-container {
	background-color: #ffffff; /* Set this to match your slides' background */
}

.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.5s ease;
}

.slide-fade-enter-from {
	transform: translateX(100%);
	opacity: 0;
}

.slide-fade-leave-to {
	transform: translateX(-100%);
	opacity: 0;
}
</style>
