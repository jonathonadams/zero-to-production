import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { UiTodoDetailComponent } from './ui/ui-todo-detail.component';
import { Todo } from '@workspace/shared/data';
import { TodosFacade } from '@workspace/frontend/todos/data-access';

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailComponent implements OnDestroy {
  //
  @ViewChild(UiTodoDetailComponent, { static: false })
  formDirective!: UiTodoDetailComponent;

  public todoForm: FormGroup;
  public selectedTodo$: Observable<Todo | undefined>;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: TodosFacade,
    private location: Location
  ) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false, Validators.required]
    });

    this.selectedTodo$ = this.facade.selectedTodo$;

    this.subscription = (this.selectedTodo$ as Observable<Todo>)
      .pipe(filter(todo => todo !== undefined))
      .subscribe(todo => {
        this.todoForm.reset(todo);
        this.updateTodoUrl(todo.id);
      });

    this.subscription.add(
      combineLatest(
        this.route.paramMap.pipe(map(paramMap => paramMap.get('id'))),
        this.facade.todoIds$
      ).subscribe(([id, ids]) => {
        if (id !== null && (ids as string[]).indexOf(id) !== -1) {
          this.facade.selectTodo(id);
        } else {
          this.facade.clearSelected();
          this.updateTodoUrl();
        }
      })
    );
  }

  onSubmit({ value, valid }: FormGroup) {
    if (valid) {
      this.selectedTodo$.pipe(take(1)).subscribe(selectedTodo => {
        const todoToSave = { ...selectedTodo, ...value };
        this.facade.saveTodo(todoToSave);
        this.clearTodo();
      });
    }
  }

  clearTodo() {
    /**
     * Need to call resetForm() on the FormGroupDirective, not reset() on the formGroup.
     * Otherwise the validators do not get reset
     */
    this.formDirective.formDirective.resetForm();
    this.facade.clearSelected();
    this.updateTodoUrl();
  }

  updateTodoUrl(id?: string) {
    if (id) {
      this.location.go(`/todos/${id}`);
    } else {
      this.location.go('/todos');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
