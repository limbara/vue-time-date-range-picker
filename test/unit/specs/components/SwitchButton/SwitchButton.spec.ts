import { shallowMount } from "@vue/test-utils";
import SwitchButton from "@components/SwitchButton/SwitchButton.vue";
import "regenerator-runtime";

describe("Switch Button", () => {
  it("should render correct contents", () => {
    const wrapper = shallowMount(SwitchButton, {
      attachTo: document.body,
    });

    const label = wrapper.find('.vdpr-datepicker__switch')

    expect(label).toBeDefined()

    const input = label.find('input')
    expect(input).toBeDefined()
    expect(input.attributes().type).toBe("checkbox")

    const slider = label.find('.vdpr-datepicker__switch-slider')

    expect(slider).toBeDefined()
  })

  it("should render checked state", () => {
    const wrapper = shallowMount(SwitchButton, {
      attachTo: document.body,
      props: {
        checked: true,
      },
    });

    const input = wrapper.get('input')

    expect(input.element.checked).toEqual(true)
  })

  it("should render unchecked state", () => {
    const wrapper = shallowMount(SwitchButton, {
      attachTo: document.body,
      props: {
        checked: false,
      },
    });

    const input = wrapper.get('input')

    expect(input.element.checked).toEqual(false)
  })

  it("should emit event change", async () => {
    const wrapper = shallowMount(SwitchButton, {
      attachTo: document.body,
      props: {
        checked: false,
      },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted("change")).toBeDefined();
  });
});
