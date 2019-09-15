import { Params } from '@angular/router';
import { createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  data: any;
}

export const selectRouter = createFeatureSelector<
  any,
  fromRouter.RouterReducerState<any>
>('router');

export const {
  selectQueryParams, // select the current route query params
  // selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  // selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl // select the current url
} = fromRouter.getSelectors(selectRouter);

// export const selectRouteId = selectRouteParam('id');
// export const selectStatus = selectQueryParam('status');
