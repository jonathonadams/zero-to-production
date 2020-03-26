import {
  Component,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { IUser } from '@ztp/data';

@Component({
  selector: 'ztp-ui-drop-down-menu',
  templateUrl: './ui-drop-down-menu.component.html',
  styleUrls: ['./ui-drop-down-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDropDownMenuComponent {
  @Input() user: IUser | null;
  @Output() logout = new EventEmitter<void>();
}
