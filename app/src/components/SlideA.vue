<template>
	<div
		class="slide-container flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8"
	>
		<div class="w-full md:w-3/4 flex flex-col md:flex-row items-center md:justify-start">
			<img :src="tuoppiImg" alt="Tuomas Louekari" class="w-1/5 h-auto rounded-full" />
			<div class="text-center md:text-left md:items-center">
				<h1 class="font-roboto text-4xl md:text-6xl font-thin text-black mt-6 md:mt-0 md:ml-8">Tuomas Louekari</h1>
				<p class="font-overpass text-black mt-4 md:mt-0 md:ml-8">Geriatric millennial building things</p>
				<div class="flex flex-row md:ml-8 mt-4 justify-center md:justify-start">
					<a href="https://github.com/ninjapiraatti" target="_blank">
						<github-icon class="h-10 w-10 text-black stroke-16 mr-2" />
					</a>
					<a href="https://medium.com/@ninjapiraatti" target="_blank">
						<medium-icon class="h-10 w-10 text-black stroke-16 mr-2" />
					</a>
					<a href="https://www.linkedin.com/in/tuomaslouekari/" target="_blank">
						<linkedin-icon class="h-10 w-10 text-black stroke-16 mr-2" />
					</a>
				</div>
			</div>
		</div>
		<h1 class="text-6xl font-bold mb-6 animate-fadeIn">{{ company?.attributes.title }}</h1>
		<p class="text-2xl mb-12 animate-fadeIn animation-delay-300">Exploring the Power of Composition API</p>
	</div>
</template>

<script setup lang="ts">
import type { Company } from "@/types"
import tuoppiImg from "@/assets/tuoppi.jpg"
import { GithubIcon, LinkedinIcon, MediumIcon } from "@/components/custom_icons"
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
