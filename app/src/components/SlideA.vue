<template>
	<div
		class="slide-container flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8"
	>
		<div class="w-full md:w-3/4 flex flex-col md:flex-row items-center md:justify-start">
			<img :src="tuoppiImg" alt="Tuomas Louekari" class="w-1/3 md:w-1/4 h-auto rounded-full" />
			<div
				class="md:text-left md:items-center rounded text-black bg-white speech-bubble px-8 py-4 mt-4 md:ml-8 md:mt-0"
			>
				<svg
					width="100%"
					height="100%"
					class="speechbubble-arrow transform rotate-90 speech-bubble-arrow md:rotate-0 md:speech-bubble-arrow-md"
					viewBox="0 0 596 616"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					xml:space="preserve"
					xmlns:serif="http://www.serif.com/"
					style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2"
				>
					<g transform="matrix(1,0,0,1,-1146.95,-295.276)">
						<path
							d="M1742.46,528.872L1742.46,910.682C1542.93,910.682 1146.95,766.613 1146.95,295.276C1364.53,551.346 1742.46,528.872 1742.46,528.872Z"
						/>
					</g>
				</svg>
				<h1 class="text-6xl font-bold mb-6 animate-fadeIn">{{ company?.attributes.title }}</h1>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Company } from "@/types"
import tuoppiImg from "@/assets/tuoppi.jpg"
defineProps({
	company: Object as () => Company,
	default: () => ({
		title: "lol",
		companydata: {},
	}),
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
