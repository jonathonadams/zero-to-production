import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleFormBuilderCreateComponent } from './create/create.component';
import { ExampleFormBuilderDisplayComponent } from './display/display.component';
import { ExampleFormBuilderBuildComponent } from './build/build.component';
import { ExampleFormBuilderOverviewComponent } from './overview/overview.component';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { DynamicFormModule } from '@uqt/data-access/dynamic-form';
import { DataAccessFormBuilderModule } from '@uqt/data-access/form-builder';
import { TempRoutingModule } from './temp-routing.module';

const COMPONENTS = [
  ExampleFormBuilderCreateComponent,
  ExampleFormBuilderBuildComponent,
  ExampleFormBuilderDisplayComponent,
  ExampleFormBuilderOverviewComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    CustomMaterialModule,
    DynamicFormModule,
    DataAccessFormBuilderModule,
    TempRoutingModule // TODO -> Delete
  ]
})
export class WebExamplesFormBuilderModule {
  static get lazyEntryComponent() {
    return ExampleFormBuilderOverviewComponent;
  }
}
