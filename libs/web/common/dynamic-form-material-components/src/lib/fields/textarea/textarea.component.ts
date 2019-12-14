import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupTypes, ITextArea } from '@uqt/data-access/dynamic-form';

@Component({
  selector: 'app-form-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormTextAreaComponent {
  @Input() idx: number; // Only accessed if it is a FormArrayGroup
  @Input() type: FormGroupTypes;
  @Input() field: ITextArea;
  @Input() group: FormGroup;
}
