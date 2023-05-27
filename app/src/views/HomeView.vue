<template>
	<div>
		<section
			class="relative w-full bg-gradient-to-r from-aqua-300 via-aqua-500 to-aqua-700"
		>
			<div
				class="container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center"
			>
				<div
					class="w-full flex flex-col md:flex-row items-center md:justify-start"
				>
					<img
						:src="tuoppiImg"
						alt="Tuomas Louekari"
						class="w-1/4 h-auto rounded-full"
					/>
					<div class="text-center md:text-left md:items-center">
						<h1
							class="font-roboto text-4xl md:text-6xl font-thin text-black mt-6 md:mt-0 md:ml-8"
						>
							Tuomas Louekari
						</h1>
						<p class="font-overpass text-black mt-4 md:mt-0 md:ml-8 font-thin">
							Geriatric millennial building things
						</p>
						<div
							class="flex flex-row md:ml-8 mt-4 justify-center md:justify-start"
						>
							<a href="https://github.com/ninjapiraatti" target="_blank">
								<github-icon class="h-10 w-10 text-black stroke-10 mr-2" />
							</a>
							<a href="https://medium.com/@ninjapiraatti" target="_blank">
								<medium-icon class="h-10 w-10 text-black stroke-10 mr-2" />
							</a>
							<a
								href="https://www.linkedin.com/in/tuomaslouekari/"
								target="_blank"
							>
								<linkedin-icon class="h-10 w-10 text-black stroke-10 mr-2" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- <section class="bg-xpurple-900">
			<project-list />
		</section> -->
	</div>
</template>

<script setup lang="ts">
import tuoppiImg from "@/assets/tuoppi.jpg"
//import tankkiMov from "@/assets/tankki.mp4"
//import ProjectList from "@/components/ProjectList.vue"
import { GithubIcon, LinkedinIcon, MediumIcon } from "@/components/custom_icons"
</script>
