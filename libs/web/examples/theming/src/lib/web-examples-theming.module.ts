import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CssThemingComponent } from './css-theming/css-theming.component';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, CustomMaterialModule],
  declarations: [CssThemingComponent]
})
export class WebExamplesThemingModule {
  static get lazyEntryComponent() {
    return CssThemingComponent;
  }
}
