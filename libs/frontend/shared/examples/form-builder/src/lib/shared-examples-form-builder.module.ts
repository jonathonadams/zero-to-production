import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '@ngw/common/ui/custom-material';
import { DataAccessFormBuilderModule } from '@ngw/data-access/form-builder';

import { SharedExamplesFormBuilderRouterModule } from './shared-examples-form-builder-router.module';
import { ExampleCreateFormComponent } from './create/create.component';
import { ExampleBuildFormComponent } from './build/build.component';
import { ExampleDisplayFormComponent } from './display/display.component';
import { DataAccessDynamicFormModule } from '@ngw/frontend/data-access/dynamic-form';

const COMPONENTS = [
  ExampleCreateFormComponent,
  ExampleBuildFormComponent,
  ExampleDisplayFormComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    CustomMaterialModule,
    DataAccessDynamicFormModule,
    DataAccessFormBuilderModule,
    SharedExamplesFormBuilderRouterModule
  ]
})
export class SharedExamplesFormBuilderModule {}
