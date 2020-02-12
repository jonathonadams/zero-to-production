import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { SideNavFacade, ISideNaveRoute } from '@uqt/common/ui/side-nav';

@Component({
  selector: 'todo-feature-shell',
  templateUrl: './todos-feature-shell.component.html',
  styleUrls: ['./todos-feature-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFeatureShellComponent implements OnInit {
  constructor(private facade: SideNavFacade) {}

  /*
   * UQT_UPDATE -> Use absolute routes when you build the Todo application by itself.
   * Currently a bug where if the relative route matches on a an empty path at the root
   * level the router serialization does not work correctly
   *
   * https://github.com/angular/angular/issues/13011
   */
  // DELETE
  routes: ISideNaveRoute[] = [
    { path: 'home', icon: 'home', label: 'Home' },
    { path: 'todos', icon: 'list', label: 'Todos' }
  ];

  // UNCOMMENT
  // routes: ISideNaveRoute[] = [
  //   { path: '/home', icon: 'home', label: 'Home' },
  //   { path: '/todos', icon: 'list', label: 'Todos' }
  // ];

  ngOnInit() {
    this.facade.setNavRoutes(this.routes);
  }

  menuToggle() {
    this.facade.toggle();
  }
}
