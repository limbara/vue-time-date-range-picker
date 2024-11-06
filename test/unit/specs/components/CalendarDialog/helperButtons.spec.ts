import { shallowMount } from "@vue/test-utils";
import CalendarDialog from "@components/CalendarDialog/CalendarDialog.vue";

describe("Calendar Dialog : helper buttons", () => {
  const buttonHelpersClass = ".vdpr-datepicker__calendar-button-helper";
  let wrapper;

  it("should render defaults helper buttons", () => {
    wrapper = shallowMount(CalendarDialog, {
      props: {
        showHelperButtons: true,
      },
    });

    expect(wrapper.find(buttonHelpersClass).exists()).toBe(true);

    const helperButtons = wrapper.find(buttonHelpersClass).findAll("button");

    const defaultHelpersButtons = wrapper.vm.getDefaultHelpers();

    expect(helperButtons.length).toEqual(defaultHelpersButtons.length);

    helperButtons.forEach((b, i) => {
      expect(b.text()).toBe(defaultHelpersButtons[i].name);
    });
  });

  it("should not render show helper button", () => {
    wrapper = shallowMount(CalendarDialog, {
      props: {
        showHelperButtons: false,
      },
    });

    expect(wrapper.find(buttonHelpersClass).exists()).toBe(false);
  });

  it("should render custom helper buttons", () => {
    wrapper = shallowMount(CalendarDialog, {
      props: {
        helperButtons: [
          {
            name: "Custom Button",
            from: new Date("2020 09 20"),
            to: new Date("2020 09 15"),
          },
        ],
      },
    });

    expect(wrapper.find(buttonHelpersClass).element.children.length).toEqual(1);
  });

  it("should emit event select-date when clicked", async () => {
    const name = "Custom Button";
    const from = new Date("2020 08 01");
    const to = new Date("2020 08 20");

    wrapper = shallowMount(CalendarDialog, {
      props: {
        helperButtons: [
          {
            name,
            from,
            to,
          },
        ],
      },
    });

    const helperButtons = wrapper.find(buttonHelpersClass).findAll("button");

    const customButton = helperButtons.find((e) => e.text() === name);

    expect(customButton).toBeDefined();

    await customButton?.trigger("click");

    const selectDateEvent = wrapper.emitted("select-date");

    expect(selectDateEvent).toBeDefined();
    expect(selectDateEvent).toHaveLength(1);
    expect(selectDateEvent?.[0]).toEqual([from, to]);
  });
});
