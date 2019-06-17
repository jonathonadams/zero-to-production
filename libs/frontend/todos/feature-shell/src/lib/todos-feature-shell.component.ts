import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonUiSideNavService } from '@workspace/frontend/common/ui/side-nav';
import { ISideNaveLink } from '@workspace/shared/data';

@Component({
  selector: 'todo-feature-shell',
  templateUrl: './todos-feature-shell.component.html',
  styleUrls: ['./todos-feature-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFeatureShellComponent {
  constructor(private sideNavService: CommonUiSideNavService) {}

  navLinks: ISideNaveLink[] = [
    { path: '/home', icon: 'home', label: 'Home' },
    { path: '/todos', icon: 'list', label: 'Todos' }
  ];

  navToggle() {
    this.sideNavService.toggle();
  }
}
