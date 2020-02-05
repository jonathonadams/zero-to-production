import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplesFeatureShellRoutingModule } from './examples-feature-shell-routing.module';
import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';
import { CommonUiToolbarModule } from '@uqt/common/ui/toolbar';
import { CommonUiCardModule } from '@uqt/common/ui/card';
import { ExampleComponent } from './example/example.component';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { ExamplesDataAccessModule } from '@uqt/examples/data-access';
import { AboutComponent } from './about/about.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AnimateScrollEntryDirective } from './animate-scroll-entry.directive';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    CommonUiToolbarModule,
    CommonUiCardModule,
    ScrollingModule,
    ExamplesDataAccessModule,
    ExamplesFeatureShellRoutingModule
  ],
  declarations: [
    ExamplesFeatureShellComponent,
    AboutComponent,
    ExampleComponent,
    AnimateScrollEntryDirective
  ]
})
export class ExamplesFeatureShellModule {}
