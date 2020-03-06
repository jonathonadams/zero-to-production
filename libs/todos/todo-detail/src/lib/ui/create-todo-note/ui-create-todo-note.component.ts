import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'todo-ui-create-todo-note',
  templateUrl: './ui-create-todo-note.component.html',
  styleUrls: ['./ui-create-todo-note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiCreateTodoNoteComponent {
  text = '';
  @Output() createNote = new EventEmitter<string>();
}
