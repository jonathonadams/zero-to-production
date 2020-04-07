import { NgModule } from '@angular/core';
import { TodosDataAccessModule } from '@ztp/todos/data-access';
import { AllTodosModule } from '@ztp/todos/all-todos';
import { TodosDetailModule } from '@ztp/todos/todo-detail';
import { CommonToolbarMenuModule } from '@ztp/common/toolbar-menu';
import { CommonUiToolbarModule } from '@ztp/common/ui/toolbar';
import { CommonUiSideNavModule } from '@ztp/common/side-nav';
import { CommonUiLayoutsModule } from '@ztp/common/ui/layouts';
import { CommonDynamicFormModule } from '@ztp/common/dynamic-form';
import { TodosFeatureShellRoutingModule } from './todos-feature-shell-routing.module';
import { TodoFeatureShellComponent } from './todos-feature-shell.component';
import { CommonAuthComponentsModule } from '@ztp/common/auth/components';
import { CommonUtilsNotificationModule } from '@ztp/common/utils/notifications';

@NgModule({
  declarations: [TodoFeatureShellComponent],
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
    CommonAuthComponentsModule,
    CommonUtilsNotificationModule,
  ],
})
export class TodosFeatureShellModule {}
