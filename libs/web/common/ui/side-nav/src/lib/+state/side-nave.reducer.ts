import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from './side-nav.actions';
import { ISideNaveRoute } from '../navigation.interface';

export const sideNaveKey = 'sideNavKey';

export interface SideNavState {
  opened: boolean;
  routes: ISideNaveRoute[];
}

export const initialState: SideNavState = {
  opened: false,
  routes: []
};

export const sideNaveReducer = createReducer(
  initialState,
  on(fromActions.openSideNav, state => {
    return { ...state, opened: true };
  }),
  on(fromActions.closeSideNav, state => {
    return { ...state, opened: false };
  }),
  on(fromActions.toggleSideNav, state => {
    return { ...state, opened: !state.opened };
  }),
  on(fromActions.setSideNavOpenValue, (state, { opened }) => {
    return { ...state, opened };
  }),
  on(fromActions.setSideNavRoutes, (state, { routes }) => {
    return { ...state, routes };
  })
);

export function reducer(state: SideNavState | undefined, actions: Action) {
  return sideNaveReducer(state, actions);
}
