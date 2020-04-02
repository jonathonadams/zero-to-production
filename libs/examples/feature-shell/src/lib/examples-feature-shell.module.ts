import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplesFeatureShellRoutingModule } from './examples-feature-shell-routing.module';
import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';
import { CommonUiToolbarModule } from '@ztp/common/ui/toolbar';
import { CommonUiCardModule } from '@ztp/common/ui/card';
import { AnimateScrollEntryDirective } from '@ztp/examples/utils';
import { ExampleComponent } from './example/example.component';
import { ExamplesDataAccessModule } from '@ztp/examples/data-access';
import { ExamplesHomeComponent } from './home/home.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ExamplesHeaderComponent } from './header/header.component';
import { CommonUtilsNotificationModule } from '@ztp/common/utils/notifications';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    CommonUiToolbarModule,
    CommonUiCardModule,
    MatButtonModule,
    ScrollingModule,
    CommonUtilsNotificationModule,
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
