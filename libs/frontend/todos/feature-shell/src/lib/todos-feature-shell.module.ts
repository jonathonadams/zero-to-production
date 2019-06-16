import { NgModule } from '@angular/core';
import { CommonUiToolbarModule } from '@workspace/frontend/common/ui/toolbar';
import { CommonUiSideNavModule } from '@workspace/frontend/common/ui/side-nav';

import { TodosFeatureShellRoutingModule } from './todos-feature-shell-routing.module';
import { TodoFeatureShellComponent } from './todos-feature-shell.component';

@NgModule({
  declarations: [TodoFeatureShellComponent],
  imports: [
    CommonUiSideNavModule,
    CommonUiToolbarModule,
    TodosFeatureShellRoutingModule
  ]
})
export class TodosFeatureShellModule {}
