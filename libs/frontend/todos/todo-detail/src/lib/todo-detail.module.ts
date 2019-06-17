import { NgModule } from '@angular/core';
import { TodoDetailComponent } from './todo-detail.component';
import { CommonModule } from '@angular/common';
import { UiTodoDetailComponent } from './ui/ui-todo-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TodoDetailComponent, UiTodoDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  exports: [TodoDetailComponent]
})
export class TodosDetailModule {}
