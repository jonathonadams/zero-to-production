import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'uqt-ui-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CommonUiToolbarComponent {
  @Input() navButton = false;
  @Output() navToggle = new EventEmitter<void>();
}
