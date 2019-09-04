import { NgModule } from '@angular/core';
import { SharedExamplesFormBuilderRouterModule } from './shared-examples-form-builder-router.module';
import { BuilderComponent } from './builder/builder.component';

const COMPONENTS = [BuilderComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [SharedExamplesFormBuilderRouterModule]
})
export class SharedExamplesFormBuilderModule {}
