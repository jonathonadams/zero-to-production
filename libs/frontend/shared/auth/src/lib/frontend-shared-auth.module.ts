import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonLoginComponent } from './login/login.component';
import { UiLoginComponent } from './login/ui/ui-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [CommonLoginComponent, UiLoginComponent],
  exports: [CommonLoginComponent]
})
export class FrontendSharedAuthModule {}
