import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAccessDynamicFormModule } from '@ngw/data-access/dynamic-form';
import { WebExamplesThemingRouterModule } from './web-examples-theming-routing.module';
import { CssThemingComponent } from './css-theming/css-theming.component';

@NgModule({
  imports: [
    CommonModule,
    WebExamplesThemingRouterModule,
    DataAccessDynamicFormModule
  ],
  declarations: [CssThemingComponent]
})
export class WebExamplesThemingModule {}
