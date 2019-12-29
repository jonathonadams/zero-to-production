import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'uqt-form-builder-config',
  templateUrl: './form-config.component.html',
  styleUrls: ['./form-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuilderConfigComponent {
  @Input() form: FormGroup;
}
