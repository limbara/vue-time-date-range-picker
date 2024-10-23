import { shallowMount } from '@vue/test-utils';
import moment from 'moment';
import Calendar from '@components/Calendar/Calendar.vue';
import 'regenerator-runtime';

describe('Calendar : Available Dates', () => {
  const now = new Date();
  const startOfMonth = moment(now).startOf('month').toDate();
  const endOfMonth = moment(now).endOf('month').toDate();

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Calendar);
  });

  it("should make available dates 'to' a date & 'from' a date availableDates", async () => {
    await wrapper.setProps({
      availableDates: {
        from: endOfMonth,
        to: startOfMonth,
      },
    });

    const future = moment(now).add(12, 'y').toDate();
    const past = moment(now).subtract(20, 'y').toDate();
    const middleOfMonth = moment(startOfMonth).add(14, 'd');

    expect(wrapper.vm.isNextDisabled).toEqual(false);
    expect(wrapper.vm.isPrevDisabled).toEqual(false);

    expect(wrapper.vm.isDisabledDate(startOfMonth)).toEqual(false);
    expect(wrapper.vm.isDisabledDate(future)).toEqual(false);
    expect(wrapper.vm.isDisabledDate(middleOfMonth)).toEqual(true);
    expect(wrapper.vm.isDisabledDate(endOfMonth)).toEqual(false);
    expect(wrapper.vm.isDisabledDate(past)).toEqual(false);
  });

  it("should make available dates 'to' a date availableDates", async () => {
    await wrapper.setProps({
      availableDates: {
        to: endOfMonth,
      },
    });

    const future = moment(now).add(12, 'y').toDate();
    const past = moment(now).subtract(20, 'y').toDate();

    expect(wrapper.vm.isNextDisabled).toEqual(true);
    expect(wrapper.vm.isPrevDisabled).toEqual(false);

    expect(wrapper.vm.isDisabledDate(startOfMonth)).toEqual(false);
    expect(wrapper.vm.isDisabledDate(future)).toEqual(true);
    expect(wrapper.vm.isDisabledDate(endOfMonth)).toEqual(false);
    expect(wrapper.vm.isDisabledDate(past)).toEqual(false);
  });

  it("should make available dates 'from' a date availableDates", async () => {
    await wrapper.setProps({
      availableDates: {
        from: startOfMonth,
      },
    });

    const future = moment(now).add(12, 'y').toDate();
    const past = moment(now).subtract(20, 'y').toDate();

    expect(wrapper.vm.isNextDisabled).toEqual(false);
    expect(wrapper.vm.isPrevDisabled).toEqual(true);

    expect(wrapper.vm.isDisabledDate(startOfMonth)).toEqual(false);
    expect(wrapper.vm.isDisabledDate(future)).toEqual(false);
    expect(wrapper.vm.isDisabledDate(endOfMonth)).toEqual(false);
    expect(wrapper.vm.isDisabledDate(past)).toEqual(true);
  });

  it("should make available dates only between 'from' date and 'to' date if 'from' is smaller than 'to'", async () => {
    await wrapper.setProps({
      availableDates: {
        from: startOfMonth,
        to: endOfMonth,
      },
    });

    const randomBetweenDate = new Date(
      startOfMonth.getTime()
        + Math.random() * (endOfMonth.getTime() - startOfMonth.getTime()),
    );
    const randomFutureDate = new Date(
      endOfMonth.getTime()
        + Math.random() * (endOfMonth.getTime() - startOfMonth.getTime()),
    );
    const randomPastDate = new Date(
      startOfMonth.getTime()
        - Math.random() * (endOfMonth.getTime() - startOfMonth.getTime()),
    );

    expect(wrapper.vm.isDisabledDate(randomBetweenDate)).toEqual(false);
    expect(wrapper.vm.isDisabledDate(randomFutureDate)).toEqual(true);
    expect(wrapper.vm.isDisabledDate(randomPastDate)).toEqual(true);
  });

  it("can change to available 'to' date & 'from' date", async () => {
    await wrapper.setProps({
      availableDates: {
        from: endOfMonth,
        to: startOfMonth,
      },
    });

    const monthYear = moment(now).format('MMM YYYY');

    wrapper.vm.onPrevClick();
    expect(wrapper.vm.monthYear === monthYear).toBe(false);
    wrapper.vm.onNextClick();
    expect(wrapper.vm.monthYear === monthYear).toBe(true);
    wrapper.vm.onNextClick();
    expect(wrapper.vm.monthYear === monthYear).toBe(false);
  });

  it("should allow dates 'dates' from availableDates", async () => {
    await wrapper.setProps({
      availableDates: {
        dates: [
          new Date('2020 08 01'),
          new Date('2020 08 05'),
          new Date('2020 07 31'),
        ],
      },
    });

    expect(wrapper.vm.isDisabledDate(new Date('2020 08 02'))).toEqual(true);
    expect(wrapper.vm.isDisabledDate(new Date('2020 08 05'))).toEqual(false);
    expect(wrapper.vm.isDisabledDate(new Date('2020 07 31'))).toEqual(false);
  });

  it("should allow dates 'ranges' from availableDates", async () => {
    await wrapper.setProps({
      availableDates: {
        ranges: [
          {
            from: new Date('2020 07 08'),
            to: new Date('2020 07 18'),
          },
          {
            from: new Date('2023 05 05'),
            to: new Date('2025 07 27'),
          },
        ],
      },
    });

    expect(wrapper.vm.isDisabledDate(new Date('2021 01 01'))).toEqual(true);
    expect(wrapper.vm.isDisabledDate(new Date('2020 07 03'))).toEqual(true);
    expect(wrapper.vm.isDisabledDate(new Date('2020 07 15'))).toEqual(false);
    expect(wrapper.vm.isDisabledDate(new Date('2023 08 01'))).toEqual(false);
  });

  it("should allow date 'custom' function from availableDates", async () => {
    await wrapper.setProps({
      availableDates: {
        custom: (date) => date.getDate() % 2 === 0, // allow every even date
      },
    });

    expect(wrapper.vm.isDisabledDate(new Date('2020 01 01'))).toEqual(true);
    expect(wrapper.vm.isDisabledDate(new Date('2020 01 02'))).toEqual(false);
    expect(wrapper.vm.isDisabledDate(new Date('2045 05 07'))).toEqual(true);
  });

  it('should ignore availableDates if disabledDates is provided', async () => {
    await wrapper.setProps({
      availableDates: {
        from: endOfMonth,
      },
      disabledDates: {
        from: endOfMonth,
      },
    });

    const future = moment(now).add(12, 'y').toDate();
    const past = moment(now).subtract(20, 'y').toDate();

    expect(wrapper.vm.isNextDisabled).toEqual(true);
    expect(wrapper.vm.isPrevDisabled).toEqual(false);

    expect(wrapper.vm.isDisabledDate(startOfMonth)).toEqual(false);
    expect(wrapper.vm.isDisabledDate(future)).toEqual(true);
    expect(wrapper.vm.isDisabledDate(endOfMonth)).toEqual(true);
    expect(wrapper.vm.isDisabledDate(past)).toEqual(false);
  });
});
