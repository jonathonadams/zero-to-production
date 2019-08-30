import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SideNavState } from './side-nave.reducer';

export const selectSideNavState = createFeatureSelector<SideNavState>(
  'sideNavState'
);

export const selectOpenedState = createSelector(
  selectSideNavState,
  state => state.opened
);

export const selectSideNavRoutes = createSelector(
  selectSideNavState,
  state => state.routes
);
