import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ITodo } from '@uqt/data';

@Component({
  selector: 'todo-ui-todo-detail',
  templateUrl: './ui-todo-detail.component.html',
  styleUrls: ['./ui-todo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTodoDetailComponent {
  enabled = false;
  @Input() todo: ITodo;
  @Input() formName: string;
  @Output() toggleEdit = new EventEmitter<boolean>();
}
