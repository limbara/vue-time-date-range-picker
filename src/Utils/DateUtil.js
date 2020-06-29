import moment from 'moment';

export default class {
  /**
   * @param {String} lang
   */
  constructor(lang) {
    this.lang = lang;
    this.localMoment = moment().locale(lang);
  }

  /**
   * Get Day Names
   * @returns {Array}
   */
  getDayNames() {
    return this.localMoment.localeData().weekdays();
  }

  /**
   * Get Abbreviated Day Names
   * @returns {Array}
   */
  getAbbrDayNames() {
    return this.localMoment.localeData().weekdaysShort();
  }

  /**
   * Get Month Names
   * @returns {Array}
   */
  getMonthNames() {
    return this.localMoment.localeData().months();
  }

  /**
   * Get Abbreviated Month Names
   * @returns {Array}
   */
  getAbbrMonthNames() {
    return this.localMoment.localeData().monthsShort();
  }

  /**
   * format a date
   *
   * @param {Date} date
   * @param {String} format
   * @returns {String}
   */
  formatDate(date, format) {
    return moment(date).locale(this.lang).format(format);
  }

  /**
   * check for same date
   * @param {Date} date1
   * @param {Date} date2
   */
  // eslint-disable-next-line class-methods-use-this
  isSameDate(date1, date2) {
    return moment(date1).format('DD MM yyyy') === moment(date2).format('DD MM yyyy');
  }

  /**
   * check if date is valid
   *
   * @param {Date} date
   * @returns {Boolean}
   */
  // eslint-disable-next-line class-methods-use-this
  isValidDate(date) {
    return moment(date).isValid();
  }
}
