import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IInputField, FormGroupTypes } from '@uqt/data-access/dynamic-form';

@Component({
  selector: 'uqt-custom-username',
  templateUrl: './custom-username.component.html',
  styleUrls: ['./custom-username.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomUsernameComponent {
  @Input() idx: number; // Only accessed if a FormGroup
  @Input() type: FormGroupTypes;
  @Input() field: IInputField;
  @Input() group: FormGroup;
}
