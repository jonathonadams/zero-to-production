import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonDynamicFormModule } from '@uqt/common/dynamic-form';
import { CommonUiCardModule } from '@uqt/common/ui/card';
import { AuthComponent } from './auth.component';
import { UiLoginComponent } from './ui/login/ui-login.component';
import { UiRegisterComponent } from './ui/register/ui-register.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomUsernameComponent } from './custom-username/custom-username.components';
import { CustomUsernameInputComponent } from './custom-username/custom-username-input.component';

const COMPONENTS = [
  AuthComponent,
  LoginComponent,
  UiLoginComponent,
  RegisterComponent,
  UiRegisterComponent,
  CustomUsernameComponent,
  CustomUsernameInputComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CommonUiCardModule,
    CustomMaterialModule,
    CommonDynamicFormModule.forChild(),
  ],
  exports: COMPONENTS,
})
export class SharedAuthComponentsModule {}
