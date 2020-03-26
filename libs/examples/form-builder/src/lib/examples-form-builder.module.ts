import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExamplesUtilsModule } from '@ztp/examples/utils';
import { CommonUiButtonsModule } from '@ztp/common/ui/buttons';
import { CustomMaterialModule } from '@ztp/common/ui/custom-material';
import { CommonFormBuilderModule } from '@ztp/common/form-builder';
import { CommonDynamicFormModule } from '@ztp/common/dynamic-form';
import { ExampleFormBuilderCreateComponent } from './create/create.component';
import { ExampleFormBuilderDisplayComponent } from './display/display.component';
import { ExampleFormBuilderBuildComponent } from './build/build.component';
import { ExampleFormBuilderOverviewComponent } from './overview/overview.component';
import { CommonUiCardModule } from '@ztp/common/ui/card';

const COMPONENTS = [
  ExampleFormBuilderCreateComponent,
  ExampleFormBuilderBuildComponent,
  ExampleFormBuilderDisplayComponent,
  ExampleFormBuilderOverviewComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    CommonUiButtonsModule,
    CommonUiCardModule,
    FontAwesomeModule,
    CustomMaterialModule,
    CommonDynamicFormModule,
    CommonFormBuilderModule,
    ExamplesUtilsModule,
  ],
})
export class ExamplesFormBuilderModule {
  static get lazyEntryComponent() {
    return ExampleFormBuilderOverviewComponent;
  }
}
