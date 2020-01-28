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
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item: string | null = localStorage.getItem(key);
    return item !== null ? (JSON.parse(item) as T) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
