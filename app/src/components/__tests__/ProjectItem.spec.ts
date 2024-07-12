import { describe, it, expect } from "vitest"

import { mount } from "@vue/test-utils"
import ProjectItem from "@/components/ProjectItem.vue"

describe("Project Item", () => {
	it("renders properly", () => {
		const wrapper = mount(ProjectItem, {
			global: {
				stubs: {
					"router-link": true,
				},
			},
			props: {
				project: {
					id: 1,
					attributes: {
						title: "Test Project",
						ingress: "Lorem",
						body: "Ipsum",
						image: "/imagepath/image.jpg",
						video: "/videopath/video.mp4",
						wasm: "",
					},
					imageUrl: "/imagepath/image.jpg",
					meta: {},
				},
			},
		})
		expect(wrapper.text()).toContain("Test Project")
	})
})
