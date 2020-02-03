import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable, Subject, combineLatest } from 'rxjs';
import { filter, withLatestFrom, takeUntil, first, skip } from 'rxjs/operators';
import { ITodo } from '@uqt/data';
import { TodosFacade } from '@uqt/todos/data-access';
import {
  DynamicFormFacade,
  TFormGroups,
  FormGroupTypes,
  FormFieldTypes
} from '@uqt/common/dynamic-form';
import { RouterFacade } from '@uqt/shared/data-access/router';

const STRUCTURE: TFormGroups = [
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
      }
    ]
  }
];

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailComponent implements OnInit, OnDestroy {
  readonly formName = 'todo-detail';
  public selectedTodo$: Observable<ITodo | undefined>;
  private unsubscribe = new Subject();

  constructor(
    private facade: TodosFacade,
    private formFacade: DynamicFormFacade,
    private routerFacade: RouterFacade
  ) {
    this.selectedTodo$ = this.facade.selectedTodo$;

    (this.selectedTodo$ as Observable<ITodo>)
      .pipe(
        filter(todo => todo !== undefined),
        takeUntil(this.unsubscribe)
      )
      .subscribe(todo => {
        this.formFacade.setData(this.formName, { todo });
        this.updateTodoUrl(todo.id);
      });

    this.formFacade.createFormIfNotExist(this.formName);

    // TODO -> move this to a resolver?
    combineLatest([
      this.routerFacade.selectParam('todoId') as Observable<string>,
      this.selectedTodo$,
      this.facade.todoIds$.pipe(skip(1)) // Skip first because ngrx initial state is an empty array
    ])
      .pipe(
        first(), // After the first emit, complete
        filter(([id, todo]) => id !== undefined || !todo || id !== todo.id)
      )
      .subscribe(([id, todo, ids]) => {
        if (ids.indexOf(id) !== -1) {
          this.facade.selectTodo(id);
        } else {
          this.facade.clearSelected();
          this.updateTodoUrl();
        }
      });
  }

  ngOnInit() {
    this.formFacade
      .formSubmits$(this.formName)
      .pipe(withLatestFrom(this.selectedTodo$), takeUntil(this.unsubscribe))
      .subscribe(([{ todo }, selectedTodo]) => {
        const todoToSave = { ...selectedTodo, ...todo };
        this.facade.saveTodo(todoToSave);
        this.clearTodo();
      });

    this.formFacade.setFormConfig(this.formName, {
      animations: true,
      structure: STRUCTURE
    });
  }

  clearTodo() {
    this.facade.clearSelected();
    this.updateTodoUrl();
  }

  updateTodoUrl(id?: string) {
    const url = id ? `/todos/${id}` : '/todos';
    // this.routerFacade.updateUrl(url);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
