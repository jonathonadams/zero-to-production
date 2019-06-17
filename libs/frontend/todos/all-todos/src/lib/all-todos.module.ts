import { NgModule } from '@angular/core';
import { AllTodosComponent } from './all-todos.component';
import { CommonModule } from '@angular/common';
import { UiTodoItemComponent } from './ui/todo-item/ui-todo.component';
import { UiFilterTodosComponent } from './ui/filter-todos/ui-filter-todos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

const COMPONENTS = [
  AllTodosComponent,
  UiTodoItemComponent,
  UiFilterTodosComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [AllTodosComponent]
})
export class AllTodosModule {}
