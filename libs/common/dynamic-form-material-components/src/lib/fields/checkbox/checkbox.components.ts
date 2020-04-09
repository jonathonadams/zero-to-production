import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupTypes, ICheckBoxField } from '@ztp/common/dynamic-form';

@Component({
  selector: 'ztp-form-checkbox',
  templateUrl: './checkbox.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCheckBoxComponent {
  @Input() idx: number; // Only accessed if it is a FormArrayGroup
  @Input() type: FormGroupTypes;
  @Input() field: ICheckBoxField;
  @Input() group: FormGroup;
}
