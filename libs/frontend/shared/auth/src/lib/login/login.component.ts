import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoginCredentials } from '@workspace/shared/data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../+state/auth.facade';

@Component({
  selector: 'todo-common-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonLoginComponent {
  public form: FormGroup;
  constructor(private formBuilder: FormBuilder, private facade: AuthFacade) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  public onSubmit({
    value,
    valid
  }: {
    value: LoginCredentials;
    valid: boolean;
  }): void {
    if (valid) {
      this.facade.login(value);
    }
  }
}
