import { createAction, props } from '@ngrx/store';
import { ISideNaveRoute } from '@ngw/types';

export const openSideNav = createAction('[UI/SideNav] Open');
export const closeSideNav = createAction('[UI/SideNav] Close');
export const toggleSideNav = createAction('[UI/SideNav] Toggle');
export const setSideNavOpenValue = createAction(
  '[UI/SideNav] Set Value',
  props<{ opened: boolean }>()
);

export const setSideNavRoutes = createAction(
  '[UI/SideNav] Set Routes',
  props<{ routes: ISideNaveRoute[] }>()
);
