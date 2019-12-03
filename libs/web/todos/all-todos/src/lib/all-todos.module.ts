import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { AllTodosComponent } from './all-todos.component';
import { UiTodoListComponent } from './ui/todo-list/ui-todo-list.component';
import { UiFilterTodosComponent } from './ui/filter-todos/ui-filter-todos.component';

const COMPONENTS = [
  AllTodosComponent,
  UiTodoListComponent,
  UiFilterTodosComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, CustomMaterialModule],
  exports: [AllTodosComponent]
})
export class AllTodosModule {}
