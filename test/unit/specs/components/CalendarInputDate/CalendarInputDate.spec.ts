import { shallowMount } from "@vue/test-utils";
import CalendarInputDate from "@components/CalendarInputDate/CalendarInputDate.vue";
import "regenerator-runtime";

describe("Calendar Input Date", () => {
  let wrapper: ReturnType<typeof shallowMount<typeof CalendarInputDate>>;

  const date = "2020 08 10";

  beforeEach(() => {
    wrapper = shallowMount(CalendarInputDate, {
      props: {
        inputClass: "date_input_class",
        timestamp: new Date(date).getTime() / 1000,
        format: "DD/MM/YYYY",
      },
    });
  });

  it("should render correct contents", () => {
    expect(wrapper.findAll("input")).toHaveLength(1);

    const attrs = wrapper.find("input").attributes();

    expect(attrs.class).toContain("date_input_class");
  });

  it("format date", () => {
    expect(wrapper.find('input').element.value).toEqual("10/08/2020");
  });

  it("doesn't format date if timestamp is zero", () => {
    wrapper = shallowMount(CalendarInputDate, {
      props: {
        timestamp: 0,
      },
    });

    expect(wrapper.find("input").element.value).toEqual("");
  });

  it("change language", async () => {
    await wrapper.setProps({
      language: "id",
      format: "MMMM",
    });

    expect(wrapper.find("input").element.value).toEqual("Agustus");

    await wrapper.setProps({
      language: "ms-my",
      format: "MMMM",
    });

    expect(wrapper.find("input").element.value).toEqual("Ogos");
  });

  it("emit change when input change", async () => {
    wrapper.find("input").element.value = "24/10/2020";

    await wrapper.find("input").trigger("change");

    expect(wrapper.emitted("change")[0]).toEqual([new Date("2020 10 24")]);
  });

  it("doesn't emit change if input invalid", async () => {
    wrapper.find("input").element.value = "ww/08/2020";

    await wrapper.find("input").trigger("change");

    expect(wrapper.emitted("change")).toBeFalsy();
  });
});
