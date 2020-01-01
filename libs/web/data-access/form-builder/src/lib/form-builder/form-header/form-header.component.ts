import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import { expandAnimation } from '../../form.animation';

@Component({
  selector: 'uqt-form-builder-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [expandAnimation]
})
export class FormBuilderHeaderComponent {
  save = faSave;

  showConfig = false;
  @Input() name: string;
  @Input() form: FormGroup;
}
