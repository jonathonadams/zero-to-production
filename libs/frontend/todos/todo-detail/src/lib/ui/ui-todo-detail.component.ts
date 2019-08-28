import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { FormGroupDirective, FormGroup } from '@angular/forms';
import { ITodo } from '@ngw/shared/interfaces';

@Component({
  selector: 'todo-ui-todo-detail',
  templateUrl: './ui-todo-detail.component.html',
  styleUrls: ['./ui-todo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTodoDetailComponent {
  @Input() selectedTodo: ITodo | undefined;
  @Output()
  formSubmit = new EventEmitter<FormGroup>();
  @Output()
  cancelled = new EventEmitter<void>();
}
