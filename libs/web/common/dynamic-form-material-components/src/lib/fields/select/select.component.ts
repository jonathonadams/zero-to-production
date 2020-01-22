import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupTypes, ISelectField } from '@uqt/data-access/dynamic-form';

@Component({
  selector: 'uqt-app-form-select',
  templateUrl: './select.component.html',
  styles: [
    `
      :host {
        display: block;
      }
      .mat-form-field {
        width: 100%;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSelectComponent {
  @Input() idx: number; // Only accessed if it is a FormArrayGroup
  @Input() type: FormGroupTypes;
  @Input() field: ISelectField;
  @Input() group: FormGroup;
}
