import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiLayoutsModule } from '@ztp/common/ui/layouts';
import { CommonUiCardModule } from '@ztp/common/ui/card';
import { AllTodosComponent } from './all-todos.component';
import { UiTodoListComponent } from './ui/todo-list/ui-todo-list.component';
import { UiFilterTodosComponent } from './ui/filter-todos/ui-filter-todos.component';
import { UiCreateTodoComponent } from './ui/create-todo/ui-create-todo.component';
import { CommonDynamicFormModule } from '@ztp/common/dynamic-form';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

const COMPONENTS = [
  AllTodosComponent,
  UiTodoListComponent,
  UiFilterTodosComponent,
  UiCreateTodoComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    CommonUiLayoutsModule,
    CommonUiCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    CommonDynamicFormModule.forChild(),
  ],
  exports: [AllTodosComponent],
})
export class AllTodosModule {}
