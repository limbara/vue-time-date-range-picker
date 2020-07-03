// eslint-disable-next-line import/no-unresolved
import moment from 'moment';
import Util from './Util';

export default class {
  /**
   * @param {String} lang
   */
  constructor(lang = '') {
    this.lang = lang;
    this.localMoment = moment().locale(lang);
  }

  /**
   * Create Date
   * @returns {Date}
   */
  createDate(...param) {
    return moment(...param)
      .locale(this.lang)
      .toDate();
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
  // eslint-disable-next-line class-methods-use-this
  formatDate(date, format) {
    return moment(date).format(format);
  }

  /**
   * Check if a locale first weekday is monday
   */
  isMondayFirst() {
    return (
      moment()
        .locale(this.lang)
        .weekday(0)
        .format('E') === '1'
    );
  }

  /**
   * check for same date only
   *
   * @param {Date} date1
   * @param {Date} date2
   * @return {Boolean}
   */
  // eslint-disable-next-line class-methods-use-this
  isSameDate(date1, date2) {
    return (
      moment(date1).format('DD MM YYYY') === moment(date2).format('DD MM YYYY')
    );
  }

  /**
   * check for date time similarity
   *
   * @param {Date} date1
   * @param {Date} date2
   * @returns {Boolean}
   */
  // eslint-disable-next-line class-methods-use-this
  isSame(date1, date2) {
    return moment(date1).isSame(date2);
  }

  /**
   * check if date is valid
   *
   * @param {Date} date
   * @returns {Boolean}
   */
  // eslint-disable-next-line class-methods-use-this
  isValidDate(date) {
    return Util.isObjectDate(date) && moment(date).isValid();
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
   * Check if date is before a beforeDate
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
   * Check if date is same or before a beforeDate
   * @param {Date} date
   * @param {Date} beforeDate
   * @returns {Boolean}
   */
  // eslint-disable-next-line class-methods-use-this
  isSameOrBefore(date, beforeDate) {
    return moment(date).isSameOrBefore(beforeDate);
  }

  /**
   * Check if date is after a afterDate
   *
   * @param {Date} date
   * @param {Date} beforeDate
   * @returns {Boolean}
   */
  // eslint-disable-next-line class-methods-use-this
  isAfter(date, afterDate) {
    return moment(date).isAfter(afterDate);
  }

  /**
   * Check if date is same or after a afterDate
   * @param {Date} date
   * @param {Date} afterDate
   * @returns {Boolean}
   */
  // eslint-disable-next-line class-methods-use-this
  isSameOrAfter(date, afterDate) {
    return moment(date).isSameOrAfter(afterDate);
  }

  /**
   * Check if a date is between fromDate and toDate
   * @param {Date} date
   * @param {Date} fromDate
   * @param {Date} toDate
   */
  // eslint-disable-next-line class-methods-use-this
  isBetween(date, fromDate, toDate) {
    return moment(date).isBetween(fromDate, toDate);
  }

  /**
   * Check if a date is same or between as fromDate and toDate
   *
   * @param {Date} date
   * @param {Date} fromDate
   * @param {Date} toDate
   * @returns {Boolean}
   */
  // eslint-disable-next-line class-methods-use-this
  isSameOrBetween(date, fromDate, toDate) {
    const theDate = moment(date);

    return theDate.isSameOrAfter(fromDate) && theDate.isSameOrBefore(toDate);
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
   * Get Number of Day in A month from A Date
   *
   * @param {Date} date
   * @returns {Number}
   */
  // eslint-disable-next-line class-methods-use-this
  daysInMonth(date) {
    return moment(date).daysInMonth();
  }

  /**
   * Get Month 0 - 11 from A Date
   *
   * @param {Date} date
   * @returns {Number}
   */
  // eslint-disable-next-line class-methods-use-this
  month(date) {
    return moment(date).month();
  }

  /**
   * Get Year from A Date
   * @param {Date} date
   * @returns {Number}
   */
  // eslint-disable-next-line class-methods-use-this
  year(date) {
    return moment(date).year();
  }
}
