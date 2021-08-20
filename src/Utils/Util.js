export default {
  /**
   * Check if value is Date Object
   *
   * @param {*} value
   * @returns {Boolean}
   */
  isObjectDate: (value) => Object.prototype.toString.call(value) === '[object Date]',

  /**
   * Get Object Length
   *
   * @param {Object} value
   * @returns {Number}
   */
  getObjectLength: (value) => Object.keys(value).length,

  /**
   * Check disabled/available date object is not empty
   *
   * @param {Object} value
   * @returns {Boolean}
   */
  checkDateObject: (value) => {
    if (value) {
      if (Object.keys(value).length > 0) {
        return true;
      }
    }
    return false;
  },
};
