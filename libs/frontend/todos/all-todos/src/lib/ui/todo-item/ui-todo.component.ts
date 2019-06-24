import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Todo } from '@workspace/shared/data';

@Component({
  selector: 'todo-ui-todo-item',
  templateUrl: './ui-todo.component.html',
  styleUrls: ['./ui-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTodoItemComponent {
  @Input()
  todo!: Todo;
  @Output()
  selected = new EventEmitter<Todo>();
  @Output()
  delete = new EventEmitter<Todo>();

  @Output()
  update = new EventEmitter<{
    todo: Todo;
    completed: boolean;
  }>();

  toggleChange(todo: Todo, change: MatSlideToggleChange) {
    this.update.emit({ todo, completed: change.checked });
  }
}
