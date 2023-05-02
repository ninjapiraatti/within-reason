import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import PredictionList from "@/components/PredictionList.vue";

describe("HomeView", () => {
  it("renders properly", () => {
    const wrapper = mount(PredictionList, {
      props: { title: "Hello Within Reason" },
    });
    expect(wrapper.text()).toContain("Hello Within Reason");
  });
});
