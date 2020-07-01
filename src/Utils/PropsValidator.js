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

      return (
        isButtonNameValid && isButtonFromDateValid && isButtonToDateValid
      );
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
      typeof label === 'string' && label !== ''
      && (
        typeof inputClass === 'object'
        || typeof inputClass === 'string'
        || Array.isArray(inputClass)
      )
    ) {
      return true;
    }

    return false;
  },
};
