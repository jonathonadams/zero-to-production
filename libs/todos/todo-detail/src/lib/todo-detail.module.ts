import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonDynamicFormModule } from '@uqt/common/dynamic-form';
import { CommonUiCardModule } from '@uqt/common/ui/card';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { TodoDetailComponent } from './todo-detail.component';
import { UiTodoDetailComponent } from './ui/todo-detail/ui-todo-detail.component';
import { UiTodoNotesComponent } from './ui/todo-notes/ui-todo-notes.component';
import { UiCreateTodoNoteComponent } from './ui/create-todo-note/ui-create-todo-note.component';

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
    CustomMaterialModule,
    CommonDynamicFormModule.forChild(),
  ],
  exports: [TodoDetailComponent],
})
export class TodosDetailModule {}
