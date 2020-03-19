import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Subscription, Observable } from 'rxjs';
import { ITodo } from '@uqt/data';
import {
  DynamicFormFacade,
  TFormStructure,
  FormGroupTypes,
  FormFieldTypes
} from '@uqt/common/dynamic-form';
import { TodosFacade, TodoFilterStatus } from '@uqt/todos/data-access';
import { UiFilterTodosComponent } from './ui/filter-todos/ui-filter-todos.component';
import { Router, ActivatedRoute } from '@angular/router';

const STRUCTURE: TFormStructure = [
  {
    groupName: 'todo',
    groupType: FormGroupTypes.Group,
    fields: [
      {
        type: FormFieldTypes.Input,
        name: 'title',
        label: 'Title',
        validators: [Validators.required]
      },
      {
        type: FormFieldTypes.Input,
        name: 'description',
        label: 'Description',
        validators: [Validators.required]
      },
      {
        type: FormFieldTypes.DatePicker,
        name: 'dueDate',
        label: 'Due Date'
      }
    ]
  }
];

@Component({
  selector: 'todo-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTodosComponent implements OnInit, OnDestroy {
  readonly formName = 'create-todo';
  filteredTodo$: Observable<ITodo[]>;
  todoFilter$: Observable<TodoFilterStatus>;

  private sub: Subscription;

  filterOptions = [
    { display: 'All', value: TodoFilterStatus.All },
    { display: 'Completed', value: TodoFilterStatus.Completed },
    { display: 'Incomplete', value: TodoFilterStatus.InCompleted }
  ];

  @ViewChild(UiFilterTodosComponent, { static: true }) filter!: ElementRef<
    UiFilterTodosComponent
  >;

  constructor(
    private facade: TodosFacade,
    private formFacade: DynamicFormFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.filteredTodo$ = this.facade.filteredTodo$;
    this.todoFilter$ = this.facade.allTodoFilter$;

    this.formFacade.createFormIfNotExist(this.formName);

    this.sub = this.formFacade
      .formSubmits$(this.formName)
      .subscribe(({ todo }) => {
        this.facade.createTodo(todo);
      });
  }

  ngOnInit() {
    this.facade.loadTodos();

    this.formFacade.setFormConfig(this.formName, {
      animations: true,
      structure: STRUCTURE
    });
  }

  searchStringChanged(string: string) {
    this.facade.searchStringChanged(string);
  }

  selectFilterChanged(event: MatSelectChange) {
    this.facade.statusChange(event.value);
  }

  update({ todo, completed }: { todo: ITodo; completed: boolean }) {
    const updatedTodo: ITodo = { ...todo, completed };
    this.facade.updateTodo(updatedTodo);
  }

  selectTodo(todo: ITodo) {
    this.router.navigate([todo.id], { relativeTo: this.route });
  }

  deleteTodo(todo: ITodo) {
    this.facade.deleteTodo(todo);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
