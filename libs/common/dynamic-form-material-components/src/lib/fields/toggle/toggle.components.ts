import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupTypes, IToggleField } from '@uqt/common/dynamic-form';

@Component({
  selector: 'uqt-app-toggle',
  templateUrl: './toggle.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormToggleComponent {
  @Input() idx: number; // Only accessed if it is a FormArrayGroup
  @Input() type: FormGroupTypes;
  @Input() field: IToggleField;
  @Input() group: FormGroup;
}
