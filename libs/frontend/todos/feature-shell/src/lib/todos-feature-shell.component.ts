import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonUiSideNavService } from '@workspace/frontend/common/ui/side-nav';

@Component({
  selector: 'todo-feature-shell',
  templateUrl: './todos-feature-shell.component.html',
  styleUrls: ['./todos-feature-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFeatureShellComponent {
  constructor(private sideNavService: CommonUiSideNavService) {}

  navToggle() {
    this.sideNavService.toggle();
  }
}
