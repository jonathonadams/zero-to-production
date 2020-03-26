import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ITodo, ITodoNote } from '@uqt/data';
import { TodosFacade, TodosService } from '@uqt/todos/data-access';
import {
  DynamicFormFacade,
  TFormStructure,
  FormGroupTypes,
  FormFieldTypes,
} from '@uqt/common/dynamic-form';

const STRUCTURE: TFormStructure = [
  {
    groupName: 'todo',
    groupType: FormGroupTypes.Group,
    fields: [
      {
        type: FormFieldTypes.Input,
        name: 'title',
        label: 'Title',
        validators: [Validators.required],
      },
      {
        type: FormFieldTypes.Input,
        name: 'description',
        label: 'Description',
        validators: [Validators.required],
      },
      {
        type: FormFieldTypes.DatePicker,
        name: 'dueDate',
        label: 'Due Date',
      },
    ],
  },
];

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDetailComponent implements OnInit, OnDestroy {
  readonly formName = 'todo-detail';
  public todo: ITodo;
  private sub: Subscription;

  notes$: Observable<ITodoNote[]>;

  constructor(
    private facade: TodosFacade,
    private service: TodosService,
    private formFacade: DynamicFormFacade
  ) {
    // This route is protected by a route resolver
    // It is guaranteed that the a todo has been selected.
    // You could access the data from the Activated Route, however
    // you  need to inject the TodosFacade anyway
    // The below operation is synchronous and guaranteed
    // to have set the 'todo' before anything else runs
    (this.facade.selectedTodo$ as Observable<ITodo>).subscribe(
      (todo) => (this.todo = todo)
    );

    this.notes$ = this.service.allTodoNotesQueryRef(this.todo.id);

    this.formFacade.createFormIfNotExist(this.formName);
  }

  ngOnInit() {
    this.formFacade.setFormConfig(this.formName, {
      animations: true,
      structure: STRUCTURE,
      enabled: false,
    });

    this.formFacade.setData(this.formName, { todo: this.todo });

    this.sub = this.formFacade
      .formSubmits$(this.formName)
      .subscribe(({ todo }) => {
        // all field might not be present in the form
        // only add the id field to the submitted value
        const todoToSave = { ...todo, id: this.todo.id };
        this.facade.updateTodo(todoToSave);
      });
  }

  createTodoNote(value: string) {
    if (value !== '') {
      this.facade.createTodoNote(value);
    }
  }

  deleteTodoNote(id: string) {
    this.facade.deleteTodoNote(id);
  }

  toggleEdit(enabled: boolean) {
    this.formFacade.setFormConfig(this.formName, { enabled });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
