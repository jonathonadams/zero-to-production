import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '@workspace/shared/data';

@Component({
  selector: 'todo-ui-user-profile',
  templateUrl: './ui-user-profile.component.html',
  styleUrls: ['./ui-user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiUserProfileComponent {
  @Input() user: User | undefined;
  @Input() profileForm: FormGroup | undefined;
  @Output() formSubmit = new EventEmitter<FormGroup>();
}
