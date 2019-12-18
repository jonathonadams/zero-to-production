import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromActions from './side-nav.actions';
import * as fromSelectors from './side-nav.selectors';
import { ISideNaveRoute } from '../navigation.interface';

@Injectable()
export class SideNavFacade {
  opened$: Observable<boolean>;
  route$: Observable<ISideNaveRoute[]>;

  constructor(private store: Store<any>) {
    this.opened$ = this.store.pipe(select(fromSelectors.selectOpenedState));
    this.route$ = this.store.pipe(select(fromSelectors.selectSideNavRoutes));
  }

  toggle() {
    this.store.dispatch(fromActions.toggleSideNav());
  }

  open() {
    this.store.dispatch(fromActions.openSideNav());
  }

  close() {
    this.store.dispatch(fromActions.closeSideNav());
  }

  setValue(opened: boolean) {
    this.store.dispatch(fromActions.setSideNavOpenValue({ opened }));
  }

  setNavRoutes(routes: ISideNaveRoute[]) {
    this.store.dispatch(fromActions.setSideNavRoutes({ routes }));
  }
}
