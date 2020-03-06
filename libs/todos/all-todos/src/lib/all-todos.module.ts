import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiLayoutsModule } from '@uqt/common/ui/layouts';
import { CommonUiCardModule } from '@uqt/common/ui/card';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { AllTodosComponent } from './all-todos.component';
import { UiTodoListComponent } from './ui/todo-list/ui-todo-list.component';
import { UiFilterTodosComponent } from './ui/filter-todos/ui-filter-todos.component';
import { UiCreateTodoComponent } from './ui/create-todo/ui-create-todo.component';
import { CommonDynamicFormModule } from '@uqt/common/dynamic-form';

const COMPONENTS = [
  AllTodosComponent,
  UiTodoListComponent,
  UiFilterTodosComponent,
  UiCreateTodoComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    CommonUiLayoutsModule,
    CommonUiCardModule,
    CustomMaterialModule,
    CommonDynamicFormModule.forChild()
  ],
  exports: [AllTodosComponent]
})
export class AllTodosModule {}
