import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplesFeatureShellRoutingModule } from './examples-feature-shell-routing.module';
import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';
import { CommonUiToolbarModule } from '@uqt/common/ui/toolbar';
import { CommonUiCardModule } from '@uqt/common/ui/card';
import { ExamplesComponent } from './examples/examples.component';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { ExamplesDataAccessModule } from '@uqt/examples/data-access';
import { CommonUiLayoutsModule } from '@uqt/common/ui/layouts';
import { AboutComponent } from './about/about.component';
import { ChildScrollDirective } from './child-scroll.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonNotificationModule } from '@uqt/utils/notifications';

const COMPONENTS = [
  ExamplesFeatureShellComponent,
  AboutComponent,
  ExamplesComponent,
  ChildScrollDirective
];

@NgModule({
  imports: [
    CommonModule,
    CommonUiLayoutsModule,
    CustomMaterialModule,
    CommonUiToolbarModule,
    CommonUiCardModule,
    CommonNotificationModule,
    ScrollingModule,
    ExamplesDataAccessModule,
    ExamplesFeatureShellRoutingModule
  ],
  declarations: COMPONENTS
})
export class ExamplesFeatureShellModule {}
