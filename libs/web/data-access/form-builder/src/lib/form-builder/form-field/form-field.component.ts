import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'uqt-form-builder-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuilderFieldComponent {
  @Input() form: FormGroup;
  @Input() field: AbstractControl;
  @Input() groupIndex: number;
  @Input() fieldIndex: number;
  @Output() remove = new EventEmitter<{
    groupIndex: number;
    fieldIndex: number;
  }>();

  showConfig = false;
  toggleConfig() {
    this.showConfig = !this.showConfig;
  }
}
