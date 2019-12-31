import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { faSave, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';

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
  @Input() form: FormGroup;

  showConfig = false;
  toggleConfig() {
    this.showConfig = !this.showConfig;
  }
}
