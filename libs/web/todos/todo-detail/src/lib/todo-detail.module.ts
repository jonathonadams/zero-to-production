import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { TodoDetailComponent } from './todo-detail.component';
import { UiTodoDetailComponent } from './ui/ui-todo-detail.component';
import { DataAccessDynamicFormModule } from '@uqt/data-access/dynamic-form';

@NgModule({
  declarations: [TodoDetailComponent, UiTodoDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    DataAccessDynamicFormModule
  ],
  exports: [TodoDetailComponent]
})
export class TodosDetailModule {}
