import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonUiSideNavService } from '@workspace/frontend/common/ui/side-nav';
import { ISideNaveLink } from '@workspace/shared/data';
import { ToolbarService } from '@workspace/frontend/common/ui/toolbar';

@Component({
  selector: 'todo-feature-shell',
  templateUrl: './todos-feature-shell.component.html',
  styleUrls: ['./todos-feature-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFeatureShellComponent {
  constructor(
    private sideNavService: CommonUiSideNavService,
    private toolbarService: ToolbarService
  ) {
    this.sideNavService.lastScrollDown$.subscribe(down => {
      this.toolbarService.show = !down;
    });
  }

  navLinks: ISideNaveLink[] = [
    { path: '/home', icon: 'home', label: 'Home' },
    { path: '/todos', icon: 'list', label: 'Todos' }
  ];

  navToggle() {
    this.sideNavService.toggle();
  }
}
