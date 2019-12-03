import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExamplesFeatureShellRoutingModule } from './examples-feature-shell-routing.module';
import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';
import { CommonUiToolbarModule } from '@uqt/common/ui/toolbar';
import { CommonUiCardModule } from '@uqt/common/ui/card';
import { ExamplesComponent } from './examples/examples.component';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { ExamplesDataAccessModule } from '@uqt/examples/data-access';
import { ExampleDetailComponent } from './example-detail/example-detail.component';
import { CommonUiLayoutsModule } from '@uqt/common/ui/layouts';
import { ThemeService } from '@uqt/common/theme';

const COMPONENTS = [
  ExamplesFeatureShellComponent,
  ExamplesComponent,
  ExampleDetailComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CommonUiLayoutsModule,
    CustomMaterialModule,
    CommonUiToolbarModule,
    CommonUiCardModule,
    ExamplesDataAccessModule,
    ExamplesFeatureShellRoutingModule
  ],
  providers: [ThemeService],
  declarations: COMPONENTS
})
export class ExamplesFeatureShellModule {}
