import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { ITodoNote } from '@uqt/data';

@Component({
  selector: 'todo-ui-todo-notes',
  templateUrl: './ui-todo-notes.component.html',
  styleUrls: ['./ui-todo-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTodoNotesComponent {
  displayedColumns: string[] = ['date', 'body', 'delete'];
  @Input() notes: ITodoNote[] | null;
  @Output() delete = new EventEmitter<string>();
}
