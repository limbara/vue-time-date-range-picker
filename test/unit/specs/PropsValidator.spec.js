import PropsValidator from '@utils/PropsValidator';

describe('Props Validator', () => {
  it('isValidInitialDates should return true if no parameter or empty array', () => {
    expect(PropsValidator.isValidInitialDate()).toBe(true);

    expect(PropsValidator.isValidInitialDate([])).toBe(true);
  });

  it('isValidInitialDates should return false if parameter is not Date', () => {
    const isValid = PropsValidator.isValidInitialDate(['date1', 'date2']);

    expect(isValid).toBe(false);
  });

  it('isValidInitialDates should return false if from date greater than to date', () => {
    const isValid = PropsValidator.isValidInitialDate([new Date('2020-10-02'), new Date('2020-10-01')]);

    expect(isValid).toBe(false);
  });

  it('isValidHelperButtons should return true if no parameter or empty array', () => {
    expect(PropsValidator.isValidHelperButtons()).toBe(true);

    expect(PropsValidator.isValidHelperButtons([])).toBe(true);
  });

  it('isValidHelperButtons should return false if button name empty', () => {
    const isValid = PropsValidator.isValidHelperButtons([
      {
        name: '',
        from: new Date('2020-10-01'),
        to: new Date('2020-10-02'),
      },
    ]);

    expect(isValid).toBe(false);
  });

  it('isValidHelperButtons should return false if button from not date', () => {
    const isValid = PropsValidator.isValidHelperButtons([
      {
        name: 'This Day',
        from: '2020-10-02',
        to: new Date('2020-10-02'),
      },
    ]);

    expect(isValid).toBe(false);
  });

  it('isValidHelperButtons should return false if button to not date', () => {
    const isValid = PropsValidator.isValidHelperButtons([
      {
        name: 'This Day',
        from: new Date('2020-10-02'),
        to: '2020-10-02',
      },
    ]);

    expect(isValid).toBe(false);
  });

  it('isValidDateRestriction should return true if no parameter or empty object', () => {
    expect(PropsValidator.isValidDateRestriction()).toBe(true);

    expect(PropsValidator.isValidDateRestriction({})).toBe(true);
  });

  it('isValidDateRestriction should return false if dates items is not date', () => {
    const isValid = PropsValidator.isValidDateRestriction({
      dates: ['2020-10-15'],
    });

    expect(isValid).toBe(false);
  });

  it('isValidDateRestriction should return false if from is not date', () => {
    const isValid = PropsValidator.isValidDateRestriction({
      from: '2020-10-15',
    });

    expect(isValid).toBe(false);
  });

  it('isValidDateRestriction should return false if to is not date', () => {
    const isValid = PropsValidator.isValidDateRestriction({
      to: '2020-10-15',
    });

    expect(isValid).toBe(false);
  });

  it('isValidDateRestriction should return false if ranges is not valid', () => {
    let isValid = PropsValidator.isValidDateRestriction({
      ranges: [
        {
          from: '2020-10-15',
          to: new Date('2020-10-20'),
        },
      ],
    });

    expect(isValid).toBe(false);

    isValid = PropsValidator.isValidDateRestriction({
      ranges: [
        {
          from: new Date('2020-10-15'),
          to: '2020-10-20',
        },
      ],
    });

    expect(isValid).toBe(false);
  });

  it('isValidDateRestriction should return false if custom is not function', () => {
    const isValid = PropsValidator.isValidDateRestriction({
      custom: new Date('2020-10-15'),
    });

    expect(isValid).toBe(false);
  });

  it('isValidDateRestriction should return true if all props is valid', () => {
    const isValid = PropsValidator.isValidDateRestriction({
      dates: [new Date('2020-10-15')],
      from: new Date('2020-12-01'),
      to: new Date('2020-07-30'),
      ranges: [
        {
          from: new Date('2020-08-01'),
          to: new Date('2020-08-10'),
        },
      ],
      custom() {
        return true;
      },
    });

    expect(isValid).toBe(true);
  });

  it('isValidSameDateFormat shoud return true if no parameter or empty object', () => {
    expect(PropsValidator.isValidSameDateFormat()).toBe(true);

    expect(PropsValidator.isValidSameDateFormat({})).toBe(true);
  });

  it('isValidSameDateFormat should return false if from or to is not string', () => {
    let isValid = PropsValidator.isValidSameDateFormat({
      from: 1,
      to: 'DD/MM/YYYY HH:mm',
    });

    expect(isValid).toBe(false);

    isValid = PropsValidator.isValidSameDateFormat({
      from: 'DD/MM/YYYY HH:mm',
      to: 1,
    });

    expect(isValid).toBe(false);
  });
});
