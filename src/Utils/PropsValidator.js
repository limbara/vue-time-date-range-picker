import Util from './Util';

export default {
  /**
   * @param {Array} value
   * @returns {Boolean}
   */
  isValidInitialDate(value) {
    if (value.length === 0) return true;

    const [from, to] = value;

    return Util.isObjectDate(from) && Util.isObjectDate(to);
  },

  /**
   * @param {Array} value
   * @returns {Boolean}
   */
  isValidHelperButtons(value) {
    if (value.length === 0) return true;

    const filtered = value.filter((button) => {
      const isButtonNameValid = typeof button.name === 'string' && button.name !== '';
      const isButtonFromDateValid = Util.isObjectDate(button.from);
      const isButtonToDateValid = Util.isObjectDate(button.to);

      return isButtonNameValid && isButtonFromDateValid && isButtonToDateValid;
    });

    return value.length === filtered.length;
  },

  /**
   * @param {Object} value
   * @returns {Boolean}
   */
  isValidCalendarInput(value) {
    if (Util.getObjectLength(value) === 0) return true;

    const { label, inputClass } = value;

    if (
      typeof label === 'string'
      && label !== ''
      && (typeof inputClass === 'object'
        || typeof inputClass === 'string'
        || Array.isArray(inputClass))
    ) {
      return true;
    }

    return false;
  },

  /**
   * @param {Object} value
   * @returns {Boolean}
   */
  isValidDisabledDates(value) {
    if (Util.getObjectLength(value) === 0) return true;

    const {
      dates, from, to, ranges, custom,
    } = value;

    if (Array.isArray(dates)) {
      const filteredValidDates = dates.filter((date) => Util.isObjectDate(date));

      if (filteredValidDates.length !== dates.length) {
        return false;
      }
    }

    if (typeof from !== 'undefined' && !Util.isObjectDate(from)) {
      return false;
    }

    if (typeof to !== 'undefined' && !Util.isObjectDate(to)) {
      return false;
    }

    if (Array.isArray(ranges)) {
      const filterValidRanges = ranges.filter(
        (range) => Util.isObjectDate(range.from) && Util.isObjectDate(range.to),
      );

      if (filterValidRanges.length !== ranges.length) {
        return false;
      }
    }

    if (typeof custom !== 'undefined' && typeof custom !== 'function') {
      return false;
    }

    return true;
  },
};
