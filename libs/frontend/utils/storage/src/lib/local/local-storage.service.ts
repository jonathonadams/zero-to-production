import { Injectable } from '@angular/core';

/**
 * Handles all business logic relating to setting and getting local storage items
 *
 * @export
 * @class LocalStorageService
 */
@Injectable()
export class LocalStorageService {
  setItem(key: string, value: any): void {
    if (this.shouldValueBeStringified(value)) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }

  getItem<T>(key: string): T {
    const item: any = localStorage.getItem(key);
    if (this.shouldValueBeParsed) {
      return JSON.parse(item);
    } else {
      return item;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Check if the value should be stringified before storing in local storage
   *
   * @param {*} value The value to check
   * @returns {boolean}
   * @memberof LocalStorageService
   */
  shouldValueBeStringified(value: any): boolean {
    if (this.isValueNumberOrBoolean(value)) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Check if the value should be parsed before returning
   *
   * @param {*} value
   * @returns {boolean}
   * @memberof LocalStorageService
   */
  shouldValueBeParsed(value: any): boolean {
    if (this.isValueNumberOrBoolean(value)) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * The only values to be stringified/parsed are numbers and boolean.
   * Strings don't matter
   *
   * @param {*} value
   * @returns {boolean}
   * @memberof LocalStorageService
   */
  isValueNumberOrBoolean(value: any): boolean {
    return typeof value === 'number' || typeof value === 'boolean';
  }
}
