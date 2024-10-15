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
   * Check if disabled/available date object is empty
   *
   * @param {Object} value
   * @returns {Boolean}
   */
  isEmptyObject: (value) => {
    if (value) {
      if (Object.keys(value).length > 0) {
        return false;
      }
    }
    return true;
  },
};
