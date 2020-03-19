import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'todo-ui-create-todo',
  templateUrl: './ui-create-todo.component.html',
  styleUrls: ['./ui-create-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiCreateTodoComponent {
  @Input() formName: string;
}
