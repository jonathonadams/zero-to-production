import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  selectQueryParams,
  selectRouteParams,
  selectRouteParam,
  selectQueryParam,
  selectRouteData,
  selectUrl,
} from './router.selector';

@Injectable({ providedIn: 'root' })
export class RouterFacade {
  queryParams$: Observable<Params>;
  routerParams$: Observable<Params>;
  routerData$: Observable<any>;
  url$: Observable<string>;

  constructor(private store: Store<any>) {
    this.queryParams$ = this.store.pipe(select(selectQueryParams));
    this.routerParams$ = this.store.pipe(select(selectRouteParams));
    this.routerData$ = this.store.pipe(select(selectRouteData));
    this.url$ = this.store.pipe(select(selectUrl));
  }

  selectParam(param: string): Observable<string | undefined> {
    return this.store.pipe(select(selectRouteParam(param)));
  }

  selectQueryParam(param: string): Observable<string | undefined> {
    return this.store.pipe(select(selectQueryParam(param)));
  }
}
