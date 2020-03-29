import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonDynamicFormModule } from '@ztp/common/dynamic-form';
import { CommonUiCardModule } from '@ztp/common/ui/card';
import { TodoDetailComponent } from './todo-detail.component';
import { UiTodoDetailComponent } from './ui/todo-detail/ui-todo-detail.component';
import { UiTodoNotesComponent } from './ui/todo-notes/ui-todo-notes.component';
import { UiCreateTodoNoteComponent } from './ui/create-todo-note/ui-create-todo-note.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    TodoDetailComponent,
    UiTodoDetailComponent,
    UiCreateTodoNoteComponent,
    UiTodoNotesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CommonUiCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonDynamicFormModule.forChild(),
  ],
  exports: [TodoDetailComponent],
})
export class TodosDetailModule {}
