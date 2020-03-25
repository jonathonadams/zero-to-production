import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplesFeatureShellRoutingModule } from './examples-feature-shell-routing.module';
import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';
import { CommonUiToolbarModule } from '@uqt/common/ui/toolbar';
import { CommonUiCardModule } from '@uqt/common/ui/card';
import { AnimateScrollEntryDirective } from '@uqt/examples/utils';
import { ExampleComponent } from './example/example.component';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { ExamplesDataAccessModule } from '@uqt/examples/data-access';
import { ExamplesHomeComponent } from './home/home.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ExamplesHeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    CommonUiToolbarModule,
    CommonUiCardModule,
    ScrollingModule,
    ExamplesDataAccessModule,
    ExamplesFeatureShellRoutingModule,
  ],
  declarations: [
    ExamplesFeatureShellComponent,
    ExamplesHomeComponent,
    ExampleComponent,
    ExamplesHeaderComponent,
    AnimateScrollEntryDirective,
  ],
})
export class ExamplesFeatureShellModule {}
