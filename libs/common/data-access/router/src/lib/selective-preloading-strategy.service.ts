import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // load if the route has data: { preload: true}
    if (route.data && route.data['preload']) {
      return load();
    } else {
      return of(null);
    }
  }
}
