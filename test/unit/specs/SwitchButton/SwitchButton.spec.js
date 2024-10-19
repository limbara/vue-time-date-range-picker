import { shallowMount } from "@vue/test-utils";
import SwitchButton from "@/components/SwitchButton/SwitchButton.vue";
import "regenerator-runtime";

describe("Switch Button", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SwitchButton, {
      attachTo: document.body,
      props: {
        checked: false,
      },
    });
  });

  it("emits on check change", async () => {
    await wrapper.trigger("click");

    expect(wrapper.emitted("change")).toBeDefined();
  });
});
