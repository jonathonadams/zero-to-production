import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';

export const EXAMPLES_ROUTES: Routes = [
  {
    path: '',
    component: ExamplesFeatureShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(EXAMPLES_ROUTES)]
})
export class ExamplesFeatureShellRoutingModule {}
