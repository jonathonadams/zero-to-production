import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { faSave, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'uqt-form-builder-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuilderHeaderComponent {
  save = faSave;
  chevronDown = faChevronDown;
  @Input() name: string;
  @Output() toggleConfig = new EventEmitter<void>();
}
