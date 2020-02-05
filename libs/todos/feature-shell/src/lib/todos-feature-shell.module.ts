import { NgModule } from '@angular/core';
import { TodosDataAccessModule } from '@uqt/todos/data-access';
import { AllTodosModule } from '@uqt/todos/all-todos';
import { TodosDetailModule } from '@uqt/todos/todo-detail';
import { CommonToolbarMenuModule } from '@uqt/shared/toolbar-menu';
import { CommonUiToolbarModule } from '@uqt/common/ui/toolbar';
import { CommonUiSideNavModule } from '@uqt/common/ui/side-nav';
import { CommonUiLayoutsModule } from '@uqt/common/ui/layouts';
import { CommonDynamicFormModule } from '@uqt/common/dynamic-form';
import { TodosFeatureShellRoutingModule } from './todos-feature-shell-routing.module';
import { TodoFeatureShellComponent } from './todos-feature-shell.component';
import { TodoLayoutComponent } from './ui/todos-layout.component';
import { SharedAuthComponentsModule } from '@uqt/shared/auth/components';

@NgModule({
  declarations: [TodoFeatureShellComponent, TodoLayoutComponent],
  imports: [
    TodosDataAccessModule,
    AllTodosModule,
    TodosDetailModule,
    CommonDynamicFormModule.forChild(),
    CommonUiSideNavModule,
    CommonUiToolbarModule,
    TodosFeatureShellRoutingModule,
    CommonToolbarMenuModule,
    CommonUiLayoutsModule,
    SharedAuthComponentsModule
  ]
})
export class TodosFeatureShellModule {}
