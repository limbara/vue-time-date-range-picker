import moment from 'moment';

export default class {
  /**
   * @param {String} lang
   */
  constructor(lang = '') {
    this.lang = lang;
    this.localMoment = moment().locale(lang);
  }

  /**
   * Get Day Names
   *
   * @returns {Array}
   */
  getDayNames() {
    return this.localMoment.localeData().weekdays();
  }

  /**
   * Get Abbreviated Day Names
   *
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
   *
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
    return moment(date)
      .locale(this.lang)
      .format(format);
  }

  /**
   * check for same date
   *
   * @param {Date} date1
   * @param {Date} date2
   * @return {Boolean}
   */
  // eslint-disable-next-line class-methods-use-this
  isSameDate(date1, date2) {
    return (
      moment(date1).format('DD MM yyyy') === moment(date2).format('DD MM yyyy')
    );
  }

  /**
   * check if a date is between 2 date
   *
   * @param {Date} date
   * @param {Date} fromDate
   * @param {Date} toDate
   * @returns {Boolean}
   */
  // eslint-disable-next-line class-methods-use-this
  isInRange(date, fromDate, toDate) {
    return moment(date).isBetween(fromDate, toDate);
  }

  /**
   * check if date is valid
   *
   * @param {Date} date
   * @returns {Boolean}
   */
  // eslint-disable-next-line class-methods-use-this
  isValidDate(date) {
    return (
      Object.prototype.toString.call(date) === '[object Date]'
      && moment(date).isValid()
    );
  }

  /**
   * convert date to unix timestamp
   *
   * @param {Date} date
   * @returns {Number}
   */
  // eslint-disable-next-line class-methods-use-this
  toUnix(date) {
    return moment(date).unix();
  }

  /**
   * convert unix to date
   *
   * @param {Number} unixTimestamp
   * @returns {Date}
   */
  // eslint-disable-next-line class-methods-use-this
  fromUnix(unixTimestamp) {
    return moment.unix(unixTimestamp).toDate();
  }

  /**
   * Get Start Of A Date. refer to moment documentation
   *
   * @param {Date} date
   * @param {String} of
   * @returns {Date}
   */
  // eslint-disable-next-line class-methods-use-this
  startOf(date, of) {
    return moment(date)
      .startOf(of)
      .toDate();
  }

  /**
   * Get End Of A Date. refer to moment documentation
   *
   * @param {Date} date
   * @param {String} of
   * @returns {Date}
   */
  // eslint-disable-next-line class-methods-use-this
  endOf(date, of) {
    return moment(date)
      .endOf(of)
      .toDate();
  }

  /**
   * Check if date is before a date
   *
   * @param {Date} date
   * @param {Date} beforeDate
   * @returns {Boolean}
   */
  // eslint-disable-next-line class-methods-use-this
  isBefore(date, beforeDate) {
    return moment(date).isBefore(beforeDate);
  }

  /**
   * Check if date is after a date
   *
   * @param {Date} date
   * @param {Date} beforeDate
   * @returns {Boolean}
   */
  // eslint-disable-next-line class-methods-use-this
  isAfter(date, beforeDate) {
    return moment(date).isAfter(beforeDate);
  }

  /**
   * Add Number of timeKey to A Date. refer to moment documentation
   *
   * @param {Date} date
   * @param {Number} number
   * @param {String} timeKey
   * @returns {Date}
   */
  // eslint-disable-next-line class-methods-use-this
  add(date, number, timeKey) {
    return moment(date)
      .add(number, timeKey)
      .toDate();
  }

  /**
   * Subtract Number of timeKey to A Date. refer to moment documentation
   *
   * @param {Date} date
   * @param {Number} number
   * @param {String} timeKey
   * @returns {Date}
   */
  // eslint-disable-next-line class-methods-use-this
  subtract(date, number, timeKey) {
    return moment(date)
      .subtract(number, timeKey)
      .toDate();
  }

  /**
   * Get Number of Day in A month from date
   *
   * @param {Date} date
   * @returns {Number}
   */
  // eslint-disable-next-line class-methods-use-this
  daysInMonth(date) {
    return moment(date).daysInMonth();
  }

  /**
   * Get Day Number 0 - 6 from A Date
   *
   * @param {Date} date
   * @returns {Number}
   */
  weekday(date) {
    return moment(date)
      .locale(this.lang)
      .weekday();
  }
}
