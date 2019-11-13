import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExamplesFeatureShellRoutingModule } from './examples-feature-shell-routing.module';
import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';
import { CommonUiToolbarModule } from '@ngw/common/ui/toolbar';
import { ExamplesComponent } from './examples/examples.component';
import { UiExampleComponent } from './ui-examples/ui-examples.component';
import { CustomMaterialModule } from '@ngw/common/ui/custom-material';
import { ExamplesDataAccessModule } from '@ngw/examples/data-access';
import { ExampleDetailComponent } from './example-detail/example-detail.component';

const COMPONENTS = [
  ExamplesFeatureShellComponent,
  ExamplesComponent,
  UiExampleComponent,
  ExampleDetailComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialModule,
    CommonUiToolbarModule,
    ExamplesDataAccessModule,
    ExamplesFeatureShellRoutingModule
  ],
  declarations: COMPONENTS
})
export class ExamplesFeatureShellModule {}
