import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExamplesUtilsModule } from '@uqt/examples/utils';
import { CommonUiButtonsModule } from '@uqt/common/ui/buttons';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { CommonFormBuilderModule } from '@uqt/common/form-builder';
import { CommonDynamicFormModule } from '@uqt/common/dynamic-form';
import { ExampleFormBuilderCreateComponent } from './create/create.component';
import { ExampleFormBuilderDisplayComponent } from './display/display.component';
import { ExampleFormBuilderBuildComponent } from './build/build.component';
import { ExampleFormBuilderOverviewComponent } from './overview/overview.component';
import { CommonUiCardModule } from '@uqt/common/ui/card';

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
