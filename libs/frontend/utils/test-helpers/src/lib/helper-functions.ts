import { defer } from 'rxjs';
import { Store } from '@ngrx/store';
import { DebugElement } from '@angular/core';

/** Create async observable that emits-once and completes
 *  after a JS engine turn */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

/** Create async observable error that errors
 *  after a JS engine turn */
export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

export const createSpyObj = (baseName, methodNames): { [key: string]: any } => {
  const obj: any = {};

  for (let i = 0; i < methodNames.length; i++) {
    obj[methodNames[i]] = jest.fn();
  }

  return obj;
};

/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
export const ButtonClickEvents = {
  left: { button: 0 },
  right: { button: 2 }
};

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(
  el: DebugElement | HTMLElement,
  eventObj: any = ButtonClickEvents.left
): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}

export const storeStub = {
  dispatch: jest.fn(),
  select: jest.fn(),
  pipe: jest.fn()
};

export const authServiceStub = {
  userIsLoggedIn: jest.fn(),
  userIsAdmin: jest.fn(),
  getDecodedToken: jest.fn()
};
