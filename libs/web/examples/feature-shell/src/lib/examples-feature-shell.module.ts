import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplesFeatureShellRoutingModule } from './examples-feature-shell-routing.module';
import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';

@NgModule({
  imports: [CommonModule, ExamplesFeatureShellRoutingModule],
  declarations: [ExamplesFeatureShellComponent]
})
export class ExamplesFeatureShellModule {}
