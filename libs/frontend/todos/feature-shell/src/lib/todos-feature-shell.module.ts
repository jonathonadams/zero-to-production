import { NgModule } from '@angular/core';
import { CommonUiToolbarModule } from '@workspace/frontend/common/ui/toolbar';
import { CommonUiSideNavModule } from '@workspace/frontend/common/ui/side-nav';
import { TodosDataAccessModule } from '@workspace/frontend/todos/data-access';
import { AllTodosModule } from '@workspace/frontend/todos/all-todos';
import { TodosDetailModule } from '@workspace/frontend/todos/todo-detail';
import { DataAccessFloatingMenuModule } from '@workspace/frontend/data-access/floating-menu';
import { CommonThemeModule } from '@workspace/frontend/common/theme';
import { TodosFeatureShellRoutingModule } from './todos-feature-shell-routing.module';
import { TodoFeatureShellComponent } from './todos-feature-shell.component';
import { TodoLayoutComponent } from './todos-layout.component';

@NgModule({
  declarations: [TodoFeatureShellComponent, TodoLayoutComponent],
  imports: [
    TodosDataAccessModule,
    AllTodosModule,
    TodosDetailModule,
    CommonUiSideNavModule,
    CommonUiToolbarModule,
    TodosFeatureShellRoutingModule,
    DataAccessFloatingMenuModule,
    CommonThemeModule
  ]
})
export class TodosFeatureShellModule {}
