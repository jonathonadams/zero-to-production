// import * as ngrx from '@ngrx/store';
// import { Observable } from 'rxjs';

// export class MockStore<StateType extends RootState = RootState> extends BehaviorSubject<StateType> {
//   private selectorsToValues: Map<(...args: any[]) => any, any> = new Map();

//   public dispatch = jest.fn();

//   constructor(initialState: StateType = null, private returnNullForUnhandledSelectors = true) {
//     super(initialState);

//     spyOnProperty(ngrx, 'select').and.callFake(_ => {
//       return selector => {
//         let obs$: Observable<any>;

//         if (this.selectorsToValues.has(selector)) {
//           const value = this.selectorsToValues.get(selector);

//           obs$ = value instanceof Observable ? value : this.pipe(map(() => value));
//         }

//         obs$ = this.pipe(
//           map(() => (this.returnNullForUnhandledSelectors ? null : selector(this.getValue())))
//         );

//         return () => obs$.pipe(distinctUntilChanged());
//       };
//     });
//   }

//   addSelectorStub<T>(cb: (...args: any[]) => T, mockedValue: T | Observable<T>): this {
//     this.selectorsToValues.set(cb, mockedValue);
//     return this;
//   }

//   setState(state: StateType): this {
//     this.next(state);
//     return this;
//   }

//   setReturnNullForUnandledSelectors(value: boolean): this {
//     this.returnNullForUnhandledSelectors = value;
//     return this;
//   }
// }
