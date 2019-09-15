import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { SideNavFacade } from '@ngw/common/ui/side-nav';
import { ISideNaveRoute } from '@ngw/types';

@Component({
  selector: 'todo-feature-shell',
  templateUrl: './todos-feature-shell.component.html',
  styleUrls: ['./todos-feature-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFeatureShellComponent implements OnInit {
  constructor(private facade: SideNavFacade) {}

  routes: ISideNaveRoute[] = [
    { path: '/home', icon: 'home', label: 'Home' },
    { path: '/todos', icon: 'list', label: 'Todos' },
    { path: '/examples', icon: 'list', label: 'Examples' }
  ];

  ngOnInit() {
    this.facade.setNavRoutes(this.routes);
  }

  navToggle() {
    this.facade.toggle();
  }
}
