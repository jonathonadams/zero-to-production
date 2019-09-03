import { NgModule } from '@angular/core';
import { TodosDataAccessModule } from '@ngw/frontend/todos/data-access';
import { AllTodosModule } from '@ngw/frontend/todos/all-todos';
import { TodosDetailModule } from '@ngw/frontend/todos/todo-detail';
import { SharedFloatingMenuModule } from '@ngw/frontend/shared/floating-menu';
import { CommonUiToolbarModule } from '@ngw/frontend/common/ui/toolbar';
import { CommonUiSideNavModule } from '@ngw/frontend/common/ui/side-nav';
import { CommonUiLayoutsModule } from '@ngw/frontend/common/ui/layouts';
import { DataAccessDynamicFormModule } from '@ngw/frontend/data-access/dynamic-form';
import { TodosFeatureShellRoutingModule } from './todos-feature-shell-routing.module';
import { TodoFeatureShellComponent } from './todos-feature-shell.component';
import { TodoLayoutComponent } from './ui/todos-layout.component';

@NgModule({
  declarations: [TodoFeatureShellComponent, TodoLayoutComponent],
  imports: [
    TodosDataAccessModule,
    AllTodosModule,
    TodosDetailModule,
    DataAccessDynamicFormModule,
    CommonUiSideNavModule,
    CommonUiToolbarModule,
    TodosFeatureShellRoutingModule,
    SharedFloatingMenuModule,
    CommonUiLayoutsModule
  ]
})
export class TodosFeatureShellModule {}
