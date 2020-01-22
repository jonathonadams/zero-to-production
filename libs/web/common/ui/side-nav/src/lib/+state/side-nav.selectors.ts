import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSidNav from './side-nave.reducer';

export const selectSideNavState = createFeatureSelector<
  fromSidNav.SideNavState
>(fromSidNav.sideNaveKey);

export const selectOpenedState = createSelector(
  selectSideNavState,
  state => state.opened
);

export const selectSideNavRoutes = createSelector(
  selectSideNavState,
  state => state.routes
);
