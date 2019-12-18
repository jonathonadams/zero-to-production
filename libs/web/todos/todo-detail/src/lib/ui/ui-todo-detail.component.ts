import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITodo } from '@uqt/api/core-data';

@Component({
  selector: 'todo-ui-todo-detail',
  templateUrl: './ui-todo-detail.component.html',
  styleUrls: ['./ui-todo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTodoDetailComponent {
  @Input() selectedTodo: ITodo | null | undefined;
  @Output()
  formSubmit = new EventEmitter<FormGroup>();
  @Output()
  cancelled = new EventEmitter<void>();
}
