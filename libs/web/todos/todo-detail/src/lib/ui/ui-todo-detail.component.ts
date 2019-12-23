import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { ITodo } from '@uqt/interfaces';

@Component({
  selector: 'todo-ui-todo-detail',
  templateUrl: './ui-todo-detail.component.html',
  styleUrls: ['./ui-todo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTodoDetailComponent {
  @Input() formName: string;
  @Input() selectedTodo: ITodo | null | undefined;
  @Output()
  cancelled = new EventEmitter<void>();
}
