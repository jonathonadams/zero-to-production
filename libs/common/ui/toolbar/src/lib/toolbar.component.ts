import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'uqt-ui-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonUiToolbarComponent {
  @Input() menuButton = false;
  @Output() menuToggle = new EventEmitter<void>();
}
