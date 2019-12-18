import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ITodo } from '@uqt/api/core-data';
import { LIST_ANIMATION } from './todo-list.animation';

@Component({
  selector: 'todo-ui-todo-list',
  templateUrl: './ui-todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [LIST_ANIMATION]
})
export class UiTodoListComponent {
  @Input()
  todos: ITodo[] | null | undefined;
  @Output()
  selected = new EventEmitter<ITodo>();
  @Output()
  delete = new EventEmitter<ITodo>();

  @Output()
  update = new EventEmitter<{
    todo: ITodo;
    completed: boolean;
  }>();

  toggleChange(todo: ITodo, change: MatCheckboxChange) {
    this.update.emit({ todo, completed: change.checked });
  }

  trackTodos(index: number, todo: ITodo) {
    return todo.id;
  }

  prepareListState() {
    return this.todos ? this.todos.length : 'pending';
  }
}
