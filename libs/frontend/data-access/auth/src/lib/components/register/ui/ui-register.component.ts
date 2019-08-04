import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewEncapsulation,
  Input
} from '@angular/core';
import { AvailableStatus } from '../../../+state/auth.reducer';

@Component({
  selector: 'ngw-ui-register',
  templateUrl: './ui-register.component.html',
  styleUrls: ['./ui-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UiRegisterComponent {
  @Input() available!: AvailableStatus | null;
  @Output() cancel = new EventEmitter();
}
