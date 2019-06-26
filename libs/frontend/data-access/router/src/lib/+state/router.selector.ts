import { Params } from '@angular/router';
import { createFeatureSelector } from '@ngrx/store';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  data: any;
}

export const selectRouter = createFeatureSelector<
  any,
  RouterReducerState<RouterStateUrl>
>('router');

export const {
  selectQueryParams, // select the current route query params
  selectRouteParams, // select the current route params
  selectRouteData, // select the current route data
  selectUrl // select the current url
} = getSelectors(selectRouter);
