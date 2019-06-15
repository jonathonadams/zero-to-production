import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * The login page is themed by the light/dark theme, hence
 * ViewEncapsulation is set to None as them theme class
 * is a the router level
 */
@Component({
  selector: 'todo-common-ui-login',
  templateUrl: './ui-login.component.html',
  styleUrls: ['./ui-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UiLoginComponent {
  @Input() public form: FormGroup;
  @Output() public onSubmit = new EventEmitter();
}
