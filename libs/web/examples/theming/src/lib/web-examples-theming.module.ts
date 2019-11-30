import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WebExamplesThemingRouterModule } from './web-examples-theming-routing.module';
import { CssThemingComponent } from './css-theming/css-theming.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    WebExamplesThemingRouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [CssThemingComponent]
})
export class WebExamplesThemingModule {}
