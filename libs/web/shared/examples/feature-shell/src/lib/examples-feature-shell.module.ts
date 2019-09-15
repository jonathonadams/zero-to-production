import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplesComponent } from './examples/examples.component';
import { UiExamplesComponent } from './ui-examples/ui-examples.component';
import { ExamplesFeatureShellRoutingModule } from './examples-feature-shell-routing.module';
import { ExamplesDataAccessModule } from '@ngw/examples/data-access';
import { CustomMaterialModule } from '@ngw/common/ui/custom-material';

const COMPONENTS = [ExamplesComponent, UiExamplesComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    CustomMaterialModule,
    ExamplesDataAccessModule,
    ExamplesFeatureShellRoutingModule
  ]
})
export class ExamplesFeatureShellModule {}
