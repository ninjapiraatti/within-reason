<template>
	<div
		class="slide-container flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8"
	>
		<h1 class="text-6xl font-bold mb-6 animate-fadeIn">Vue 3 Presentation</h1>
		<p class="text-2xl mb-12 animate-fadeIn animation-delay-300">Exploring the Power of Composition API</p>
	</div>
</template>

<script setup lang="ts"></script>

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
