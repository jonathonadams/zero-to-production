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
import { ExamplesAboutComponent } from './about/examples-about.component';
import { ScrollNavigationDirective } from './scroll-router.directive';
import { FactoryRenderedDirective } from './about/factory-renderer.directive';
import { ExampleDynamicFormComponent } from '@uqt/examples/dynamic-form';

const COMPONENTS = [
  ExamplesFeatureShellComponent,
  ExamplesAboutComponent,
  ExamplesComponent,
  ExampleDetailComponent,
  ScrollNavigationDirective,
  FactoryRenderedDirective
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
  declarations: COMPONENTS
})
export class ExamplesFeatureShellModule {}
