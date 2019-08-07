import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SideNavService } from '@ngw/frontend/common/ui/side-nav';
import { ISideNaveLink } from '@ngw/shared/interfaces';
import { ToolbarService } from '@ngw/frontend/common/ui/toolbar';
import { UserThemeService } from '@ngw/frontend/data-access/users';

@Component({
  selector: 'todo-feature-shell',
  templateUrl: './todos-feature-shell.component.html',
  styleUrls: ['./todos-feature-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFeatureShellComponent {
  constructor(
    private theme: UserThemeService,
    private sideNavService: SideNavService,
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
