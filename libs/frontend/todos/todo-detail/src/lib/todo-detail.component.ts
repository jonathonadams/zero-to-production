import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Location } from '@angular/common';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { filter, withLatestFrom, map } from 'rxjs/operators';
import { ITodo } from '@ngw/shared/interfaces';
import { TodosFacade } from '@ngw/frontend/todos/data-access';
import {
  TFormGroups,
  FormFieldTypes,
  DynamicFormFacade,
  FormGroupTypes
} from '@ngw/frontend/data-access/dynamic-form';

const STRUCTURE: TFormGroups = [
  {
    formGroup: 'todo',
    groupType: FormGroupTypes.Group,
    fields: [
      {
        componentType: FormFieldTypes.Input,
        type: 'text',
        name: 'title',
        label: 'Title',
        validators: [Validators.required]
      },
      {
        componentType: FormFieldTypes.Input,
        type: 'text',
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
  public selectedTodo$: Observable<ITodo | undefined>;
  private subscription: Subscription;
  private submitSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private facade: TodosFacade,
    private location: Location,
    private formFacade: DynamicFormFacade
  ) {
    this.selectedTodo$ = this.facade.selectedTodo$;

    this.subscription = (this.selectedTodo$ as Observable<ITodo>)
      .pipe(filter(todo => todo !== undefined))
      .subscribe(todo => {
        this.formFacade.setData({ todo });
        this.updateTodoUrl(todo.id);
      });

    this.submitSubscription = this.formFacade.submit$
      .pipe(withLatestFrom(this.selectedTodo$))
      .subscribe(([{ todo }, selectedTodo]) => {
        const todoToSave = { ...selectedTodo, ...todo };
        this.facade.saveTodo(todoToSave);
        this.clearTodo();
      });

    this.subscription.add(
      combineLatest([
        this.route.paramMap.pipe(map(paramMap => paramMap.get('todoId'))),
        this.facade.todoIds$
      ]).subscribe(([id, ids]) => {
        if (id !== null && (ids as string[]).indexOf(id) !== -1) {
          this.facade.selectTodo(id);
        } else {
          this.facade.clearSelected();
          this.updateTodoUrl();
        }
      })
    );
  }

  ngOnInit() {
    this.formFacade.setFormConfig({ animations: true });
    this.formFacade.setStructure({ structure: STRUCTURE });
  }

  submit() {
    this.formFacade.submitForm();
  }

  clearTodo() {
    /**
     * Need to call resetForm() on the FormGroupDirective, not reset() on the formGroup.
     * Otherwise the validators do not get reset
     */
    // this.formDirective.formDirective.resetForm();
    this.formFacade.clearData();
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
    this.submitSubscription.unsubscribe();
  }
}
