import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '@ngw/common/ui/custom-material';
import { DataAccessFormBuilderModule } from '@ngw/data-access/form-builder';

import { SharedExamplesFormBuilderRouterModule } from './shared-examples-form-builder-router.module';
import { ExampleCreateFormComponent } from './create/create.component';
import { BuildComponent } from './build/build.component';
import { DisplayComponent } from './display/display.component';

const COMPONENTS = [
  ExampleCreateFormComponent,
  BuildComponent,
  DisplayComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    CustomMaterialModule,
    DataAccessFormBuilderModule,
    SharedExamplesFormBuilderRouterModule
  ]
})
export class SharedExamplesFormBuilderModule {}
