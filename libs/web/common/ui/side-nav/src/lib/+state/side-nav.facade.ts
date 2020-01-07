import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as SideNavActions from './side-nav.actions';
import * as fromSideNav from './side-nav.selectors';
import { ISideNaveRoute } from '../navigation.interface';

@Injectable({ providedIn: 'root' })
export class SideNavFacade {
  opened$: Observable<boolean>;
  route$: Observable<ISideNaveRoute[]>;

  constructor(private store: Store<any>) {
    this.opened$ = this.store.pipe(select(fromSideNav.selectOpenedState));
    this.route$ = this.store.pipe(select(fromSideNav.selectSideNavRoutes));
  }

  toggle() {
    this.store.dispatch(SideNavActions.toggleSideNav());
  }

  open() {
    this.store.dispatch(SideNavActions.openSideNav());
  }

  close() {
    this.store.dispatch(SideNavActions.closeSideNav());
  }

  setValue(opened: boolean) {
    this.store.dispatch(SideNavActions.setSideNavOpenValue({ opened }));
  }

  setNavRoutes(routes: ISideNaveRoute[]) {
    this.store.dispatch(SideNavActions.setSideNavRoutes({ routes }));
  }
}
