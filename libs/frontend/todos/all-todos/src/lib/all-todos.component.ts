import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { Todo } from '@workspace/shared/data';
import { TodoFilterStatus } from '@workspace/shared/enums';
import { TodosFacade } from '@workspace/frontend/todos/data-access';
import { UiFilterTodosComponent } from './ui/filter-todos/ui-filter-todos.component';

// TODO  -> overflow scrolling of the list of todos

@Component({
  selector: 'todo-all-todos',
  templateUrl: './all-todos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTodosComponent implements OnInit {
  filteredTodo$: Observable<Todo[]>;
  todoFilter$: Observable<TodoFilterStatus>;

  @ViewChild(UiFilterTodosComponent, { static: true }) filter!: ElementRef<
    UiFilterTodosComponent
  >;

  public filterOptions = [
    { display: 'All', value: TodoFilterStatus.All },
    { display: 'Completed', value: TodoFilterStatus.Completed },
    { display: 'Incomplete', value: TodoFilterStatus.InCompleted }
  ];

  constructor(private facade: TodosFacade) {
    this.filteredTodo$ = this.facade.filteredTodo$;
    this.todoFilter$ = this.facade.allTodoFilter$;
  }

  ngOnInit() {
    this.facade.loadTodos();
  }

  searchStringChanged(string: string) {
    this.facade.searchStringChanged(string);
  }
  selectFilterChanged(event: MatSelectChange) {
    this.facade.statusChange(event.value);
  }

  update({ todo, completed }: { todo: Todo; completed: boolean }) {
    const updatedTodo: Todo = { ...todo, completed };
    this.facade.saveTodo(updatedTodo);
  }

  selectTodo(todo: Todo) {
    this.facade.selectTodo(todo.id);
  }

  deleteTodo(todo: Todo) {
    this.facade.deleteTodo(todo);
  }
}
