import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ITodo } from '@workspace/shared/interfaces';

@Component({
  selector: 'todo-ui-todo-item',
  templateUrl: './ui-todo.component.html',
  styleUrls: ['./ui-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTodoItemComponent {
  @Input()
  todo!: ITodo;
  @Output()
  selected = new EventEmitter<ITodo>();
  @Output()
  delete = new EventEmitter<ITodo>();

  @Output()
  update = new EventEmitter<{
    todo: ITodo;
    completed: boolean;
  }>();

  toggleChange(todo: ITodo, change: MatSlideToggleChange) {
    this.update.emit({ todo, completed: change.checked });
  }
}
