import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormGroup } from '../form.models';

@Component({
  selector: 'app-form-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupComponent {
  @Input() form!: FormGroup;
  @Input() group!: IFormGroup;

  public getFormGroup(name: string): FormGroup {
    return this.form.get(name) as FormGroup;
  }
}
