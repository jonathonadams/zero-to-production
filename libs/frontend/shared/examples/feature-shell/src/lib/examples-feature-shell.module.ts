import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplesComponent } from './examples/examples.component';
import { UiExamplesComponent } from './ui-examples/ui-examples.component';
import { ExamplesFeatureShellRoutingModule } from './examples-feature-shell-routing.module';

const COMPONENTS = [ExamplesComponent, UiExamplesComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ExamplesFeatureShellRoutingModule]
})
export class ExamplesFeatureShellModule {}
