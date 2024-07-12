<template>
	<div class="overflow-hidden">
		<Transition name="slide-fade">
			<component
				:is="slides[currentSlide]"
				@next="nextSlide"
				@first="currentSlide = 0"
				:key="currentSlide"
				class="absolute top-0 left-0 w-full h-full"
			></component>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import SlideA from "@/components/SlideA.vue"
import SlideB from "@/components/SlideB.vue"

const slides = [SlideA, SlideB]
const currentSlide = ref(0)

const nextSlide = () => {
	if (currentSlide.value < slides.length - 1) {
		currentSlide.value++
	}
}
</script>

<style scoped>
.slide-container {
	background-color: #092f3f; /* Set this to match your slides' background */
}
.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.5s ease;
}

.slide-fade-enter-from {
	transform: translateX(100%);
}

.slide-fade-leave-to {
	transform: translateX(-100%);
}
</style>
