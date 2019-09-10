import { NgModule } from '@angular/core';
import { CustomMaterialModule } from '@ngw/common/ui/custom-material';
import { DataAccessFormBuilderModule } from '@ngw/data-access/form-builder';

import { SharedExamplesFormBuilderRouterModule } from './shared-examples-form-builder-router.module';
import { BuilderComponent } from './builder/builder.component';

const COMPONENTS = [BuilderComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CustomMaterialModule,
    DataAccessFormBuilderModule,
    SharedExamplesFormBuilderRouterModule
  ]
})
export class SharedExamplesFormBuilderModule {}
