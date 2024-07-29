<template>
	<div
		class="slide-container relative overflow-hidden h-screen w-screen bg-gradient-to-br from-indigo-500 to-purple-600"
	>
		<component
			v-for="(slide, index) in slides"
			:key="index"
			:is="slide"
			class="slide snap-start w-full h-full"
			:class="{ hidden: index !== currentSlide }"
			:company="company"
			:slideKey="index"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useCompanyStore } from "@/stores/companyStore"
import IntroSlide from "@/components/IntroSlide.vue"
import SkillSlide from "@/components/SkillSlide.vue"

const companyStore = useCompanyStore()
const currentSlide = ref(0)
const company = computed(() => companyStore.company)
const componentMap = {
	IntroSlide,
	SkillSlide,
}

const slides = computed(() => {
	if (!company.value.attributes) return []

	const slideComponents = [IntroSlide]
	console.log(company.value.attributes.companydata?.slides)
	company.value.attributes.companydata?.slides.forEach((slide) => {
		if (!slide.slideComponent) return
		const slideComponent = slide.slideComponent as keyof typeof componentMap
		if (componentMap[slideComponent]) {
			slideComponents.push(componentMap[slideComponent])
		}
	})
	return slideComponents
})

onMounted(() => {
	companyStore.fetchCompany("1")
})
</script>
