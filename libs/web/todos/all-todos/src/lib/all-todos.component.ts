import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { ITodo } from '@ngw/types';
import { TodoFilterStatus } from '@ngw/enums';
import { TodosFacade } from '@ngw/todos/data-access';
import { UiFilterTodosComponent } from './ui/filter-todos/ui-filter-todos.component';

@Component({
  selector: 'todo-all-todos',
  templateUrl: './all-todos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTodosComponent implements OnInit {
  filteredTodo$: Observable<ITodo[]>;
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

  update({ todo, completed }: { todo: ITodo; completed: boolean }) {
    const updatedTodo: ITodo = { ...todo, completed };
    this.facade.saveTodo(updatedTodo);
  }

  selectTodo(todo: ITodo) {
    this.facade.selectTodo(todo.id);
  }

  deleteTodo(todo: ITodo) {
    this.facade.deleteTodo(todo);
  }
}
