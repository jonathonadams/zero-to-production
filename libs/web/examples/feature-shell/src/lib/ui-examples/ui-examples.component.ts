import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { IExample } from '@ngw/types';

@Component({
  selector: 'ngw-ui-example',
  templateUrl: './ui-examples.component.html',
  styleUrls: ['./ui-examples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiExampleComponent {
  @Input() example: IExample | undefined;
  @Output() selected = new EventEmitter();
}
