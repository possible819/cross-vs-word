const ERROR_MESSAGES: { [key: string]: string } = {
  EMPTY_VALUE_PASSED: `Empty value is passed. You should pass valid value`,
  VALUE_EXISTS: `Failed to write value because there's value which has same key. If you want to overwrite it you should pass overwrite flag`,
} as const

/**
 * @description Local Storage Utility
 * @method getItem
 * @method setItem
 */
export const LocalStorageUtil = {
  /**
   * @description Return found value or default value if it's passed after parse it as JSON
   * @param {string} key
   * @param {any} defaultValue
   */
  getItem(key: string, defaultValue?: any): any {
    const value: any = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    } else {
      return defaultValue || value
    }
  },

  /**
   * @description set passed value by passed key. if overwrite is false check whether there's existing value or not
   *
   * @param {string} key
   * @param {any} value
   * @param {boolean} overwrite
   */
  setItem(key: string, value: any, overwrite?: boolean): void {
    if (!value) throw new Error(ERROR_MESSAGES.EMPTY_VALUE_PASSED)
    if (!overwrite) {
      const value: any = this.getItem(key)
      if (value) throw new Error(ERROR_MESSAGES.VALUE_EXISTS)
    }

    localStorage.setItem(key, JSON.stringify(value))
  },
} as const
